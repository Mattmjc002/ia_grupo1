import {existsSync, mkdirSync, linkSync, unlinkSync, writeFileSync} from 'node:fs';
import {resolve, dirname, basename} from 'node:path';
import {fileURLToPath} from 'node:url';
import {DatabaseSync} from 'node:sqlite';
import {openDatabase} from '../server/database.mjs';
import {hash, canRead, graph} from '../server/domain.mjs';
import {KNOWLEDGE_CATALOG, knowledgeId} from '../server/knowledge-catalog.mjs';
import {syncKnowledgeIntelligence,knowledgeIntelligenceData,buildKnowledgeIntelligence,simulateKnowledgeExit} from '../server/knowledge-intelligence.mjs';
import {AREAS,TEAMS,CASES,CROSS_SKILLS,COMMON_SKILLS,SPECIAL_KNOWLEDGE,GUIDE,DEMO_PASSWORD} from './orion-content.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
process.chdir(root);
const args=process.argv.slice(2);
if(args.some(x=>!x.startsWith('--output=')&&!x.startsWith('--date=')))throw Error('Use --output=data/novo.sqlite e, opcionalmente, --date=AAAA-MM-DD.');
const option=(name)=>args.find(x=>x.startsWith(`--${name}=`))?.slice(name.length+3);
const day=option('date')||new Date().toLocaleDateString('en-CA',{timeZone:'America/Sao_Paulo'});
if(!/^\d{4}-\d{2}-\d{2}$/.test(day)||!Number.isFinite(Date.parse(day+'T03:00:00Z')))throw Error('Data de referência inválida.');
const anchor=Date.parse(day+'T03:00:00Z');
const output=resolve(root,option('output')||`data/orion-demo-${day}-${Date.now()}.sqlite`);
if(!output.endsWith('.sqlite'))throw Error('O destino deve terminar em .sqlite.');
if(existsSync(output))throw Error(`O destino já existe: ${output}. Escolha outro nome; a geração nunca sobrescreve bancos.`);
mkdirSync(dirname(output),{recursive:true});
const temporary=output+`.building-${process.pid}`;
if(existsSync(temporary))throw Error('Há um arquivo temporário com o mesmo nome. Escolha outro destino.');
process.env.DB_PROVIDER='sqlite';process.env.SQLITE_PATH=temporary;
const at=(days,hours=0)=>new Date(anchor-days*86400000-hours*3600000).toISOString();
const slug=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const email=name=>name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().split(' ').filter(Boolean).filter(x=>!['de','da','do','e'].includes(x)).join('.')+'@orion.example';
let rng=26092026;
const random=()=>((rng=(Math.imul(1664525,rng)+1013904223)>>>0)/4294967296);
const shuffle=list=>list.map(v=>({v,n:random()})).sort((a,b)=>a.n-b.n).map(x=>x.v);
const idForArea=k=>`orion-area-${k}`;
const people=[],positions=[],posts=[],comments=[],reactions=[],notifications=[],declared=[],items=[],details=[],audits=[];
const byArea=new Map(),byName=new Map();
const baseDate=at(500);
const admin={id:'orion-admin',name:'Administração Orion',email:'admin@orion.example',is_admin:1,status:'active',position_id:null,created_at:baseDate,bio:'Conta administrativa da demonstração fictícia Orion. Use um nome de operador para registrar as ações.'};
const catalogMap=new Map(KNOWLEDGE_CATALOG.map(a=>[a.id,a]));
for(const a of KNOWLEDGE_CATALOG)for(const name of a.items)items.push({id:knowledgeId(a.id,name),area_id:`mind-area-${a.id}`,name,source:'catalog',created_by:null,created_at:baseDate});
const itemsNamed=new Map();
function indexItem(item){if(!itemsNamed.has(slug(item.name)))itemsNamed.set(slug(item.name),[]);itemsNamed.get(slug(item.name)).push(item);}
items.forEach(indexItem);
function kid(name,preferred=''){
 const hits=itemsNamed.get(slug(name));if(!hits?.length)throw Error(`Conhecimento ausente no catálogo: ${name}`);
 return (hits.find(k=>k.area_id===`mind-area-${preferred}`)||hits[0]).id;
}
function skills(person,names,age=8){
 const seen=new Set(declared.filter(x=>x.user_id===person.id).map(x=>x.knowledge_id));
 for(const name of names){const knowledge_id=kid(name);if(seen.has(knowledge_id))continue;seen.add(knowledge_id);declared.push({user_id:person.id,knowledge_id,proficiency:3+(declared.length%3),updated_at:at(age,declared.length%10)});}
}

