import {assessKnowledgeRisk, latestEvidenceDate, RISK_MODEL, RISK_ORDER, STALE_AFTER_DAYS} from './knowledge-risk.mjs';

const INTELLIGENCE_VERSION = 3;
const DAY = 86400000;

const norm = value => String(value || '')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  .replace(/[^a-z0-9+#.]+/g, ' ').replace(/\s+/g, ' ').trim();
const slug = value => norm(value).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(Number(n) || 0)));
const unique = values => [...new Set(values)];
const conceptId = name => `mind-concept-${slug(String(name).replace(/\+/g,' plus ').replace(/#/g,' sharp ').replace(/&/g,' and '))}`;
const areaDbId = slugId => `mind-area-${slugId}`;

// Broad, stable professional families. They are intentionally more specific than the 20 catalog macroareas.
// The system does not change a person's official organizational area; these profiles are an explainable signal.
export const PROFESSIONAL_PROFILES = [
  ['strategy','Estratégia e planejamento','administracao',['planejamento estrategico','estrategia','cenarios','swot','pestel','balanced scorecard','okr','governanca','business case']],
  ['management','Gestão e liderança','administracao',['lideranca','gestao de equipes','delegacao','accountability','tomada de decisao','desempenho organizacional','gestao de prioridades']],
  ['business-analysis','Análise de negócios','administracao',['analise de mercado','modelo de negocio','cadeia de valor','viabilidade','indicadores','processos decisorios','business case']],
  ['finance-fpa','FP&A e planejamento financeiro','financas',['fpa','forecast','orcamento','planejamento financeiro','modelagem financeira','analise de desvios','rolling forecast','ebitda']],
  ['accounting','Contabilidade','financas',['contabilidade','conciliacao','fechamento contabil','ifrs','cpc','demonstracao','balanco patrimonial']],
  ['controllership','Controladoria','financas',['controladoria','controles financeiros','custos','gestao orcamentaria','indicadores financeiros']],
  ['treasury','Tesouraria e caixa','financas',['tesouraria','fluxo de caixa','capital de giro','liquidez','contas a pagar','contas a receber','gestao de caixa']],
  ['tax','Tributário','financas',['tributacao','tributario','impostos','planejamento tributario','compliance tributario']],
  ['investment','Investimentos e valuation','financas',['investimentos','valuation','vpl','tir','wacc','estrutura de capital','mercado de capitais','fusoes','aquisicoes']],
  ['talent-acquisition','Talent Acquisition','pessoas',['recrutamento','selecao','entrevista','assessment','atracao de talentos','employer branding']],
  ['people-development','Desenvolvimento de pessoas','pessoas',['treinamento','desenvolvimento','pdi','carreira','mentoria','coaching','universidade corporativa','aprendizagem']],
  ['people-ops','People Operations','pessoas',['people operations','folha','beneficios','administracao de pessoal','ponto','jornada','remuneracao','onboarding','offboarding']],
  ['people-analytics','People Analytics','pessoas',['people analytics','indicadores de rh','turnover','absenteismo','headcount','planejamento de forca']],
  ['hrbp','HR Business Partner','pessoas',['hrbp','business partner','clima','cultura organizacional','engajamento','gestao de talentos','sucessao']],
  ['sales-development','Prospecção e Sales Development','vendas',['sdr','bdr','prospeccao','cold call','cold email','lead scoring','qualificacao','outbound','inbound']],
  ['account-executive','Executivo de contas','vendas',['account executive','vendas consultivas','negociacao','spin selling','meddic','bant','proposal','propostas comerciais','demonstracao']],
  ['key-account','Key Account Management','vendas',['key account','gestao de contas','carteira','renovacao','upsell','cross sell','customer expansion']],
  ['sales-ops','Sales Operations e RevOps','vendas',['sales operations','revenue operations','sales enablement','pipeline','forecast comercial','quotas','crm','sales analytics']],
  ['growth','Growth','marketing',['growth','cro','conversao','experimentos','growth hacking','product led growth','a b testing']],
  ['performance-marketing','Marketing de performance','marketing',['midia paga','google ads','meta ads','linkedin ads','performance','sem','programmatic','cpc','cac']],
  ['content-marketing','Conteúdo e inbound','marketing',['marketing de conteudo','content strategy','copywriting','calendario editorial','inbound','seo','redacao publicitaria']],
  ['brand','Marca e comunicação','marketing',['branding','marca','brand','comunicacao corporativa','relacoes publicas','assessoria de imprensa','storytelling']],
  ['marketing-ops','Marketing Operations','marketing',['marketing automation','rd station','hubspot','ga4','tracking','tagueamento','analytics de marketing','lead nurturing']],
  ['customer-success','Customer Success','atendimento',['customer success','sucesso do cliente','health score','qbr','success plan','adocao de produto','churn','renovacao']],
  ['customer-support','Suporte e atendimento','atendimento',['customer support','suporte','help desk','service desk','sac','atendimento','first contact','sla de atendimento']],
  ['customer-experience','Customer Experience','atendimento',['customer experience','experiencia do cliente','jornada','voice of customer','nps','csat','ces','service blueprint']],
  ['backend','Desenvolvimento Back-end','tecnologia',['back end','backend','java','spring boot','node.js','express','django','flask','fastapi','api','microservicos','postgresql','mysql','redis','mensageria']],
  ['frontend','Desenvolvimento Front-end','tecnologia',['front end','frontend','javascript','typescript','react','angular','vue','next.js','html','css','sass','tailwind','web']],
  ['fullstack','Desenvolvimento Full-stack','tecnologia',['full stack','desenvolvimento web','javascript','typescript','node.js','react','api','html','css','banco de dados']],
  ['mobile','Desenvolvimento Mobile','tecnologia',['mobile','kotlin','swift','android','ios','react native','flutter']],
  ['software-architecture','Arquitetura de software','tecnologia',['arquitetura de software','arquitetura de solucoes','microservicos','ddd','domain driven','clean architecture','hexagonal','design patterns','eventos','distribuidas']],
  ['devops','DevOps, SRE e plataforma','tecnologia',['devops','sre','site reliability','ci cd','docker','kubernetes','terraform','ansible','jenkins','github actions','observabilidade','prometheus','grafana']],
  ['cloud','Cloud Engineering','tecnologia',['cloud','nuvem','aws','azure','google cloud','gcp','serverless','kubernetes','terraform']],
  ['cybersecurity','Cibersegurança','tecnologia',['ciberseguranca','seguranca da informacao','owasp','pentest','vulnerabilidade','criptografia','oauth','openid','jwt']],
  ['infra-network','Infraestrutura e redes','tecnologia',['redes','linux','sistemas operacionais','nginx','apache','infraestrutura','powershell','bash','shell']],
  ['dba','Banco de dados','tecnologia',['administracao de bancos','postgresql','mysql','sql server','oracle','mongodb','redis','banco de dados','database']],
  ['qa-software','QA e testes de software','tecnologia',['testes de software','teste unitario','testes de integracao','end to end','automacao de testes','tdd','bdd','qualidade de software']],
  ['data-analyst','Análise de dados','dados',['analise de dados','excel','power bi','tableau','visualizacao','sql','estatistica descritiva','indicadores','analytics']],
  ['bi','Business Intelligence','dados',['business intelligence','power bi','tableau','qlik','looker','dax','power query','data warehouse','modelagem dimensional']],
  ['data-engineer','Engenharia de dados','dados',['engenharia de dados','etl','elt','airflow','spark','databricks','dbt','data lake','lakehouse','bigquery','snowflake','redshift','kafka']],
  ['data-science','Ciência de dados','dados',['data science','machine learning','scikit','xgboost','lightgbm','feature engineering','regressao','series temporais','forecasting','estatistica']],
  ['ai-engineer','Engenharia de IA','dados',['inteligencia artificial','llm','rag','embeddings','banco vetorial','pytorch','tensorflow','nlp','visao computacional','mlops','engenharia de prompts']],
  ['data-governance','Governança de dados','dados',['governanca de dados','data governance','data quality','qualidade de dados','data lineage','catalogo de dados','master data','privacidade de dados']],
  ['operations-research','Pesquisa operacional e otimização','dados',['pesquisa operacional','otimizacao','programacao linear','programacao inteira','teoria das filas','monte carlo','simulacao','analise de decisao']],
  ['industrial-engineering','Engenharia de produção','engenharia',['engenharia de producao','engenharia industrial','sistemas de producao','tempos e movimentos','cronoanalise','layout industrial','capacidade produtiva']],
  ['process-engineering','Engenharia de processos','engenharia',['engenharia de processos','projeto de processos','otimizacao de processos','simulacao de processos','gargalos','vsm','fluxo de valor']],
  ['pcp','PCP e planejamento industrial','engenharia',['pcp','planejamento e controle da producao','mrp','s&op','sequenciamento','programacao da producao','planejamento mestre']],
  ['lean-manufacturing','Lean Manufacturing','engenharia',['lean manufacturing','kaizen','5s','smED','heijunka','jidoka','poka yoke','just in time','takt','vsm']],
  ['maintenance','Manutenção e confiabilidade','engenharia',['manutencao','tpm','rcm','confiabilidade','analise de falhas','gestao de ativos','preditiva','preventiva']],
  ['industrial-automation','Automação industrial','engenharia',['automacao industrial','clp','scada','robotica','iot industrial','industria 4.0','controle']],
  ['quality','Qualidade','qualidade',['gestao da qualidade','iso 9001','quality assurance','quality control','auditoria da qualidade','plano de controle','nao conformidade','capa']],
  ['lean-six-sigma','Lean Six Sigma','qualidade',['six sigma','lean six sigma','dmaic','dmadv','green belt','black belt','pareto','ishikawa','5 porques','a3']],
  ['project-manager','Gestão de projetos','projetos',['gestao de projetos','pmbok','prince2','cronograma','caminho critico','eap','wbs','riscos de projetos','stakeholders de projetos']],
  ['pmo','PMO e portfólio','projetos',['pmo','escritorio de projetos','portfolio de projetos','gestao de programas','governanca de projetos','priorizacao de portfolio']],
  ['product-management','Gestão de produto','projetos',['gestao de produtos','product strategy','product roadmap','product vision','product market fit','jobs to be done','product analytics','go to market']],
  ['agile','Agilidade','projetos',['scrum','kanban','metodos ageis','agile','sprint','retrospectiva','product owner','scrum master','safe','less','backlog']],
  ['innovation','Inovação','projetos',['inovacao','open innovation','corporate venture','intraempreendedorismo','portfolio de inovacao','technology scouting','lean startup','mvp']],
  ['operations','Operações','operacoes',['gestao de operacoes','planejamento operacional','gestao de capacidade','produtividade','slas','gestao de servicos','rotinas','controle operacional']],
  ['bpm','Processos e BPM','operacoes',['bpm','bpmn','desenho de processos','mapeamento as is','to be','sipoc','process mining','automacao de processos','rpa']],
  ['business-continuity','Continuidade e resiliência operacional','operacoes',['continuidade','business continuity','bcp','disaster recovery','gestao de incidentes','gestao de crises']],
  ['supply-chain','Supply Chain','logistica',['supply chain','cadeia de suprimentos','s&op','ibp','demand planning','supply planning','resiliencia da cadeia']],
  ['procurement','Compras e procurement','logistica',['compras','procurement','strategic sourcing','category management','spend analysis','fornecedores','procure to pay']],
  ['warehouse','Armazéns e estoques','logistica',['estoque','warehouse','wms','armazenagem','picking','packing','slotting','inventario','curva abc']],
  ['transport-logistics','Transportes e distribuição','logistica',['transporte','tms','roteirizacao','frotas','fretes','last mile','distribuicao','cargas']],
  ['foreign-trade','Comércio exterior','logistica',['importacao','exportacao','comercio exterior','incoterms','aduaneiro','despacho aduaneiro']],
  ['legal','Jurídico empresarial','juridico',['direito empresarial','contratos empresariais','societario','contencioso','legal operations','due diligence juridica']],
  ['compliance','Compliance e integridade','juridico',['compliance','integridade','anticorrupcao','conflito de interesses','investigacoes internas','canal de etica','kyc','aml']],
  ['privacy','Privacidade e proteção de dados','juridico',['lgpd','privacidade','protecao de dados','dpo','data mapping','relatorio de impacto','consentimento']],
  ['ip-law','Propriedade intelectual','juridico',['propriedade intelectual','patentes','marcas','direitos autorais','licenciamento de software','propriedade industrial']],
  ['esh','Segurança e saúde ocupacional','seguranca',['seguranca do trabalho','sst','ehs','hse','pgr','pcmsO','nr ','epi','acidente','higiene ocupacional']],
  ['process-safety','Segurança de processos','seguranca',['hazop','lopa','seguranca de processos','psm','bow tie','permissao de trabalho','analise preliminar de risco']],
  ['environmental','Gestão ambiental','seguranca',['gestao ambiental','iso 14001','residuos','agua','licenciamento ambiental','aspectos e impactos','auditoria ambiental']],
  ['esg','ESG e sustentabilidade','seguranca',['esg','sustentabilidade','ghg','carbono','descarbonizacao','net zero','gri','sasb','tcfd','issb','responsabilidade social']],
  ['learning-design','Design de aprendizagem','educacao',['design instrucional','desenho de aprendizagem','addie','sam','microlearning','e learning','trilhas','taxonomia de bloom']],
  ['knowledge-management','Gestão do conhecimento','educacao',['gestao do conhecimento','knowledge sharing','base de conhecimento','taxonomia','ontologia','curadoria de conhecimento','licoes aprendidas','transferencia de conhecimento']],
  ['technical-writing','Documentação e technical writing','educacao',['documentacao tecnica','technical writing','documentacao de processos','materiais didaticos','base de conhecimento']],
  ['ux-ui','UX/UI e Product Design','design',['ux','ui','product design','design de interfaces','figma','wireframe','mockup','prototipagem','design system']],
  ['ux-research','Pesquisa com usuários','design',['ux research','pesquisa de experiencia','entrevistas com usuarios','testes de usabilidade','card sorting','tree testing','eye tracking']],
  ['visual-design','Design visual','design',['design grafico','visual design','illustrator','photoshop','tipografia','cores','iconografia','ilustracao','infografia']],
  ['content-design','Content Design e UX Writing','design',['content design','ux writing','microcopy','arquitetura de conteudo','design de informacao']],
  ['research','Pesquisa científica','ciencias',['metodologia cientifica','pesquisa aplicada','desenho de pesquisa','revisao sistematica','meta analise','artigo','publicacao cientifica','peer review']],
  ['rd','P&D e inovação tecnológica','ciencias',['p&d','pesquisa e desenvolvimento','trl','prova de conceito','roadmap tecnologico','transferencia de tecnologia','inovacao tecnologica']],
  ['facilities','Facilities','imobiliario',['facilities','facility management','administracao predial','servicos terceirizados','workplace','ocupacao','limpeza','recepcao']],
  ['real-estate','Real Estate corporativo','imobiliario',['imobiliario','real estate','locacao','avaliacao de imoveis','ativos imobiliarios','property management']],
  ['infrastructure','Infraestrutura e obras','imobiliario',['obras','infraestrutura','bim','autocad','fiscalizacao','cronograma fisico financeiro','retrofit','reformas']],
  ['public-management','Gestão pública','setor-publico',['gestao publica','administracao publica','governanca publica','planejamento governamental','ppa','ldo','loa','orcamento publico']],
  ['public-policy','Políticas públicas','setor-publico',['politicas publicas','ciclo de politicas','teoria da mudanca','avaliacao de programas','indicadores sociais','impacto de politicas']],
  ['public-procurement','Compras e contratos públicos','setor-publico',['compras publicas','licitacoes','lei 14.133','pregao','contratos publicos','fiscalizacao de contratos']],
  ['gov-digital','Governo digital','setor-publico',['governo digital','servicos publicos digitais','dados abertos','interoperabilidade governamental','transformacao digital no governo']],
].map(([id,name,area,keywords])=>({id:`mind-profile-${id}`,name,area,keywords,description:`Afinidade profissional associada a ${name}.`}));

