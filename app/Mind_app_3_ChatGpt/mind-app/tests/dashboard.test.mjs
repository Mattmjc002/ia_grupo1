import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildDashboard,dashboardRange} from '../server/dashboard.mjs';
import {dashboardCSV} from '../public/dashboard-view.mjs';
import {KNOWLEDGE_CATALOG} from '../server/knowledge-catalog.mjs';
import {knowledgeGuide} from '../public/knowledge-guides.mjs';

const clock=new Date('2026-09-24T12:00:00Z');
function fixture(){return {
 company:{stage:'open'},areas:[{id:'sales',name:'Comercial'},{id:'tech',name:'Tecnologia'}],positions:[],audit:[],
 people:[{id:'ana',name:'Ana',status:'active',is_admin:0,area_id:'sales'},{id:'bia',name:'Bia',status:'active',is_admin:0,area_id:'tech'},{id:'caio',name:'Caio',status:'active',is_admin:0,area_id:'sales'},{id:'admin',name:'Admin',status:'active',is_admin:1}],
 posts:[{id:'p1',user_id:'ana',author:'Ana',title:'Projeto Aurora',created_at:'2026-09-24T00:00:00Z'}, {id:'p2',user_id:'bia',author:'Bia',title:'Outro setor',created_at:'2026-09-18T23:59:00Z'}, {id:'p3',user_id:'ana',author:'Ana',title:'Anterior',created_at:'2026-09-17T23:59:59Z'}, {id:'p4',user_id:'admin',author:'Admin',title:'Aviso',created_at:'2026-09-19T10:00:00Z'}],
 comments:[{id:'c1',post_id:'p3',user_id:'bia',created_at:'2026-09-23T10:00:00Z'}, {id:'c2',post_id:'p2',user_id:'caio',created_at:'2026-09-24T10:00:00Z'}, {id:'c3',post_id:'p1',user_id:'admin',created_at:'2026-09-24T11:00:00Z'}],
 reactions:[{post_id:'p1',user_id:'bia',kind:'like'},{post_id:'p1',user_id:'bia',kind:'save'}],
 knowledgeAreas:[{id:'a1',name:'Projetos'}],
 knowledgeItems:[{id:'k1',name:'Gestão de projetos',area_id:'a1',source:'catalog'}, {id:'k2',name:'Kanban',area_id:'a1',source:'catalog'}, {id:'k3',name:'Tema novo',area_id:'a1',source:'community',created_by:'ana',created_at:'2026-09-24T00:00:00Z'}],
 postKnowledge:[{post_id:'p1',knowledge_id:'k1'},{post_id:'p1',knowledge_id:'k3'},{post_id:'p2',knowledge_id:'k1'},{post_id:'p3',knowledge_id:'k1'}],
 userKnowledge:[{user_id:'ana',knowledge_id:'k2'},{user_id:'bia',knowledge_id:'k1'}]
};}
const range=query=>dashboardRange(new URLSearchParams(query),clock);

test('dashboard usa limites inclusivos e período anterior de igual duração',()=>{
 const f=range('period=7');assert.equal(f.from,'2026-09-18');assert.equal(f.to,'2026-09-24');assert.equal(f.previousFrom,'2026-09-11');assert.equal(f.previousTo,'2026-09-17');
 const d=buildDashboard(fixture(),f,clock);
 assert.equal(d.summary.posts,3);assert.equal(d.summary.previousPosts,1);
 assert.equal(d.summary.participants,3);assert.equal(d.summary.members,3);assert.equal(d.summary.participation,100);
 assert.equal(d.summary.authors,2);assert.equal(d.summary.comments,3,'comentário recente em post antigo conta');
 assert.equal(d.summary.likes,1);assert.equal(d.summary.saves,1);assert.equal(d.summary.knowledge,2);
 assert.equal(d.summary.classification,67);assert.equal(d.summary.community,1);
 assert.equal(d.timeline.reduce((n,b)=>n+b.posts,0),3);assert.equal(d.timeline.reduce((n,b)=>n+b.comments,0),3);
 assert.deepEqual(d.attention.singleAuthor.map(k=>k.id),['k3']);assert.deepEqual(d.attention.declaredWithoutPosts.map(k=>k.id),['k2']);
 assert.equal(d.knowledge.find(k=>k.id==='k1').authors,2);assert.equal(d.knowledge.find(k=>k.id==='k1').sectors,2);
});
test('filtro considera setor do autor e participação em conversas de outros setores',()=>{
 const d=buildDashboard(fixture(),range('period=7&area=sales'),clock);
 assert.equal(d.summary.posts,1);assert.equal(d.summary.members,2);assert.equal(d.summary.participants,2);
 assert.equal(d.summary.comments,2);assert.equal(d.sectors.length,1);assert.equal(d.sectors[0].comments,1);
 assert.equal(d.contributors.find(p=>p.id==='caio').comments,1);assert.equal(d.summary.knowledgeAcrossSectors,0);
});
test('datas inválidas são recusadas e histórico completo não inventa comparação',()=>{
 for(const query of ['period=5','period=custom&from=2026-02-30&to=2026-03-02','period=custom&from=2026-09-24&to=2026-09-23','period=custom&from=2026-09-24&to=2026-09-25'])assert.throws(()=>range(query));
 const d=buildDashboard(fixture(),range('period=all'),clock);assert.equal(d.summary.posts,4);assert.equal(d.summary.previousPosts,null);
});
test('painel vazio possui zeros finitos e não inventa contribuições',()=>{
 const f=fixture();Object.assign(f,{people:[],posts:[],comments:[],reactions:[],postKnowledge:[],userKnowledge:[]});
 const d=buildDashboard(f,range('period=7'),clock);assert.equal(d.summary.participation,0);assert.equal(d.summary.classification,0);assert.equal(d.summary.posts,0);assert.deepEqual(d.contributors,[]);
});
test('CSV mantém acentos e protege células interpretadas como fórmulas',()=>{
 const f=fixture();f.posts[0].title='=1+1; "fórmula"';
 const csv=dashboardCSV(buildDashboard(f,range('period=7'),clock),f.areas);
 assert.ok(csv.startsWith('\uFEFF'));assert.ok(csv.includes('"\'=1+1; ""fórmula"""'));assert.ok(csv.includes('Publicações'));assert.ok(!csv.includes('password_hash'));
});
test('todos os 321 conhecimentos iniciais possuem descrição e exemplo originais',()=>{
 const items=KNOWLEDGE_CATALOG.flatMap(a=>a.items);assert.equal(items.length,321);
 for(const name of items){const guide=knowledgeGuide({name,source:'catalog'});assert.ok(guide.description,name);assert.ok(guide.examples.length&&guide.examples.every(Boolean),name);}
 const community=knowledgeGuide({name:'JavaScript',source:'community'});assert.equal(community.description,'');
});
