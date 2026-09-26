// Conteúdo original e inteiramente fictício para a demonstração da MIND.
export const DEMO_PASSWORD = 'OrionDemo2026!';
export const COMMON_SKILLS = ['Colaboração entre equipes','Comunicação escrita','Documentação de processos','Gestão do conhecimento'];
export const AREAS = [
 ['direcao','Direção e Estratégia','administracao',null,760,40],
 ['produto','Produto e Design','projetos','direcao',40,240],
 ['operacoes','Operações e Processos','operacoes','direcao',540,240],
 ['comercial','Comercial e Parcerias','vendas','direcao',1040,240],
 ['pessoas','Pessoas e Conhecimento','pessoas','direcao',1540,240],
 ['financas','Finanças e Controladoria','financas','direcao',1840,240],
 ['governanca','Governança e Privacidade','juridico','direcao',2140,240],
 ['tecnologia','Tecnologia e Plataforma','tecnologia','produto',40,460],
 ['pesquisa','Pesquisa e Sustentabilidade','ciencias','produto',290,460],
 ['qualidade','Qualidade e Melhoria','qualidade','operacoes',540,460],
 ['logistica','Logística e Suprimentos','logistica','operacoes',790,460],
 ['cx','Experiência do Cliente','atendimento','comercial',1040,460],
 ['marketing','Marketing e Comunicação','marketing','comercial',1290,460],
 ['dados','Dados e Inteligência','dados','tecnologia',40,680]
].map(([key,name,taxonomy,parent,x,y])=>({key,name,taxonomy,parent,x,y}));

// Nome, cargo, especialidade e projeto de referência. Cada pessoa tem um perfil próprio.
export const TEAMS = {
 direcao: [
 ['Helena Duarte','Diretora executiva','estratégia de crescimento e integração entre as áreas','Farol'],
 ['André Valença','Diretor de operações','planejamento de capacidade e evolução dos serviços','Atlas'],
 ['Marina Costa','Diretora de produto e tecnologia','priorização de produto e arquitetura de plataformas','Horizonte'],
 ['Caio Lemos','Coordenador de estratégia e PMO','dependências entre projetos e acompanhamento de benefícios','Órbita']
 ],
 produto: [
 ['Lívia Monteiro','Head de Produto e Design','descoberta de oportunidades e priorização do portfólio','Horizonte'],
 ['Rafael Mendes','Product manager','jornada de pedidos e indicadores de adoção','Atlas'],
 ['Beatriz Azevedo','Designer de experiência','acessibilidade, pesquisa e testes com usuários','Horizonte'],
 ['Isadora Freire','Product designer','fluxos de onboarding e consistência de interfaces','Ponte'],
 ['Pedro Alcântara','Analista de produto','instrumentação de eventos e análise de funil','Farol']
 ],
 tecnologia: [
 ['Camila Torres','Head de Engenharia de Software','confiabilidade da plataforma e integração com operações','Atlas'],
 ['Bruno Siqueira','Engenheiro de integrações sênior','conectores do legado e recuperação de mensagens','Nexo'],
 ['Júlia Nascimento','Desenvolvedora back-end','contratos de API e automação de testes','Atlas'],
 ['Tiago Barros','Desenvolvedor front-end','interfaces acessíveis e desempenho do portal','Horizonte'],
 ['Luana Pires','Engenheira de plataforma','observabilidade, entregas e continuidade de serviços','Nexo'],
 ['Felipe Andrade','Engenheiro de qualidade de software','cenários de regressão e testes de integração','Ponte'],
 ['Diego Matos','Desenvolvedor de automações','processos internos e integração de ferramentas','Órbita']
 ],
 dados: [
 ['Sofia Almeida','Head de Dados e Inteligência','governança analítica e produtos de dados','Farol'],
 ['Gabriel Rocha','Cientista de dados','previsão de demanda e avaliação de modelos','Aurora'],
 ['Renata Campos','Engenheira de dados','linhagem e qualidade de pipelines','Farol'],
 ['Vitor Neves','Analista de business intelligence','painéis de operação e definições de indicadores','Farol'],
 ['Amanda Lopes','Analista de experimentação','amostragem e leitura de testes de produto','Horizonte']
 ],
 operacoes: [
 ['Mateus Ribeiro','Head de Operações','gestão de capacidade e integração da execução','Atlas'],
 ['Elisa Martins','Coordenadora de processos','desenho de fluxos e facilitação entre equipes','Atlas'],
 ['Daniel Carvalho','Engenheiro de processos','balanceamento da operação e simulação de filas','Aurora'],
 ['Priscila Gomes','Analista de automação operacional','rotinas repetitivas e tratamento de exceções','Atlas'],
 ['Lucas Farias','Analista de capacidade','planejamento semanal e análise de produtividade','Farol'],
 ['Natália Moraes','Analista de operações','SQL aplicado à operação e tradução de problemas de negócio','Aurora'],
 ['Henrique Nunes','Especialista em continuidade','planos de contingência e critérios de retomada','Nexo']
 ],
 qualidade: [
 ['Patrícia Vieira','Head de Qualidade e Melhoria','melhoria contínua e padronização de processos','Atlas'],
 ['Eduardo Tavares','Especialista em melhoria contínua','análise de causa raiz e desenho de experimentos','Aurora'],
 ['Carolina Reis','Analista de qualidade','critérios de aceite e rastreabilidade de evidências','Ponte'],
 ['Samuel Melo','Analista de indicadores da qualidade','variação de processos e revisão de métricas','Farol']
 ],
 logistica: [
 ['Ricardo Sales','Head de Logística e Suprimentos','integração de demanda, compras e distribuição','Aurora'],
 ['Fernanda Dias','Coordenadora de planejamento logístico','estoque de segurança e gestão de exceções','Aurora'],
 ['Otávio Lima','Analista de suprimentos','avaliação de fornecedores e acordos de fornecimento','Gaia'],
 ['Laura Queiroz','Analista de distribuição','roteirização e previsibilidade de entregas','Atlas'],
 ['Igor Teixeira','Analista de estoques','inventários e rastreabilidade de materiais','Gaia']
 ],
 comercial: [
 ['João Brandão','Head Comercial e Parcerias','vendas consultivas e gestão de carteira','Ponte'],
 ['Alice Moreira','Executiva de contas estratégicas','diagnóstico de clientes e construção de propostas','Ponte'],
 ['Vinícius Correia','Consultor de soluções','tradução de demandas técnicas em escopo comercial','Atlas'],
 ['Clara Batista','Analista de operações comerciais','qualidade do CRM e previsibilidade do funil','Farol'],
 ['Gustavo Peixoto','Analista de parcerias','canais de aquisição e capacitação de parceiros','Horizonte']
 ],
 cx: [
 ['Ana Ribeiro','Head de Experiência do Cliente','retenção e aprendizagem a partir do atendimento','Ponte'],
 ['Paulo Dantas','Coordenador de implantação','primeira entrega e transição entre equipes','Ponte'],
 ['Mariana Luz','Analista de sucesso do cliente','planos de adoção e acompanhamento de resultados','Ponte'],
 ['César Cunha','Analista de suporte','diagnóstico de incidentes e registro de soluções','Nexo'],
 ['Bianca Ramos','Analista de voz do cliente','síntese de feedback e pesquisa de satisfação','Horizonte']
 ],
 marketing: [
 ['Bruna Amaral','Head de Marketing e Comunicação','posicionamento e conexão entre marca e experiência','Horizonte'],
 ['Leandro Paiva','Analista de conteúdo','histórias de aprendizagem e conteúdo educativo','Órbita'],
 ['Cecília Prado','Analista de geração de demanda','segmentação e qualidade de oportunidades','Ponte'],
 ['Hugo Fernandes','Designer de comunicação','visualização de informação e materiais de apoio','Farol']
 ],
 pessoas: [
 ['Laura Nogueira','Head de Pessoas e Conhecimento','desenvolvimento de equipes e continuidade do conhecimento','Órbita'],
 ['Aline Guimarães','Analista de desenvolvimento','trilhas de aprendizagem e mentoria entre áreas','Órbita'],
 ['Rodrigo Assis','Analista de pessoas','integração de colaboradores e acompanhamento de dúvidas','Ponte'],
 ['Débora Castro','Curadora de conhecimento','captura de aprendizados e organização de comunidades','Órbita']
 ],
 financas: [
 ['Marcelo Pacheco','Head de Finanças e Controladoria','planejamento financeiro e gestão de recursos','Farol'],
 ['Letícia Cardoso','Analista de planejamento financeiro','cenários de orçamento e leitura de desvios','Aurora'],
 ['Fábio Cavalcanti','Controller','custos por serviço e consistência das bases','Atlas'],
 ['Tainá Rezende','Analista de tesouraria','previsão de caixa e conciliação de recebimentos','Ponte']
 ],
 governanca: [
 ['Vanessa Falcão','Head de Governança e Privacidade','clareza de responsabilidades e gestão de informações','Nexo'],
 ['Roberto Maia','Analista de contratos','padronização de escopos e controle de versões','Ponte'],
 ['Melissa Pinto','Analista de governança de dados','inventário de dados e revisão de acessos','Farol']
 ],
 pesquisa: [
 ['Estela Moura','Head de Pesquisa e Sustentabilidade','pesquisa aplicada e avaliação de impacto','Gaia'],
 ['Artur Bezerra','Pesquisador de soluções','prototipagem e transferência de resultados','Aurora'],
 ['Yasmin Coelho','Analista de sustentabilidade','circularidade e indicadores de uso de materiais','Gaia'],
 ['Davi Albuquerque','Analista de pesquisa aplicada','desenho de estudos e registro de limitações','Horizonte']
 ]
};