export const CAPABILITY_DIMENSIONS = [
  ['technical','Técnica','Aplicação de métodos, ferramentas e conhecimentos especializados.'],
  ['analytical','Analítica','Interpretação de dados, problemas e evidências para apoiar decisões.'],
  ['operational','Operacional','Execução, desenho e melhoria de rotinas e processos.'],
  ['strategic','Estratégica','Definição de direção, prioridades, cenários e escolhas de longo prazo.'],
  ['managerial','Gerencial','Coordenação de pessoas, recursos, entregas e decisões.'],
  ['commercial','Comercial','Geração de demanda, negociação, relacionamento e crescimento de receita.'],
  ['creative','Criativa','Criação de soluções, experiências, comunicação e expressão visual.'],
  ['interpersonal','Interpessoal','Comunicação, facilitação, colaboração e construção de relações.'],
  ['regulatory','Regulatória','Interpretação e aplicação de normas, controles e requisitos.'],
  ['scientific','Científica','Investigação sistemática, método, experimentação e produção de evidências.'],
  ['pedagogical','Pedagógica','Ensino, aprendizagem, facilitação e desenvolvimento de capacidades.'],
  ['digital','Digital','Uso, desenvolvimento e integração de tecnologias digitais.'],
].map(([id,name,description])=>({id:`mind-cap-${id}`,key:id,name,description}));