for(const [areaIndex,area]of AREAS.entries()){
 const team=[];
 for(const [index,[name,role,specialty,project]]of TEAMS[area.key].entries()){
  const id=`orion-user-${slug(name)}`,position_id=`orion-position-${slug(name)}`;
  const level=area.key==='direcao'&&index<3||index===0?'lideranca':/Coordenador|Controller/.test(role)?'gestao':'consultoria';
  const person={id,name,email:email(name),is_admin:0,position_id,status:'active',created_at:at(460-(areaIndex*7+index*3)),area_id:idForArea(area.key),position_level:level,areaKey:area.key,project,specialty,
   bio:`Atuo em ${specialty}. No Projeto ${project}, conecto as necessidades de ${area.name} às entregas de outras equipes. Compartilho decisões, exemplos de aplicação e o que aprendemos quando uma tentativa precisa ser revista. Procure-me para conversar sobre ${CROSS_SKILLS[area.key][index%CROSS_SKILLS[area.key].length].toLowerCase()}.`};
  const parent=index?`orion-position-${slug(TEAMS[area.key][0][0])}`:area.key==='direcao'?null:`orion-position-${slug(TEAMS[area.parent][0][0])}`;
  positions.push({id:position_id,area_id:person.area_id,name:role,level,parent_id:parent,x:100+areaIndex*350,y:area.key==='direcao'?40+index*170:300+index*170});
  people.push(person);team.push(person);byName.set(name,person);
  const tax=catalogMap.get(area.taxonomy).items;
  const specialties=Array.from({length:4},(_,i)=>tax[16+(index*4+i)%Math.min(36,tax.length-16)]);
  skills(person,[...COMMON_SKILLS,...tax.slice(0,11),...specialties,...CROSS_SKILLS[area.key]]);
 }
 byArea.set(area.key,team);
}
// Pessoas ponte: as competências atravessam a área formal sem alterar o organograma.
skills(byName.get('Natália Moraes'),['SQL','Python','Análise de dados','Visualização de dados','Business intelligence','Engenharia de dados','Qualidade de dados','Modelagem de dados','Estatística aplicada','Análise preditiva']);
skills(byName.get('Beatriz Azevedo'),['Jornada do cliente','Pesquisa de satisfação','Experiência do cliente','Acessibilidade digital','Design de serviços']);
skills(byName.get('Elisa Martins'),['Lean Six Sigma','Análise de causa raiz','Gestão de produtos','Gestão de requisitos']);
// Uma competência ampla e outra com adoção parcial ajudam a explorar os filtros da rede.
for(const person of people)skills(person,['Gestão de projetos']);
for(const person of people.filter((_,i)=>i%2===0))skills(person,['Facilitação de grupos']);

const exclusive=new Map([
 ['Calibração Aurora de demanda intermitente','Gabriel Rocha'],
 ['Conector Nexo do legado Orion','Bruno Siqueira'],
 ['Reconciliação de mensagens Nexo','Bruno Siqueira']
]);
const taxonomyTeam=new Map(AREAS.map(a=>[a.taxonomy,a.key]));
for(const [i,spec]of SPECIAL_KNOWLEDGE.entries()){
 const owner=exclusive.has(spec.name)?byName.get(exclusive.get(spec.name)):byArea.get(taxonomyTeam.get(spec.area)||({educacao:'pessoas',design:'produto'}[spec.area])||'direcao')[0];
 const item={id:`orion-knowledge-${slug(spec.name)}`,area_id:`mind-area-${spec.area}`,name:spec.name,source:'community',created_by:owner.id,created_at:at(exclusive.has(spec.name)?180+i:21+i%8)};
 items.push(item);indexItem(item);details.push({knowledge_id:item.id,description:spec.description,examples:spec.examples});
 spec.owner=owner.id;
 if(exclusive.has(spec.name))skills(owner,[spec.name],190);
 else{
  const members=byArea.get(owner.areaKey);members.slice(0,3).forEach(p=>skills(p,[spec.name]));
  skills(byArea.get('pessoas')[3],[spec.name]);
 }
}

let postSeq=0;
function post(person,{title,body,knowledge,days=1,hours=0,area=null,level=null,category='Lição aprendida',project='',context=null,quiet=false}){
 const record={id:`orion-post-${String(++postSeq).padStart(4,'0')}`,user_id:person.id,area_id:area? idForArea(area):null,audience_level:level,title,body,category,created_at:at(days,hours),updated_at:null,knowledge:[...new Set(knowledge.map(name=>kid(name)))],project,context,quiet};
 if(!canRead(person,record))throw Error(`Autor não pode publicar no público escolhido: ${person.name}`);
 if(!record.knowledge.length||record.knowledge.length>8)throw Error('Uma publicação deve ter de 1 a 8 conhecimentos.');
 posts.push(record);return record;
}

