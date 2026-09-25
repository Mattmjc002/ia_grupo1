import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
import {openDatabase} from './database.mjs';
import {id,now,fail,text,password,hash,verify,digest,graph,canRead} from './domain.mjs';
const db=await openDatabase();
await db.transaction(async tx=>{
 if(!(await tx.all('SELECT id FROM company')).length)await tx.all("INSERT INTO company(id,name,stage) VALUES('main','Minha empresa','areas')");
 if(!(await tx.all('SELECT id FROM users WHERE is_admin=1')).length){
  const p=process.env.ADMIN_PASSWORD;if(!p||p==='troque-por-uma-senha-longa')throw Error('Configure ADMIN_PASSWORD no .env antes de iniciar.');
  await tx.all('INSERT INTO users(id,name,email,password_hash,is_admin,status,created_at) VALUES(?,?,?,?,1,?,?)',[id(),'Administrador',(process.env.ADMIN_EMAIL||'admin@mind.local').trim().toLowerCase(),hash(password(p)),'active',now()]);
 }
});
const port=Number(process.env.PORT||3000),origin=process.env.APP_ORIGIN||`http://localhost:${port}`;
const cookie=(token='',age=0)=>`mind_session=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${age}${process.env.COOKIE_SECURE==='true'?'; Secure':''}`;
const attempts=new Map();
function throttle(req){const key=req.socket.remoteAddress;const t=Date.now();let bucket=attempts.get(key);if(!bucket||t>bucket.until){bucket={n:0,until:t+600000};attempts.set(key,bucket);}if(++bucket.n>30)fail('Muitas tentativas. Aguarde 10 minutos.',429);}
setInterval(()=>{for(const [k,v]of attempts)if(v.until<Date.now())attempts.delete(k);},60000).unref();
const clean=u=>{const {password_hash,...rest}=u;return rest;};
async function audit(tx,actor,action){await tx.all('INSERT INTO audit(id,actor,action,created_at) VALUES(?,?,?,?)',[id(),actor,action,now()]);}
async function api(req,res,path,b){
 return db.transaction(async tx=>{
 const token=(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('mind_session='))?.slice(13);
 const user=token?(await tx.all('SELECT u.*,p.area_id FROM sessions s JOIN users u ON u.id=s.user_id LEFT JOIN positions p ON p.id=u.position_id WHERE s.token_hash=? AND s.expires_at>?',[digest(token),now()]))[0]:null;
 const company=(await tx.all('SELECT * FROM company'))[0];
 const admin=()=>{if(!user||!user.is_admin||user.status!=='active')fail('Acesso administrativo necessário.',403);};
 const active=()=>{if(!user)fail('Entre na sua conta.',401);if(user.status!=='active')fail('Seu cadastro aguarda aprovação ou está bloqueado.',403);};
 const structure=async()=>({company,areas:await tx.all('SELECT * FROM areas ORDER BY name'),positions:await tx.all('SELECT * FROM positions ORDER BY name')});
 if(path==='/api/catalog'&&req.method==='GET')return company.stage==='open'?await structure():{company,areas:[],positions:[]};
 if(path==='/api/me'&&req.method==='GET')return{user:user?clean(user):null};
 if(path==='/api/login'&&req.method==='POST'){
  throttle(req);const email=text(b.email,'E-mail',254).toLowerCase(),p=text(b.password,'Senha',128);
  const found=(await tx.all('SELECT * FROM users WHERE email=?',[email]))[0];
  if(!found||!verify(p,found.password_hash))fail('E-mail ou senha incorretos.',401);
  if(b.admin&&!found.is_admin)fail('Esta conta não é administradora.',403);
  if(found.status==='blocked')fail('Conta bloqueada. Procure o responsável.',403);
  const session=randomBytes(32).toString('hex');
  await tx.all('DELETE FROM sessions WHERE expires_at<?',[now()]);
  if(found.is_admin)await tx.all('DELETE FROM sessions WHERE user_id=?',[found.id]);
  await tx.all('INSERT INTO sessions VALUES(?,?,?)',[digest(session),found.id,new Date(Date.now()+28800000).toISOString()]);
  res.setHeader('Set-Cookie',cookie(session,28800));return{user:clean(found)};
 }
 if(path==='/api/logout'&&req.method==='POST'){if(token)await tx.all('DELETE FROM sessions WHERE token_hash=?',[digest(token)]);res.setHeader('Set-Cookie',cookie());return{ok:true};}
 if(path==='/api/register'&&req.method==='POST'){
  throttle(req);if(company.stage!=='open')fail('O cadastro será liberado após a configuração da empresa.');
  const name=text(b.name,'Nome'),email=text(b.email,'E-mail',254).toLowerCase(),p=password(b.password);
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))fail('Informe um e-mail válido.');
  if(!(await tx.all('SELECT id FROM positions WHERE id=?',[b.position_id||''])).length)fail('Escolha um cargo válido.');
  if((await tx.all('SELECT id FROM users WHERE email=?',[email])).length)fail('Já existe uma conta com esse e-mail.',409);
  await tx.all('INSERT INTO users(id,name,email,password_hash,position_id,status,created_at) VALUES(?,?,?,?,?,?,?)',[id(),name,email,hash(p),b.position_id,'pending',now()]);return{ok:true};
 }
 if(path==='/api/state'&&req.method==='GET'){
  active();const data=await structure();data.user=clean(user);
  data.people=await tx.all(`SELECT u.id,u.name,u.bio,u.position_id,u.status,p.area_id FROM users u LEFT JOIN positions p ON p.id=u.position_id WHERE u.is_admin=0${user.is_admin?'':" AND u.status='active'"}`);
  data.posts=(await tx.all('SELECT p.*,u.name AS author FROM posts p JOIN users u ON u.id=p.user_id ORDER BY p.created_at DESC')).filter(p=>canRead(user,p));
  const ids=new Set(data.posts.map(p=>p.id));data.comments=(await tx.all('SELECT c.*,u.name AS author FROM comments c JOIN users u ON u.id=c.user_id ORDER BY c.created_at')).filter(c=>ids.has(c.post_id));
  data.reactions=(await tx.all('SELECT * FROM reactions')).filter(r=>ids.has(r.post_id)&&(r.kind==='like'||r.user_id===user.id));
  data.notifications=await tx.all('SELECT * FROM notifications WHERE user_id=? ORDER BY created_at DESC',[user.id]);
  if(user.is_admin)data.audit=await tx.all('SELECT * FROM audit ORDER BY created_at DESC LIMIT 40');return data;
 }
 if(path==='/api/admin/structure'&&req.method==='POST'){
  admin();if(b.revision!==company.revision)fail('A estrutura mudou em outra sessão. Recarregue antes de salvar.',409);
  const actor=text(b.operator,'Responsável pela alteração');
  if(!['area','position'].includes(b.kind))fail('Tipo inválido.');const table=b.kind==='area'?'areas':'positions';
  const rows=await tx.all(`SELECT * FROM ${table}`),existing=rows.find(r=>r.id===b.id);
  if(b.remove){if(!existing)fail('Item não encontrado.',404);await tx.all(`DELETE FROM ${table} WHERE id=?`,[b.id]);}
  else{
   const row={id:existing?.id||id(),name:text(b.name,'Nome'),parent_id:b.parent_id||null,x:Number(b.x??existing?.x??80),y:Number(b.y??existing?.y??80)};
   if(!Number.isFinite(row.x)||!Number.isFinite(row.y)||row.x<0||row.y<0||row.x>5000||row.y>5000)fail('Posição fora do quadro.');
   graph([...rows.filter(r=>r.id!==row.id),row]);
   if(table==='positions'){
    if(company.stage==='areas')fail('Conclua primeiro a etapa de áreas.');
    row.area_id=b.area_id;
    if(!(await tx.all('SELECT id FROM areas WHERE id=?',[row.area_id||''])).length)fail('Selecione uma área.');
    if(existing&&existing.area_id!==row.area_id&&(await tx.all('SELECT id FROM users WHERE position_id=?',[existing.id])).length)fail('Esse cargo possui colaboradores. Realoque-os antes de mudar a área.');
   }
   const keys=table==='areas'?['name','parent_id','x','y']:['name','parent_id','x','y','area_id'];
   if(existing)await tx.all(`UPDATE ${table} SET ${keys.map(k=>k+'=?').join(',')} WHERE id=?`,[...keys.map(k=>row[k]),row.id]);
   else await tx.all(`INSERT INTO ${table}(id,${keys.join(',')}) VALUES(${keys.map(()=>'?').join(',')},?)`,[row.id,...keys.map(k=>row[k])]);
  }
  await tx.all('UPDATE company SET revision=revision+1');await audit(tx,actor,`${b.remove?'Removeu':'Salvou'} ${b.kind==='area'?'área':'cargo'}: ${b.name||existing?.name}`);return{ok:true};
 }
 if(path==='/api/admin/stage'&&req.method==='POST'){
  admin();const actor=text(b.operator,'Responsável');if(!['areas','roles','open'].includes(b.stage))fail('Etapa inválida.');
  if(b.revision!==company.revision)fail('A estrutura mudou. Recarregue.',409);
  const areas=await tx.all('SELECT * FROM areas'),positions=await tx.all('SELECT * FROM positions');
  if(b.stage!=='areas'&&!areas.length)fail('Crie pelo menos uma área.');
  if(b.stage==='open'&&areas.some(a=>!positions.some(p=>p.area_id===a.id)))fail('Toda área precisa ter pelo menos um cargo antes de abrir os cadastros.');
  await tx.all('UPDATE company SET name=?,stage=?,revision=revision+1',[text(b.name,'Nome da empresa'),b.stage]);await audit(tx,actor,`Etapa alterada para ${b.stage}`);return{ok:true};
 }
 if(path==='/api/admin/member'&&req.method==='POST'){
  admin();const actor=text(b.operator,'Responsável');if(!['active','pending','blocked'].includes(b.status))fail('Status inválido.');
  const member=(await tx.all('SELECT * FROM users WHERE id=? AND is_admin=0',[b.id]))[0];if(!member)fail('Colaborador não encontrado.',404);
  if(!(await tx.all('SELECT id FROM positions WHERE id=?',[b.position_id||''])).length)fail('Cargo inválido.');
  await tx.all('UPDATE users SET status=?,position_id=? WHERE id=?',[b.status,b.position_id,b.id]);await audit(tx,actor,`${b.status}: ${member.name}`);return{ok:true};
 }
 active();
 if(path==='/api/profile'&&req.method==='POST'){
  await tx.all('UPDATE users SET name=?,bio=? WHERE id=?',[text(b.name,'Nome'),String(b.bio||'').slice(0,1000),user.id]);
  if(b.password){if(!verify(String(b.current_password||''),user.password_hash))fail('A senha atual não confere.');await tx.all('UPDATE users SET password_hash=? WHERE id=?',[hash(password(b.password)),user.id]);await tx.all('DELETE FROM sessions WHERE user_id=? AND token_hash<>?',[user.id,digest(token)]);}
  return{ok:true};
 }
 if(path==='/api/notifications/read'&&req.method==='POST'){await tx.all('UPDATE notifications SET is_read=1 WHERE user_id=?',[user.id]);return{ok:true};}
 const notify=async(post,message)=>{if(post.user_id!==user.id)await tx.all('INSERT INTO notifications(id,user_id,post_id,body,created_at) VALUES(?,?,?,?,?)',[id(),post.user_id,post.id,message,now()]);};
 if(path==='/api/posts'&&req.method==='POST'){
  const area=b.area_id||null;if(area&&(!user.is_admin&&area!==user.area_id))fail('Você só pode publicar na sua área ou no feed geral.',403);
  if(b.id){const p=(await tx.all('SELECT * FROM posts WHERE id=?',[b.id]))[0];if(!p||p.user_id!==user.id||!canRead(user,p))fail('Você não pode editar essa publicação.',403);await tx.all('UPDATE posts SET title=?,body=?,category=?,area_id=?,updated_at=? WHERE id=?',[text(b.title,'Título',160),text(b.body,'Texto',10000),text(b.category,'Categoria',80),area,now(),b.id]);}
  else await tx.all('INSERT INTO posts(id,user_id,area_id,title,body,category,created_at) VALUES(?,?,?,?,?,?,?)',[id(),user.id,area,text(b.title,'Título',160),text(b.body,'Texto',10000),text(b.category,'Categoria',80),now()]);return{ok:true};
 }
 if(path==='/api/post/action'&&req.method==='POST'){
  const p=(await tx.all('SELECT * FROM posts WHERE id=?',[b.id||'']))[0];if(!p||!canRead(user,p))fail('Publicação indisponível.',404);
  if(b.action==='delete'){if(!user.is_admin&&p.user_id!==user.id)fail('Sem permissão para excluir.',403);await tx.all('DELETE FROM posts WHERE id=?',[p.id]);}
  else if(['like','save'].includes(b.action)){
   const args=[p.id,user.id,b.action],r=await tx.all('SELECT * FROM reactions WHERE post_id=? AND user_id=? AND kind=?',args);
   if(r.length)await tx.all('DELETE FROM reactions WHERE post_id=? AND user_id=? AND kind=?',args);
   else{await tx.all('INSERT INTO reactions VALUES(?,?,?)',args);if(b.action==='like')await notify(p,`${user.name} reconheceu “${p.title}”.`);}
  }else if(b.action==='comment'){await tx.all('INSERT INTO comments VALUES(?,?,?,?,?)',[id(),p.id,user.id,text(b.body,'Comentário',2000),now()]);await notify(p,`${user.name} comentou em “${p.title}”.`);}
  else if(b.action==='delete-comment'){const c=(await tx.all('SELECT * FROM comments WHERE id=? AND post_id=?',[b.comment_id||'',p.id]))[0];if(!c||(!user.is_admin&&c.user_id!==user.id))fail('Sem permissão.',403);await tx.all('DELETE FROM comments WHERE id=?',[c.id]);}
  else fail('Ação inválida.');return{ok:true};
 }
 fail('Rota não encontrada.',404);
 });
}
const files={'/':'index.html','/admin':'index.html','/app.js':'app.js','/style.css':'style.css'};
const server=http.createServer(async(req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','same-origin');res.setHeader('Content-Security-Policy',"default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
 try{
  const path=new URL(req.url,'http://localhost').pathname;
  if(path.startsWith('/api/')){
   res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','application/json; charset=utf-8');
   if(!['GET','POST'].includes(req.method))fail('Método não permitido.',405);
   if(req.method==='POST'&&(req.headers.origin!==origin||!String(req.headers['content-type']).startsWith('application/json')))fail('Origem ou formato da solicitação inválido.',403);
   let raw='';for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>64000)fail('Solicitação muito grande.',413);}
   let b={};try{if(raw)b=JSON.parse(raw);}catch{fail('JSON inválido.');}
   const result=await api(req,res,path,b);res.end(JSON.stringify(result));
  }else{
   if(req.method!=='GET'||!files[path])fail('Página não encontrada.',404);
   res.setHeader('Content-Type',path.endsWith('.js')?'text/javascript; charset=utf-8':path.endsWith('.css')?'text/css; charset=utf-8':'text/html; charset=utf-8');res.end(await readFile(new URL('../public/'+files[path],import.meta.url)));
  }
 }catch(e){
  let message=e.message,status=e.status||500;
  if(/UNIQUE|unique constraint/i.test(message)){message='Já existe um registro com esse nome ou e-mail.';status=409;}
  else if(/FOREIGN KEY|foreign key/i.test(message)){message='Esse item está em uso. Remova as ligações, cargos ou vínculos antes de excluí-lo.';status=409;}
  else if(status===500){console.error(e);message='Não foi possível concluir a operação. Os dados não foram alterados.';}
  res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.end(JSON.stringify({error:message}));
 }
});
server.listen(port,process.env.HOST||'127.0.0.1',()=>console.log(`Mind disponível em ${origin} | ADMIN: ${origin}/admin`));
process.on('SIGTERM',()=>server.close(async()=>{await db.close();process.exit(0);}));