const AREA_CAPABILITIES = {
  administracao:{strategic:95,managerial:90,analytical:65,operational:45,interpersonal:45},
  financas:{analytical:95,technical:80,strategic:55,regulatory:55,digital:35},
  pessoas:{interpersonal:95,managerial:75,pedagogical:65,analytical:45,strategic:40},
  vendas:{commercial:100,interpersonal:90,strategic:45,analytical:35},
  marketing:{creative:85,commercial:75,analytical:60,digital:75,strategic:45,interpersonal:40},
  atendimento:{interpersonal:95,operational:70,commercial:45,digital:45,analytical:30},
  tecnologia:{technical:100,digital:100,analytical:65,operational:45,creative:30},
  dados:{analytical:100,technical:90,digital:90,scientific:60,strategic:35},
  engenharia:{technical:95,analytical:85,operational:90,scientific:45,managerial:35},
  qualidade:{analytical:80,operational:90,technical:75,regulatory:55,managerial:30},
  projetos:{managerial:90,strategic:70,operational:70,interpersonal:65,analytical:45},
  operacoes:{operational:100,analytical:75,managerial:65,technical:45,strategic:35},
  logistica:{operational:95,analytical:75,managerial:60,commercial:30,technical:35},
  juridico:{regulatory:100,analytical:80,technical:75,strategic:45,interpersonal:35},
  seguranca:{regulatory:85,technical:80,operational:80,analytical:60,scientific:40},
  educacao:{pedagogical:100,interpersonal:85,creative:60,managerial:35,digital:35},
  design:{creative:100,digital:85,interpersonal:55,analytical:45,technical:45},
  ciencias:{scientific:100,analytical:90,technical:70,creative:35,digital:35},
  imobiliario:{operational:80,technical:70,managerial:65,regulatory:45,analytical:35},
  'setor-publico':{strategic:70,managerial:65,regulatory:75,analytical:65,interpersonal:50},
};

