# MIND — Demonstração Orion

Empresa fictícia pronta para apresentação, com o banco SQLite já preenchido.

1. Extraia o ZIP completo em uma pasta nova.
2. Com Node.js 24 ou superior, execute `INICIAR_ORION.bat` ou `npm start` nesta pasta.
3. Abra **http://localhost:3000/admin**.
4. Entre com **admin@orion.example** e **OrionDemo2026!**. Informe seu nome no campo de operador.

São 14 áreas, 66 funcionários ativos, 350 publicações, 1.495 comentários, 5.347 reconhecimentos e 24 conhecimentos próprios da Orion. Há perfis, projetos interligados, notificações, salvamentos, cadastros pendentes e casos para a simulação de saída.

Leia **[APRESENTACAO_ORION.md](APRESENTACAO_ORION.md)** para contas de demonstração, roteiro e instruções de uso. **EQUIPE_ORION.csv** lista os perfis fictícios. **VALIDACAO_ORION.md** registra as verificações da entrega.

O banco está em `data/orion-demo.sqlite`. O gerador `npm run demo:gerar` cria uma nova cópia com datas atuais e nunca substitui um banco existente. A configuração específica da demonstração é `ORION_DATABASE`.

A documentação técnica da base foi mantida em [DOCUMENTACAO_MIND.md](DOCUMENTACAO_MIND.md). O comando original está disponível como `npm run start:mind`; para apresentar a Orion, use `npm start`.