export const CROSS_SKILLS = {
 produto:['Experiência do usuário (UX)','Pesquisa com usuários','Design de interfaces','Acessibilidade digital','Testes de usabilidade'],
 tecnologia:['SQL','Modelagem de dados','Automação de processos','Gestão de incidentes','Documentação técnica'],
 dados:['Python','SQL','Planejamento de demanda','Pesquisa operacional','Gestão de produtos'],
 operacoes:['Engenharia de produção','Pesquisa operacional','Simulação de processos','Análise de dados','Mapeamento de processos'],
 qualidade:['Estatística aplicada','Análise de dados','Desenho de processos','Pesquisa de satisfação'],
 logistica:['Análise de dados','Gestão de operações','Planejamento de capacidade','Economia circular'],
 comercial:['Jornada do cliente','Análise de mercado','Gestão de requisitos','Planejamento de demanda'],
 cx:['Pesquisa com usuários','Gestão de incidentes','Gestão de requisitos','Base de conhecimento'],
 marketing:['Narrativa visual','Visualização de dados','Jornada do cliente','Pesquisa com usuários'],
 pessoas:['Educação corporativa','Mentoria profissional','Comunidades de prática','Captura de conhecimento tácito','Transferência de conhecimento'],
 financas:['Análise de dados','Indicadores de desempenho','Análise de viabilidade','Gestão de projetos'],
 governanca:['Governança de dados','Gestão de riscos','Gestão de requisitos','Documentação técnica'],
 pesquisa:['Visualização de dados','Estatística aplicada','Prototipagem','Gestão de projetos'],
 direcao:['Gestão de portfólio','Gestão de operações','Educação corporativa','Modelos de negócio']
};

