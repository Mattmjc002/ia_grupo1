# MIND 1.1.1 — Riscos do Conhecimento da Empresa

Implementação sobre `Mind_app_4_ChatGpt_Conhecimento(5).zip`, de 26/09/2026.

## O que mudou

- Somente conhecimentos com declarações ou publicações entram na análise. Catálogo sem vínculos não gera alerta nem aumenta o contador de dados insuficientes.
- Detentores são colaboradores ativos que selecionaram o tema no perfil. Autores sem declaração continuam no mapa, mas não são contados como detentores.
- Risco alto, Atenção, Sem alerta observado ou Dados insuficientes, sempre com motivo. Não há criticidade, importância presumida, probabilidade de perda nem porcentagens fictícias de documentação/cobertura.
- Dashboard, CSV, rede, detalhe e simulação de saída usam a mesma interpretação. A simulação preserva posts e os temas do último detentor que sai.
- O risco usa todo o histórico do setor e a situação atual, independente do período de atividade selecionado.
- O endpoint da rede respeita a visibilidade dos posts da conta solicitante. A administração consulta o histórico completo.
- As regras da senha administrativa estão explícitas no `.env.example`, conforme solicitado anteriormente. O login preserva os espaços da senha, como cadastro e troca já faziam.

## Atualizar sem perder dados

1. Pare o servidor com **Ctrl+C** e faça backup da pasta antiga `mind-app`.
2. Extraia o ZIP em outra pasta. Abra `MIND_v1_1_Conhecimento/mind-app`.
3. Se houve uso após o envio do ZIP, copie o `.env` e `data` da instalação mais recente para a nova pasta, com o servidor parado. Não substitua dados mais recentes pela cópia anexada. Preserve caminhos personalizados em `SQLITE_PATH`.
4. Dentro de `mind-app`, execute `npm.cmd install` e depois `npm.cmd start` no Windows, ou `npm install` e `npm start` em outros sistemas.
5. Abra o endereço de `APP_ORIGIN` e use **Ctrl+F5**. Entre como administrador e abra o Dashboard.

Requer Node.js 24+. Não é necessário recriar o banco, trocar senha ou apagar tabelas. O banco e o `.env` recebidos foram mantidos sem alterações. A avaliação ocorre na leitura; `knowledge_risk_config` permanece por compatibilidade, sem uso no novo cálculo.

Este pacote contém dados e configuração da instalação recebida. Não o publique em um repositório público.

## Limites

- Autodeclaração não certifica domínio. Ausência de posts na MIND não prova ausência de documentos externos. Especialização concentrada pode ser normal: a empresa decide se precisa agir.
- Registros antigos pedem revisão, não comprovam obsolescência. A janela de 180 dias é uma regra inicial explícita.
- O sistema possui bloqueio de conta, não um evento formal de desligamento. Contas bloqueadas são inativas na análise, sem presumir o motivo do bloqueio.
- Feeds preservam a política anterior: posts de contas bloqueadas não aparecem ali durante o bloqueio. Continuam no banco e na análise histórica. Simular saída não muda o feed ou o banco.
- Não existe histórico de declarações removidas manualmente. Excluir todas as declarações e posts de um tema remove suas evidências do radar.
- Dependências entre conhecimentos e avaliação de completude documental não foram implementadas nem presumidas.
- Não houve inspeção visual em navegador: o Chromium não está instalado no ambiente. Os testes de HTML não substituem revisão visual local. PostgreSQL/Supabase ao vivo não foi validado.

## Organização do código

`server/knowledge-risk.mjs`: regras puras. `server/knowledge-intelligence.mjs`: escopo, conexões, declarações e simulação. `server/dashboard.mjs`: totais. `server/index.mjs`: módulo estático, permissões de evidências e senha sem trim. `public/knowledge-risk-view.mjs`: componentes e explicações. `public/dashboard-view.mjs`, `public/app.js` e `public/style.css`: integração visual. Testes de risco, Dashboard, views e integração cobrem a alteração.

Regras em `INTELIGENCIA_CONHECIMENTO.md`; validação em `VALIDACAO_RISCOS.md`.
