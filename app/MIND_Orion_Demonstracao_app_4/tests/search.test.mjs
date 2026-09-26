import {test} from 'node:test';
import assert from 'node:assert/strict';
import {matchesQuery,relevance} from '../public/search-utils.mjs';

test('busca entende acentos, palavras em campos diferentes e frase exata',()=>{
 assert.equal(matchesQuery('O projeto de melhoria está na área de produção','projeto produção'),true);
 assert.equal(matchesQuery('Projeto X: atualização do cronograma','"projeto x"'),true);
 assert.equal(matchesQuery('Projeto interno com a letra X','"projeto x"'),false);
 assert.equal(matchesQuery('Implantação do sistema financeiro','implantacao financeiro'),true);
});

test('ordenação por relevância favorece título e conhecimento associado',()=>{
 const titleHit=relevance('Projeto Aurora',{title:'Projeto Aurora',body:'Atualização',author:'Ana',area:'Projetos',knowledge:'Gestão de projetos',comment:''});
 const bodyHit=relevance('Projeto Aurora',{title:'Novidades da semana',body:'Atualização do Projeto Aurora',author:'Ana',area:'Projetos',knowledge:'',comment:''});
 assert.ok(titleHit>bodyHit);
});