for(const [areaIndex,area]of AREAS.entries()){
 const team=byArea.get(area.key);
 for(const [n,entry]of CASES[area.key].entries()){
  const [project,title,problem,action,result,next,tagText]=entry,knowledge=tagText.split('|');
  const start=118+((areaIndex*11+n*7)%49),pilot=40+((areaIndex*3+n*5)%41),close=2+((areaIndex*7+n*4)%26);
  const lead=team[n%team.length],tester=team[(n+1)%team.length],reviewer=team[(n+2)%team.length];
  const context={project,title,problem,action,result,next};
  post(lead,{title:`${project} · ${title}: o diagnóstico`,project,days:start,hours:n,area:area.key,category:'Diagnóstico',knowledge:[...knowledge,'Documentação de processos'],context,
   body:`O problema\n${problem}\n\nAntes de mudar o fluxo, precisamos entender onde a dificuldade aparece. A equipe de ${area.name} vai reunir exemplos comparáveis e registrar as condições de cada ocorrência.\n\nExperimento combinado\n${action[0].toUpperCase()+action.slice(1)}. Esta é a proposta do piloto; ainda não há resultado para generalizar.\n\nComo vamos avaliar\nVamos comparar o processo anterior com o ensaio, mantendo visíveis o período, as exceções e a origem da evidência. ${tester.name} acompanha a execução; ${reviewer.name} ajuda a revisar o que pode ser reaplicado.\n\nPergunta para a equipe\nQue situação do seu dia a dia devemos incluir antes de começar?`});
  post(tester,{title:`${project} · ${title}: o piloto`,project,days:pilot,hours:n+1,area:n%2?area.key:null,category:'Experimento',knowledge,context,
   body:`O que motivou o teste\n${problem}\n\nO que fizemos\nNo piloto do Projeto ${project}, ${action}. Registramos as exceções e combinamos com ${lead.name} como comparar os casos sem mudar a definição no meio do teste.\n\nEvidência desta rodada\n${result[0].toUpperCase()+result.slice(1)}. O resultado se refere ao recorte do piloto e precisa ser interpretado dentro desse contexto.\n\nLimitação\nA amostra é de um ensaio interno; variações de volume, complexidade e perfil de uso podem mudar o resultado. Ainda precisamos ${next}.\n\nQuem usar a mesma prática em outra área pode responder com seu contexto e o que precisou adaptar.`});
  post(reviewer,{title:`${project} · ${title}: o que ficou`,project,days:close,hours:n+2,category:'Lição aprendida',knowledge:[...knowledge,'Colaboração entre equipes'],context,quiet:(areaIndex*6+n)%11===0,
   body:`Aprendizado do Projeto ${project}\n${problem} A experiência mostrou que a correção precisa começar pela definição do problema, antes da escolha de uma ferramenta.\n\nPrática que vale reaplicar\n${action[0].toUpperCase()+action.slice(1)}. O registro do piloto ficou ligado ao diagnóstico, para outra equipe entender tanto a decisão quanto seu limite.\n\nResultado observado no cenário de demonstração\n${result[0].toUpperCase()+result.slice(1)}. Este resultado não elimina as exceções e não deve ser tratado como garantia para outro processo.\n\nPróximo passo\n${next[0].toUpperCase()+next.slice(1)}. ${lead.name} mantém o contexto do problema; ${tester.name} pode explicar o ensaio.\n\nPara aplicar\nBusque este título e o nome ${project} na MIND para encontrar as etapas anteriores e registrar sua experiência nos comentários.`});
 }
 // Três registros recentes de coordenação por área; interlocutores e dependências reais do cenário.
 for(let week=0;week<3;week++){
  const selected=CASES[area.key][week*2];
  const [project,title,problem,action,result,next]=selected;
  const person=team[(week+3)%team.length];
  post(person,{title:`${project} · Agenda de ${area.name}: ${title.toLowerCase()}`,project,days:3+week*7,hours:areaIndex%8,area:area.key,category:'Acompanhamento',knowledge:['Gestão de projetos','Colaboração entre equipes',CROSS_SKILLS[area.key][week%CROSS_SKILLS[area.key].length]],context:{project,title,problem,action,result,next},
   body:`Foco da semana\n${next[0].toUpperCase()+next.slice(1)}. O trabalho parte do aprendizado registrado em “${title}”.\n\nO que já temos\n${result[0].toUpperCase()+result.slice(1)}. Vamos preservar o critério de comparação e registrar qualquer mudança de escopo.\n\nDependência\nPrecisamos que a equipe que recebe esta entrega confira o contexto e indique uma situação que ainda não está coberta. ${team[0].name} acompanha os impedimentos.\n\nRegistro esperado\nAo fechar a atividade, publique a evidência, o limite encontrado e a próxima pergunta. Assim, o próximo ciclo começa com o que já aprendemos.`});
 }
 const leader=team[0];
 post(leader,{title:`${area.name} · Decisões de capacidade e continuidade`,project:'Órbita',days:4+areaIndex%7,area:area.key,level:'lideranca',category:'Decisão',knowledge:['Gestão de riscos','Gestão de prioridades','Gestão do conhecimento'],
  body:`Pauta da liderança de ${area.name}\nA prioridade é manter a capacidade dos projetos e reduzir rotinas que dependem de uma única pessoa.\n\nDecisão\nReservar uma atividade por ciclo para documentação ou execução acompanhada de um processo relevante. A escolha deve considerar impacto e contexto, além do sinal calculado pela MIND.\n\nResponsabilidade\n${leader.name} acompanha a atividade e combina com a equipe receptora o que demonstrará aprendizagem. O objetivo não é produzir mais registros por pessoa, mas permitir que outro integrante use o conhecimento quando precisar.\n\nRevisão\nNo próximo encontro de liderança, vamos olhar a rede e as evidências de aplicação. O aprendizado que puder circular será publicado no feed geral.`});
}

