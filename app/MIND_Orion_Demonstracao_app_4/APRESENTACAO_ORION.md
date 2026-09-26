# Orion na MIND — roteiro de apresentação

Esta é uma instalação de demonstração pronta para abrir. A Orion, seus funcionários, projetos, clientes e resultados são inteiramente fictícios. Os registros estão no banco SQLite: a interface, a pesquisa e os indicadores leem esses dados normalmente.

## Abrir no Windows

1. Extraia o ZIP inteiro em uma pasta nova. Não execute os arquivos de dentro do ZIP.
2. Entre na pasta `MIND_Orion_Demonstracao`.
3. Com Node.js 24 ou superior instalado, dê dois cliques em `INICIAR_ORION.bat`. Outra opção é abrir o terminal nesta pasta e executar `npm start` (ou `npm.cmd start` no PowerShell).
4. Mantenha o terminal aberto e acesse `http://localhost:3000/admin`.

Não é necessário criar o banco, executar o gerador, instalar pacotes ou configurar um serviço externo para esta demonstração. O banco já vem em `data/orion-demo.sqlite`. O comando inicial usa essa base, sem depender do caminho do banco da instalação anterior.

## Acessos para o apresentador

**Senha fictícia de todas as contas: `OrionDemo2026!`**

| Conta | E-mail | O que demonstrar |
| --- | --- | --- |
| Administração | admin@orion.example | Dashboard, estrutura, cadastros e simulação de saída |
| Helena Duarte | helena.duarte@orion.example | Liderança com acesso aos feeds de todas as áreas |
| Natália Moraes | natalia.moraes@orion.example | Pessoa de Operações com conhecimentos de Dados |
| Bruno Siqueira | bruno.siqueira@orion.example | Especialista com rotinas do legado concentradas nele |
| Laura Nogueira | laura.nogueira@orion.example | Comunidades de prática e transferência de conhecimento |
| Beatriz Azevedo | beatriz.azevedo@orion.example | Produto, pesquisa, acessibilidade e experiência do cliente |
| Sabrina Leal | sabrina.leal@orion.example | Cadastro pendente para aprovar durante a demonstração |
| Renê Vilar | rene.vilar@orion.example | Conta bloqueada para demonstrar o controle de acesso |

Na página administrativa, preencha também **Quem está configurando agora?** com seu nome. A página de colaboradores fica em `http://localhost:3000`. Os e-mails usam o domínio de exemplo `orion.example`; não existe envio de mensagens para esses endereços.

Use a janela normal para o administrador e uma janela anônima para um colaborador. A MIND usa um cookie por janela de navegação, e um novo login administrativo encerra a sessão administrativa anterior. Cargo de liderança não concede administração.

## O que existe nesta empresa

| Registro | Quantidade inicial |
| --- | ---: |
| Áreas da empresa | 14 |
| Cargos ligados à hierarquia | 66 |
| Funcionários ativos | 66 |
| Cadastros pendentes | 4 |
| Perfil bloqueado | 1 |
| Conta administrativa | 1 |
| Projetos citados nas histórias | 8 |
| Publicações | 350 |
| Comentários | 1.495 |
| Reconhecimentos | 5.347 |
| Salvamentos pessoais | 2.414 |
| Notificações | 1.504 |
| Conhecimentos selecionados nos perfis | 1.734 vínculos |
| Conhecimentos aplicados em publicações | 205 |
| Registros no catálogo | 1.604 |
| Conceitos canônicos, após deduplicação | 1.587 |
| Conhecimentos próprios da Orion | 24 |

As 20 macroáreas do catálogo de conhecimentos são diferentes das 14 áreas da empresa. Projetos aparecem nos títulos e textos e são encontrados pela pesquisa; esta versão da MIND não tem uma tabela independente de projetos. Posts e comentários se distribuem por vários meses, com atividade recente para os filtros de 7, 30 e 90 dias. A base foi preparada com referência em **26/09/2026**.

## A história da Orion

A Orion é uma empresa fictícia de tecnologia e operações em Brasília. Desenvolve plataformas digitais e melhora processos para transformar pedidos em entregas previsíveis. Produto, tecnologia, dados, operações e atendimento trabalham sobre o mesmo fluxo, com apoio de qualidade, logística, pessoas, finanças, governança e pesquisa.

| Projeto | Problema principal | Equipes que se encontram |
| --- | --- | --- |
| Atlas | Retrabalho e espera no fluxo de pedidos | Produto, Tecnologia, Operações, Qualidade e Logística |
| Aurora | Demanda, capacidade e estoques | Dados, Operações, Logística, Comercial e Finanças |
| Ponte | Passagem da venda à primeira entrega útil | Comercial, Produto, Implantação, CX e Governança |
| Farol | Indicadores com definições compartilhadas | Dados, Finanças, Qualidade e Direção |
| Órbita | Aprendizagem e continuidade do conhecimento | Pessoas e especialistas de todas as áreas |
| Gaia | Materiais, retorno e avaliação de impacto | Pesquisa, Logística, Qualidade e Finanças |
| Nexo | Integrações e continuidade da plataforma | Tecnologia, Dados, Governança e Operações |
| Horizonte | Experiência digital e clareza da comunicação | Produto, Design, CX, Marketing e Pesquisa |

## Roteiro sugerido — 10 a 15 minutos

