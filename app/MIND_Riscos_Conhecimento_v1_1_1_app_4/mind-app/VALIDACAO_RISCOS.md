# Validação — MIND 1.1.1

Data: 26/09/2026. Ambiente: Linux, Node.js v24.19.0, SQLite nativo.

## Resultado

`npm test`: **34 testes aprovados, 0 falhas**.

- Catálogo amplo sem pessoas/evidências: nenhum risco e nenhum falso contador de dados insuficientes.
- Detentor único sem posts: alerta qualitativo explicado.
- Autor sem declaração: não vira detentor; estado Dados insuficientes.
- Especialização, vários detentores, vários autores e registros recentes/antigos.
- Datas ausentes, inválidas e futuras sem falsa precisão.
- Alterar cargos, afinidades ou tamanho da equipe não muda o risco do mesmo conjunto de evidências.
- Aliases canônicos não duplicam pessoas ou publicações.
- Pendentes excluídos e declarações históricas de bloqueados preservadas.
- Simulação sem mutação, documentos preservados e resultado coerente com bloqueio real.
- Períodos e filtros por setor; ausência de mistura com evidências exclusivas de outro setor.
- Permissões administrativas e posts restritos respeitados na rede.
- Dashboard, detalhe, rede, estado vazio e nós históricos sem conexão ativa.
- CSV com Dados insuficientes, sem colunas percentuais legadas e com proteção contra fórmulas.
- Nenhum corte silencioso depois do 25º/100º conceito no Dashboard e CSV.
- Demais regressões: cadastro/aprovação, estrutura, feeds, perfil, busca, guia, sessão, persistência após reinício e senha com espaços.

Os módulos de frontend/backend alterados também passaram por `node --check`.

## Banco recebido

A análise foi feita sobre uma cópia descartável. Integridade SQLite: `ok`; nenhuma violação de chave estrangeira. A cópia enviada possui 1.580 itens, 1.563 conceitos canônicos e nenhum colaborador ativo/evidência no escopo. Consequentemente, a análise nova mostra **zero conceitos observados e zero alertas**, sem classificar o catálogo como risco. O cadastro e as publicações alimentarão a análise conforme o uso.

O SQLite e o `.env` incluídos na entrega são os mesmos bytes recebidos no ZIP original. Testes HTTP usam bancos temporários. Nenhuma conta administrativa, senha, publicação ou dado do usuário foi alterado pelos testes.

## Limites da validação

- Testes de composição HTML executam os templates, inclusive a rede e o detalhe, mas não equivalem a inspeção visual, layout real ou acessibilidade por leitor de tela.
- O Chromium não está instalado; não houve teste visual em navegador. Recomenda-se conferir desktop, celular e temas claro/escuro após atualizar com Ctrl+F5.
- PostgreSQL/Supabase e execução em Windows não foram testados ao vivo. Nenhuma alteração de esquema ou SQL específico de um novo provedor foi necessária.
- As categorias são regras qualitativas explícitas, não um modelo estatístico de probabilidade ou auditoria de competências.