// Cada caso contém: projeto, título, problema, experimento/ação, resultado fictício,
// próximo passo e conhecimentos usados. Os três relatos de cada caso formam uma sequência.
export const CASES = {
 direcao: [
 ['Farol','Uma definição de entrega concluída','Cada diretoria encerrava uma entrega em um momento diferente; os relatórios não eram comparáveis.','reunimos Produto, Operações e Finanças para comparar 24 entregas e registrar um critério comum','24 entregas reclassificadas e três situações de exceção documentadas','revisar mensalmente as exceções antes de ampliar o indicador','Indicadores de desempenho|Tomada de decisão|Gestão de stakeholders'],
 ['Atlas','Priorizar pelo gargalo da cadeia','Havia cinco melhorias concorrendo pelas mesmas pessoas de Engenharia.','mapeamos dependências e priorizamos o ponto que bloqueava o aceite operacional','três dependências removidas sem abrir uma frente de trabalho adicional','acompanhar o tempo de espera entre as áreas','Planejamento estratégico|Cadeia de valor|Gestão de prioridades'],
 ['Órbita','Conhecimento crítico entra na pauta executiva','As revisões de portfólio discutiam prazo e custo, mas ignoravam a dependência de especialistas.','incluímos responsáveis alternativos e evidências de transferência na revisão de projetos','oito rotinas críticas passaram a ter um plano de continuidade','validar se os destinatários conseguem executar a rotina com autonomia','Gestão do conhecimento|Gestão de riscos|Governança corporativa'],
 ['Gaia','Benefícios com uma linha de base','As propostas de sustentabilidade misturavam redução de consumo com alteração do volume produzido.','separamos indicadores absolutos e indicadores por unidade de serviço','quatro iniciativas passaram a usar denominadores comparáveis','pedir uma segunda leitura dos resultados à equipe de Dados','Gestão por indicadores|Business case|Análise de viabilidade'],
 ['Horizonte','Decisão registrada antes do desenvolvimento','Discussões antigas sobre escopo reapareciam em cada reunião de produto.','registramos alternativas, critérios de escolha e condições para reabrir decisões','seis decisões passaram a ter contexto e responsável identificados','rever apenas decisões cuja hipótese mudou','Governança de decisões|Gestão de portfólio|Tomada de decisão'],
 ['Ponte','A promessa comercial e a capacidade real','O calendário de implantações aceitava prazos antes de consultar quem entregava.','criamos uma revisão conjunta de capacidade antes do compromisso com o cliente','nove propostas receberam datas compatíveis com a capacidade simulada','acompanhar o intervalo entre venda e primeira entrega','Planejamento operacional integrado|Gestão de stakeholders|Gestão de operações']
 ],
 produto: [
 ['Horizonte','O botão que ninguém encontrava','Em oito sessões de pesquisa, cinco participantes não encontraram o histórico de pedidos.','testamos duas posições para o acesso ao histórico usando o mesmo roteiro de tarefas','sete de oito participantes concluíram a tarefa na segunda rodada, contra três na primeira','repetir o teste com pessoas que usam navegação por teclado','Pesquisa com usuários|Testes de usabilidade|Acessibilidade digital'],
 ['Atlas','Menos campos na abertura de pedidos','O formulário exigia dados que o time só utilizava depois do diagnóstico.','separamos informações essenciais das informações complementares','o tempo mediano de preenchimento caiu de 8,4 para 5,9 minutos em 30 pedidos de teste','verificar se o ganho não aumentou a coleta posterior de informações','Gestão de produtos|Jornada do cliente|Gestão de requisitos'],
 ['Ponte','Primeira entrega com um objetivo visível','O cliente via uma lista de tarefas, mas não entendia o resultado esperado da implantação.','criamos uma página que liga cada tarefa ao primeiro valor entregue','12 contas de demonstração passaram a ter um objetivo de implantação explícito','testar se o responsável pelo cliente consegue explicar o próximo marco','Onboarding de clientes|Prototipagem|Design de serviços'],
 ['Farol','Eventos com nomes que fazem sentido','Três telas disparavam eventos diferentes para a mesma ação de confirmação.','Produto e Dados definiram nome, momento e propriedades de cada evento','18 eventos receberam definições compartilhadas e casos de teste','comparar eventos emitidos com registros de confirmação','Indicadores e métricas|Gestão de requisitos|Qualidade de dados'],
 ['Horizonte','Mensagens de erro que orientam a ação','Os textos de erro diziam apenas que algo deu errado.','reescrevemos mensagens indicando o campo, o motivo e uma ação possível','11 mensagens foram validadas em tarefas com dados incompletos','revisar as mensagens com a equipe de Suporte','UX writing|Experiência do usuário (UX)|Design de interfaces'],
 ['Aurora','A previsão precisa mostrar sua incerteza','O protótipo exibia um único número de demanda e sugeria uma precisão inexistente.','desenhamos faixas de cenário e uma explicação simples sobre limitações','os seis planejadores da rodada distinguiram previsão de compromisso','testar a leitura de cenários em períodos promocionais','Visualização de dados|Prototipagem|Pesquisa com usuários']
 ],
 tecnologia: [
 ['Atlas','Pedidos repetidos na reconexão','A confirmação era reenviada quando a conexão caía após o servidor processar a operação.','adicionamos uma chave de idempotência ao contrato e testamos reenvios controlados','50 repetições do mesmo pedido produziram um único registro','incluir o cenário na suíte de regressão','Desenvolvimento de APIs|Testes de software|Arquitetura de software'],
 ['Horizonte','A tela que carregava tudo de uma vez','O portal buscava detalhes de pedidos que ainda não estavam visíveis.','separamos resumo e detalhe e medimos o carregamento com uma base de teste maior','a carga inicial caiu de 1,8 MB para 620 KB no cenário controlado','medir a navegação completa antes de generalizar o ganho','Desenvolvimento front-end|Desenvolvimento web|JavaScript'],
 ['Nexo','Alertas ligados à experiência do usuário','O monitor mostrava CPU, mas não identificava pedidos parados na fila.','ligamos alertas ao tempo de processamento e ao volume de mensagens pendentes','três falhas simuladas foram detectadas pelo atraso de negócio','revisar limites com Operações e reduzir alertas sem ação','Gestão de incidentes|DevOps|Indicadores operacionais'],
 ['Ponte','Ambiente de ensaio para a implantação','Os testes de integração dependiam de um cliente estar disponível.','construímos exemplos sintéticos de entrada e saída para os fluxos mais usados','15 cenários de implantação puderam ser repetidos sem dados de clientes','manter os exemplos sincronizados com o contrato de API','Testes de software|Desenvolvimento de APIs|Integração contínua'],
 ['Órbita','Automação que sabe quando parar','Uma rotina continuava executando mesmo quando faltavam dados obrigatórios.','introduzimos validação anterior à execução e um registro de exceções','quatro classes de entrada inválida passaram a ser encaminhadas para revisão','publicar o procedimento de tratamento das exceções','Automação de processos|Lógica de programação|Documentação técnica'],
 ['Farol','Contratos entre quem produz e quem consome dados','Uma alteração de campo interrompeu um painel sem aviso ao time de Dados.','criamos testes de contrato e um período de compatibilidade para mudanças','oito contratos críticos ganharam validação automática de estrutura','mapear consumidores antes de retirar campos antigos','Modelagem de dados|Integração contínua|Engenharia de dados']
 ],
 dados: [
 ['Aurora','Previsão de demanda sem olhar o futuro','O primeiro experimento usava informações que só existiam depois do pedido.','reconstruímos as variáveis conforme a data em que ficam disponíveis','o erro de validação ficou mais alto, mas passou a representar o uso real','comparar o modelo com uma média móvel antes de promover a versão','Análise preditiva|Aprendizado de máquina|Qualidade de dados'],
 ['Farol','Receita e entrega não são o mesmo evento','O painel misturava data de faturamento e data de conclusão do serviço.','criamos definições separadas com trilha até a origem dos registros','quatro divergências entre Operações e Finanças foram explicadas','manter exemplos de cada regra no dicionário de métricas','Governança de dados|Modelagem de dados|Business intelligence'],
 ['Atlas','Uma consulta revelou a fila invisível','O relatório contava tarefas concluídas, sem considerar as que esperavam validação.','Natália e Vitor uniram eventos de entrada e saída para medir espera','a etapa de validação respondeu por 38% do tempo observado em 80 pedidos','repetir a leitura após a mudança de capacidade','SQL|Análise de dados|Análise de gargalos'],
 ['Horizonte','Segmentos antes da média geral','A média de conclusão melhorou, mas os usuários de primeira viagem tinham mais dificuldade.','separamos novos usuários, recorrentes e diferentes dispositivos','o ganho agregado deixou de esconder a piora no primeiro acesso','avaliar a nova orientação apenas no segmento afetado','Estatística aplicada|Experimentação e testes A/B|Visualização de dados'],
 ['Gaia','Unidades consistentes no indicador de materiais','Fornecedores informavam consumo em unidades incompatíveis.','registramos unidade, fator de conversão e origem de cada medição','32 registros passaram a usar a mesma base de comparação','validar os fatores quando houver troca de material','Qualidade de dados|Coleta de dados|Indicadores e métricas'],
 ['Farol','O pipeline precisa explicar o atraso','O painel mantinha o último valor sem indicar quando a atualização falhava.','adicionamos horário da última carga e um indicador de completude','seis painéis passaram a informar quando os dados estavam incompletos','definir com cada área o atraso aceitável','Engenharia de dados|Governança de dados|Business intelligence']
 ],
 operacoes: [
 ['Atlas','O retrabalho começava antes da execução','Pedidos chegavam com critérios de aceite diferentes entre vendas e operação.','criamos um checklist de entrada junto com Comercial e Qualidade','o retrabalho no piloto caiu de 18% para 11% em 60 pedidos','repetir a medição com a próxima turma de implantações','Mapeamento de processos|Procedimentos operacionais|Gestão de operações'],
 ['Aurora','Capacidade da semana com variação de demanda','O planejamento usava uma produtividade média única para todos os tipos de serviço.','separamos três famílias de trabalho e simulamos combinações de demanda','o plano passou a explicitar duas semanas com sobrecarga antes da execução','rever estimativas com os tempos efetivamente observados','Planejamento de capacidade|Pesquisa operacional|Simulação de processos'],
 ['Atlas','O mesmo pedido passava por duas triagens','Duas equipes conferiam o mesmo conjunto de informações sem compartilhar a decisão.','definimos o dono da triagem e publicamos o resultado para a etapa seguinte','uma verificação repetida foi removida em 45 pedidos de teste','acompanhar erros que só apareciam na segunda verificação','Mapeamento de fluxo de valor|Desenho de processos|Gestão de produtividade'],
 ['Nexo','Continuidade com um critério de retomada','Os procedimentos descreviam a parada, mas deixavam a retomada por conta de cada turno.','documentamos sinais mínimos e responsáveis para autorizar a retomada','dois exercícios de mesa seguiram a mesma sequência de decisão','treinar um segundo responsável para cada cenário','Continuidade de negócios|Gestão de incidentes|Procedimentos operacionais'],
 ['Farol','Indicadores com contexto de volume','Uma equipe parecia mais lenta porque recebia os pedidos mais complexos.','comparamos tempos por família e registramos exceções de complexidade','o painel passou a mostrar volume, tipo de demanda e prazo juntos','usar a comparação para investigar o processo, sem ranking individual','Indicadores operacionais|Análise de dados|Gestão de capacidade'],
 ['Ponte','Passagem de bastão sem reunião extra','A implantação dependia de mensagens espalhadas para entender o que foi combinado.','centralizamos objetivo, restrições, critérios de aceite e responsáveis','oito implantações iniciaram com as quatro informações disponíveis','pedir à equipe receptora para registrar o que ainda faltou','Documentação de processos|Gestão de serviços|Colaboração entre equipes']
 ],
 qualidade: [
 ['Atlas','O defeito de cadastro tinha mais de uma origem','Erros diferentes eram classificados como falta de atenção.','separamos ausência de informação, regra ambígua e falha de validação','27 ocorrências ganharam causas específicas e ações correspondentes','verificar recorrência após cada ação','Análise de causa raiz|Gestão de não conformidades|Melhoria contínua'],
 ['Aurora','Variação não é sempre deterioração','Oscilações pequenas do prazo geravam mudanças de procedimento a cada semana.','analisamos a variação histórica antes de propor intervenções','três ajustes sem evidência suficiente foram evitados','coletar nova amostra quando o processo realmente mudar','Controle estatístico de processos|Estatística aplicada|Indicadores da qualidade'],
 ['Ponte','Aceite escrito com quem recebe','A área entregava uma tarefa completa que não atendia ao uso esperado pelo cliente interno.','transformamos expectativas em exemplos verificáveis de aceite','nove entregas foram avaliadas com o mesmo conjunto de exemplos','adicionar exceções encontradas durante as implantações','Padronização de processos|Experiência e voz do cliente|Gestão de requisitos'],
 ['Gaia','Testar o novo material sem mudar tudo','O piloto alterava material, embalagem e fornecedor ao mesmo tempo.','isolamos uma variável por rodada e registramos a condição de uso','duas hipóteses puderam ser comparadas sem confundir as alterações','ampliar o piloto mantendo a rastreabilidade dos lotes','Análise de modos de falha|Resolução estruturada de problemas|Pesquisa aplicada'],
 ['Farol','Indicador verde com uma amostra pequena','Uma taxa de 100% vinha de apenas dois atendimentos.','passamos a exibir denominador e período ao lado do percentual','14 indicadores receberam contexto mínimo de interpretação','rever limites só após acumular uma base comparável','Indicadores da qualidade|Estatística aplicada|Visualização de dados'],
 ['Órbita','Uma lição aprendida precisa ser aplicável','Relatos de melhoria contavam o resultado, mas não explicavam quando o método funcionava.','acrescentamos contexto, limites e um exemplo de aplicação ao roteiro de relato','12 registros foram reescritos com instruções utilizáveis por outra equipe','observar uma pessoa aplicando o registro sem ajuda do autor','Melhoria contínua|Documentação de processos|Lições aprendidas']
 ],
 logistica: [
 ['Aurora','Estoque de segurança por comportamento','Todos os itens usavam a mesma cobertura apesar de demandas muito diferentes.','separamos itens recorrentes, sazonais e intermitentes antes de simular políticas','18 itens passaram a ter regras compatíveis com seu histórico','acompanhar rupturas e excedentes em conjunto','Gestão de estoques|Planejamento de demanda|Estoque de segurança'],
 ['Atlas','Promessa de entrega com a restrição visível','O prazo não considerava janelas de recebimento do destino.','incluímos as janelas na simulação de distribuição e no retorno ao Comercial','sete remarcações foram antecipadas antes da confirmação do pedido','validar janelas quando o cadastro do cliente mudar','Distribuição de produtos|Roteirização|Rastreamento de pedidos'],
 ['Gaia','Retorno de materiais com rastreabilidade','Os materiais retornados não tinham uma identificação única por ciclo.','criamos uma etiqueta de lote e um registro de triagem no retorno','40 unidades fictícias puderam ser acompanhadas do envio à reaplicação','medir perdas por etapa do retorno','Logística reversa|Rastreamento de pedidos|Economia circular'],
 ['Aurora','Fornecedor avaliado pela entrega completa','A avaliação considerava pontualidade sem observar quantidade e documentação.','registramos os três critérios separadamente e revisamos os dados com Suprimentos','seis fornecedores fictícios passaram a ter uma leitura comparável','definir ações para as causas recorrentes de entrega incompleta','Avaliação de fornecedores|Gestão de compras|Indicadores de desempenho'],
 ['Farol','O inventário revelou cadastros duplicados','Divergências de saldo vinham de descrições diferentes para o mesmo item.','revisamos códigos com Operações e mantivemos o histórico das equivalências','23 duplicidades foram identificadas no lote de teste','bloquear novos cadastros sem busca por equivalentes','Inventário rotativo|Acuracidade de estoque|Qualidade de dados'],
 ['Ponte','Materiais planejados antes do início','A implantação abria tarefas sem confirmar a disponibilidade dos insumos.','ligamos o checklist de implantação à reserva de materiais','dez implantações receberam confirmação antes da data de início','registrar mudanças de escopo que afetem a reserva','Planejamento de materiais|Gestão de estoques|Planejamento de projetos']
 ],
 comercial: [
 ['Ponte','Diagnóstico antes da proposta','As propostas descreviam funcionalidades sem esclarecer o problema do cliente.','incluímos hipótese de valor, situação atual e um indicador de sucesso','16 oportunidades passaram a ter um diagnóstico legível por Produto e CX','avaliar o diagnóstico na reunião de passagem para implantação','Vendas consultivas|Qualificação de oportunidades|Propostas comerciais'],
 ['Atlas','Escopo traduzido em critérios de aceite','Uma mesma expressão comercial tinha interpretações diferentes na entrega.','revisamos exemplos de resultado com Operações antes de apresentar a proposta','cinco termos ambíguos foram substituídos por critérios verificáveis','manter exemplos aprovados no playbook de propostas','Gestão de requisitos|Negociação comercial|Documentação de processos'],
 ['Farol','Oportunidade sem próximo passo não é previsão','O CRM tinha negócios abertos há meses sem uma ação marcada.','definimos próximo passo e data para incluir oportunidades na previsão','22 registros foram revisados e nove saíram da previsão de curto prazo','acompanhar a qualidade das informações, além do volume do funil','CRM|Previsão de vendas|Funil de vendas'],
 ['Horizonte','Parceiros precisam aprender a explicar o valor','O material de parceria era uma lista de telas do produto.','organizamos a apresentação por situação do cliente e resultado esperado','quatro parceiros fictícios completaram o ensaio de diagnóstico','registrar perguntas que surgirem nas primeiras conversas','Parcerias comerciais|Canais de vendas|Apresentação em público'],
 ['Aurora','Sinal comercial entra no planejamento de demanda','Promoções negociadas não chegavam a Logística antes da semana de execução.','criamos uma revisão quinzenal de oportunidades que alteram a demanda','três cenários promocionais entraram antecipadamente na simulação','comparar o sinal comercial com a demanda realizada','Planejamento de demanda|Inteligência comercial|Colaboração entre equipes'],
 ['Ponte','Aprender com a oportunidade perdida','O motivo de perda era sempre registrado como preço.','revisitamos conversas e separamos prazo, prioridade, escopo e orçamento','12 perdas receberam causas mais específicas','usar as causas para revisar a abordagem, sem presumir intenção do cliente','Análise de mercado|Gestão de carteira de clientes|Vendas B2B']
 ],
 cx: [
 ['Ponte','Primeiro valor em vez de primeiro login','A implantação era considerada concluída quando o acesso era criado.','definimos uma tarefa que representa valor para cada perfil de cliente','oito contas de demonstração passaram a acompanhar primeira entrega útil','comparar tempo de ativação com tempo de primeira entrega','Onboarding de clientes|Sucesso do cliente|Jornada do cliente'],
 ['Nexo','A pergunta que evita uma escalada desnecessária','Chamados chegavam à Engenharia sem horário, etapa ou resultado esperado.','adotamos um roteiro de diagnóstico com três informações mínimas','o retorno por falta de informação caiu de 14 para seis em 40 chamados de teste','verificar se o roteiro não cria esforço excessivo ao cliente','Suporte técnico|Padrões de atendimento|Gestão de incidentes'],
 ['Horizonte','Feedback com evidência de contexto','Pedidos de funcionalidade eram encaminhados como frases isoladas.','registramos objetivo, frequência do problema e alternativa usada pelo cliente','19 feedbacks passaram a apoiar a priorização de Produto','acompanhar o retorno para quem trouxe o problema','Experiência do cliente|Pesquisa com usuários|Gestão de requisitos'],
 ['Ponte','Clientes com ritmos diferentes de adoção','O mesmo calendário de contatos era aplicado a todos os perfis.','testamos trilhas conforme complexidade e disponibilidade da equipe do cliente','três percursos de adoção ganharam critérios de entrada claros','avaliar onde a equipe do cliente continua dependendo de ajuda','Retenção de clientes|Sucesso do cliente|Onboarding de clientes'],
 ['Órbita','Resposta resolvida vira conhecimento reutilizável','Soluções de atendimento eram refeitas porque ficavam apenas na conversa do chamado.','publicamos contexto, diagnóstico, solução e limites da resposta','15 soluções passaram a ser encontradas pela pesquisa global','pedir uma revisão a alguém que não participou do chamado','Base de conhecimento|Gestão do conhecimento|Atendimento ao cliente'],
 ['Farol','Satisfação com a população de respostas visível','Uma nota era apresentada sem informar quem respondeu à pesquisa.','incluímos total de convites, respostas e distribuição por etapa da jornada','a leitura passou a mostrar a baixa resposta de clientes em implantação','testar um convite mais oportuno para esse grupo','Pesquisa de satisfação|Análise de dados|Jornada do cliente']
 ],
 marketing: [
 ['Horizonte','Posicionamento a partir da linguagem do cliente','A apresentação falava em arquitetura quando o cliente perguntava sobre previsibilidade.','revisamos dez entrevistas e organizamos mensagens por problema percebido','três mensagens principais passaram a usar situações reconhecíveis','validar a compreensão com novos participantes','Posicionamento de marca|Pesquisa de mercado|Segmentação de público'],
 ['Ponte','Leads que a equipe consegue atender','A campanha gerava volume, mas poucas empresas tinham o problema que resolvemos.','refinamos os critérios de público com Comercial e revisamos os formulários','a proporção de oportunidades qualificadas passou de 21% para 34% no teste fictício','acompanhar o custo e a qualidade em uma janela maior','Geração de demanda|Segmentação de público|Métricas de marketing'],
 ['Órbita','Aprendizados das equipes viram histórias úteis','As comunicações internas anunciavam entregas sem explicar a mudança de prática.','entrevistamos autores e transformamos relatos em histórias de problema, tentativa e resultado','sete histórias direcionaram leitores para as publicações originais','medir se outras áreas reaplicaram o aprendizado','Comunicação interna|Marketing de conteúdo|Narrativa visual'],
 ['Farol','Gráficos com mensagem e contexto','O material do comitê tinha muitos gráficos e pouca indicação da decisão necessária.','cada gráfico passou a informar pergunta, período e limitação','o relatório foi reduzido de 18 para dez páginas sem retirar decisões','testar a leitura com quem não acompanha o projeto','Visualização de dados|Design de informação|Produção de conteúdo'],
 ['Horizonte','Demonstração guiada por uma jornada','O roteiro da demonstração pulava entre telas sem um personagem ou objetivo.','criamos um percurso de pedido até entrega com perguntas para cada etapa','quatro ensaios mantiveram a mesma narrativa e abriram espaço para dúvidas','atualizar o roteiro quando o fluxo do produto mudar','Estratégia de marca|Jornada do cliente|Apresentação em público'],
 ['Gaia','Resultado ambiental com premissas explícitas','Uma peça sugeria que o piloto representava toda a operação.','incluímos escopo, período e forma de cálculo dos resultados apresentados','seis materiais passaram a distinguir piloto de operação completa','pedir revisão de Pesquisa antes de cada atualização','Comunicação escrita|Produção de conteúdo|Avaliação de impacto']
 ],
 pessoas: [
 ['Órbita','Aprender com quem resolve o problema','A trilha de integração apresentava áreas, mas não mostrava como pedir ajuda.','ligamos situações frequentes a pessoas de referência e publicações da MIND','20 dúvidas de integração ganharam caminhos de consulta','revisar referências quando as responsabilidades mudarem','Integração de colaboradores|Educação corporativa|Gestão do conhecimento'],
 ['Órbita','Mentoria termina com aplicação','As sessões de mentoria eram avaliadas apenas pela presença.','cada dupla definiu uma tarefa que o aprendiz faria sem condução do mentor','nove duplas registraram evidências de aplicação','acompanhar se a prática continua depois de um mês','Mentoria profissional|Avaliação de aprendizagem|Treinamento e desenvolvimento'],
 ['Nexo','Quando o especialista é a única documentação','A rotina do conector legado dependia de Bruno para explicar exceções.','organizamos uma sessão de captura e um roteiro de execução acompanhada','as exceções foram listadas, mas a execução autônoma ainda está pendente','Júlia e Luana devem testar o roteiro em um ambiente de ensaio','Captura de conhecimento tácito|Transferência de conhecimento|Gestão de riscos'],
 ['Ponte','Quem entra entende o fluxo inteiro','Novos integrantes recebiam apenas tarefas da própria área.','criamos uma visita guiada de Comercial até a entrega ao cliente','quatro novos perfis receberam um roteiro com os pontos de passagem','coletar dúvidas na primeira semana de atuação','Integração de colaboradores|Colaboração entre equipes|Desenho de aprendizagem'],
 ['Órbita','Comunidades com uma pergunta prática','Os encontros de conhecimento estavam virando apresentações sem aplicação.','cada comunidade escolheu um problema comum e uma pequena experiência','cinco grupos produziram uma prática documentada para testar','convidar outra área para tentar usar cada prática','Comunidades de prática|Facilitação de grupos|Cultura organizacional'],
 ['Farol','Participação não é desempenho individual','A contagem de posts estava sendo confundida com domínio de conhecimento.','revisamos a comunicação do dashboard e discutimos formas de contribuição','o comitê passou a usar os números para estimular troca e encontrar lacunas','combinar sinais quantitativos com contexto das equipes','People analytics|Gestão de desempenho|Ética empresarial']
 ],
 financas: [
 ['Farol','Orçamento com hipóteses rastreáveis','A planilha consolidava números sem mostrar a origem de cada premissa.','separamos volume, preço e capacidade e registramos responsáveis pelas hipóteses','12 premissas relevantes passaram a ter fonte e data de revisão','atualizar hipóteses quando o cenário comercial mudar','Orçamento empresarial|Planejamento financeiro|Modelagem financeira'],
 ['Atlas','Custo de retrabalho dentro do processo','O custo da correção ficava misturado ao custo da primeira execução.','criamos uma leitura por etapa usando os tempos fornecidos por Operações','o piloto mostrou onde concentrar a investigação do custo evitável','validar a estimativa com mais dois ciclos de entrega','Análise de custos|Controladoria|Gestão de custos'],
 ['Aurora','Três cenários para a mesma capacidade','Uma previsão única ocultava a necessidade de recursos em cenários de pico.','montamos cenários conservador, central e de expansão com premissas explícitas','o comitê passou a discutir gatilhos antes de comprometer recursos','revisar os gatilhos junto com a demanda observada','Planejamento financeiro|Forecast financeiro|Análise de cenários econômicos'],
 ['Ponte','Datas de cobrança ligadas ao marco correto','O combinado comercial não deixava claro qual entrega disparava a cobrança.','alinhamos os marcos com Comercial e Implantação e registramos exemplos','oito contratos fictícios receberam um marco de conferência comum','testar a conferência no próximo ciclo de conciliação','Fluxo de caixa|Conciliação contábil|Gestão de contratos'],
 ['Farol','Recebimentos conciliados com a origem','A conferência dependia de descrições livres digitadas por pessoas diferentes.','definimos identificadores de referência e uma fila de exceções','31 lançamentos sintéticos foram conciliados e quatro ficaram para revisão','reduzir exceções recorrentes sem forçar correspondências incertas','Conciliação contábil|Tesouraria|Qualidade de dados'],
 ['Gaia','Comparar alternativas pelo ciclo completo','A alternativa mais barata na compra exigia mais reposição e descarte.','registramos custos de aquisição, operação e retorno no mesmo cenário','três alternativas ficaram comparáveis sob premissas iguais','revisar a análise quando houver dados de durabilidade do piloto','Análise de investimentos|Custos e formação de preços|Economia circular']
 ],
 governanca: [
 ['Nexo','Acesso acompanha a responsabilidade','Permissões antigas eram mantidas depois de mudanças de função.','revisamos responsáveis e finalidades com os gestores de cada área','17 acessos fictícios receberam decisão registrada de manter ou revisar','incluir a revisão no fluxo de mudança de função','Governança de tecnologia|Controles internos|Gestão de riscos'],
 ['Farol','Inventário de dados compreensível','O inventário listava tabelas, mas não explicava a finalidade dos campos.','descrevemos finalidade, responsável e consumidores usando exemplos sintéticos','22 conjuntos de informação ganharam contexto de uso','validar o inventário com quem mantém cada processo','Governança de dados|Gestão documental|Proteção de dados pessoais'],
 ['Ponte','A versão certa do escopo','Comercial e Implantação consultavam versões diferentes do mesmo documento.','definimos uma versão de referência e registramos alterações após o aceite','dez escopos ficaram vinculados à versão usada na entrega','conferir mudanças antes de alterar o cronograma','Gestão de contratos|Gestão documental|Gestão de requisitos'],
 ['Órbita','Conhecimento compartilhado com contexto de acesso','Relatos traziam detalhes desnecessários sobre pessoas e clientes.','criamos exemplos sintéticos e uma revisão de finalidade antes de publicar casos','oito relatos passaram a ensinar o método usando dados fictícios','pedir revisão quando houver dúvida sobre o público da publicação','Políticas e procedimentos|Gestão do conhecimento|Integridade corporativa'],
 ['Horizonte','Responsável pela decisão de exceção','Demandas fora do padrão circulavam entre áreas sem uma decisão registrada.','publicamos uma matriz de responsáveis e um formulário com motivo e prazo','sete exceções passaram a ter dono e critério de encerramento','revisar exceções que se tornarem recorrentes','Matriz RACI|Governança de decisões|Controles internos'],
 ['Gaia','Evidência organizada desde o piloto','A revisão final dependia de recuperar arquivos espalhados de várias equipes.','definimos uma estrutura comum de evidências e responsáveis por atualização','quatro frentes de piloto passaram a registrar decisão e base no mesmo lugar','verificar se outra pessoa consegue reconstituir a decisão','Gestão documental|Gestão de conformidade|Avaliação de impacto']
 ],
 pesquisa: [
 ['Gaia','Retorno de embalagem medido por ciclo','O estudo comparava materiais sem acompanhar quantas vezes eram utilizados.','definimos ciclos de uso e registramos perdas em cada passagem','40 unidades fictícias formaram uma base de rastreio por ciclo','ampliar a amostra antes de estimar o comportamento em escala','Economia circular|Coleta de dados|Pesquisa aplicada'],
 ['Aurora','Prototipar para reduzir uma incerteza','O protótipo tentava demonstrar várias hipóteses ao mesmo tempo.','escolhemos uma pergunta sobre leitura de demanda e isolamos o ensaio','o teste respondeu à pergunta principal e deixou duas limitações registradas','desenhar um novo ensaio para a limitação mais relevante','Prototipagem|Metodologia científica|Pesquisa aplicada'],
 ['Horizonte','Roteiro de entrevista sem sugerir a resposta','As perguntas apresentavam a solução antes de entender o problema.','reescrevemos o roteiro com situações recentes e pedidos de exemplo','dez entrevistas trouxeram relatos de práticas atuais antes de avaliar a proposta','comparar os relatos com a observação de tarefas','Análise qualitativa|Coleta de dados|Pesquisa com usuários'],
 ['Gaia','Consumo por unidade entregue','A queda de consumo acompanhava uma redução no volume de operação.','calculamos consumo absoluto e consumo por unidade no mesmo período','os dois indicadores passaram a contar histórias distintas e complementares','explicitar alterações na composição dos serviços','Avaliação de impacto|Desenvolvimento sustentável|Análise quantitativa'],
 ['Órbita','Experimento que outra equipe consegue repetir','A descrição do teste não informava a versão do material nem as condições do ensaio.','registramos dados sintéticos, versão, etapas e critérios de avaliação','três pessoas repetiram o ensaio seguindo o registro','anotar divergências entre execuções antes de concluir equivalência','Reprodutibilidade científica|Documentação técnica|Gestão de projetos de pesquisa'],
 ['Farol','Hipótese e evidência em campos diferentes','Os relatórios misturavam observação com interpretação.','reorganizamos os registros em pergunta, evidência, interpretação e limite','seis estudos passaram a distinguir o que foi observado do que ainda é hipótese','submeter a leitura a alguém de outra área','Metodologia científica|Análise quantitativa|Comunicação escrita']
 ]
};

