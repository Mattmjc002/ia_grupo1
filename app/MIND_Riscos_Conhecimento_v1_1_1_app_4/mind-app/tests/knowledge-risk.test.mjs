import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildKnowledgeIntelligence,simulateKnowledgeExit} from '../server/knowledge-intelligence.mjs';
import {assessKnowledgeRisk} from '../server/knowledge-risk.mjs';
import {renderRiskEvidence,renderRiskTable,renderRiskMethod} from '../public/knowledge-risk-view.mjs';

const clock=new Date('2026-09-26T12:00:00Z');
const stamp='2026-09-25T12:00:00Z';
function fixture(){return {
  people:[{id:'ana',name:'Ana',status:'active',is_admin:0,area_id:'tech',official_area_name:'Tecnologia',position_name:'Analista'}, {id:'bia',name:'Bia',status:'active',is_admin:0,area_id:'tech',official_area_name:'Tecnologia',position_name:'Analista'}, {id:'caio',name:'Caio',status:'active',is_admin:0,area_id:'sales',official_area_name:'Comercial'}],
  orgAreas:[{id:'tech',name:'Tecnologia'},{id:'sales',name:'Comercial'}],
  knowledgeAreas:[{id:'mind-area-tecnologia',name:'Tecnologia'}],
  knowledgeItems:[{id:'k1',name:'Sistema legado',area_id:'mind-area-tecnologia',source:'catalog'}, {id:'k2',name:'Engenharia de petróleo',area_id:'mind-area-tecnologia',source:'catalog'}],
  concepts:[{id:'c1',name:'Sistema legado',source:'catalog'},{id:'c2',name:'Engenharia de petróleo',source:'catalog'}],
  itemConcept:[{item_id:'k1',concept_id:'c1'},{item_id:'k2',concept_id:'c2'}],
  areaAffinities:[{concept_id:'c1',area_id:'mind-area-tecnologia',weight:100},{concept_id:'c2',area_id:'mind-area-tecnologia',weight:100}],
  professionalProfiles:[],profileAffinities:[],capabilities:[],capabilityAffinities:[],
  userKnowledge:[],posts:[],postKnowledge:[]
};}
const declaration=(id='ana',knowledge='k1')=>({user_id:id,knowledge_id:knowledge,proficiency:3,updated_at:stamp});
function post(f,id='p1',author='ana',date=stamp,knowledge='k1'){
  f.posts.push({id,user_id:author,created_at:date});f.postKnowledge.push({post_id:id,knowledge_id:knowledge});
}
const build=f=>buildKnowledgeIntelligence(f,{clock});

