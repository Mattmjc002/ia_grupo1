import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {relevance,matchesQuery} from '../public/search-utils.mjs';
import {knowledgeGuide} from '../public/knowledge-guides.mjs';
import {renderDashboard,dashboardCSV} from '../public/dashboard-view.mjs';

// Exercise view composition without claiming a browser/layout test.
function views(){
 const root={innerHTML:'',querySelectorAll:()=>[]};
 const sandbox={console,relevance,matchesQuery,knowledgeGuide,renderDashboard,dashboardCSV,
  sessionStorage:{getItem:()=>null},location:{pathname:'/admin'},
  document:{querySelector:()=>root,addEventListener:()=>{},documentElement:{dataset:{}}}
 };
 vm.createContext(sandbox);
 let source=readFileSync(new URL('../public/app.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'').replace(/boot\(\);\s*$/,'');
 source+=`\nglobalThis.testViews={set(data,person){state=data;user=person;},setView(value){view=value;},setProfile(id){profileId=id;},setKnowledge(id){knowledgeId=id;},setSearch(value){globalQuery=value;globalType='all';},render,profile,knowledgePage,searchResults,searchPage,guidePage,html:()=>app.innerHTML};`;
 vm.runInContext(source,sandbox);
 const admin={id:'admin',name:'Administrador',is_admin:1,status:'active'};
 const person={id:'p1',name:'Ana <teste>',bio:'Experiência em dados',status:'active',area_id:'a',position_id:'role'};
 const data={user:admin,company:{name:'Empresa',stage:'open'},people:[person],areas:[{id:'a',name:'Comercial'}],positions:[{id:'role',area_id:'a',name:'Analista',level:'consultoria'}],notifications:[],audit:[],comments:[],reactions:[],
  knowledgeAreas:[{id:'karea',name:'Dados'}],knowledgeItems:[{id:'sql',area_id:'karea',name:'SQL',source:'catalog'},{id:'data',area_id:'karea',name:'Análise de dados',source:'catalog'}],
  userKnowledge:[{user_id:'p1',knowledge_id:'sql'}],postKnowledge:[{post_id:'post',knowledge_id:'data',name:'Análise de dados',area_name:'Dados'}],
  posts:[{id:'post',user_id:'p1',author:person.name,title:'Projeto Aurora',body:'Registro de trabalho',created_at:'2026-09-24T12:00:00Z',category:'Análise de dados'}],guide:{body:'Orientação <segura>',updated_at:'2026-09-24T12:00:00Z',updated_by:'Operador',revision:1}
 };
 sandbox.testViews.set(data,admin);return{v:sandbox.testViews,data,admin,person};
}
test('perfil separa conhecimentos selecionados e utilizados e oferece publicações',()=>{
 const {v}=views();v.setProfile('p1');const html=v.profile();
 assert.match(html,/Conhecimentos do perfil/);assert.match(html,/Usados em publicações/);assert.match(html,/Publicações · 1/);assert.match(html,/id="post-post"/);
 assert.match(html,/data-action="knowledge-detail" data-id="sql"/);assert.match(html,/data-action="knowledge-detail" data-id="data"/);assert.match(html,/Ana &lt;teste&gt;/);assert.ok(!html.includes('Ana <teste>'));
});
test('catálogo, detalhe e navegação administrativa renderizam os componentes esperados',()=>{
 const {v,data,person}=views();v.setView('knowledge');v.render();assert.match(v.html(),/data-view="dashboard"/);assert.match(v.html(),/data-view="knowledge"/);assert.match(v.html(),/Explore o catálogo/);
 v.setKnowledge('data');const detail=v.knowledgePage();assert.match(detail,/Quem já compartilhou/);assert.match(detail,/Exemplos práticos/);assert.match(detail,/Projeto Aurora/);assert.match(detail,/person-profile/);
 v.set(data,person);v.render();assert.ok(!v.html().includes('data-view="dashboard"'));assert.ok(!v.html().includes('data-action="knowledge-edit"'));
});
test('pesquisa encontra conhecimento e pessoa que o selecionou, com navegação própria',()=>{
 const {v}=views();v.setSearch('SQL');const results=v.searchResults();assert.equal(results.length,2);assert.ok(results.some(r=>r.type==='knowledge'));assert.ok(results.some(r=>r.type==='person'));
 const html=v.searchPage();assert.match(html,/Explorar conhecimento/);assert.match(html,/Ver perfil/);
 v.setSearch('"Projeto Aurora"');assert.equal(v.searchResults().length,1);
});
test('guia mostra orientações como texto e editor somente à administração',()=>{
 const {v,data,person}=views();assert.match(v.guidePage(),/Editar orientações da empresa/);assert.match(v.guidePage(),/Orientação &lt;segura&gt;/);
 v.set(data,person);assert.ok(!v.guidePage().includes('data-action="guide-edit"'));
});
