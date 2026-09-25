# Validação desta entrega

- JavaScript do servidor e da interface: verificação de sintaxe aprovada.
- `npm test`: 2 testes aprovados. A integração percorre etapas, persistência, aprovação, permissões, isolamento dos feeds por nível (consultoria, gestão e liderança), exclusão referencial e troca de sessão ADMIN.
- `node --check` aprovado para `public/app.js`, `server/index.mjs` e `server/database.mjs`.
- Navegador real: não concluído. Arraste por mouse/toque, aspecto visual e responsividade precisam ser conferidos no navegador ao executar localmente.
- Supabase real: não conectado e não validado, por ausência de um projeto/credenciais. Adaptador PostgreSQL, schema SQL e migração estão incluídos.

Os testes usam bancos temporários, que não acompanham o pacote. A apresentação começa com uma empresa vazia e o ADMIN criado a partir do seu `.env`.