export const SPECIAL_KNOWLEDGE = [
 ['Protocolo Orion de passagem de bastão','operacoes','Quatro informações mínimas para transferir uma entrega: objetivo, restrições, aceite e responsável.','No Projeto Ponte, Comercial registra as quatro informações antes de transferir a implantação.'],
 ['Matriz Orion de criticidade do conhecimento','administracao','Roteiro de conversa para identificar dependência de especialistas e planejar compartilhamento.','No Órbita, a equipe compara o risco sinalizado na MIND com o contexto do processo.'],
 ['Checklist Orion de aceite operacional','qualidade','Lista de exemplos verificáveis que conectam a promessa comercial à entrega de Operações.','Atlas usa o checklist para revisar pedidos antes de iniciar a execução.'],
 ['Ritual Orion de revisão de experimentos','ciencias','Revisão de pergunta, evidência, interpretação e limites de um experimento.','Pesquisa e Produto discutem o que o teste Horizonte permite concluir.'],
 ['Playbook Orion de primeira entrega','atendimento','Sequência de orientação ao cliente até realizar uma tarefa de valor por conta própria.','Ponte acompanha o resultado realizado pelo cliente em vez de apenas o primeiro login.'],
 ['Dicionário Farol de métricas','dados','Definições locais de evento, fórmula, unidade, período e fonte dos indicadores da Orion.','Finanças e Dados distinguem receita, faturamento e conclusão do serviço.'],
 ['Roteiro Órbita de mentoria aplicada','educacao','Modelo de mentoria que termina com execução independente e registro de dúvidas.','O aprendiz realiza uma tarefa com o roteiro e pede revisão do resultado.'],
 ['Mapa Atlas de dependências','projetos','Registro compartilhado de entregas que bloqueiam ou habilitam outras equipes.','Produto espera o contrato de API antes de consolidar os critérios do portal.'],
 ['Matriz Aurora de cenários de demanda','logistica','Conjunto local de hipóteses para discutir demanda, capacidade e estoques.','Logística compara cenários sem tratar a previsão como compromisso de vendas.'],
 ['Guia Horizonte de mensagens acessíveis','design','Práticas da Orion para mensagens que explicam a situação e a próxima ação.','Uma validação de campo mostra o motivo e permite corrigir sem perder o formulário.'],
 ['Rotina Gaia de rastreio circular','logistica','Registro de lote, ciclo de uso e condição de retorno de materiais no piloto Gaia.','Uma unidade retorna, é inspecionada e ganha um novo registro de ciclo.'],
 ['Acordo Nexo de contratos de dados','tecnologia','Registro de compatibilidade entre quem produz e quem consome um dado na plataforma.','Um campo mantém seu significado durante a transição para a versão seguinte.'],
 ['Roteiro Orion de diagnóstico consultivo','vendas','Perguntas sobre situação atual, problema, objetivo e indicador de sucesso antes da proposta.','Comercial leva um diagnóstico para Produto avaliar a aderência do pedido.'],
 ['Modelo Orion de memória de decisão','administracao','Forma local de registrar alternativas, critérios, responsável e condição de revisão.','Uma decisão é reaberta quando muda a hipótese registrada, sem repetir a discussão inteira.'],
 ['Guia Orion de histórias de aprendizagem','marketing','Roteiro editorial que apresenta problema, tentativa, resultado e limites de uma prática.','Uma comunicação aponta para a publicação original para facilitar a reaplicação.'],
 ['Rotina Orion de revisão de acessos','juridico','Conversa entre responsáveis sobre finalidade e necessidade dos acessos na organização fictícia.','Uma mudança de função gera uma revisão dos acessos vinculados ao papel anterior.'],
 ['Modelo Orion de custos por etapa','financas','Quadro de custos que separa primeira execução, espera e retrabalho em um serviço.','Finanças e Operações comparam cenários com a mesma base de volume.'],
 ['Trilha Orion de integração entre áreas','pessoas','Roteiro para conhecer o fluxo da empresa do diagnóstico à entrega ao cliente.','Um novo integrante identifica onde seu trabalho depende de outras equipes.'],
 ['Sinal Orion de saúde da implantação','atendimento','Leitura combinada de objetivo, próxima ação, bloqueios e evidências de adoção.','CX usa o sinal para discutir o que impede a primeira entrega útil.'],
 ['Caderno Gaia de hipóteses e evidências','ciencias','Estrutura do piloto que separa observação, interpretação e condições de teste.','Uma melhora de consumo é acompanhada do volume e da composição dos serviços.'],
 ['Mapa Orion de especialistas e sucessores','educacao','Registro de referências para compartilhar rotinas e testar alternativas de continuidade.','O mapa orienta uma conversa sobre aprendizagem; não substitui decisões de gestão.'],
 ['Calibração Aurora de demanda intermitente','dados','Conhecimento especializado de Gabriel para avaliar séries com muitos períodos sem demanda.','No cenário fictício, Gabriel compara janelas históricas e registra limitações do modelo.'],
 ['Conector Nexo do legado Orion','tecnologia','Conhecimento do funcionamento do conector legado, hoje concentrado em Bruno Siqueira.','Bruno conhece o comportamento de confirmação em reenvios; a transferência para Júlia está pendente.'],
 ['Reconciliação de mensagens Nexo','tecnologia','Conhecimento sobre como investigar divergências entre filas e registros no legado fictício.','A equipe planeja uma execução acompanhada para documentar as exceções conhecidas por Bruno.']
].map(([name,area,description,examples])=>({name,area,description,examples}));

