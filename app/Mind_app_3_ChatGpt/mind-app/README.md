# Mind — organização e conhecimento

Aplicativo executável com interface HTML/CSS/JavaScript, servidor Node.js e banco relacional. O projeto começa vazio; áreas, cargos, vínculos e colaboradores são registros reais. O protótipo antigo foi preservado em `prototipo-original.html` apenas como referência, fora da aplicação servida.

## Esta versão: conhecimentos, perfis e dashboard

- **Dashboard**: tela inicial da conta administrativa compartilhada, em `/admin`. Filtros por período (7, 30, 90 ou 365 dias, todo o histórico e intervalo personalizado) e setor atual dos colaboradores; exportação CSV com os filtros aplicados.
- Indicadores de publicações, participação, autores, comentários, conhecimentos aplicados, novos conhecimentos, reconhecimentos e salvamentos; gráfico de evolução, comparação com o período anterior, tabelas por setor, conhecimento, pessoa e publicação.
- Oportunidades de compartilhamento: temas com um único autor no período, conhecimentos declarados sem relatos, temas sem novos relatos há 90 dias e publicações sem comentários. Há ainda acompanhamento de classificação dos posts, estrutura e histórico administrativo.
- **Conhecimentos**, abaixo de Notificações: catálogo pesquisável por área ou nome, com descrição e exemplo introdutório original para cada um dos 321 conhecimentos iniciais. Cada página reúne pessoas e publicações acessíveis sobre o tema. Conhecimentos criados pela equipe entram imediatamente no catálogo.
- **Perfis**: apresentação, todas as publicações acessíveis (com carregamento de mais resultados), conhecimentos usados nos posts e uma seção própria com até 20 conhecimentos selecionados pela pessoa. Clique nos conhecimentos para abrir a página correspondente.
- **Pesquisa**: inclui o catálogo e conhecimentos declarados nos perfis, além de publicações, comentários, projetos mencionados nos textos, nomes, áreas e cargos. Os resultados abrem conhecimentos, perfis e conversas.
- **Guia da MIND**: orientações para a equipe e um espaço editável pela administração para instruções da empresa. Não exige aceite nem aprovações para publicar conhecimentos.

O dashboard é autorizado no servidor exclusivamente para a conta administrativa. Ter um cargo de liderança não concede acesso. Os números são calculados a partir dos registros existentes; participação significa publicar ou comentar, e não leitura ou acesso. Reconhecimentos e salvamentos são totais acumulados dos posts criados no período. A aba explica as fórmulas e o alcance dos filtros.

Esta entrega continua usando o armazenamento local existente. O servidor acrescenta as tabelas necessárias para conhecimentos do perfil, descrições e guia sem apagar registros. A implantação em banco externo fica para outra etapa.

**Já usa uma versão anterior?** Siga [ATUALIZAR.md](ATUALIZAR.md) para preservar contas, posts e configurações.

## Executar no Windows / VS Code

1. Instale Node.js **24 ou superior**. Abra a pasta `mind-app` no VS Code.
2. No terminal PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Abra `.env`. Defina `ADMIN_EMAIL` e troque `ADMIN_PASSWORD` por uma senha de pelo menos 10 caracteres. A senha do exemplo é recusada pelo servidor.
4. Execute:

```powershell
npm install
npm start
```

5. Abra **http://localhost:3000/admin** para configurar. Colaboradores usam **http://localhost:3000**.

O modo SQLite usa apenas módulos nativos do Node; `npm start` também funciona sem instalar dependências. O pacote `pg` é necessário quando usar Supabase. Não abra `index.html` diretamente nem pelo Live Server: a aplicação precisa do servidor e das rotas `/api`.

## Sequência de apresentação

1. Entre em `/admin` com a credencial do `.env` e informe o nome de quem está configurando. O Dashboard será a primeira tela; clique em **Configurar empresa** para editar a estrutura.
2. Em **Etapas e nome da empresa**, salve o nome da organização.
3. Adicione todas as áreas. Arraste os blocos para posicioná-los. Para criar uma linha, abra **Editar** no bloco subordinado e escolha a área superior. Cada bloco aceita um superior e vários subordinados.
4. Mude a etapa para **Cargos**. Os líderes acessam a mesma conta ADMIN, um por vez. Cada um seleciona sua área, cria os cargos e classifica o nível como **Liderança**, **Gestão** ou **Consultoria**. Para criar uma linha, escolha o cargo superior ao adicionar/editar o cargo subordinado. É possível ligar cargos de áreas diferentes para representar a direção da empresa.
5. Para editar, selecione e clique em **Editar**, ou dê duplo clique. Para remover uma linha, edite o subordinado e selecione **Sem vínculo**. Excluir um item com dependentes ou colaboradores é bloqueado: primeiro remova os vínculos ou realoque as pessoas.
6. Depois de todas as áreas terem cargos, mude a etapa para **Cadastros abertos**.
7. Cada colaborador cria sua conta na página inicial, escolhendo área e cargo. Em **Gerenciar equipe**, o ADMIN confirma ou corrige o cargo e aprova o acesso. Escolher um cargo não concede administração. Esse fluxo de acesso é o já existente; publicações e novos conhecimentos não passam por aprovação.
8. Colaboradores aprovados usam os feeds gerais e da área, conforme o nível do cargo, além de publicações, comentários, reconhecimentos, salvos, notificações, diretório, organograma e ranking de quem mais compartilha.

