import {randomBytes,scryptSync,timingSafeEqual,createHash,randomUUID} from 'node:crypto';
export const id=()=>randomUUID();
export const now=()=>new Date().toISOString();
export const fail=(message,status=400)=>{throw Object.assign(Error(message),{status});};
export function text(value,label,max=120){if(typeof value!=='string'||!value.trim()||value.trim().length>max)fail(`${label}: preencha entre 1 e ${max} caracteres.`);return value.trim();}
export function password(value){if(typeof value!=='string'||value.length<10||value.length>128)fail('A senha deve ter de 10 a 128 caracteres.');return value;}
export function hash(value){const salt=randomBytes(16).toString('hex');return salt+':'+scryptSync(value,salt,64).toString('hex');}
export function verify(value,stored){const [salt,key]=stored.split(':');const candidate=scryptSync(value,salt,64);return timingSafeEqual(candidate,Buffer.from(key,'hex'));}
export const digest=value=>createHash('sha256').update(value).digest('hex');
export function graph(rows){
 const map=new Map(rows.map(r=>[r.id,r]));
 for(const row of rows){const seen=new Set([row.id]);let parent=row.parent_id;while(parent){if(!map.has(parent))fail('Ligação aponta para um item inexistente.');if(seen.has(parent))fail('Essa ligação forma um ciclo. Escolha outra origem.');seen.add(parent);parent=map.get(parent).parent_id;}}
}
const LEVEL_RANK={consultoria:1,gestao:2,lideranca:3};
export const canRead=(user,post)=>{
 if(user.is_admin)return true;
 if(post.area_id&&post.area_id!==user.area_id&&user.position_level!=='lideranca')return false;
 return !post.audience_level||(LEVEL_RANK[user.position_level]||0)>=(LEVEL_RANK[post.audience_level]||99);
};