// Cross-domain lexical signals. Primary catalog areas always receive 100; these rules create secondary affinities.
const AREA_KEYWORDS = {
  administracao:[['estrateg',90],['governanca',80],['gestao',45],['planejamento',55],['indicador',45],['business',45],['risco',35],['processo',30],['transformacao',55],['okr',85],['balanced scorecard',90]],
  financas:[['financeir',95],['contab',95],['cust',55],['orcament',85],['caixa',80],['invest',75],['valuation',100],['preco',35],['rentabil',70],['tribut',95],['credito',70],['ebitda',90]],
  pessoas:[['pessoas',80],['rh',90],['talent',90],['recrut',100],['trein',75],['aprendiz',50],['lideranca',55],['clima',80],['carreira',85],['desempenho',45],['employee',90]],
  vendas:[['vendas',100],['comercial',90],['cliente',35],['crm',80],['pipeline',90],['prospecc',100],['negociacao',75],['sales',100],['lead',75],['account',55],['revenue',65]],
  marketing:[['marketing',100],['marca',90],['brand',90],['seo',100],['midia',80],['conteudo',55],['campanha',85],['growth',85],['ads',85],['comunicacao',55],['publicidade',100]],
  atendimento:[['atendimento',100],['customer success',100],['customer experience',100],['suporte',90],['cliente',45],['nps',90],['csat',90],['churn',80],['jornada',80],['sac',100],['service desk',80]],
  tecnologia:[['software',100],['program',95],['java',100],['python',85],['javascript',100],['typescript',100],['api',95],['devops',100],['cloud',85],['banco de dados',75],['git',100],['linux',75],['docker',100],['kubernetes',100],['web',70],['ciber',95],['rede',55],['teste',45]],
  dados:[['dados',100],['data ',95],['analytics',100],['sql',100],['estatistic',100],['machine learning',100],['inteligencia artificial',100],['power bi',100],['tableau',100],['etl',100],['forecast',65],['otimizacao',60],['pesquisa operacional',100],['excel',60],['ml',70]],
  engenharia:[['engenharia',100],['producao',90],['industrial',90],['manufatura',95],['pcp',100],['processo',50],['manutencao',95],['automacao',80],['simulacao',65],['lean',70],['oee',100],['clp',100],['cad',80]],
  qualidade:[['qualidade',100],['quality',100],['iso 9001',100],['six sigma',100],['dmaic',100],['auditoria',55],['nao conform',100],['capa',100],['controle estatistico',90],['fmea',95],['causa raiz',90],['melhoria continua',100]],
  projetos:[['projeto',100],['project',100],['pmbok',100],['scrum',90],['kanban',80],['agil',85],['produto',65],['product',65],['inovacao',75],['portfolio',65],['roadmap',80],['mvp',85],['stakeholder',70]],
  operacoes:[['operac',100],['processo',80],['capacidade',65],['produtividade',90],['sla',80],['servico',50],['bpm',100],['bpmn',100],['rpa',90],['continuidade',65],['gargalo',80],['fluxo',45],['rotina',75]],
  logistica:[['logistic',100],['supply chain',100],['estoque',95],['armazen',100],['transporte',100],['compras',80],['fornecedor',85],['demanda',55],['wms',100],['tms',100],['importa',90],['exporta',90],['procurement',100]],
  juridico:[['jurid',100],['direito',100],['compliance',95],['contrato',55],['lgpd',100],['privacidade',90],['governanca',35],['fraude',80],['integridade',85],['patente',80],['propriedade intelectual',100],['regulator',75]],
  seguranca:[['seguranca',85],['sustent',85],['ambient',85],['risco ocup',100],['acidente',100],['ergonomia',70],['residuo',90],['energia',45],['carbono',90],['esg',100],['hazop',100],['emergencia',85],['iso 45001',100],['iso 14001',90]],
  educacao:[['aprendiz',100],['educacao',100],['trein',85],['mentoria',90],['coaching',75],['facilit',90],['documentacao',65],['conhecimento',55],['curso',90],['didatic',95],['lms',100],['teaching',80]],
  design:[['design',100],['ux',100],['ui ',100],['interface',90],['prototip',90],['figma',100],['visual',75],['video',55],['fotografia',70],['ilustr',85],['usabilidade',90],['wcag',75],['content design',100]],
  ciencias:[['pesquisa',95],['cientific',100],['metodologia',85],['experimento',85],['laboratorio',90],['bibliograf',90],['estatistic',45],['sustent',45],['tecnolog',35],['p&d',100],['trl',100],['revisao sistematica',100]],
  imobiliario:[['predial',100],['imove',100],['facilit',95],['infraestrutura',70],['obra',95],['bim',90],['building',85],['workplace',95],['locacao',90],['real estate',100]],
  'setor-publico':[['public',100],['governo',100],['governamental',100],['politica publica',100],['licitac',100],['orcamento publico',100],['regulacao',60],['transparencia',75],['cidada',80],['convenio',90],['lei 14.133',100]],
};

const SPECIAL_AREA_RULES = [
  ['pesquisa operacional',{dados:100,engenharia:100,operacoes:85,administracao:45,projetos:35}],
  ['sql',{dados:100,tecnologia:80,financas:35,operacoes:30,marketing:25}],
  ['python',{tecnologia:100,dados:90,ciencias:65,engenharia:45,financas:25}],
  ['power bi',{dados:100,financas:70,operacoes:65,administracao:55,vendas:45,marketing:45,logistica:40}],
  ['excel',{dados:70,financas:70,administracao:50,operacoes:50,logistica:45,vendas:35,pessoas:30}],
  ['gestao de projetos',{projetos:100,administracao:70,operacoes:55,engenharia:50,ciencias:45,'setor-publico':55}],
  ['gestao de riscos',{administracao:100,financas:70,juridico:55,seguranca:60,projetos:60,operacoes:45}],
  ['gestao de contratos',{administracao:75,juridico:100,logistica:60,financas:35,'setor-publico':65}],
  ['automacao de processos',{operacoes:100,tecnologia:70,administracao:40,dados:35}],
  ['business intelligence',{dados:100,administracao:55,financas:55,operacoes:55,vendas:45,marketing:45}],
  ['inteligencia artificial',{dados:100,tecnologia:90,ciencias:55,administracao:35}],
  ['ergonomia',{engenharia:75,seguranca:100,pessoas:40,imobiliario:35}],
  ['lean',{qualidade:90,engenharia:90,operacoes:80,logistica:45}],
  ['s&op',{logistica:100,engenharia:80,operacoes:75,vendas:45,financas:35}],
  ['customer analytics',{dados:100,atendimento:75,marketing:60,vendas:55}],
  ['product analytics',{dados:90,projetos:100,marketing:45,tecnologia:35}],
  ['go to market',{projetos:75,marketing:100,vendas:90,administracao:55}],
];