### 1. Apresente o contexto pelo dashboard

Entre como administrador. Comece pelo período de 30 dias para mostrar atividade recente; depois escolha todo o histórico para mostrar as 350 publicações. Filtre por Operações e Processos, observe a mudança dos indicadores e volte para todas as áreas. Exporte um CSV se quiser demonstrar o relatório.

Frase de apoio: “Esses números são calculados sobre os registros da Orion. Podemos olhar a empresa inteira ou entender a contribuição de uma área.”

### 2. Mostre a estrutura oficial

Abra **Configurar empresa** ou **Organograma**. As áreas e os cargos estão vinculados, inclusive entre áreas. Reduza o zoom e use a rolagem do quadro para percorrer a estrutura. Na visualização de cargos, filtre uma área para focar nas pessoas daquela equipe; clique em um cargo para ver seus ocupantes.

Há uma área superior por área e um cargo superior por cargo, conforme o modelo atual da MIND. As colaborações entre equipes aparecem nos projetos, nos comentários e na rede de conhecimentos.

### 3. Siga a história de um projeto

Abra **Pesquisa**, procure `Atlas` e explore publicações e comentários. Escolha um título com “o diagnóstico”, “o piloto” e “o que ficou”. São etapas do mesmo caso, com problema, ação, resultado e próximos passos.

Busque também `Ponte` para mostrar como a promessa comercial passa por implantação e chega ao atendimento. Os resultados respeitam os feeds acessíveis à conta usada.

### 4. Encontre uma pessoa além do cargo

Abra **Pessoas**, procure **Natália Moraes** e entre no perfil. Ela pertence a Operações e Processos, mas declara e aplica SQL, Python, análise de dados e pesquisa operacional. Abra a publicação **Aurora · Quando Operações passou a conversar em SQL**.

Frase de apoio: “A estrutura formal mostra onde a pessoa trabalha. O perfil e as publicações ajudam a descobrir com o que ela pode contribuir.”

### 5. Explore o catálogo e a rede

Em **Conhecimentos**, busque `SQL`, `passagem de bastão` ou `Conector Nexo`. Os 24 conhecimentos da Orion têm descrição e exemplo próprios.

Em **Organograma → Rede de conhecimentos**, alterne os filtros de cobertura. Existem temas críticos, em atenção, distribuídos e sem base suficiente. Busque `Bruno Siqueira`, `Comunicação escrita` ou `Facilitação de grupos`. Selecione uma pessoa ou um conceito para destacar suas conexões.

A visualização mostra até **36 conhecimentos por seleção**. A busca e os filtros permitem explorar os demais. Cobertura e índice de risco são medidas diferentes; o radar também considera documentação e atualidade. O catálogo amplo contém assuntos sem evidência na Orion: alertas são pontos para investigar, não uma lista automática de obrigações da empresa.

### 6. Demonstre a continuidade

Selecione **Bruno Siqueira** na rede e clique em **Simular saída** com a conta administrativa. Compare a cobertura antes e depois, conhecimentos sem detentor e destinatários sugeridos. A base inicial apresenta quatro conhecimentos que ficariam órfãos; duas histórias centrais são **Conector Nexo do legado Orion** e **Reconciliação de mensagens Nexo**.

Júlia Nascimento e Luana Pires aparecem na narrativa do plano de transferência; as recomendações automáticas vêm do cálculo da MIND e podem incluir outros integrantes. A simulação não exclui o funcionário e não altera seu cadastro.

Há também um caso de concentração com **Gabriel Rocha**, responsável pela calibração de demanda intermitente do Aurora.

### 7. Mostre a experiência do colaborador

Em uma janela anônima, entre como Natália. Abra o feed geral, o feed de Operações, os conhecimentos do perfil, **Salvos** e **Notificações**. Reconheça uma publicação e faça um comentário para mostrar o ciclo de troca.

Para publicar, escolha de um a oito conhecimentos relacionados. Conte um aprendizado curto da própria apresentação e mostre que ele passa a fazer parte da pesquisa e das páginas de conhecimento.

### 8. Feche com um cadastro e o guia

Na administração, abra **Gerenciar equipe** e aprove **Sabrina Leal**, conferindo o cargo. Em uma janela separada, entre na conta dela para mostrar o acesso liberado. Há outros três cadastros pendentes para repetir o exemplo.

Abra **Guia da MIND** para mostrar os projetos, os rituais e o modo de compartilhar conhecimento da Orion. A administração pode editar esse conteúdo.

## Repetir a apresentação ou renovar as datas

As alterações feitas na apresentação são persistidas. Para recuperar o estado inicial, extraia novamente o ZIP em outra pasta. Para gerar uma Orion nova com datas próximas ao dia atual, execute:

```powershell
npm run demo:gerar
```

O comando informa um novo arquivo SQLite e nunca sobrescreve um banco existente. Depois, pare o servidor e ajuste `ORION_DATABASE` no arquivo `.env` para o novo caminho informado. Inicie novamente com `npm start`.

Também é possível escolher o nome e a data de referência:

```powershell
npm run demo:gerar -- --output=data/orion-apresentacao-nova.sqlite --date=2026-09-26
```

Para testar o código sem modificar o banco da apresentação, execute `npm test`. A suíte usa bancos temporários. A documentação técnica anterior foi mantida em `DOCUMENTACAO_MIND.md`.