for(const [i,spec]of SPECIAL_KNOWLEDGE.entries()){
 const owner=people.find(p=>p.id===spec.owner),critical=exclusive.has(spec.name);
 post(owner,{title:`${critical?'Registro técnico':'Prática Orion'} · ${spec.name}`,project:spec.name.includes('Nexo')?'Nexo':spec.name.includes('Aurora')?'Aurora':'Órbita',days:critical?165+i:1+i%18,category:critical?'Conhecimento concentrado':'Guia prático',knowledge:[spec.name,'Documentação de processos'],quiet:critical,
  body:`O que é\n${spec.description}\n\nExemplo na Orion\n${spec.examples}\n\n${critical?'Situação atual\nEste registro explica o contexto, mas não substitui a experiência de execução. Hoje sou a única referência cadastrada para esta rotina na MIND. A transferência ainda precisa de uma atividade acompanhada e da confirmação de quem vai receber o conhecimento.':'Como reutilizar\nLeia o exemplo, escolha uma situação equivalente e registre a adaptação necessária. O método deve ajudar uma decisão ou uma entrega; ele não é uma obrigação de preencher campos sem finalidade.'}\n\nPróxima revisão\n${critical?'Revisar as exceções do processo, completar o roteiro e testar a execução por outra pessoa.':'Trazer para os comentários uma aplicação da prática em outra área, com resultado e limitação.'}`});
}