function keywordWeight(name, rules = []) {
  const text = norm(name);
  let best = 0;
  for (const rule of rules) {
    const [term, weight = 80] = Array.isArray(rule) ? rule : [rule, 80];
    if (text.includes(norm(term))) best = Math.max(best, weight);
  }
  return clamp(best);
}

function deriveAreaAffinities(name, primaryAreaSlugs = []) {
  const out = new Map(primaryAreaSlugs.map(id => [id, 100]));
  const text = norm(name);
  for (const [area, rules] of Object.entries(AREA_KEYWORDS)) {
    const weight = keywordWeight(text, rules);
    if (weight >= 25) out.set(area, Math.max(out.get(area) || 0, weight));
  }
  for (const [term, weights] of SPECIAL_AREA_RULES) if (text.includes(norm(term))) {
    for (const [area, weight] of Object.entries(weights)) out.set(area, Math.max(out.get(area) || 0, weight));
  }
  return out;
}

function deriveProfileAffinities(name, areaAffinities) {
  const out = [];
  for (const profile of PROFESSIONAL_PROFILES) {
    const lexical = keywordWeight(name, profile.keywords.map(k => Array.isArray(k) ? k : [k, 88]));
    const domain = areaAffinities.get(profile.area) || 0;
    let weight = 0;
    if (lexical) weight = Math.max(lexical, Math.round(lexical * .78 + domain * .22));
    else if (domain === 100 && ['strategy','management','operations','industrial-engineering','project-manager'].some(key=>profile.id.endsWith(key))) weight = 20;
    if (weight >= 20) out.push([profile.id, clamp(weight)]);
  }
  return out;
}

function deriveCapabilityAffinities(areaAffinities, name) {
  const scores = new Map();
  for (const [area, domainWeight] of areaAffinities) {
    const base = AREA_CAPABILITIES[area] || {};
    for (const [cap, value] of Object.entries(base)) scores.set(cap, Math.max(scores.get(cap) || 0, value * domainWeight / 100));
  }
  const text = norm(name);
  const boosts = [
    ['estrateg', 'strategic', 100],['planejamento', 'strategic', 75],['lideranca','managerial',90],['gestao','managerial',60],
    ['analise','analytical',90],['estatistic','analytical',100],['dados','analytical',90],['otimiz','analytical',95],
    ['processo','operational',85],['operac','operational',95],['producao','operational',90],['manutencao','operational',90],
    ['vendas','commercial',100],['marketing','commercial',75],['negociacao','commercial',90],['cliente','commercial',55],
    ['design','creative',100],['conteudo','creative',80],['visual','creative',85],['inovacao','creative',70],
    ['comunicacao','interpersonal',80],['facilit','interpersonal',90],['mentoria','interpersonal',90],['atendimento','interpersonal',90],
    ['compliance','regulatory',100],['jurid','regulatory',100],['iso ','regulatory',90],['lgpd','regulatory',100],['norma','regulatory',80],
    ['pesquisa','scientific',90],['cientific','scientific',100],['experimento','scientific',95],['laboratorio','scientific',90],
    ['aprendiz','pedagogical',100],['trein','pedagogical',95],['didatic','pedagogical',100],['curso','pedagogical',85],
    ['software','digital',100],['program','digital',100],['cloud','digital',100],['api','digital',95],['ia','digital',80],['digital','digital',100],
    ['engenharia','technical',95],['tecnic','technical',90],['software','technical',100],['automacao','technical',95],
  ];
  for (const [term,cap,weight] of boosts) if (text.includes(norm(term))) scores.set(cap, Math.max(scores.get(cap)||0, weight));
  return [...scores].filter(([,weight])=>weight>=25).map(([cap,weight])=>[`mind-cap-${cap}`,clamp(weight)]);
}

async function batchInsert(tx, table, columns, rows, conflict = '') {
  const size = 180;
  for (let start = 0; start < rows.length; start += size) {
    const batch = rows.slice(start, start + size);
    if (!batch.length) continue;
    const placeholders = batch.map(()=>`(${columns.map(()=>'?').join(',')})`).join(',');
    await tx.all(`INSERT INTO ${table}(${columns.join(',')}) VALUES ${placeholders}${conflict ? ' ' + conflict : ''}`, batch.flat());
  }
}

export async function syncKnowledgeIntelligence(tx, {force = false} = {}) {
  const items = await tx.all('SELECT id,area_id,name,source,created_at FROM knowledge_items ORDER BY name,id');
  const meta = (await tx.all("SELECT * FROM knowledge_intelligence_meta WHERE id='main'"))[0];
  const mapped = (await tx.all('SELECT COUNT(*) AS n FROM knowledge_item_concept'))[0]?.n || 0;
  if (!force && meta?.version === INTELLIGENCE_VERSION && Number(mapped) === items.length) return {synced:false,items:items.length};

  const areas = await tx.all('SELECT id,name FROM knowledge_areas');
  const areaSlugById = new Map(areas.map(a => [a.id, String(a.id).replace(/^mind-area-/, '')]));
  const areaIds = new Set(areas.map(a=>a.id));
  const grouped = new Map();
  for (const item of items) {
    const key = norm(item.name);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(item);
  }

  const conceptRows = [], mappingRows = [], areaRows = [], profileRows = [], capRows = [];
  const stamp = new Date().toISOString();
  for (const group of grouped.values()) {
    const canonical = group.find(x=>x.source==='catalog') || group[0];
    const cid = conceptId(canonical.name);
    conceptRows.push([cid,canonical.name,group.some(x=>x.source==='catalog')?'catalog':'community',canonical.created_at||stamp]);
    for (const item of group) mappingRows.push([item.id,cid]);
    const primary = unique(group.map(item=>areaSlugById.get(item.area_id)).filter(Boolean));
    const affinities = deriveAreaAffinities(canonical.name, primary);
    for (const [areaSlug,weight] of affinities) {
      const aid = areaDbId(areaSlug); if (areaIds.has(aid) && weight >= 20) areaRows.push([cid,aid,clamp(weight),primary.includes(areaSlug)?'primary':'semantic']);
    }
    for (const [pid,weight] of deriveProfileAffinities(canonical.name, affinities)) profileRows.push([cid,pid,weight]);
    for (const [capId,weight] of deriveCapabilityAffinities(affinities, canonical.name)) capRows.push([cid,capId,weight]);
  }

  await batchInsert(tx,'professional_profiles',['id','area_id','name','description'],PROFESSIONAL_PROFILES.map(p=>[p.id,areaIds.has(areaDbId(p.area))?areaDbId(p.area):null,p.name,p.description]),'ON CONFLICT(id) DO UPDATE SET area_id=excluded.area_id,name=excluded.name,description=excluded.description');
  await batchInsert(tx,'capability_dimensions',['id','name','description'],CAPABILITY_DIMENSIONS.map(c=>[c.id,c.name,c.description]),'ON CONFLICT(id) DO UPDATE SET name=excluded.name,description=excluded.description');
  // As tabelas abaixo são um índice derivado do catálogo. Reconstruí-las torna
  // mudanças de normalização/IDs seguras entre versões sem tocar no conhecimento dos usuários.
  await tx.all('DELETE FROM knowledge_item_concept');
  await tx.all('DELETE FROM knowledge_area_affinity');
  await tx.all('DELETE FROM knowledge_profile_affinity');
  await tx.all('DELETE FROM knowledge_capability_affinity');
  await tx.all('DELETE FROM knowledge_concepts');
  await batchInsert(tx,'knowledge_concepts',['id','name','source','created_at'],conceptRows,'ON CONFLICT(id) DO UPDATE SET name=excluded.name,source=excluded.source');
  await batchInsert(tx,'knowledge_item_concept',['item_id','concept_id'],mappingRows);
  await batchInsert(tx,'knowledge_area_affinity',['concept_id','area_id','weight','basis'],areaRows);
  await batchInsert(tx,'knowledge_profile_affinity',['concept_id','profile_id','weight'],profileRows);
  await batchInsert(tx,'knowledge_capability_affinity',['concept_id','capability_id','weight'],capRows);
  await tx.all("INSERT INTO knowledge_risk_config(id,critical_coverage,attention_coverage,relevance_floor) VALUES('main',35,65,25) ON CONFLICT(id) DO NOTHING");
  await tx.all("INSERT INTO knowledge_intelligence_meta(id,version,updated_at) VALUES('main',?,?) ON CONFLICT(id) DO UPDATE SET version=excluded.version,updated_at=excluded.updated_at",[INTELLIGENCE_VERSION,stamp]);
  return {synced:true,items:items.length,concepts:conceptRows.length,areaAffinities:areaRows.length,profileAffinities:profileRows.length,capabilityAffinities:capRows.length};
}