### Pesquisa global

A barra **Pesquisar** e a aba **Pesquisa** procuram em publicações, comentários e pessoas sem limitar os resultados ao feed aberto. A busca só apresenta conteúdo que o usuário tem permissão para acessar. Todos os termos digitados são considerados; coloque uma expressão entre aspas para exigir a frase exata. Os resultados podem ser filtrados por tipo, área e período, ordenados por relevância ou data e carregados em blocos. Títulos e conhecimentos associados recebem peso maior na relevância. Abrir um resultado leva ao feed e à publicação correspondente.

Cada novo login ADMIN invalida a sessão administrativa anterior. O nome do operador fica no histórico, mas é autodeclarado porque a credencial é compartilhada. Não há isolamento entre líderes na conta ADMIN: todos os responsáveis têm os mesmos poderes, conforme o fluxo solicitado. `/admin` não aparece na navegação pública; a proteção efetiva é feita por senha e autorização no servidor.

## Como os dados funcionam

- `areas`: áreas com nome, área superior e coordenadas.
- `positions`: cargos vinculados a uma área, cargo superior, nível de acesso e coordenadas.
- `users`: colaboradores, hash de senha, cargo e aprovação; a área é derivada do cargo.
- `company`: nome, etapa e revisão da estrutura.
- `sessions`, `posts`, `comments`, `reactions`, `notifications`, `audit`: demais recursos.
- `knowledge_areas` e `knowledge_items`: catálogo-base da Mind e conhecimentos sugeridos pelas equipes. Não têm `company_id`; as empresas na mesma instalação consultam o mesmo catálogo.
- `post_knowledge`: liga cada publicação a um ou mais conhecimentos escolhidos.
- `user_knowledge`: conhecimentos selecionados pelas pessoas em seus perfis.
- `knowledge_details`: descrições e exemplos cadastrados ou editados na instalação.
- `company_guide`: orientações da empresa e sua revisão para evitar sobrescritas de edições concorrentes.

O catálogo inicial tem **20 áreas e 321 conhecimentos**, cobrindo gestão, finanças, pessoas, vendas, marketing, tecnologia, dados, engenharia, operações, projetos, qualidade, logística, jurídico, sustentabilidade e outros temas. Ele é carregado automaticamente em cada instalação. Na publicação, o usuário pode navegar por área, pesquisar pelo nome diretamente ou cadastrar um termo em uma área; novos termos ficam disponíveis aos usuários daquela instalação. Instalações independentes da Mind não compartilham automaticamente os catálogos.

A organização segue a ideia de catálogos profissionais hierárquicos e pesquisáveis. O conteúdo da Mind é uma seleção original em português, sem copiar a taxonomia proprietária do LinkedIn:
- O*NET organiza informações profissionais em grupos como habilidades e conhecimentos: https://www.onetcenter.org/content.html
- ESCO oferece uma classificação multilíngue de competências e ocupações: https://esco.ec.europa.eu/en/about-esco/what-esco
- LinkedIn descreve o Skills Graph como uma taxonomia própria com relações entre habilidades: https://www.linkedin.com/blog/engineering/data/building-maintaining-the-skills-taxonomy-that-powers-linkedins-skills-graph

Criar um cargo insere uma linha em `positions`, sem criar uma tabela SQL nova para cada cargo. Isso permite quantos cargos forem necessários sem alterar o código ou o esquema. Os nomes não são fixos no JavaScript. A árvore de áreas e a árvore de cargos são editáveis em abas próprias. Os cargos guardam a área e podem se reportar a um cargo de outra área.

Dados locais ficam em `data/mind.sqlite`. Fechar ou reiniciar o servidor preserva tudo. Para backup simples, pare o servidor antes de copiar a pasta `data`. Não envie `.env` ou `data` para repositórios públicos.

## Conectar ao Supabase depois

Esta versão usa **Supabase como PostgreSQL**, através do servidor Node. A autenticação é da própria aplicação (scrypt e cookie HttpOnly); **Supabase Auth, confirmação de e-mail e recuperação por e-mail não estão integrados**. Isso evita depender de credenciais externas para testar o fluxo agora.

1. Crie seu projeto no Supabase e copie a conexão em **Connect → Session pooler** (porta 5432), ou use a conexão direta se sua rede suportar.
2. Instale as dependências com `npm install` (o adaptador usa `pg`).
3. No `.env`, defina:

```dotenv
DB_PROVIDER=postgres
DATABASE_URL=postgresql://postgres.PROJECT:SENHA@HOST:5432/postgres
```