const highlights=[
 ['Helena Duarte','Bem-vindos à Orion: oito projetos, uma empresa conectada','Nossa missão é transformar informação espalhada em entregas previsíveis. Atlas cuida dos pedidos; Aurora conecta demanda e capacidade; Ponte leva o cliente ao primeiro valor; Farol estabelece métricas comuns; Órbita desenvolve as pessoas; Gaia testa circularidade; Nexo sustenta integrações; Horizonte melhora a experiência digital.\n\nEsta empresa e todos os seus registros são fictícios, preparados para uma demonstração da MIND. Explore os projetos pela pesquisa, abra os perfis dos autores e observe como um conhecimento aparece em equipes diferentes.\n\nO que queremos tornar visível\nUma boa ideia não precisa ficar presa à área onde surgiu. Natália conecta Operações e Dados; Beatriz aproxima Produto e Atendimento; Bruno mostra por que a continuidade precisa ser planejada antes de uma ausência.\n\nO Guia da MIND reúne nossos projetos, rituais e orientações. Use os comentários para continuar as histórias.',COMMON_SKILLS,'Órbita'],
 ['Natália Moraes','Aurora · Quando Operações passou a conversar em SQL','Eu continuo em Operações e Processos, mas parte do meu trabalho exige investigar dados. Vitor me ajudou a revisar consultas; Renata explicou a origem das tabelas; Daniel traduziu o resultado em uma hipótese de capacidade.\n\nO que encontramos\nA fila de validação, e não a execução, concentrava a espera de vários pedidos. A equipe cruzou esse sinal com o mapa do processo antes de propor mudança.\n\nO que compartilho\nSQL e visualização ajudam a formular perguntas melhores, mas o contexto de quem executa continua essencial. No meu perfil aparecem conhecimentos de operação e dados sem que meu cargo seja alterado.\n\nPróximo passo\nVamos documentar exemplos sintéticos de consulta e combinar uma revisão com outra pessoa da operação.','SQL|Python|Análise de dados|Pesquisa operacional|Gestão de operações'.split('|'),'Aurora'],
 ['Bruno Siqueira','Nexo · Duas rotinas que ainda dependem de mim','O conector legado e a reconciliação de mensagens têm exceções que aprendi acompanhando a operação. Há um registro antigo sobre cada assunto, mas isso ainda não é suficiente para outra pessoa executar a rotina com autonomia.\n\nPlano de transferência\nJúlia Nascimento vai acompanhar a leitura do contrato e Luana Pires vai observar os sinais operacionais. Primeiro vamos listar exceções, depois executar um roteiro em ambiente de ensaio e, por fim, testar sem minha condução.\n\nPor que publicar\nConhecer o risco agora nos dá tempo para agir. A simulação de saída na MIND permite visualizar o que ficaria sem detentor cadastrado; ela não remove ninguém nem decide sobre pessoas.\n\nPendência\nA execução independente ainda não aconteceu. Vamos atualizar os perfis somente quando houver evidência da aprendizagem.',['Conector Nexo do legado Orion','Reconciliação de mensagens Nexo','Transferência de conhecimento'],'Nexo'],
 ['Laura Nogueira','Órbita · Um mapa de pessoas que podem ensinar','A comunidade de prática começa com uma pergunta que outra equipe também tem. Elisa pode ajudar com processos; Beatriz com pesquisa e acessibilidade; Natália com a leitura de dados operacionais; Débora com a organização dos aprendizados.\n\nO encontro só termina quando combinamos uma pequena aplicação. A pessoa que recebeu o conhecimento registra o resultado e o que precisou adaptar.\n\nUse o catálogo para encontrar o tema e o perfil para descobrir exemplos publicados. A rede aproxima pessoas que compartilham interesses além da estrutura formal.\n\nReconhecimentos são sinais de utilidade percebida. A quantidade de posts não mede competência nem desempenho.',['Comunidades de prática','Mentoria profissional','Facilitação de grupos','Colaboração entre equipes'],'Órbita'],
 ['Beatriz Azevedo','Horizonte · Acessibilidade nasce da conversa entre áreas','No teste do portal, o rótulo do botão não explicava o resultado da ação. Bianca trouxe relatos do atendimento; Tiago ajustou a interface; Isadora revisou a sequência da tarefa.\n\nO aprendizado\nPesquisa, design, desenvolvimento e atendimento precisam observar a mesma tarefa para evitar soluções parciais. Um texto claro ajuda tanto quem usa tecnologias assistivas quanto quem está aprendendo o produto.\n\nO próximo teste deve incluir navegação por teclado e situações em que a pessoa precisa corrigir um erro. Registraremos os limites da rodada antes de ampliar o uso.',['Acessibilidade digital','Pesquisa com usuários','Experiência do cliente','Design de interfaces'],'Horizonte'],
 ['Gabriel Rocha','Aurora · O que a previsão de demanda ainda não sabe','Séries com longos períodos sem pedidos exigem uma leitura diferente de itens recorrentes. Hoje a calibração de demanda intermitente está concentrada comigo, e o registro existente ainda precisa de exemplos mais completos.\n\nAmanda vai revisar o desenho do teste e Fernanda vai ajudar a descrever as exceções de planejamento. A meta é que outra pessoa consiga comparar cenários sem depender da memória de quem montou a primeira versão.\n\nNenhuma previsão deve ser tratada como compromisso. Precisamos observar erro, janela de dados e mudanças de comportamento antes de decidir.',['Calibração Aurora de demanda intermitente','Análise preditiva','Planejamento de demanda'],'Aurora'],
 ['Ana Ribeiro','Ponte · A implantação é um trabalho de várias equipes','Alice registra o problema do cliente; Rafael transforma o objetivo em uma jornada; Paulo combina a primeira entrega; Carolina confere o aceite; Mariana acompanha a adoção.\n\nQuando uma informação se perde entre essas etapas, o cliente percebe uma empresa fragmentada. O Protocolo Orion de passagem de bastão mantém objetivo, restrições, aceite e responsável no mesmo registro.\n\nPublicamos no feed geral o que pode ser reaplicado e usamos o feed da área para acompanhar a execução. Procure “Ponte” para seguir a história inteira.',['Protocolo Orion de passagem de bastão','Onboarding de clientes','Jornada do cliente'],'Ponte'],
 ['Débora Castro','Órbita · Como escrever um relato que outra pessoa consegue usar','Comece pela situação que motivou a tentativa. Explique o que foi feito, qual evidência apareceu e o que ainda não foi resolvido. Selecione conhecimentos que realmente se relacionam ao relato.\n\nUm exemplo sintético ajuda mais do que uma conclusão vaga. Quando alguém reaplicar a prática, registre a adaptação nos comentários e acrescente uma nova publicação se o contexto for diferente.\n\nA pesquisa da MIND encontra pessoas, comentários, conhecimentos e projetos mencionados nos textos. Usar o nome do projeto no título facilita ligar as etapas da história.',['Comunicação escrita','Documentação de processos','Gestão do conhecimento','Curadoria de conhecimento'],'Órbita'],
 ['Sofia Almeida','Farol · Leia o radar como uma pergunta para a equipe','O radar combina cobertura, concentração, documentação e atualidade dos registros. A rede destaca quem aparece ligado aos conceitos cadastrados. São sinais para investigar e conversar com os responsáveis.\n\nO catálogo também inclui assuntos sem evidência na Orion. Um número alto de alertas não significa que todos os temas são necessários à empresa, nem que uma pessoa não sabe algo que deixou de registrar.\n\nNa demonstração, compare Comunicação escrita, Facilitação de grupos e os conhecimentos específicos de Bruno. Depois abra o perfil de Natália para observar como competências atravessam a área formal.\n\nA simulação de saída estima mudanças a partir dos registros e sugere destinatários para transferência; ela não modifica os usuários.',['Governança de dados','Gestão do conhecimento','Indicadores e métricas'],'Farol']
];
highlights.forEach(([name,title,body,knowledge,project],i)=>post(byName.get(name),{title,body,knowledge,project,days:i===0?0:1,hours:i===0?2:i,category:'Destaque'}));