export async function knowledgeIntelligenceData(tx) {
  return {
    people: await tx.all("SELECT u.id,u.name,u.status,u.is_admin,u.position_id,p.area_id,p.name AS position_name,a.name AS official_area_name FROM users u LEFT JOIN positions p ON p.id=u.position_id LEFT JOIN areas a ON a.id=p.area_id"),
    orgAreas: await tx.all('SELECT id,name FROM areas ORDER BY name'),
    knowledgeAreas: await tx.all('SELECT id,name FROM knowledge_areas ORDER BY name'),
    knowledgeItems: await tx.all('SELECT id,area_id,name,source,created_at FROM knowledge_items'),
    concepts: await tx.all('SELECT * FROM knowledge_concepts'),
    itemConcept: await tx.all('SELECT * FROM knowledge_item_concept'),
    areaAffinities: await tx.all('SELECT * FROM knowledge_area_affinity'),
    professionalProfiles: await tx.all('SELECT * FROM professional_profiles'),
    profileAffinities: await tx.all('SELECT * FROM knowledge_profile_affinity'),
    capabilities: await tx.all('SELECT * FROM capability_dimensions'),
    capabilityAffinities: await tx.all('SELECT * FROM knowledge_capability_affinity'),
    userKnowledge: await tx.all('SELECT * FROM user_knowledge'),
    posts: await tx.all("SELECT p.* FROM posts p JOIN users u ON u.id=p.user_id WHERE u.status IN ('active','blocked')"),
    postKnowledge: await tx.all('SELECT * FROM post_knowledge'),
    riskConfig: (await tx.all("SELECT * FROM knowledge_risk_config WHERE id='main'"))[0] || {critical_coverage:35,attention_coverage:65,relevance_floor:25}
  };
}

function normalizedShares(scores) {
  const entries = [...scores].filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]);
  const total = entries.reduce((s,[,v])=>s+v,0);
  return total ? entries.map(([id,value])=>({id,score:Math.round(value),share:Math.round(value/total*1000)/10})) : [];
}

function addScore(map,key,value){if(value>0)map.set(key,(map.get(key)||0)+value);}
function ageRisk(value, clock) {
  if (!value || !Number.isFinite(Date.parse(value))) return 100;
  const days = Math.max(0,(clock.getTime()-Date.parse(value))/DAY);
  if (days > 365) return 100; if (days > 180) return 80; if (days > 90) return 55; if (days > 30) return 25; return 8;
}

function semanticVectorFromLabel(label, knowledgeAreas) {
  const scores = new Map();
  for (const area of knowledgeAreas) {
    const areaSlug = String(area.id).replace(/^mind-area-/,'');
    const rules = AREA_KEYWORDS[areaSlug] || [];
    let score = keywordWeight(label,rules);
    if (norm(label).includes(norm(area.name))) score = 100;
    if (score) scores.set(area.id,score);
  }
  return normalizedShares(scores);
}