Use os valores reais fornecidos pelo projeto. Codifique caracteres especiais na senha da URL. Não acrescente parâmetros `sslmode` que substituam a configuração SSL do adaptador. O código verifica o certificado TLS (`rejectUnauthorized: true`). Se sua cadeia exigir o certificado do projeto, baixe-o do painel e configure `NODE_EXTRA_CA_CERTS` no `.env` ou no ambiente do processo. Não desative a verificação TLS.

4. Para começar com banco vazio, execute `npm start`: ele cria o schema privado `mind`, as tabelas e o primeiro ADMIN. A conexão usada precisa ter permissão para criar esse schema.
5. **Para preservar os dados de teste SQLite**, pare o servidor e rode a migração antes do primeiro início contra PostgreSQL:

```powershell
node --env-file=.env scripts/migrate-to-supabase.mjs
```

O destino precisa estar vazio. A migração cancela e reverte se encontrar registros. Copia usuários, hashes, estrutura e conteúdo, preservando IDs. Não copia sessões; será necessário entrar novamente. Depois inicie com `DB_PROVIDER=postgres`.

O schema `mind` deve permanecer fora da lista de schemas expostos pela Data API. A conexão e a senha ficam exclusivamente no servidor. O navegador acessa só `/api`; não recebe chave administrativa do Supabase. Não há acesso direto anônimo às tabelas. Se no futuro optar por Supabase Auth/Data API no navegador, será necessário adaptar sessões e criar políticas RLS específicas antes de expor o schema.

Documentação de referência:
- https://supabase.com/docs/guides/database/connecting-to-postgres
- https://supabase.com/docs/guides/database/secure-data
- https://supabase.com/docs/guides/auth

O caminho PostgreSQL está implementado, mas não foi validado contra um projeto Supabase real nesta entrega por ausência das credenciais. A troca de configuração não copia automaticamente o SQLite; use o script acima se desejar preservar os registros.

## Estrutura do código

| Caminho | Responsabilidade |
| --- | --- |
| `public/index.html` | Entrada da interface |
| `public/style.css` | Layout responsivo |
| `public/app.js` | Telas, editor e chamadas à API |
| `public/search-utils.mjs` | Normalização de acentos, frases e relevância da busca |
| `public/knowledge-guides.mjs` | Descrições e exemplos introdutórios do catálogo |
| `public/dashboard-view.mjs` | Interface do dashboard e exportação CSV |
| `server/index.mjs` | Servidor, autenticação e endpoints |
| `server/dashboard.mjs` | Filtros e cálculo dos indicadores administrativos |
| `server/database.mjs` | Adaptadores SQLite e PostgreSQL, transações |
| `server/domain.mjs` | Hash, validação e detecção de ciclos |
| `server/knowledge-catalog.mjs` | Catálogo inicial da Mind com áreas e conhecimentos |
| `database/schema.sql` | Esquema relacional compartilhado |
| `scripts/migrate-to-supabase.mjs` | Migração única de dados |
| `tests/integration.test.mjs` | Fluxos e permissões pela API |
| `tests/search.test.mjs` | Frases exatas, acentos e ordem por relevância |
| `tests/dashboard.test.mjs` | Totais, limites de datas, setores, casos vazios, CSV e cobertura do catálogo |

## Regras e limites desta versão

- Uma empresa por instalação; um cargo por colaborador; um superior por área/cargo.
- Feeds gerais da empresa e feeds por área podem ser separados por público: todos, consultoria, gestão e liderança. A categoria é configurada no cadastro do cargo e também determina os feeds visíveis; não depende do texto/nome do cargo. Liderança pode consultar todas as áreas. Somente ADMIN pode gerenciar estrutura e aprovações.
- Usuários podem editar e excluir suas próprias publicações e comentários; ADMIN pode moderar exclusões. Mensagens não são entregues por e-mail.
- Sessões duram 8 horas. Falhas de persistência retornam erro; alterações em transações são revertidas. Revisão otimista impede que uma configuração antiga sobrescreva outra.
- Atualize a página do navegador para buscar mudanças feitas por outras sessões. Não há atualização em tempo real.
- Banco e contas de teste do protótipo antigo não são importados: a estrutura começa vazia.
- A carga é adequada para teste/apresentação e equipes pequenas. Paginação de conteúdo, recuperação de senha, convite por e-mail, MFA e rate limiting distribuído seriam etapas posteriores de operação em escala.
- Para acesso externo, hospede o servidor Node com HTTPS, ajuste `APP_ORIGIN` para a origem exata, `COOKIE_SECURE=true` e `HOST=0.0.0.0`. Hospedagem apenas de arquivos estáticos não executa este backend.
- A senha ADMIN do `.env` só é usada no primeiro início. Depois disso, altere-a em **Meu perfil**. Alterar a variável não substitui a senha já cadastrada.

## Verificações

```powershell
npm test
```

A suíte usa banco temporário e testa o fluxo área → cargo → abertura → cadastro → aprovação, ciclos, conflitos de revisão, permissões administrativas, isolamento de feeds, exclusão de itens em uso, sessão ADMIN exclusiva e persistência após reinício. Não modifica a base da apresentação.