// Relatos antigos exclusivos deste período alimentam a oportunidade de revisão de temas.
const oldTopics=['Balanced Scorecard','Análise PESTEL','Planejamento de cenários','Análise SWOT','Governança de portfólio','Gestão de benefícios estratégicos'];
oldTopics.forEach((topic,i)=>{
 const person=byArea.get('direcao')[i%4];skills(person,[topic],210);
 post(person,{title:`Arquivo de estratégia · ${topic} no primeiro ciclo da Orion`,days:205+i*4,project:'Farol',category:'Memória de projeto',knowledge:[topic],quiet:true,
 body:`No primeiro ciclo de planejamento, usamos ${topic.toLowerCase()} para organizar uma discussão sobre prioridades da Orion. O registro foi criado para preservar a decisão e as premissas daquele momento.\n\nO que ficou documentado\nO grupo comparou alternativas e registrou restrições de capacidade. As escolhas foram úteis naquele contexto, mas o portfólio mudou desde então.\n\nPonto de atenção\nEste tema não recebeu novos relatos nos últimos meses. Antes de reaplicar a mesma prática, é necessário revisar as premissas e conversar com os responsáveis atuais. Esta publicação foi mantida no histórico para mostrar a necessidade de atualização do conhecimento.`});
});

// Comunicações gerais por nível demonstram as permissões sem atribuir administração aos cargos.
for(const [i,level]of ['consultoria','gestao','lideranca'].entries()){
 post(byName.get('Helena Duarte'),{title:`Orion · Combinados do fórum de ${level==='consultoria'?'consultoria':level==='gestao'?'gestão':'liderança'}`,days:2+i,hours:4,level,category:'Comunicado',knowledge:['Gestão de projetos','Gestão do conhecimento'],project:'Órbita',
 body:`Este fórum reúne assuntos do nível de ${level}. Aqui discutimos decisões e dependências que precisam desse contexto de acesso.\n\nPara este ciclo, o foco é registrar uma entrega que depende de outra área e indicar o conhecimento necessário para executá-la. O aprendizado que puder ajudar toda a empresa deve ser publicado também como um relato adequado ao feed geral.\n\nTer um cargo de liderança não concede acesso administrativo à MIND. A aprovação de cadastros e a configuração da estrutura continuam com a conta administrativa.`});
}

const commentsByArea={
 direcao:'Vou levar a dependência para a revisão de portfólio e verificar o responsável pela próxima decisão.',
 produto:'Vou conferir se o critério de aceite representa a tarefa que a pessoa precisa concluir.',
 tecnologia:'Vou reproduzir o cenário com entradas sintéticas e registrar o comportamento esperado.',
 dados:'Vou preservar a definição da métrica e conferir a origem dos registros usados na comparação.',
 operacoes:'Vou observar a passagem entre etapas para identificar onde esse ajuste muda a execução.',
 qualidade:'Vou revisar uma amostra com o mesmo critério e registrar as exceções antes da conclusão.',
 logistica:'Vou verificar se a mudança altera capacidade, janela de entrega ou reserva de materiais.',
 comercial:'Vou levar esse contexto ao diagnóstico comercial para alinhar a expectativa antes da proposta.',
 cx:'Vou conferir com a implantação se o resultado resolve o objetivo combinado com o cliente.',
 marketing:'Vou transformar o aprendizado em uma mensagem com contexto, sem generalizar o resultado do piloto.',
 pessoas:'Vou usar o relato em uma atividade de aprendizagem e pedir que alguém de outra equipe o aplique.',
 financas:'Vou conferir volume e premissas antes de relacionar o resultado a uma estimativa de custo.',
 governanca:'Vou revisar a finalidade do registro e manter clara a versão que sustenta esta decisão.',
 pesquisa:'Vou separar observação e interpretação para que a limitação do ensaio continue visível.'
};
let commentSeq=0;
for(const [i,p]of posts.entries()){
 const eligible=people.filter(u=>u.id!==p.user_id&&canRead(u,p));
 const chosen=shuffle(eligible);
 const daysAge=(anchor-Date.parse(p.created_at))/86400000;
 const count=p.quiet?0:3+i%4;
 for(let j=0;j<count;j++){
  const person=chosen[j%chosen.length];
  const c=p.context;
  const body=c?[
   `Sobre “${c.title}”, a dificuldade descrita aparece em outra etapa do nosso fluxo. ${commentsByArea[person.areaKey]} Como próximo passo, faz sentido ${c.next}.`,
   `Para o Projeto ${c.project}, sugiro manter este limite explícito: o resultado do piloto depende da composição dos casos. ${commentsByArea[person.areaKey]} Vou responder com o recorte da nossa área antes de comparar números.`,
   `O registro me ajudou a entender por que a equipe mudou a abordagem. ${commentsByArea[person.areaKey]} Na aplicação de “${c.title}”, vou anotar o que precisou ser adaptado.`,
   `Uma pergunta sobre “${c.title}”: qual exceção faria a equipe rever a decisão? ${commentsByArea[person.areaKey]} Podemos ligar a resposta ao próximo relato do ${c.project}.`,
   `Reservei este relato para a revisão da equipe. O ponto que precisamos acompanhar é ${c.next}. ${commentsByArea[person.areaKey]}`,
   `Concordo em manter o diagnóstico ligado ao resultado de “${c.title}”. ${commentsByArea[person.areaKey]} Isso ajuda quem não acompanhou as primeiras conversas do ${c.project}.`
  ][j%6]:`Li “${p.title}” e vou levar o contexto para ${AREAS.find(a=>a.key===person.areaKey).name}. ${commentsByArea[person.areaKey]} Meu ponto para a próxima conversa é como verificar a aplicação por alguém que não participou do registro original.`;
  const stamp=new Date(Math.min(anchor-1800000,Date.parse(p.created_at)+(j+1)*Math.min(daysAge*86400000/(count+2),10800000))).toISOString();
  const id=`orion-comment-${String(++commentSeq).padStart(5,'0')}`;
  comments.push({id,post_id:p.id,user_id:person.id,body,created_at:stamp});
  notifications.push({id:`orion-notification-comment-${id}`,user_id:p.user_id,post_id:p.id,body:`${person.name} comentou em “${p.title}”.`,is_read:daysAge>9||j%3!==0?1:0,created_at:stamp});
 }
 for(const person of chosen.slice(0,Math.min(chosen.length,8+i%17))){
  reactions.push({post_id:p.id,user_id:person.id,kind:'like'});
  if(random()<.45)reactions.push({post_id:p.id,user_id:person.id,kind:'save'});
 }
}
// O apresentador encontra uma biblioteca pessoal pronta ao entrar como administrador.
for(const p of posts.filter(p=>p.category==='Destaque'||p.category==='Guia prático').slice(-18))reactions.push({post_id:p.id,user_id:admin.id,kind:'save'});
for(const [i,p]of posts.filter(p=>p.category==='Destaque').entries())notifications.push({id:`orion-admin-notification-${i}`,user_id:admin.id,post_id:p.id,body:`Novo relato para explorar na apresentação: ${p.title}`,is_read:i%3===0?1:0,created_at:at(0,i+1)});
// Alguns perfis ainda declaram experiências sem uma publicação associada.
skills(byName.get('Débora Castro'),['Ontologias de conhecimento','Taxonomia corporativa'],55);
skills(byName.get('Artur Bezerra'),['Prova de conceito','Prospectiva tecnológica'],70);