export function buildKnowledgeIntelligence(data, {excludeUserId = '', clock = new Date(), conceptLimit = 0} = {}) {
  const activePeople = data.people.filter(p=>p.status==='active' && !p.is_admin && p.id!==excludeUserId);
  const peopleById = new Map(activePeople.map(p=>[p.id,p]));
  const historicalPeople = new Map(data.people.filter(p=>['active','blocked'].includes(p.status)).map(p=>[p.id,p]));
  const itemById = new Map(data.knowledgeItems.map(k=>[k.id,k]));
  const itemConcept = new Map(data.itemConcept.map(x=>[x.item_id,x.concept_id]));
  const knowledgeAreaById = new Map(data.knowledgeAreas.map(a=>[a.id,a]));
  const profileById = new Map(data.professionalProfiles.map(p=>[p.id,p]));
  const capabilityById = new Map(data.capabilities.map(c=>[c.id,c]));
  const areaAffinity = new Map(), profileAffinity = new Map(), capabilityAffinity = new Map();
  for (const row of data.areaAffinities) {if(!areaAffinity.has(row.concept_id))areaAffinity.set(row.concept_id,[]);areaAffinity.get(row.concept_id).push(row);}
  for (const row of data.profileAffinities) {if(!profileAffinity.has(row.concept_id))profileAffinity.set(row.concept_id,[]);profileAffinity.get(row.concept_id).push(row);}
  for (const row of data.capabilityAffinities) {if(!capabilityAffinity.has(row.concept_id))capabilityAffinity.set(row.concept_id,[]);capabilityAffinity.get(row.concept_id).push(row);}

  const declared = new Map(), postsByPersonConcept = new Map(), postsByConcept = new Map();
  const observedConcepts = new Set(), historicalHolders = new Map();
  for (const row of data.userKnowledge) {
    const cid=itemConcept.get(row.knowledge_id); if(!cid)continue;
    const person=historicalPeople.get(row.user_id); if(!person || person.is_admin)continue;
    observedConcepts.add(cid);
    if(!historicalHolders.has(cid))historicalHolders.set(cid,new Set());
    historicalHolders.get(cid).add(row.user_id);
    if (!peopleById.has(row.user_id)) continue;
    const key=`${row.user_id}|${cid}`;
    const previous=declared.get(key);
    declared.set(key,{proficiency:Math.max(Number(row.proficiency||3),previous?.proficiency||0),updated_at:latestEvidenceDate([row.updated_at,previous?.updated_at],clock),knowledge_id:previous?.knowledge_id||row.knowledge_id});
  }
  // A saída de uma pessoa não apaga o que ela já documentou.
  const postById = new Map(data.posts.filter(p=>historicalPeople.has(p.user_id)).map(p=>[p.id,p]));
  const linkedPairs=new Set();
  for (const link of data.postKnowledge) {
    const post=postById.get(link.post_id); if(!post)continue;
    const cid=itemConcept.get(link.knowledge_id); if(!cid)continue;
    const pair=`${post.id}|${cid}`;if(linkedPairs.has(pair))continue;linkedPairs.add(pair);
    observedConcepts.add(cid);
    if(!postsByConcept.has(cid))postsByConcept.set(cid,[]);postsByConcept.get(cid).push(post);
    if(!peopleById.has(post.user_id))continue;
    const key=`${post.user_id}|${cid}`;
    if(!postsByPersonConcept.has(key))postsByPersonConcept.set(key,[]);postsByPersonConcept.get(key).push(post);
  }

  const personRows=[];
  for (const person of activePeople) {
    const conceptIds = new Set();
    for (const key of declared.keys()) if(key.startsWith(person.id+'|')) conceptIds.add(key.slice(person.id.length+1));
    for (const key of postsByPersonConcept.keys()) if(key.startsWith(person.id+'|')) conceptIds.add(key.slice(person.id.length+1));
    const domainScores=new Map(), profileScores=new Map(), capabilityScores=new Map();
    const conceptEvidence=[];
    let postEvidenceCount=0;
    for (const cid of conceptIds) {
      const key=`${person.id}|${cid}`, decl=declared.get(key), linked=postsByPersonConcept.get(key)||[];
      postEvidenceCount += linked.length;
      const latest = latestEvidenceDate([...linked.map(p=>p.updated_at||p.created_at),decl?.updated_at],clock);
      const declaredScore=decl?55+clamp(decl.proficiency,1,5)*7:0;
      const publicationScore=Math.min(30,linked.length*12);
      const recency=latest?Math.max(0,12-ageRisk(latest,clock)*.08):0;
      const confidence=clamp(declaredScore+publicationScore+recency);
      conceptEvidence.push({concept_id:cid,knowledge_id:decl?.knowledge_id||data.itemConcept.find(x=>x.concept_id===cid)?.item_id||'',confidence,declared:Boolean(decl),proficiency:decl?.proficiency||null,publications:linked.length,lastEvidence:latest});
      for(const a of areaAffinity.get(cid)||[]) addScore(domainScores,a.area_id,a.weight*confidence/100);
      for(const a of profileAffinity.get(cid)||[]) addScore(profileScores,a.profile_id,a.weight*confidence/100);
      for(const a of capabilityAffinity.get(cid)||[]) addScore(capabilityScores,a.capability_id,a.weight*confidence/100);
    }
    if (!conceptIds.size) {
      for (const x of semanticVectorFromLabel(`${person.official_area_name||''} ${person.position_name||''}`,data.knowledgeAreas)) addScore(domainScores,x.id,x.share*.45);
    }
    const domains=normalizedShares(domainScores).map(x=>({...x,name:knowledgeAreaById.get(x.id)?.name||x.id}));
    const profiles=normalizedShares(profileScores).map(x=>({...x,name:profileById.get(x.id)?.name||x.id}));
    const capabilities=normalizedShares(capabilityScores).map(x=>({...x,name:capabilityById.get(x.id)?.name||x.id}));
    const confidence=clamp(conceptIds.size*9+postEvidenceCount*4+conceptEvidence.filter(x=>x.declared).length*3,0,100);
    const broadDomains=domains.filter(x=>x.share>=12).length;
    const multiArea=conceptEvidence.filter(ev=>(areaAffinity.get(ev.concept_id)||[]).filter(a=>a.weight>=60).length>=2).length;
    personRows.push({...person,confidence,domains,profiles,capabilities,concepts:conceptEvidence.sort((a,b)=>b.confidence-a.confidence),bridgeScore:clamp((broadDomains-1)*18+multiArea*5)});
  }

  const orgAreaProfiles=new Map();
  for(const orgArea of data.orgAreas){
    const members=personRows.filter(p=>p.area_id===orgArea.id),domainScores=new Map(),profileScores=new Map();
    for(const p of members){for(const d of p.domains)addScore(domainScores,d.id,d.share);for(const pr of p.profiles)addScore(profileScores,pr.id,pr.share);}
    if(!members.length||!domainScores.size){for(const d of semanticVectorFromLabel(orgArea.name,data.knowledgeAreas))addScore(domainScores,d.id,d.share);}
    orgAreaProfiles.set(orgArea.id,{id:orgArea.id,name:orgArea.name,members:members.length,domains:normalizedShares(domainScores).map(x=>({...x,name:knowledgeAreaById.get(x.id)?.name||x.id})),profiles:normalizedShares(profileScores).map(x=>({...x,name:profileById.get(x.id)?.name||x.id}))});
  }

  const connectionMap=new Map();
  for(const p of personRows)for(const ev of p.concepts){if(!connectionMap.has(ev.concept_id))connectionMap.set(ev.concept_id,[]);connectionMap.get(ev.concept_id).push({person:p,evidence:ev});}
  // As afinidades continuam úteis para descoberta, nunca para prescrever
  // conhecimentos necessários, calcular cobertura ou atribuir importância.
  const config={model:RISK_MODEL,staleAfterDays:STALE_AFTER_DAYS,scope:'recorded_company_evidence',coverageTarget:null};
  const conceptRows=[];
  for(const concept of data.concepts){
    if(!observedConcepts.has(concept.id))continue;
    const affinities=areaAffinity.get(concept.id)||[],pAff=profileAffinity.get(concept.id)||[],connections=connectionMap.get(concept.id)||[];
    const holders=connections.filter(h=>h.evidence.declared);
    const formerHolderCount=[...(historicalHolders.get(concept.id)||[])].filter(id=>!peopleById.has(id)).length;
    const posts=postsByConcept.get(concept.id)||[];
    const assessment=assessKnowledgeRisk({holders,formerHolderCount,posts,clock});
    const itemMappings=data.itemConcept.filter(x=>x.concept_id===concept.id).map(x=>itemById.get(x.item_id)).filter(Boolean);
    const primaryAreas=affinities.filter(a=>a.weight===100).map(a=>({id:a.area_id,name:knowledgeAreaById.get(a.area_id)?.name||a.area_id}));
    conceptRows.push({id:concept.id,name:concept.name,source:concept.source,knowledge_id:itemMappings[0]?.id||'',knowledge_ids:itemMappings.map(k=>k.id),primaryAreas,
      areaAffinities:affinities.sort((a,b)=>b.weight-a.weight).slice(0,8).map(a=>({id:a.area_id,name:knowledgeAreaById.get(a.area_id)?.name||a.area_id,weight:a.weight})),
      professionalAffinities:pAff.sort((a,b)=>b.weight-a.weight).slice(0,8).map(a=>({id:a.profile_id,name:profileById.get(a.profile_id)?.name||a.profile_id,weight:a.weight})),
      holders:holders.map(h=>({id:h.person.id,name:h.person.name,declared:true,proficiency:h.evidence.proficiency,publications:h.evidence.publications})),
      connections:connections.map(h=>({id:h.person.id,name:h.person.name,declared:h.evidence.declared,publications:h.evidence.publications})),
      formerHolderCount,observed:true,...assessment});
  }

  conceptRows.sort((a,b)=>RISK_ORDER[b.riskStatus]-RISK_ORDER[a.riskStatus]||a.holders.length-b.holders.length||a.name.localeCompare(b.name,'pt-BR'));
  const visibleConcepts = conceptLimit ? conceptRows.slice(0,conceptLimit) : conceptRows;
  const domainHealth=data.knowledgeAreas.map(area=>{
    const related=conceptRows.filter(c=>c.primaryAreas.some(a=>a.id===area.id));
    return {id:area.id,name:area.name,concepts:related.length,critical:related.filter(c=>c.riskStatus==='critical').length,attention:related.filter(c=>c.riskStatus==='attention').length,healthy:related.filter(c=>c.riskStatus==='healthy').length,unknown:related.filter(c=>c.riskStatus==='unknown').length};
  }).sort((a,b)=>b.concepts-a.concepts||a.name.localeCompare(b.name,'pt-BR'));
  const bridges=personRows.filter(p=>p.bridgeScore>0).sort((a,b)=>b.bridgeScore-a.bridgeScore).map(p=>({id:p.id,name:p.name,score:p.bridgeScore,domains:p.domains.slice(0,4)}));
  const transversal=[];
  for(const p of personRows){const org=orgAreaProfiles.get(p.area_id);const top=p.domains[0],orgTop=org?.domains?.[0];if(top&&orgTop&&top.id!==orgTop.id&&top.share>=30)transversal.push({id:p.id,name:p.name,officialArea:p.official_area_name||'Sem área',domain:top.name,share:top.share});else if(p.domains[1]?.share>=25)transversal.push({id:p.id,name:p.name,officialArea:p.official_area_name||'Sem área',domain:p.domains[1].name,share:p.domains[1].share});}
  transversal.sort((a,b)=>b.share-a.share);
  return {
    generatedAt:clock.toISOString(),config,
    summary:{catalogItems:data.knowledgeItems.length,catalogConcepts:data.concepts.length,concepts:conceptRows.length,excludedCatalogConcepts:data.concepts.length-conceptRows.length,professionalProfiles:data.professionalProfiles.length,capabilities:data.capabilities.length,people:personRows.length,critical:conceptRows.filter(c=>c.riskStatus==='critical').length,attention:conceptRows.filter(c=>c.riskStatus==='attention').length,healthy:conceptRows.filter(c=>c.riskStatus==='healthy').length,unknown:conceptRows.filter(c=>!c.known).length},
    people:personRows,organizationAreas:[...orgAreaProfiles.values()],concepts:visibleConcepts,domainHealth,bridges,transversal
  };
}

