// Textos originais de introdução. Exemplos ilustrativos, sem alegar casos da empresa.
// Formato: nome | descrição | exemplo prático.
const entries = `
Administração geral|Organização dos recursos, das responsabilidades e das atividades necessárias para alcançar objetivos de uma organização.|Distribuir responsabilidades de uma operação e acompanhar suas entregas em uma reunião semanal.
Planejamento estratégico|Definição de prioridades, objetivos e iniciativas para orientar a organização ao longo do tempo.|Relacionar a meta de melhorar o atendimento a iniciativas, responsáveis e indicadores trimestrais.
Modelos de negócio|Descrição de como uma organização entrega valor, atende seus públicos e sustenta suas atividades.|Mapear clientes, proposta de valor, canais, receitas e custos de um novo serviço.
Governança corporativa|Organização dos papéis, mecanismos de decisão e prestação de contas de uma organização.|Documentar quem decide, executa e acompanha uma iniciativa entre diferentes diretorias.
Gestão da mudança|Preparação e acompanhamento das pessoas e dos processos durante transformações organizacionais.|Planejar comunicação, treinamento e acompanhamento para a adoção de um novo sistema.
Gestão de riscos|Identificação e acompanhamento de incertezas que podem afetar objetivos.|Mapear dependências de um fornecedor e preparar alternativas para possíveis atrasos.
Tomada de decisão|Escolha fundamentada entre alternativas, considerando objetivos, informações e consequências.|Comparar soluções usando critérios de prazo, custo, qualidade e capacidade de manutenção.
Gestão do conhecimento|Registro, organização e circulação das experiências e informações úteis para o trabalho.|Transformar a solução de um problema recorrente em um post que outras equipes possam encontrar.
Desenho organizacional|Definição da estrutura, das responsabilidades e das relações entre unidades de uma organização.|Revisar a divisão de responsabilidades entre atendimento, vendas e operações.
Indicadores de desempenho|Medidas usadas para acompanhar resultados e apoiar decisões.|Definir uma métrica de entregas no prazo com fórmula, fonte e frequência de atualização.
Gestão de custos|Identificação, acompanhamento e organização dos recursos consumidos nas atividades.|Comparar o custo previsto e realizado de um processo e investigar diferenças.
Políticas e procedimentos|Diretrizes e instruções que orientam decisões e execução consistente do trabalho.|Escrever um procedimento de solicitação de materiais com etapas e responsáveis claros.
Análise de mercado|Estudo de clientes, concorrentes, tendências e condições de atuação.|Reunir necessidades de clientes e ofertas existentes antes de propor um novo serviço.
Gestão de contratos|Acompanhamento de compromissos, prazos, entregas e alterações de contratos.|Organizar um calendário de vencimentos e registrar o cumprimento das entregas acordadas.
Empreendedorismo|Identificação de oportunidades e construção de iniciativas capazes de gerar valor.|Testar uma proposta de serviço em pequena escala e registrar os aprendizados.
Ética empresarial|Reflexão e orientação sobre condutas responsáveis nas relações de trabalho e de negócios.|Discutir um conflito de interesses e registrar orientações claras para situações semelhantes.
Contabilidade financeira|Organização e apresentação de registros contábeis para representar a situação econômica e patrimonial.|Documentar o fluxo de fechamento contábil e os documentos exigidos em cada etapa.
Contabilidade gerencial|Uso de informações contábeis para apoiar decisões internas.|Preparar um relatório de custos por unidade para discutir oportunidades de melhoria.
Orçamento empresarial|Planejamento de receitas, despesas e recursos para um período.|Consolidar as necessidades de cada setor e acompanhar diferenças entre previsto e realizado.
Fluxo de caixa|Acompanhamento das entradas e saídas de dinheiro ao longo do tempo.|Organizar recebimentos e pagamentos esperados por semana para visualizar necessidades operacionais.
Análise de demonstrações financeiras|Interpretação das informações apresentadas nos relatórios contábeis.|Comparar demonstrações de períodos diferentes e documentar as principais variações.
Planejamento financeiro|Organização de objetivos e recursos financeiros em diferentes cenários.|Construir cenários de receitas e despesas para discutir o orçamento de uma operação.
Controladoria|Integração de informações e controles para acompanhar o planejamento e os resultados.|Consolidar relatórios de áreas diferentes em um fechamento gerencial mensal.
Custos e formação de preços|Análise dos componentes de custo e das premissas usadas na definição de preços.|Registrar materiais, tempo de trabalho e despesas considerados em uma proposta.
Tributação|Conhecimento sobre a organização e o acompanhamento das obrigações tributárias aplicáveis.|Manter um calendário de obrigações validado pelos profissionais responsáveis.
Auditoria financeira|Exame sistemático de registros e evidências relacionados às informações financeiras.|Organizar os documentos de uma amostra de transações para revisão pela equipe responsável.
Tesouraria|Organização das rotinas de pagamentos, recebimentos e disponibilidade financeira.|Documentar o processo de conferência e programação dos pagamentos da empresa.
Crédito e cobrança|Gestão dos critérios de crédito e do acompanhamento de valores a receber.|Padronizar o registro de contatos de cobrança e o acompanhamento dos prazos acordados.
Investimentos|Estudo da alocação de recursos e das premissas de retorno, prazo e risco.|Comparar cenários de aquisição de equipamentos com premissas explicitadas para decisão interna.
Valuation|Estudo de métodos e premissas para estimar o valor econômico de negócios ou ativos.|Documentar as hipóteses utilizadas em diferentes cenários de avaliação empresarial.
Gestão de riscos financeiros|Identificação e acompanhamento de incertezas que afetam recursos e resultados financeiros.|Mapear a exposição a atrasos de recebimento e organizar cenários de impacto.
Conciliação contábil|Conferência da correspondência entre registros contábeis e documentos de referência.|Comparar lançamentos internos com extratos e documentar divergências para análise.
Recrutamento e seleção|Organização das etapas de atração e escolha de pessoas para uma função.|Definir critérios relacionados ao cargo e uma sequência consistente de entrevistas.
Entrevista por competências|Investigação de experiências anteriores relacionadas às capacidades necessárias ao trabalho.|Preparar perguntas sobre situações reais de colaboração e resolução de problemas.
Integração de colaboradores|Acolhimento e orientação das pessoas que começam a trabalhar na organização.|Criar um roteiro da primeira semana com contatos, ferramentas e materiais de consulta.
Treinamento e desenvolvimento|Planejamento de oportunidades de aprendizagem relacionadas ao trabalho.|Organizar uma oficina sobre um processo e acompanhar sua aplicação pela equipe.
Gestão de desempenho|Acompanhamento de objetivos, entregas e desenvolvimento profissional.|Combinar objetivos claros e manter conversas periódicas sobre obstáculos e apoio necessário.
Planos de carreira|Organização de possibilidades de desenvolvimento e trajetórias profissionais.|Descrever competências e experiências associadas a diferentes funções da empresa.
Remuneração e benefícios|Organização dos componentes de remuneração e benefícios oferecidos às equipes.|Documentar regras de elegibilidade e canais de consulta sobre benefícios.
Cultura organizacional|Padrões de valores e comportamentos que influenciam a forma de trabalhar.|Registrar práticas que ajudam a equipe a colaborar e compartilhar aprendizados.
Engajamento de equipes|Compreensão e estímulo à participação das pessoas no trabalho coletivo.|Ouvir dificuldades da equipe e acompanhar as melhorias acordadas em conjunto.
Relações trabalhistas|Organização das relações entre empresa e trabalhadores conforme regras aplicáveis.|Manter orientações e canais de encaminhamento para dúvidas com a equipe responsável.
Folha de pagamento|Organização das informações necessárias ao processamento da remuneração.|Documentar prazos de envio e conferência de dados antes do fechamento da folha.
People analytics|Análise de dados sobre pessoas e processos de trabalho para apoiar decisões.|Analisar de forma agregada a participação em treinamentos e identificar necessidades de apoio.
Diversidade e inclusão|Construção de condições de participação e respeito às diferentes experiências das pessoas.|Revisar um processo seletivo para remover barreiras desnecessárias de acesso.
Mediação de conflitos|Facilitação do diálogo entre pessoas com interesses ou perspectivas diferentes.|Organizar uma conversa para esclarecer responsabilidades e construir acordos de trabalho.
Liderança de equipes|Orientação, apoio e coordenação de pessoas em torno de objetivos comuns.|Ajudar a equipe a priorizar entregas e remover obstáculos à colaboração.
Planejamento de força de trabalho|Análise das capacidades e da distribuição de pessoas necessárias às atividades.|Mapear a demanda de uma operação e planejar a formação das equipes.
Prospecção de clientes|Identificação e aproximação de organizações ou pessoas com necessidades compatíveis com uma oferta.|Organizar uma lista de possíveis clientes com critérios claros de relevância.
Qualificação de oportunidades|Análise da aderência entre uma necessidade comercial e a capacidade de atendê-la.|Registrar contexto, necessidade, prazo e próximos passos de uma oportunidade.
Vendas consultivas|Condução de vendas a partir da compreensão do problema e do contexto do cliente.|Investigar o processo atual do cliente antes de apresentar uma proposta de solução.
Negociação comercial|Construção de acordos sobre condições e interesses em relações comerciais.|Preparar alternativas de escopo, prazo e condições para uma reunião de negociação.
Gestão de contas|Acompanhamento do relacionamento e dos compromissos com clientes.|Registrar responsáveis, entregas e próximos contatos de uma conta atendida.
Gestão de carteira de clientes|Organização do acompanhamento de um conjunto de clientes.|Segmentar a carteira por necessidades de atendimento e planejar os contatos.
Previsão de vendas|Estimativa de resultados comerciais a partir de oportunidades e premissas.|Revisar as oportunidades abertas e registrar as hipóteses de fechamento do mês.
Funil de vendas|Representação das etapas pelas quais passam as oportunidades comerciais.|Mapear quantas oportunidades avançam de diagnóstico para proposta.
CRM|Organização de informações e interações do relacionamento com clientes.|Padronizar o registro de contatos e próximos passos para facilitar a continuidade do atendimento.
Propostas comerciais|Apresentação estruturada de uma oferta, seu escopo e condições.|Preparar uma proposta com entregas, responsabilidades, prazos e critérios de aceite.
Precificação comercial|Definição das condições de preço de uma oferta considerando contexto e objetivos.|Documentar as premissas e os limites usados para elaborar uma proposta comercial.
Canais de vendas|Formas pelas quais a organização apresenta e comercializa suas ofertas.|Comparar os fluxos de atendimento de vendas diretas e por parceiros.
Vendas B2B|Relacionamento comercial entre organizações.|Mapear os envolvidos na decisão de compra de um serviço para uma empresa.
Vendas B2C|Relacionamento comercial com consumidores finais.|Organizar dúvidas recorrentes dos consumidores para melhorar a apresentação de um produto.
Parcerias comerciais|Coordenação de relações entre organizações para objetivos comerciais conjuntos.|Definir responsabilidades e acompanhar entregas de uma ação com um parceiro.
Inteligência comercial|Organização e análise de informações que apoiam a atuação comercial.|Reunir padrões de demanda e motivos de perda de oportunidades para discussão da equipe.
Pesquisa de mercado|Coleta e análise de informações sobre públicos, necessidades e ofertas.|Entrevistar possíveis usuários para entender dificuldades antes de lançar um serviço.
Segmentação de público|Organização de públicos em grupos com características ou necessidades relevantes.|Agrupar clientes por tipo de necessidade para adequar conteúdos e atendimento.
Posicionamento de marca|Definição de como uma marca pretende ser compreendida por seus públicos.|Escrever uma proposta de valor clara para um serviço e testar sua compreensão.
Estratégia de marca|Planejamento da identidade, das associações e da presença de uma marca.|Organizar diretrizes de mensagem e identidade para diferentes canais.
Marketing de conteúdo|Planejamento e produção de conteúdos úteis para um público definido.|Criar uma sequência de materiais que esclareçam dúvidas recorrentes de clientes.
Marketing digital|Planejamento de ações de comunicação e relacionamento em canais digitais.|Organizar uma campanha com objetivo, público, canais e critérios de avaliação.
Mídias sociais|Uso de plataformas sociais para comunicação e relacionamento.|Preparar um calendário editorial e um fluxo de resposta a dúvidas do público.
SEO|Organização de conteúdos e páginas para favorecer sua compreensão e descoberta em buscadores.|Revisar títulos, estrutura e links internos de uma página de ajuda.
Publicidade online|Planejamento e acompanhamento de campanhas publicitárias em canais digitais.|Comparar mensagens de uma campanha com objetivos e métricas definidos.
E-mail marketing|Planejamento de comunicação por e-mail com públicos que podem receber essas mensagens.|Criar uma sequência de orientações para clientes que solicitaram acompanhar novidades.
Geração de demanda|Ações que despertam interesse e aproximam possíveis clientes de uma oferta.|Organizar um material educativo e acompanhar os contatos interessados no tema.
Automação de marketing|Uso de fluxos e regras para executar atividades recorrentes de comunicação.|Enviar materiais solicitados por um contato e registrar o andamento desse fluxo.
Relações públicas|Gestão do relacionamento da organização com seus diferentes públicos.|Preparar informações e responsáveis para uma comunicação institucional.
Comunicação interna|Circulação de informações relevantes entre as pessoas da organização.|Publicar um resumo de mudanças de processo com contexto e canal de dúvidas.
Redação publicitária|Construção de textos orientados a comunicar uma oferta e uma ação esperada.|Reescrever uma chamada para explicar com clareza a utilidade de um serviço.
Métricas de marketing|Medidas usadas para acompanhar objetivos de comunicação e relacionamento.|Definir quais resultados de uma campanha serão observados e como serão calculados.
Marketing de produto|Comunicação do valor de um produto e apoio à sua adoção pelo público.|Preparar materiais que relacionem funcionalidades a necessidades dos usuários.
Design de campanhas|Organização visual e narrativa das peças de uma campanha.|Criar peças consistentes para diferentes formatos e canais de comunicação.
Atendimento ao cliente|Acolhimento e encaminhamento das necessidades de clientes.|Registrar uma dúvida, resolver o pedido e deixar orientações para contatos futuros.
Sucesso do cliente|Acompanhamento da adoção de uma solução e dos resultados pretendidos pelo cliente.|Combinar marcos de uso e acompanhar obstáculos durante a implantação de um serviço.
Experiência do cliente|Compreensão e melhoria das interações entre cliente e organização.|Identificar pontos de dificuldade entre a contratação e o primeiro atendimento.
Suporte técnico|Investigação e resolução de dificuldades relacionadas a produtos ou sistemas.|Registrar sintomas, contexto e solução de uma falha recorrente em uma base consultável.
Gestão de reclamações|Organização do recebimento, tratamento e aprendizado a partir de reclamações.|Agrupar motivos recorrentes e acompanhar ações para reduzir sua repetição.
Pesquisa de satisfação|Coleta de percepções sobre uma experiência, produto ou serviço.|Aplicar perguntas após o atendimento e discutir padrões encontrados nas respostas.
Jornada do cliente|Mapeamento das etapas e interações vividas pelo cliente para alcançar um objetivo.|Desenhar o caminho entre a descoberta de um serviço e sua utilização.
Retenção de clientes|Acompanhamento de condições que favorecem a continuidade do relacionamento.|Identificar dificuldades de uso relatadas pelos clientes e organizar ações de apoio.
Onboarding de clientes|Orientação do cliente nos primeiros passos de utilização de um produto ou serviço.|Criar um roteiro de configuração e uma lista de contatos de apoio.
Central de relacionamento|Organização dos canais e rotinas de contato com clientes.|Padronizar categorias de solicitações e regras de encaminhamento entre equipes.
Atendimento omnicanal|Coordenação da experiência de atendimento entre diferentes canais.|Manter o contexto de uma solicitação ao passar de um canal digital para uma ligação.
Padrões de atendimento|Definição de orientações para um atendimento consistente e compreensível.|Criar um roteiro de registro e encaminhamento de pedidos recorrentes.
Recuperação de serviços|Tratamento de falhas no serviço e reconstrução da experiência do cliente.|Registrar a falha, combinar uma solução e acompanhar o retorno do cliente.
Acessibilidade no atendimento|Redução de barreiras de comunicação e acesso aos serviços.|Oferecer orientações claras e alternativas de contato adequadas às necessidades do público.
Lógica de programação|Organização de passos, condições e repetições para resolver problemas com código.|Descrever as condições que determinam se um formulário pode ser enviado.
Desenvolvimento web|Construção de aplicações e conteúdos acessíveis por navegadores.|Criar uma página de consulta que recebe dados de um servidor.
Desenvolvimento front-end|Construção da interface e das interações executadas no navegador.|Implementar um formulário com mensagens claras de erro e navegação por teclado.
Desenvolvimento back-end|Construção da lógica e dos serviços executados no servidor.|Criar uma rota que valida uma solicitação e salva um registro.
Desenvolvimento de APIs|Definição de interfaces para troca de dados entre sistemas.|Documentar uma rota de consulta com parâmetros, respostas e regras de acesso.
Arquitetura de software|Organização dos componentes e das decisões estruturais de um sistema.|Separar responsabilidades de interface, regras de negócio e persistência.
Programação orientada a objetos|Organização de código em entidades que reúnem comportamento e estado.|Modelar diferentes tipos de documento com operações comuns de validação.
JavaScript|Linguagem de programação utilizada em interfaces web e em outros ambientes de execução.|Filtrar uma lista de conhecimentos conforme o texto digitado pelo usuário.
Java|Linguagem e plataforma usadas na construção de aplicações em diferentes contextos.|Implementar um serviço que recebe e valida solicitações de uma aplicação.
Python|Linguagem de programação utilizada em automação, análise de dados e aplicações.|Automatizar a organização de arquivos e gerar um resumo das operações realizadas.
Desenvolvimento mobile|Construção de aplicações para dispositivos móveis.|Criar uma tela de consulta que funcione bem com toque e em diferentes tamanhos de tela.
Testes de software|Verificação do comportamento de sistemas em cenários relevantes.|Testar se uma pessoa sem permissão consegue acessar uma funcionalidade restrita.
Integração contínua|Execução recorrente de verificações ao integrar alterações de código.|Rodar testes automaticamente quando uma mudança é enviada ao repositório.
DevOps|Práticas de colaboração e automação entre desenvolvimento e operação de sistemas.|Documentar e automatizar o processo de entrega e recuperação de uma aplicação.
Computação em nuvem|Uso de recursos computacionais fornecidos como serviços por rede.|Planejar onde hospedar uma aplicação e como acompanhar seu consumo de recursos.
Cibersegurança|Proteção de sistemas, informações e operações digitais.|Revisar permissões e documentar um processo de atualização e resposta a incidentes.
Redes de computadores|Conexão e comunicação entre dispositivos e sistemas.|Documentar o caminho de comunicação entre estações de trabalho e um servidor interno.
Administração de bancos de dados|Organização da operação, integridade e disponibilidade dos dados armazenados.|Documentar e verificar um procedimento de cópia e restauração de uma base de teste.
Sistemas operacionais|Conhecimento sobre os sistemas que gerenciam recursos e execução de programas.|Documentar como iniciar, acompanhar e encerrar um serviço em uma estação de trabalho.
Controle de versão com Git|Registro e coordenação das alterações feitas em arquivos de um projeto.|Criar uma alteração isolada e revisar suas diferenças antes de integrá-la.
Análise de dados|Exame de dados para responder perguntas e apoiar decisões.|Agrupar registros de atendimento por motivo e identificar os mais frequentes.
Estatística aplicada|Uso de métodos estatísticos para descrever dados e examinar incertezas.|Comparar a distribuição de tempos de atendimento entre períodos.
Visualização de dados|Representação gráfica de informações para facilitar sua interpretação.|Construir um gráfico de publicações por semana com escala e período explícitos.
Business intelligence|Organização de dados e indicadores para acompanhamento das atividades da organização.|Consolidar dados de diferentes setores em um painel com definições comuns.
Modelagem de dados|Definição da estrutura e das relações entre informações.|Representar a relação entre pessoas, publicações e conhecimentos em um modelo.
Engenharia de dados|Construção e operação de fluxos que coletam, organizam e disponibilizam dados.|Criar uma rotina de importação com validação e registro de erros.
Qualidade de dados|Avaliação da adequação dos dados ao uso pretendido.|Identificar registros duplicados e campos ausentes antes de gerar um relatório.
Governança de dados|Definição de responsabilidades e regras para o uso dos dados.|Documentar quem mantém um indicador e quem pode consultar sua fonte.
Aprendizado de máquina|Construção de modelos que aprendem padrões a partir de exemplos.|Avaliar um modelo de classificação de solicitações em dados separados dos usados no treinamento.
Inteligência artificial generativa|Uso de modelos que produzem novos conteúdos a partir de instruções e contexto.|Rascunhar um resumo de conteúdo autorizado e revisar sua fidelidade antes de compartilhar.
Processamento de linguagem natural|Métodos computacionais para trabalhar com linguagem humana.|Agrupar assuntos recorrentes em textos de atendimento.
Análise preditiva|Estudo de padrões para estimar resultados futuros e suas incertezas.|Comparar previsões de demanda com resultados observados em períodos posteriores.
Experimentação e testes A/B|Comparação planejada de alternativas para investigar efeitos.|Comparar duas versões de uma interface usando um objetivo e critérios definidos previamente.
Indicadores e métricas|Definição de medidas que representam aspectos de um processo ou resultado.|Documentar numerador, denominador e intervalo de uma taxa de participação.
Planilhas eletrônicas|Organização e cálculo de dados em tabelas com fórmulas.|Consolidar entregas por setor e verificar totais com fórmulas de conferência.
SQL|Linguagem usada para consultar e manipular dados em bancos relacionais.|Consultar a quantidade de publicações agrupadas por área de conhecimento.
Ética e privacidade de dados|Análise do uso responsável de informações e de seus impactos nas pessoas.|Revisar quais dados são realmente necessários para produzir um relatório agregado.
Pesquisa operacional|Modelagem de problemas de decisão para comparar alternativas e alocação de recursos.|Simular formas de distribuir tarefas entre equipes considerando capacidade e prazo.
Engenharia de produção|Integração de pessoas, recursos e processos para organizar sistemas produtivos.|Mapear uma operação para identificar etapas que limitam o fluxo de trabalho.
Planejamento e controle da produção|Organização e acompanhamento do que produzir, quando e com quais recursos.|Comparar o plano semanal de produção com a disponibilidade de materiais e capacidade.
Projeto de processos|Definição das etapas, recursos e responsabilidades de um processo.|Desenhar um novo fluxo de recebimento e conferência de materiais.
Balanceamento de linhas|Distribuição do trabalho entre etapas para equilibrar o fluxo produtivo.|Comparar tempos de atividades e simular uma distribuição mais equilibrada.
Manufatura enxuta|Melhoria do fluxo produtivo com atenção a desperdícios e geração de valor.|Mapear esperas e movimentações desnecessárias em um processo.
Planejamento de capacidade|Análise dos recursos disponíveis frente à demanda prevista.|Comparar horas disponíveis com o volume de trabalho esperado.
Engenharia de métodos|Estudo e melhoria das formas de executar atividades.|Observar uma rotina, registrar suas etapas e discutir alternativas com a equipe.
Estudo de tempos|Análise da duração das atividades para compreender o processo.|Medir etapas de uma rotina e registrar condições que explicam variações.
Automação industrial|Uso de sistemas de controle para apoiar a execução de processos industriais.|Documentar os requisitos de monitoramento de uma etapa para análise da equipe técnica.
Manutenção industrial|Organização da conservação e disponibilidade de equipamentos industriais.|Registrar histórico de ocorrências e planejar verificações pela equipe habilitada.
Gestão de ativos|Acompanhamento de recursos ao longo de seu ciclo de vida.|Organizar inventário, responsáveis e histórico de manutenção de equipamentos.
Desenho técnico|Representação padronizada de características e dimensões de objetos e sistemas.|Revisar a identificação e a versão dos desenhos utilizados em um projeto.
Engenharia de produto|Desenvolvimento e melhoria das características de um produto.|Relacionar requisitos de uso a alternativas de projeto e critérios de verificação.
Sistemas de produção|Organização dos recursos e fluxos usados para produzir bens ou serviços.|Comparar uma operação por lotes com um fluxo contínuo em um estudo de processo.
Simulação de processos|Representação de um processo para explorar cenários sem alterar a operação real.|Simular mudanças de capacidade e observar seus efeitos nas filas.
Ergonomia industrial|Estudo da adequação do trabalho às características e necessidades das pessoas.|Registrar dificuldades observadas em postos de trabalho para avaliação especializada.
Gestão de energia|Acompanhamento do uso de energia e das oportunidades de eficiência.|Consolidar consumo por instalação e investigar variações operacionais.
Gestão da qualidade|Organização de práticas para atender requisitos e melhorar processos.|Definir critérios de qualidade e acompanhar os problemas encontrados nas entregas.
Controle estatístico de processos|Uso de medidas estatísticas para acompanhar variações de um processo.|Plotar medições sequenciais para investigar mudanças no comportamento da operação.
Auditoria da qualidade|Verificação sistemática de práticas e evidências frente a critérios definidos.|Conferir uma amostra de registros e documentar evidências encontradas.
Análise de causa raiz|Investigação das condições que contribuíram para um problema.|Mapear hipóteses de causa de um atraso recorrente e verificá-las com evidências.
Análise de modos de falha|Exame preventivo de como um processo ou produto pode falhar.|Reunir a equipe para listar falhas possíveis, efeitos e formas de prevenção.
Melhoria contínua|Aprimoramento recorrente de processos com aprendizagem e acompanhamento.|Testar uma pequena mudança e comparar os resultados antes de ampliá-la.
Lean Six Sigma|Conjunto de práticas de melhoria com foco em fluxo, desperdícios e variação.|Estruturar um projeto para investigar retrabalho e acompanhar seu comportamento.
Mapeamento de processos|Representação das etapas, decisões e participantes de um processo.|Desenhar o caminho de uma solicitação desde sua entrada até a conclusão.
Padronização de processos|Definição de referências comuns para executar e revisar atividades.|Criar um roteiro compartilhado para registrar e encaminhar solicitações.
Gestão de não conformidades|Registro e tratamento de situações que não atendem requisitos definidos.|Documentar uma entrega fora do critério e acompanhar seu tratamento.
Ações corretivas e preventivas|Tratamento de causas de problemas e de condições que podem gerar falhas.|Registrar responsáveis, prazos e verificação de uma ação de melhoria.
Indicadores da qualidade|Medidas usadas para acompanhar o atendimento a requisitos e a ocorrência de problemas.|Acompanhar a proporção de entregas que precisam de retrabalho.
Experiência e voz do cliente|Organização de percepções dos clientes para orientar melhorias.|Agrupar relatos de atendimento por necessidade e levar os temas à equipe de produto.
Sistemas de gestão ISO|Conhecimento sobre sistemas de gestão organizados segundo normas ISO aplicáveis.|Organizar processos, responsabilidades e evidências para revisão pelos profissionais responsáveis.
Resolução estruturada de problemas|Investigação organizada de problemas, alternativas e resultados.|Registrar contexto, evidências, hipóteses, ações e aprendizados de uma ocorrência.
Gestão de projetos|Coordenação de objetivos, recursos, pessoas e entregas de uma iniciativa temporária.|Organizar responsáveis, prazos e acompanhamento de um projeto de implantação.
Planejamento de projetos|Definição das entregas e do caminho para realizar um projeto.|Dividir uma iniciativa em etapas e identificar suas dependências.
Gestão de cronogramas|Organização e acompanhamento de prazos e dependências entre atividades.|Revisar o impacto de um atraso sobre as entregas seguintes.
Gestão de custos de projetos|Planejamento e acompanhamento dos recursos financeiros de um projeto.|Comparar o orçamento aprovado com gastos e compromissos registrados.
Gestão de riscos de projetos|Acompanhamento de incertezas que podem afetar as entregas do projeto.|Manter uma lista de riscos, responsáveis e respostas planejadas.
Métodos ágeis|Abordagens que favorecem entregas frequentes, colaboração e adaptação.|Dividir uma iniciativa em ciclos curtos e revisar prioridades após receber retorno.
Scrum|Estrutura de trabalho para organizar a colaboração e a entrega de valor em ciclos.|Planejar uma Sprint com um objetivo e revisar o que foi aprendido ao final.
Kanban|Método de gestão do fluxo com visualização do trabalho e atenção aos limites de execução simultânea.|Usar um quadro para observar tarefas bloqueadas e limitar o trabalho em andamento.
Escritório de projetos (PMO)|Estrutura de apoio à coordenação e às práticas de gestão de projetos.|Consolidar o andamento de projetos e facilitar o uso de modelos comuns.
Gestão de portfólio|Organização de um conjunto de iniciativas conforme objetivos e recursos disponíveis.|Comparar iniciativas para definir prioridades de investimento de capacidade.
Gestão de produtos|Coordenação da evolução de um produto considerando necessidades e objetivos.|Priorizar melhorias com base em problemas de usuários e evidências de uso.
Pesquisa com usuários|Investigação do contexto, das necessidades e das experiências de usuários.|Entrevistar pessoas sobre como realizam uma tarefa antes de propor uma interface.
Descoberta de produto|Investigação de problemas e oportunidades antes de investir em uma solução.|Testar uma hipótese com um protótipo e registrar o que precisa mudar.
Gestão de requisitos|Organização e acompanhamento das necessidades que orientam uma solução.|Registrar requisitos, critérios de aceitação e alterações acordadas.
Prototipagem|Construção de representações de uma solução para aprender antes de desenvolvê-la completamente.|Criar uma versão simplificada de um fluxo para testar sua compreensão.
Inovação aberta|Colaboração com atores externos para desenvolver ideias e soluções.|Organizar um desafio de melhoria com parceiros e acompanhar os aprendizados.
Gestão de mudanças em projetos|Análise e acompanhamento de alterações no escopo ou nas condições de um projeto.|Documentar o impacto de uma nova solicitação nos prazos e recursos.
Lançamento de produtos|Coordenação das atividades necessárias para disponibilizar um produto ao público.|Organizar comunicação, suporte e acompanhamento dos primeiros usuários.
Gestão de operações|Coordenação das atividades que entregam produtos ou serviços regularmente.|Acompanhar demanda, capacidade e pendências em uma rotina de operação.
Desenho de processos|Definição de como atividades e decisões se conectam para produzir um resultado.|Reorganizar um fluxo de solicitação para esclarecer responsáveis e reduzir esperas.
Mapeamento de fluxo de valor|Representação do fluxo de atividades e informações até a entrega de valor.|Mapear tempos de execução e de espera entre etapas de atendimento.
Procedimentos operacionais|Instruções para execução consistente de atividades recorrentes.|Documentar a conferência de uma entrega com passos e pontos de verificação.
Gestão de capacidade|Acompanhamento da disponibilidade de recursos para atender à demanda.|Comparar a fila de solicitações com a capacidade da equipe para a semana.
Planejamento operacional|Organização das atividades e recursos para executar objetivos no curto prazo.|Preparar o plano semanal de uma equipe com responsáveis e dependências.
Gestão de serviços|Organização da oferta, entrega e melhoria de serviços.|Definir um catálogo de serviços internos com prazos e canais de solicitação.
Gestão de instalações|Coordenação do uso e da manutenção de ambientes e infraestrutura.|Organizar solicitações de manutenção e acompanhar sua resolução.
Gestão de fornecedores|Acompanhamento do relacionamento e das entregas de fornecedores.|Registrar critérios e resultados de avaliação de um serviço contratado.
Terceirização de processos|Organização da execução de atividades por fornecedores externos.|Definir responsabilidades, entregas e acompanhamento de um processo contratado.
Continuidade de negócios|Preparação para manter ou recuperar atividades importantes diante de interrupções.|Mapear dependências e testar um plano de continuidade em exercício de mesa.
Gestão de incidentes|Organização da resposta e da aprendizagem diante de interrupções ou falhas.|Registrar uma ocorrência, coordenar o atendimento e documentar a recuperação.
Automação de processos|Uso de ferramentas para executar etapas repetitivas de um fluxo.|Automatizar a consolidação de solicitações e acompanhar os erros encontrados.
Gestão de produtividade|Análise da relação entre recursos utilizados, entregas e condições de execução.|Investigar retrabalho e bloqueios antes de propor mudanças no fluxo da equipe.
Indicadores operacionais|Medidas que ajudam a acompanhar o funcionamento diário de processos.|Monitorar o tempo de atendimento e o volume de solicitações em espera.
Análise de gargalos|Identificação de etapas que limitam o fluxo ou a capacidade de um processo.|Comparar filas e tempos entre etapas para localizar a principal restrição.
Gestão da cadeia de suprimentos|Coordenação dos fluxos entre fornecedores, operação e clientes.|Mapear dependências de fornecimento e acompanhar prazos de entrega.
Gestão de compras|Organização das aquisições necessárias à operação.|Documentar requisitos, comparar propostas e acompanhar uma solicitação de compra.
Negociação com fornecedores|Construção de acordos sobre fornecimento e condições de relacionamento.|Preparar critérios de prazo, qualidade e suporte para discutir uma contratação.
Planejamento de demanda|Organização de estimativas sobre a necessidade futura de produtos ou serviços.|Combinar histórico e eventos previstos para planejar a próxima operação.
Gestão de estoques|Acompanhamento da disponibilidade, movimentação e necessidade de reposição de materiais.|Conferir saldos e investigar divergências entre registros e inventário.
Armazenagem|Organização da guarda e movimentação de materiais.|Mapear localizações e padronizar a identificação dos itens armazenados.
Distribuição de produtos|Coordenação do fluxo de produtos até seus destinos.|Planejar entregas e registrar ocorrências que afetam os prazos.
Transporte de cargas|Organização do deslocamento de mercadorias entre pontos da cadeia.|Acompanhar documentos, prazos e ocorrências de uma operação de transporte.
Logística reversa|Organização do retorno de produtos ou materiais após sua entrega ou uso.|Mapear um fluxo de devolução e definir os registros necessários.
Planejamento de materiais|Definição de necessidades e disponibilidade de materiais para uma operação.|Relacionar o plano de produção aos materiais e prazos de reposição.
Sistemas de gestão de armazém|Uso de sistemas para organizar atividades de armazenagem e movimentação.|Documentar o fluxo de registro de recebimento, localização e separação de itens.
Sistemas de gestão de transporte|Uso de sistemas para organizar e acompanhar operações de transporte.|Consolidar entregas e ocorrências para consultar o andamento das operações.
Importação e exportação|Organização de operações de comércio entre países.|Manter uma lista de documentos e etapas validada pelos profissionais responsáveis.
Avaliação de fornecedores|Análise do atendimento de fornecedores a critérios definidos.|Comparar pontualidade e qualidade das entregas ao longo de um período.
Rastreamento de pedidos|Acompanhamento do andamento de solicitações e entregas.|Registrar marcos de um pedido e disponibilizar seu status às equipes envolvidas.
Previsão de demanda|Estimativa da demanda futura a partir de dados e premissas.|Comparar previsões anteriores com resultados para ajustar as hipóteses utilizadas.
Direito empresarial|Estudo das relações e regras jurídicas ligadas à atividade empresarial.|Organizar temas jurídicos recorrentes para consulta à assessoria responsável.
Direito do trabalho|Estudo das regras e relações jurídicas do trabalho.|Consolidar dúvidas de procedimentos internos para análise especializada.
Proteção de dados pessoais|Práticas de tratamento responsável de informações relacionadas a pessoas.|Mapear quais dados um processo coleta e quem precisa acessá-los.
Privacidade e LGPD|Conhecimento sobre privacidade e a legislação brasileira de proteção de dados pessoais.|Organizar um inventário de tratamentos para avaliação pelos responsáveis por privacidade.
Gestão de conformidade|Acompanhamento do atendimento a regras e compromissos aplicáveis à organização.|Manter uma matriz de obrigações com responsáveis e evidências de acompanhamento.
Integridade corporativa|Organização de práticas que apoiam condutas éticas e responsáveis.|Divulgar orientações sobre conflitos de interesses e canais de consulta.
Prevenção à fraude|Identificação e redução de condições que favorecem práticas fraudulentas.|Revisar a separação de responsabilidades em um processo sensível.
Propriedade intelectual|Conhecimento sobre a proteção e o uso de criações e ativos intelectuais.|Manter registros de autoria e licenças dos materiais utilizados pela empresa.
Direito do consumidor|Estudo das regras das relações entre fornecedores e consumidores.|Organizar dúvidas de atendimento para revisão pela equipe jurídica.
Controles internos|Procedimentos usados para dar consistência e confiabilidade às operações.|Definir conferências independentes em etapas críticas de um processo.
Gestão documental|Organização do ciclo de vida, acesso e localização de documentos.|Padronizar nomes, responsáveis e versões de documentos compartilhados.
Políticas de compliance|Diretrizes que orientam a observância de regras e compromissos da organização.|Organizar orientações internas com exemplos e canais de esclarecimento.
Canal de denúncias|Estrutura de recebimento e encaminhamento de relatos de possíveis irregularidades.|Publicar os canais e responsáveis adequados sem expor relatos confidenciais no feed.
Governança de tecnologia|Definição de responsabilidades e decisões sobre o uso da tecnologia.|Organizar critérios de priorização e acompanhamento de iniciativas tecnológicas.
Saúde e segurança do trabalho|Organização de práticas voltadas à proteção das pessoas nas atividades profissionais.|Registrar necessidades de avaliação e encaminhá-las à equipe especializada.
Identificação de perigos|Reconhecimento de situações que podem causar danos no contexto do trabalho.|Organizar observações de uma atividade para análise dos profissionais responsáveis.
Avaliação de riscos ocupacionais|Análise de riscos associados às condições e atividades de trabalho.|Consolidar informações para uma avaliação conduzida pela equipe habilitada.
Prevenção de acidentes|Planejamento de práticas para reduzir ocorrências e condições inseguras.|Registrar aprendizados de uma revisão de processo e acompanhar as ações definidas.
Ergonomia|Estudo das relações entre pessoas, atividades, ferramentas e ambiente de trabalho.|Reunir relatos sobre dificuldades no trabalho para avaliação especializada.
Higiene ocupacional|Estudo e controle de exposições presentes nos ambientes de trabalho.|Organizar registros e necessidades de monitoramento para a equipe técnica responsável.
Gestão ambiental|Organização das práticas relacionadas aos impactos ambientais das atividades.|Mapear fontes de resíduos e acompanhar as ações de redução definidas pela equipe.
Licenciamento ambiental|Acompanhamento dos processos e compromissos de licenciamento aplicáveis.|Organizar documentos e prazos para revisão pelos responsáveis técnicos e jurídicos.
Gestão de resíduos|Organização da geração, identificação e destinação de resíduos.|Documentar os fluxos de encaminhamento e os responsáveis por cada categoria.
Eficiência energética|Estudo da relação entre consumo de energia e serviço realizado.|Comparar o consumo de instalações em períodos equivalentes e investigar variações.
Sustentabilidade empresarial|Integração de aspectos ambientais, sociais e econômicos às atividades da organização.|Definir iniciativas com responsáveis e indicadores de acompanhamento.
Emergência e resposta a incidentes|Organização da preparação e da comunicação diante de ocorrências críticas.|Manter contatos e responsabilidades atualizados conforme o plano da equipe especializada.
Segurança da informação|Proteção da confidencialidade, integridade e disponibilidade das informações.|Revisar permissões de pastas compartilhadas e registrar os responsáveis pelos acessos.
Gestão de continuidade|Preparação e acompanhamento da recuperação de atividades essenciais.|Revisar dependências e contatos usados em um plano de continuidade.
Responsabilidade social empresarial|Consideração dos impactos da organização sobre pessoas e comunidades.|Acompanhar objetivos e resultados de uma iniciativa com a comunidade.
Inventário de emissões|Organização das fontes, dados e premissas usados para estimar emissões.|Consolidar registros de consumo com origem e período para análise técnica.
Desenho de aprendizagem|Planejamento de experiências de aprendizagem orientadas a objetivos.|Definir o que uma pessoa deve conseguir fazer ao final de um treinamento.
Educação corporativa|Organização de iniciativas de aprendizagem ligadas às necessidades da empresa.|Montar uma trilha de formação usando experiências e materiais das equipes.
Facilitação de grupos|Condução de atividades que ajudam grupos a participar e construir resultados.|Organizar uma oficina com perguntas claras, tempo definido e registro dos acordos.
Apresentação em público|Comunicação de ideias para uma audiência de forma compreensível.|Preparar uma apresentação com contexto, exemplos e espaço para dúvidas.
Mentoria profissional|Troca orientada de experiências para apoiar o desenvolvimento profissional.|Combinar encontros para discutir desafios e registrar aprendizados de carreira.
Coaching de equipes|Facilitação de reflexões e acordos sobre objetivos e formas de trabalhar em equipe.|Conduzir uma conversa sobre obstáculos coletivos e ações que a equipe deseja experimentar.
Documentação de processos|Registro de como atividades são executadas e mantidas.|Escrever um guia de uma rotina com contexto, passos e responsável pela atualização.
Comunidades de prática|Grupos que compartilham experiências e aprendem sobre um domínio de atuação.|Organizar encontros entre pessoas que trabalham com um mesmo tema em setores diferentes.
Gestão de conhecimento organizacional|Organização da memória e da circulação de saberes da empresa.|Reunir aprendizados de projetos e associá-los a conhecimentos pesquisáveis.
Comunicação escrita|Expressão de informações e ideias por textos claros e adequados ao público.|Reescrever uma orientação interna com objetivo, contexto e próximos passos.
Aprendizagem digital|Uso de recursos digitais para apoiar o aprendizado.|Criar materiais curtos com exercícios e canais de dúvida para consulta assíncrona.
Avaliação de aprendizagem|Verificação do aprendizado em relação aos objetivos propostos.|Propor uma tarefa prática após um treinamento e discutir as dificuldades encontradas.
Produção de materiais didáticos|Construção de conteúdos que apoiam a compreensão e a prática.|Criar um tutorial de processo com exemplos e perguntas frequentes.
Colaboração entre equipes|Coordenação de pessoas de diferentes grupos para realizar objetivos comuns.|Definir um canal de troca e documentar acordos de uma entrega conjunta.
Treinamento técnico|Desenvolvimento de capacidades relacionadas a ferramentas ou procedimentos específicos.|Preparar uma atividade guiada em ambiente de teste e registrar dúvidas frequentes.
Design gráfico|Organização de elementos visuais para comunicar informações.|Criar um material interno com hierarquia clara de títulos, texto e imagens.
Design de interfaces|Planejamento dos elementos visuais e funcionais de uma interface.|Organizar campos e ações de um formulário para facilitar sua compreensão.
Experiência do usuário (UX)|Estudo e melhoria da experiência das pessoas ao utilizar uma solução.|Investigar dificuldades de usuários ao procurar um documento interno.
Pesquisa de experiência do usuário|Investigação das interações e percepções de pessoas usando produtos ou serviços.|Observar como pessoas concluem uma tarefa e registrar os obstáculos.
Arquitetura da informação|Organização e nomeação de conteúdos para facilitar sua localização.|Agrupar conhecimentos em áreas e testar se as pessoas conseguem encontrá-los.
Design de interação|Planejamento de como ações e respostas se conectam em uma interface.|Definir o comportamento de busca, seleção e confirmação em um catálogo.
Design system|Conjunto compartilhado de componentes e orientações para construir interfaces consistentes.|Documentar botões, campos e mensagens usados em diferentes telas.
Acessibilidade digital|Construção de conteúdos e interfaces utilizáveis por pessoas com diferentes necessidades.|Verificar navegação por teclado, rótulos de campos e contraste de texto.
Design de serviços|Organização das interações e processos envolvidos na entrega de um serviço.|Mapear o atendimento visível ao cliente e as atividades internas que o sustentam.
Edição de vídeo|Organização e montagem de imagens e áudio para construir um conteúdo audiovisual.|Editar um tutorial curto com legendas e etapas fáceis de acompanhar.
Fotografia|Produção e uso de imagens fotográficas para registrar ou comunicar.|Planejar imagens de produtos com enquadramento e iluminação consistentes.
Produção de conteúdo|Planejamento e elaboração de materiais para um público e objetivo definidos.|Transformar uma experiência de projeto em um relato com contexto e aprendizados.
Ilustração digital|Criação de imagens ilustrativas por ferramentas digitais.|Produzir uma ilustração que explique visualmente uma etapa de um serviço.
Prototipagem de interfaces|Construção de representações de telas e fluxos para avaliação.|Criar um fluxo clicável de cadastro para identificar dificuldades antes do desenvolvimento.
Testes de usabilidade|Observação de pessoas realizando tarefas para avaliar a facilidade de uso.|Pedir que usuários encontrem um conhecimento e registrar os pontos de confusão.
Narrativa visual|Organização de elementos visuais para contar uma história ou explicar uma ideia.|Preparar uma sequência de imagens que mostre a evolução de um processo.
Metodologia científica|Organização sistemática de perguntas, evidências e procedimentos de investigação.|Definir uma pergunta de pesquisa e registrar como os dados serão coletados e analisados.
Pesquisa aplicada|Investigação orientada à resolução de problemas em um contexto concreto.|Estudar fatores associados a atrasos de um processo para propor melhorias.
Revisão bibliográfica|Levantamento e análise de materiais relevantes a um tema de estudo.|Organizar fontes por pergunta, método e contribuição para uma investigação.
Coleta de dados|Obtenção organizada de informações para uma finalidade definida.|Criar um formulário de observação com campos e critérios consistentes.
Análise qualitativa|Interpretação de informações como relatos e observações em seu contexto.|Identificar temas recorrentes nas entrevistas sobre um processo interno.
Análise quantitativa|Exame de dados numéricos para descrever padrões e relações.|Comparar volumes e tempos de atendimento entre períodos equivalentes.
Redação científica|Comunicação estruturada de procedimentos, resultados e limites de uma investigação.|Escrever um relatório que diferencie evidências, interpretações e limitações.
Gestão de laboratórios|Organização dos recursos, registros e rotinas de um ambiente de laboratório.|Manter inventário e registros de agendamento conforme os procedimentos da equipe técnica.
Gestão de projetos de pesquisa|Coordenação de objetivos, recursos e etapas de uma investigação.|Organizar um cronograma de coleta, análise e comunicação dos resultados.
Desenvolvimento sustentável|Consideração de necessidades presentes e futuras nos impactos do desenvolvimento.|Comparar efeitos ambientais e sociais de alternativas de um projeto.
Economia circular|Organização do uso de recursos com atenção à durabilidade, reutilização e recuperação.|Mapear oportunidades de prolongar o uso de materiais e reduzir descartes.
Avaliação de impacto|Investigação dos efeitos de uma intervenção e das evidências que os sustentam.|Definir como observar mudanças associadas a uma iniciativa e suas limitações.
Mudanças climáticas|Estudo de alterações do clima, suas causas, impactos e respostas.|Organizar fontes e hipóteses sobre riscos climáticos relevantes a uma operação.
Bioeconomia|Estudo de atividades econômicas ligadas a recursos e processos biológicos.|Mapear projetos e critérios de avaliação para o uso responsável de recursos renováveis.
Inovação tecnológica|Desenvolvimento ou adoção de tecnologias para criar ou melhorar soluções.|Testar uma nova ferramenta em uma atividade limitada e registrar seus resultados.
Transferência de tecnologia|Compartilhamento de conhecimentos e condições para aplicação de uma tecnologia.|Documentar requisitos e treinamento necessários para adotar uma solução de pesquisa.
Gestão de facilities|Coordenação de espaços, infraestrutura e serviços de apoio ao trabalho.|Organizar solicitações de serviços prediais e acompanhar seu atendimento.
Administração predial|Organização das rotinas e dos recursos necessários ao funcionamento de edifícios.|Manter um calendário de serviços e contatos dos responsáveis.
Gestão de manutenção predial|Planejamento e acompanhamento da conservação de instalações prediais.|Consolidar registros de manutenção e agendar avaliações pela equipe habilitada.
Gestão de espaços de trabalho|Organização dos ambientes conforme necessidades de uso das equipes.|Mapear a ocupação de salas e melhorar o fluxo de reservas.
Gestão de locações|Acompanhamento de imóveis locados, contratos e compromissos associados.|Organizar vencimentos, documentos e responsáveis por contratos de locação.
Avaliação de imóveis|Estudo de características e referências para estimar o valor de imóveis.|Reunir documentação e informações para análise pelos profissionais habilitados.
Gestão de obras|Coordenação de atividades, recursos e acompanhamento de obras.|Consolidar o andamento das etapas e registrar pendências para os responsáveis técnicos.
Planejamento de infraestrutura|Organização das necessidades e prioridades de instalações e recursos físicos.|Relacionar a expansão de uma equipe às necessidades de espaço e infraestrutura.
Eficiência de edifícios|Avaliação do uso de recursos e das condições de funcionamento de edificações.|Acompanhar dados de consumo e encaminhar oportunidades para avaliação técnica.
Segurança patrimonial|Organização das práticas de proteção de instalações e bens.|Manter responsáveis e procedimentos de comunicação de ocorrências atualizados.
Gestão de serviços terceirizados|Acompanhamento de atividades prestadas por empresas contratadas.|Definir indicadores e registrar entregas de um contrato de serviços.
Inspeções prediais|Verificações das condições de edificações conduzidas por profissionais habilitados.|Organizar relatórios e acompanhar as providências indicadas pelos responsáveis técnicos.
Gestão pública|Organização de recursos e atividades para atender necessidades coletivas.|Documentar um fluxo de serviço público e acompanhar seu atendimento.
Planejamento governamental|Definição e acompanhamento de objetivos e iniciativas da administração pública.|Relacionar objetivos de um programa a entregas e indicadores de acompanhamento.
Orçamento público|Organização e acompanhamento dos recursos financeiros da administração pública.|Preparar relatórios de execução com fontes e períodos claramente identificados.
Compras públicas|Conhecimento dos processos de aquisição da administração pública.|Organizar necessidades e documentos para análise da equipe responsável pela contratação.
Gestão de contratos públicos|Acompanhamento de entregas e compromissos em contratos da administração pública.|Registrar marcos de entrega e evidências para os responsáveis pelo acompanhamento.
Políticas públicas|Estudo e organização de ações voltadas a problemas coletivos.|Definir um problema, o público atendido e os resultados esperados de uma iniciativa.
Indicadores sociais|Medidas usadas para descrever condições e mudanças na sociedade.|Documentar fonte, população e período de um indicador usado em um projeto.
Transparência pública|Disponibilização compreensível de informações sobre a atuação pública.|Organizar informações de um programa com contexto, fonte e data de atualização.
Participação cidadã|Envolvimento das pessoas na discussão e acompanhamento de assuntos públicos.|Sistematizar contribuições de uma consulta para apoiar a revisão de um serviço.
Gestão de projetos públicos|Coordenação de iniciativas temporárias no contexto da administração pública.|Organizar entregas, responsáveis e comunicação com os públicos envolvidos.
Regulação|Estudo das regras e mecanismos que orientam atividades de interesse público.|Mapear obrigações relevantes para encaminhamento à equipe especializada.
Prestação de contas|Organização e apresentação de informações sobre uso de recursos e resultados.|Reunir evidências e explicar diferenças entre o planejado e o realizado.
Gestão de convênios|Acompanhamento de instrumentos de cooperação, responsabilidades e entregas.|Manter um calendário de marcos e documentos de uma parceria institucional.
Avaliação de programas|Análise do funcionamento e dos resultados de iniciativas organizadas.|Comparar objetivos, execução e evidências de resultado de um programa.
`;

const guides = new Map(entries.trim().split('\n').map(line => {
  const [name, description, example] = line.split('|');
  return [name, {description, examples:[example]}];
}));

export function knowledgeGuide(item) {
  const base = item.source === 'catalog' ? guides.get(item.name) : null;
  return {
    description: item.description || base?.description || '',
    examples: item.examples ? String(item.examples).split('\n').map(s=>s.trim()).filter(Boolean) : base?.examples || [],
    isCustom: Boolean(item.description || item.examples)
  };
}