const pendingSpecs=[['Sabrina Leal','produto'],['Enzo Santiago','tecnologia'],['Mirela Abreu','cx'],['Nicolas Ramos','logistica']];
for(const [i,[name,key]]of pendingSpecs.entries()){
 const ref=byArea.get(key).at(-1);
 people.push({id:`orion-user-${slug(name)}`,name,email:email(name),is_admin:0,position_id:ref.position_id,status:'pending',created_at:at(1+i,3),bio:`Cadastro fictício aguardando conferência do cargo em ${AREAS.find(a=>a.key===key).name}.`,area_id:ref.area_id,position_level:ref.position_level,areaKey:key});
}
const blocked={id:'orion-user-rene-vilar',name:'Renê Vilar',email:'rene.vilar@orion.example',is_admin:0,position_id:byArea.get('comercial').at(-1).position_id,status:'blocked',created_at:at(300),bio:'Perfil fictício de um antigo colaborador, mantido bloqueado para demonstrar o controle de acesso.'};
people.push(blocked);
for(const [i,a]of AREAS.entries())audits.push({id:`orion-audit-area-${i}`,actor:'Helena Duarte (cenário fictício)',action:`Configurou a área ${a.name} e seus vínculos.`,created_at:at(490-i)});
for(const [i,p]of people.filter(p=>p.status==='active').entries())audits.push({id:`orion-audit-person-${i}`,actor:'Laura Nogueira (cenário fictício)',action:`Aprovou o cadastro de ${p.name} após conferir área e cargo.`,created_at:new Date(Date.parse(p.created_at)+86400000).toISOString()});
audits.push({id:'orion-audit-guide',actor:'Débora Castro (cenário fictício)',action:'Atualizou o Guia da MIND com os projetos e as práticas da Orion.',created_at:at(3)});
audits.push({id:'orion-audit-block',actor:'Laura Nogueira (cenário fictício)',action:'Bloqueou o perfil fictício Renê Vilar após encerramento do vínculo.',created_at:at(14)});