export function simulateKnowledgeExit(data, userId, clock = new Date()) {
  const baseline=buildKnowledgeIntelligence(data,{clock}),after=buildKnowledgeIntelligence(data,{clock,excludeUserId:userId});
  const person=baseline.people.find(p=>p.id===userId); if(!person)return null;
  const afterMap=new Map(after.concepts.map(c=>[c.id,c]));
  const held=new Set(person.concepts.map(c=>c.concept_id));
  const impacts=baseline.concepts.filter(c=>held.has(c.id)).map(before=>{
    const next=afterMap.get(before.id);
    // Candidatos possuem registros no próprio tema; não são prescritos por cargo.
    const candidates=next.connections.filter(p=>!p.declared).slice(0,3).map(p=>({id:p.id,name:p.name,basis:'Possui publicação vinculada; confirmar domínio e disponibilidade.'}));
    return {id:before.id,name:before.name,knowledge_id:before.knowledge_id,beforeStatus:before.riskStatus,afterStatus:next.riskStatus,beforeHolders:before.holders.length,remainingHolders:next.holders.length,lostDeclaredHolder:before.holders.some(h=>h.id===userId),publicationsPreserved:next.publications,mainReason:next.mainReason,recommendedRecipients:candidates};
  }).sort((a,b)=>RISK_ORDER[b.afterStatus]-RISK_ORDER[a.afterStatus]||a.remainingHolders-b.remainingHolders||a.name.localeCompare(b.name,'pt-BR'));
  return {person:{id:person.id,name:person.name,officialArea:person.official_area_name||'',domains:person.domains.slice(0,5),profiles:person.profiles.slice(0,5)},summary:{knowledge:held.size,criticalAfter:impacts.filter(i=>i.afterStatus==='critical').length,newCritical:impacts.filter(i=>i.beforeStatus!=='critical'&&i.afterStatus==='critical').length,orphaned:impacts.filter(i=>i.lostDeclaredHolder&&i.remainingHolders===0).length,reducedHolders:impacts.filter(i=>i.lostDeclaredHolder).length},impacts};
}

export {conceptId, norm};