test('catálogo puro e cargos semelhantes não geram risco nem dados insuficientes',()=>{
  const f=fixture(),r=build(f);assert.equal(r.summary.catalogItems,2);assert.equal(r.summary.concepts,0);
  assert.equal(r.summary.critical,0);assert.equal(r.summary.unknown,0);assert.deepEqual(r.concepts,[]);
  assert.ok(r.domainHealth.every(d=>!d.concepts));
});
test('um único detentor declarado sem publicações gera motivo observável, não porcentagem',()=>{
  const f=fixture();f.userKnowledge.push(declaration());const r=build(f),c=r.concepts[0];
  assert.equal(r.summary.concepts,1);assert.equal(c.riskStatus,'critical');assert.equal(c.holders.length,1);
  assert.equal(c.risk,null);assert.equal(c.coverage,null);assert.equal(c.documentation,null);assert.ok(!('importance' in c));
  assert.match(c.mainReason,/apenas uma pessoa/);assert.ok(c.reasons.some(r=>r.includes('Nenhuma publicação')));
});
test('posts sem declaração não transformam autores em detentores',()=>{
  const f=fixture();post(f);post(f,'p2','bia');const c=build(f).concepts[0];
  assert.equal(c.holders.length,0);assert.equal(c.connections.length,2);assert.equal(c.riskStatus,'unknown');
  assert.equal(c.publications,2);assert.equal(c.authors,2);assert.equal(c.known,false);assert.match(c.mainReason,/não há domínio declarado/);
});
test('especialização com registros gera atenção explicada, sem cobrar a equipe inteira',()=>{
  const f=fixture();f.userKnowledge.push(declaration());post(f);const c=build(f).concepts[0];
  assert.equal(c.riskStatus,'attention');assert.equal(c.holders.length,1);
  assert.ok(!('relevantCount' in c));assert.ok(!('relevantPeople' in c));
});
test('muitos colaboradores sem o tema e afinidades diferentes não mudam o alerta',()=>{
  const f=fixture();f.userKnowledge.push(declaration());post(f);const before=build(f).concepts[0];
  for(let i=0;i<120;i++)f.people.push({...f.people[0],id:'extra'+i});
  f.areaAffinities=[];f.orgAreas=[];f.people.forEach(p=>{p.official_area_name='Outro ramo';p.position_name='Outro cargo';});
  const after=build(f).concepts[0];assert.equal(after.riskStatus,before.riskStatus);assert.deepEqual(after.reasons,before.reasons);
});
test('declarações e posts duplicados entre itens canônicos contam uma vez',()=>{
  const f=fixture();f.knowledgeItems.push({id:'k1b',name:'Sistema legado',area_id:'mind-area-tecnologia'});
  f.itemConcept.push({item_id:'k1b',concept_id:'c1'});f.userKnowledge.push(declaration(),declaration('ana','k1b'));
  post(f);f.postKnowledge.push({post_id:'p1',knowledge_id:'k1b'});const c=build(f).concepts[0];
  assert.equal(c.holders.length,1);assert.equal(c.publications,1);assert.equal(c.connections[0].publications,1);
});
test('duas declarações, autores diferentes e data recente ficam sem alerta observado',()=>{
  const f=fixture();f.userKnowledge.push(declaration(),declaration('bia'));post(f);post(f,'p2','bia');
  const c=build(f).concepts[0];assert.equal(c.riskStatus,'healthy');assert.match(c.mainReason,/não comprova domínio/);
  assert.equal(c.documentation,null);
});
test('último registro antigo pede revisão, sem afirmar que o conhecimento é inválido',()=>{
  const f=fixture();f.userKnowledge.push(declaration(),declaration('bia'));post(f,'p1','ana','2025-01-01T00:00:00Z');post(f,'p2','bia','2025-01-02T00:00:00Z');
  const c=build(f).concepts[0];assert.equal(c.riskStatus,'attention');assert.match(c.mainReason,/180 dias; vale revisar/);
  post(f,'p3','bia');assert.equal(build(f).concepts[0].riskStatus,'healthy');
});
test('datas ausentes, inválidas ou futuras não criam atualidade fictícia',()=>{
  for(const date of [null,'invalida','2030-01-01T00:00:00Z']){
    const r=assessKnowledgeRisk({holders:[{},{}],posts:[{user_id:'a',created_at:date},{user_id:'b',created_at:date}],clock});
    assert.equal(r.riskStatus,'unknown');assert.equal(r.ageDays,null);assert.equal(r.lastUsed,null);
  }
});
test('cadastros pendentes não entram na análise',()=>{
  const f=fixture();f.people[0].status='pending';f.userKnowledge.push(declaration());post(f);
  assert.equal(build(f).concepts.length,0);
});
test('pessoa bloqueada mantém histórico e deixa conhecimento sem detentor ativo visível',()=>{
  const f=fixture();f.people[0].status='blocked';f.userKnowledge.push(declaration());post(f);
  const c=build(f).concepts[0];assert.equal(c.holders.length,0);assert.equal(c.formerHolderCount,1);
  assert.equal(c.riskStatus,'critical');assert.equal(c.publications,1);assert.match(c.mainReason,/Sem detentor ativo/);
});
test('simulação preserva posts, não modifica entrada e coincide com bloqueio real',()=>{
  const f=fixture();f.userKnowledge.push(declaration());post(f);post(f,'p2','bia');const original=structuredClone(f);
  const sim=simulateKnowledgeExit(f,'ana',clock),i=sim.impacts[0];assert.deepEqual(f,original);
  assert.equal(i.beforeHolders,1);assert.equal(i.remainingHolders,0);assert.equal(i.publicationsPreserved,2);
  assert.equal(sim.summary.orphaned,1);assert.equal(i.afterStatus,'critical');assert.deepEqual(i.recommendedRecipients.map(p=>p.id),['bia']);
  f.people[0].status='blocked';const after=build(f).concepts[0];assert.equal(after.riskStatus,i.afterStatus);assert.equal(after.publications,i.publicationsPreserved);
  assert.equal(simulateKnowledgeExit(f,'inexistente',clock),null);
});
test('saída de autor sem declaração não inventa um detentor perdido',()=>{
  const f=fixture();post(f);const sim=simulateKnowledgeExit(f,'ana',clock);
  assert.equal(sim.summary.orphaned,0);assert.equal(sim.impacts[0].afterStatus,'unknown');assert.equal(sim.impacts[0].publicationsPreserved,1);
});
test('escopo de setor não incorpora registros exclusivos de outro setor',()=>{
  const f=fixture();f.userKnowledge.push(declaration('caio','k2'));post(f,'p1','caio',stamp,'k2');
  f.people=f.people.filter(p=>p.area_id==='tech');assert.equal(build(f).concepts.length,0);
});
test('admin pode documentar sem ser contado como detentor da equipe',()=>{
  const f=fixture();f.people.push({id:'admin',name:'Admin',status:'active',is_admin:1});post(f,'p1','admin');
  const r=build(f);assert.equal(r.people.length,3);assert.equal(r.concepts[0].publications,1);assert.equal(r.concepts[0].holders.length,0);
});
test('renderização explica ausência de evidências e escapa nomes e motivos',()=>{
  const f=fixture();f.userKnowledge.push(declaration());const c=build(f).concepts[0];c.name='<script>teste</script>';c.mainReason='<b>motivo</b>';
  const html=renderRiskTable([c])+renderRiskEvidence(c)+renderRiskMethod();
  assert.ok(!html.includes('<script>'));assert.match(html,/&lt;script&gt;/);assert.match(html,/&lt;b&gt;motivo/);
  assert.ok(!html.includes('null%'));assert.ok(!html.includes('undefined'));assert.match(renderRiskTable([]),/catálogo sozinho não gera alertas/);
});