graph(AREAS.map(a=>({id:idForArea(a.key),parent_id:a.parent?idForArea(a.parent):null})));
graph(positions);
if(new Set(posts.map(p=>p.title)).size!==posts.length)throw Error('Há títulos repetidos.');
if(new Set(people.map(p=>p.email)).size!==people.length)throw Error('Há e-mails repetidos.');
if(declared.some(k=>declared.filter(x=>x.user_id===k.user_id).length>50))throw Error('Perfil excede 50 conhecimentos.');
for(const c of comments){const p=posts.find(p=>p.id===c.post_id),u=people.find(u=>u.id===c.user_id);if(!canRead(u,p)||c.created_at<p.created_at||Date.parse(c.created_at)>anchor)throw Error('Comentário incoerente com data ou permissão.');}
const db=await openDatabase();
let report;
try{
 await db.transaction(async tx=>{
  async function insert(table,columns,rows){for(const row of rows)await tx.all(`INSERT INTO ${table}(${columns.join(',')}) VALUES(${columns.map(()=>'?').join(',')})`,columns.map(c=>row[c]??null));}
  await tx.all("INSERT INTO company(id,name,stage,revision) VALUES('main','Orion','open',28)");
  await insert('areas',['id','name','parent_id','x','y'],AREAS.map(a=>({id:idForArea(a.key),name:a.name,parent_id:a.parent?idForArea(a.parent):null,x:a.x,y:a.y})));
  await insert('positions',['id','area_id','name','level','parent_id','x','y'],positions);
  await insert('users',['id','name','email','password_hash','is_admin','position_id','status','bio','created_at'],[admin,...people].map(p=>({...p,password_hash:hash(DEMO_PASSWORD)})));
  await insert('knowledge_areas',['id','name'],KNOWLEDGE_CATALOG.map(a=>({id:`mind-area-${a.id}`,name:a.name})));
  await insert('knowledge_items',['id','area_id','name','source','created_by','created_at'],items);
  await insert('knowledge_details',['knowledge_id','description','examples'],details);
  await insert('user_knowledge',['user_id','knowledge_id','proficiency','updated_at'],declared);
  await insert('posts',['id','user_id','area_id','audience_level','title','body','category','created_at','updated_at'],posts);
  await insert('post_knowledge',['post_id','knowledge_id'],posts.flatMap(p=>p.knowledge.map(knowledge_id=>({post_id:p.id,knowledge_id}))));
  await insert('comments',['id','post_id','user_id','body','created_at'],comments);
  await insert('reactions',['post_id','user_id','kind'],reactions);
  await insert('notifications',['id','user_id','post_id','body','is_read','created_at'],notifications);
  await insert('audit',['id','actor','action','created_at'],audits);
  await tx.all("INSERT INTO company_guide(id,body,revision,updated_at,updated_by) VALUES('main',?,3,?,?)",[GUIDE,at(3),'Débora Castro (cenário fictício)']);
  const sync=await syncKnowledgeIntelligence(tx);
  const raw=await knowledgeIntelligenceData(tx),network=buildKnowledgeIntelligence(raw,{clock:new Date(anchor)});
  const covered=network.concepts.filter(c=>c.holders.length);
  const bruno=simulateKnowledgeExit(raw,byName.get('Bruno Siqueira').id,new Date(anchor));
  if(bruno.summary.orphaned<2)throw Error('O cenário de dependência de Bruno não foi criado corretamente.');
  const coverageCounts=Object.fromEntries(['critical','attention','healthy','unknown'].map(s=>[s,covered.filter(c=>c.coverageStatus===s).length]));
  if(!coverageCounts.critical||!coverageCounts.attention||!coverageCounts.healthy)throw Error('Faltam níveis diferentes de cobertura na demonstração.');
  report={company:'Orion',fictional:true,referenceDate:day,database:basename(output),activeEmployees:66,pendingEmployees:4,blockedEmployees:1,administrators:1,areas:AREAS.length,positions:positions.length,projects:8,posts:posts.length,comments:comments.length,likes:reactions.filter(r=>r.kind==='like').length,saves:reactions.filter(r=>r.kind==='save').length,notifications:notifications.length,profileKnowledgeLinks:declared.length,appliedKnowledge:new Set(posts.flatMap(p=>p.knowledge)).size,catalogItems:items.length,communityKnowledge:SPECIAL_KNOWLEDGE.length,canonicalConcepts:network.summary.concepts,knowledgeWithHolders:covered.length,coverageCounts,brunoSimulation:bruno.summary,bridges:network.bridges.slice(0,8),sync};
 });
 await db.close();
 const file=new DatabaseSync(temporary);file.exec('PRAGMA wal_checkpoint(TRUNCATE); PRAGMA journal_mode=DELETE;');
 const integrity=file.prepare('PRAGMA integrity_check').get(),fks=file.prepare('PRAGMA foreign_key_check').all();file.close();
 if(integrity.integrity_check!=='ok'||fks.length)throw Error('Falha na integridade do banco gerado.');
 // Cria o destino sem substituir um arquivo que tenha surgido durante a geração.
 linkSync(temporary,output);unlinkSync(temporary);
 writeFileSync(output.replace(/\.sqlite$/,'.resumo.json'),JSON.stringify(report,null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify(report,null,2));
 console.log(`Banco pronto: ${output}`);
}catch(error){
 try{await db.close();}catch{}
 for(const p of [temporary,temporary+'-wal',temporary+'-shm'])try{unlinkSync(p);}catch{}
 throw error;
}