export const GUIDE = `ORION · Tecnologia, inteligência e operações conectadas

A Orion é uma empresa inteiramente fictícia criada para demonstrar a MIND. Pessoas, clientes, projetos, métricas e acontecimentos deste ambiente são simulados.

O QUE FAZEMOS
Criamos plataformas digitais e redesenhamos operações para ajudar empresas a transformar pedidos em entregas previsíveis. A sede fictícia fica em Brasília, com trabalho integrado entre produto, engenharia, dados e serviços.

NOSSAS FRENTES
Atlas: fluxo de pedidos e redução de retrabalho.
Aurora: planejamento de demanda, capacidade e estoques.
Ponte: implantação e primeira entrega de valor ao cliente.
Farol: métricas compartilhadas e decisão com contexto.
Órbita: aprendizagem, mentoria e continuidade do conhecimento.
Gaia: circularidade, materiais e pesquisa aplicada.
Nexo: integrações, governança e continuidade da plataforma.
Horizonte: experiência digital e comunicação do produto.

COMO COMPARTILHAMOS
Uma publicação útil explica o contexto, a tentativa, a evidência e o que outra pessoa pode reaplicar. Escolha os conhecimentos relacionados e indique limitações. Use o feed geral para aprendizados entre áreas e o feed da equipe para a execução local. Público de gestão ou liderança é reservado a decisões daquele nível.

COMO APRENDEMOS
Busque o assunto antes de abrir uma conversa do zero. Encontre uma pessoa de referência, leia suas publicações e registre o resultado ao aplicar uma prática. Reconhecer e salvar ajuda a reencontrar conteúdo; quantidade de posts não mede desempenho individual.

QUEM CONECTA AS ÁREAS
Natália Moraes conecta Operações a Dados. Beatriz Azevedo aproxima Produto e Experiência do Cliente. Elisa Martins conecta processos, qualidade e implantação. Laura Nogueira conduz as comunidades de aprendizagem.

CONTINUIDADE DO CONHECIMENTO
Bruno Siqueira concentra duas rotinas do legado Nexo. Júlia Nascimento e Luana Pires são candidatas à transferência. Gabriel Rocha concentra a calibração de demanda intermitente do Aurora. Há conhecimentos compartilhados por toda a equipe e outros ainda sem relato. Use a rede e a simulação de saída para abrir a conversa sobre continuidade.

RITUAIS
Segunda: prioridades e dependências de cada projeto.
Quarta: comunidades de prática com uma pergunta concreta.
Sexta: retrospectiva, aprendizados e atualização da MIND.
Mensal: revisão do radar e das rotinas que dependem de uma única pessoa.

SOBRE OS INDICADORES
Os números são calculados pelos recursos existentes da MIND a partir dos registros fictícios. O radar também avalia conceitos do catálogo sem evidência na Orion; ele sinaliza pontos para investigar. A rede mostra até 36 conhecimentos por seleção: use os filtros e a busca para explorar os demais.
`;
