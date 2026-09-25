// Catálogo inicial da Mind: categorias e termos comuns de conhecimento profissional.
// Ele é semeado em cada instalação e não pertence a uma empresa específica.
export const KNOWLEDGE_CATALOG = [
  {id:'administracao', name:'Administração e estratégia', items:[
    'Administração geral','Planejamento estratégico','Modelos de negócio','Governança corporativa','Gestão da mudança','Gestão de riscos','Tomada de decisão','Gestão do conhecimento','Desenho organizacional','Indicadores de desempenho','Gestão de custos','Políticas e procedimentos','Análise de mercado','Gestão de contratos','Empreendedorismo','Ética empresarial'
  ]},
  {id:'financas', name:'Finanças e contabilidade', items:[
    'Contabilidade financeira','Contabilidade gerencial','Orçamento empresarial','Fluxo de caixa','Análise de demonstrações financeiras','Planejamento financeiro','Controladoria','Custos e formação de preços','Tributação','Auditoria financeira','Tesouraria','Crédito e cobrança','Investimentos','Valuation','Gestão de riscos financeiros','Conciliação contábil'
  ]},
  {id:'pessoas', name:'Pessoas e recursos humanos', items:[
    'Recrutamento e seleção','Entrevista por competências','Integração de colaboradores','Treinamento e desenvolvimento','Gestão de desempenho','Planos de carreira','Remuneração e benefícios','Cultura organizacional','Engajamento de equipes','Relações trabalhistas','Folha de pagamento','People analytics','Diversidade e inclusão','Mediação de conflitos','Liderança de equipes','Planejamento de força de trabalho'
  ]},
  {id:'vendas', name:'Vendas e desenvolvimento comercial', items:[
    'Prospecção de clientes','Qualificação de oportunidades','Vendas consultivas','Negociação comercial','Gestão de contas','Gestão de carteira de clientes','Previsão de vendas','Funil de vendas','CRM','Propostas comerciais','Precificação comercial','Canais de vendas','Vendas B2B','Vendas B2C','Parcerias comerciais','Inteligência comercial'
  ]},
  {id:'marketing', name:'Marketing e comunicação', items:[
    'Pesquisa de mercado','Segmentação de público','Posicionamento de marca','Estratégia de marca','Marketing de conteúdo','Marketing digital','Mídias sociais','SEO','Publicidade online','E-mail marketing','Geração de demanda','Automação de marketing','Relações públicas','Comunicação interna','Redação publicitária','Métricas de marketing','Marketing de produto','Design de campanhas'
  ]},
  {id:'atendimento', name:'Atendimento e experiência do cliente', items:[
    'Atendimento ao cliente','Sucesso do cliente','Experiência do cliente','Suporte técnico','Gestão de reclamações','Pesquisa de satisfação','Jornada do cliente','Retenção de clientes','Onboarding de clientes','Central de relacionamento','Atendimento omnicanal','Padrões de atendimento','Recuperação de serviços','Acessibilidade no atendimento'
  ]},
  {id:'tecnologia', name:'Tecnologia e desenvolvimento de software', items:[
    'Lógica de programação','Desenvolvimento web','Desenvolvimento front-end','Desenvolvimento back-end','Desenvolvimento de APIs','Arquitetura de software','Programação orientada a objetos','JavaScript','Java','Python','Desenvolvimento mobile','Testes de software','Integração contínua','DevOps','Computação em nuvem','Cibersegurança','Redes de computadores','Administração de bancos de dados','Sistemas operacionais','Controle de versão com Git'
  ]},
  {id:'dados', name:'Dados, análise e inteligência artificial', items:[
    'Análise de dados','Estatística aplicada','Visualização de dados','Business intelligence','Modelagem de dados','Engenharia de dados','Qualidade de dados','Governança de dados','Aprendizado de máquina','Inteligência artificial generativa','Processamento de linguagem natural','Análise preditiva','Experimentação e testes A/B','Indicadores e métricas','Planilhas eletrônicas','SQL','Ética e privacidade de dados','Pesquisa operacional'
  ]},
  {id:'engenharia', name:'Engenharia e produção', items:[
    'Engenharia de produção','Planejamento e controle da produção','Projeto de processos','Balanceamento de linhas','Manufatura enxuta','Planejamento de capacidade','Engenharia de métodos','Estudo de tempos','Automação industrial','Manutenção industrial','Gestão de ativos','Desenho técnico','Engenharia de produto','Sistemas de produção','Pesquisa operacional','Simulação de processos','Ergonomia industrial','Gestão de energia'
  ]},
  {id:'qualidade', name:'Qualidade e melhoria contínua', items:[
    'Gestão da qualidade','Controle estatístico de processos','Auditoria da qualidade','Análise de causa raiz','Análise de modos de falha','Melhoria contínua','Lean Six Sigma','Mapeamento de processos','Padronização de processos','Gestão de não conformidades','Ações corretivas e preventivas','Indicadores da qualidade','Experiência e voz do cliente','Sistemas de gestão ISO','Resolução estruturada de problemas'
  ]},
  {id:'projetos', name:'Projetos, produtos e inovação', items:[
    'Gestão de projetos','Planejamento de projetos','Gestão de cronogramas','Gestão de custos de projetos','Gestão de riscos de projetos','Métodos ágeis','Scrum','Kanban','Escritório de projetos (PMO)','Gestão de portfólio','Gestão de produtos','Pesquisa com usuários','Descoberta de produto','Gestão de requisitos','Prototipagem','Inovação aberta','Gestão de mudanças em projetos','Lançamento de produtos'
  ]},
  {id:'operacoes', name:'Operações e processos', items:[
    'Gestão de operações','Desenho de processos','Mapeamento de fluxo de valor','Procedimentos operacionais','Gestão de capacidade','Planejamento operacional','Gestão de serviços','Gestão de instalações','Gestão de fornecedores','Terceirização de processos','Continuidade de negócios','Gestão de incidentes','Automação de processos','Gestão de produtividade','Indicadores operacionais','Análise de gargalos'
  ]},
  {id:'logistica', name:'Logística e cadeia de suprimentos', items:[
    'Gestão da cadeia de suprimentos','Gestão de compras','Negociação com fornecedores','Planejamento de demanda','Gestão de estoques','Armazenagem','Distribuição de produtos','Transporte de cargas','Logística reversa','Planejamento de materiais','Sistemas de gestão de armazém','Sistemas de gestão de transporte','Importação e exportação','Avaliação de fornecedores','Rastreamento de pedidos','Previsão de demanda'
  ]},
  {id:'juridico', name:'Jurídico, governança e conformidade', items:[
    'Direito empresarial','Direito do trabalho','Proteção de dados pessoais','Privacidade e LGPD','Gestão de conformidade','Integridade corporativa','Prevenção à fraude','Gestão de contratos','Propriedade intelectual','Direito do consumidor','Controles internos','Gestão documental','Políticas de compliance','Canal de denúncias','Governança de tecnologia'
  ]},
  {id:'seguranca', name:'Segurança, saúde e meio ambiente', items:[
    'Saúde e segurança do trabalho','Identificação de perigos','Avaliação de riscos ocupacionais','Prevenção de acidentes','Ergonomia','Higiene ocupacional','Gestão ambiental','Licenciamento ambiental','Gestão de resíduos','Eficiência energética','Sustentabilidade empresarial','Emergência e resposta a incidentes','Segurança da informação','Gestão de continuidade','Responsabilidade social empresarial','Inventário de emissões'
  ]},
  {id:'educacao', name:'Educação e desenvolvimento do conhecimento', items:[
    'Desenho de aprendizagem','Educação corporativa','Facilitação de grupos','Apresentação em público','Mentoria profissional','Coaching de equipes','Documentação de processos','Comunidades de prática','Gestão de conhecimento organizacional','Comunicação escrita','Aprendizagem digital','Avaliação de aprendizagem','Produção de materiais didáticos','Colaboração entre equipes','Treinamento técnico'
  ]},
  {id:'design', name:'Design, conteúdo e experiência digital', items:[
    'Design gráfico','Design de interfaces','Experiência do usuário (UX)','Pesquisa de experiência do usuário','Arquitetura da informação','Design de interação','Design system','Acessibilidade digital','Design de serviços','Edição de vídeo','Fotografia','Produção de conteúdo','Ilustração digital','Prototipagem de interfaces','Testes de usabilidade','Narrativa visual'
  ]},
  {id:'ciencias', name:'Ciência, pesquisa e sustentabilidade', items:[
    'Metodologia científica','Pesquisa aplicada','Revisão bibliográfica','Coleta de dados','Análise qualitativa','Análise quantitativa','Redação científica','Gestão de laboratórios','Gestão de projetos de pesquisa','Desenvolvimento sustentável','Economia circular','Avaliação de impacto','Mudanças climáticas','Bioeconomia','Inovação tecnológica','Transferência de tecnologia'
  ]},
  {id:'imobiliario', name:'Imóveis, facilities e infraestrutura', items:[
    'Gestão de facilities','Administração predial','Gestão de manutenção predial','Gestão de espaços de trabalho','Gestão de locações','Avaliação de imóveis','Gestão de obras','Planejamento de infraestrutura','Eficiência de edifícios','Segurança patrimonial','Gestão de serviços terceirizados','Inspeções prediais'
  ]},
  {id:'setor-publico', name:'Setor público e políticas públicas', items:[
    'Gestão pública','Planejamento governamental','Orçamento público','Compras públicas','Gestão de contratos públicos','Políticas públicas','Indicadores sociais','Transparência pública','Participação cidadã','Gestão de projetos públicos','Regulação','Prestação de contas','Gestão de convênios','Avaliação de programas'
  ]}
];

export function knowledgeId(areaId, name) {
  const slug = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `mind-${areaId}-${slug}`;
}
