# Validação desta entrega

- JavaScript do servidor e da interface: verificação de sintaxe aprovada.
- `npm test`: 2 testes aprovados. O segundo percorre a integração completa e inclui dezenas de requisições/assertivas: etapas, persistência, aprovação, permissões, isolamento, exclusão referencial e troca de sessão ADMIN.
- Verificação complementar com DOM simulado: oito telas renderizadas, dois nós e uma ligação no editor, modais e escape de conteúdo aprovados. A ferramenta auxiliar não é dependência da aplicação.
- Navegador real: não concluído. O ambiente não possuía Chromium e o download do navegador falhou. Arraste por mouse/toque, aspecto visual e responsividade precisam ser conferidos no navegador ao executar localmente.
- Supabase real: não conectado e não validado, por ausência de um projeto/credenciais. Adaptador PostgreSQL, schema SQL e migração estão incluídos.

Os testes usam bancos temporários, que não acompanham o pacote. A apresentação começa com uma empresa vazia e o ADMIN criado a partir do seu `.env`.
