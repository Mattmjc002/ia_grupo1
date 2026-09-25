# Validação desta entrega

## Verificações concluídas

- **14 testes aprovados** com `npm test`.
- Fluxo de configuração, cadastros, níveis de acesso e isolamento das publicações por feed.
- Acesso ao dashboard recusado a visitantes, colaboradores e cargos de liderança sem administração.
- Indicadores com datas inclusivas, período anterior equivalente, filtro por setor do autor, comentários recentes em posts antigos e comportamento com dados vazios.
- Totais de reconhecimentos e salvamentos, contagem de autores distintos, conhecimentos declarados sem registros e concentração de relatos em uma pessoa.
- CSV com acentos, delimitadores e proteção contra interpretação de textos como fórmulas.
- Persistência de perfil, conhecimentos selecionados, descrições e orientações da empresa após reiniciar o servidor.
- Controle de edição das descrições e rejeição de revisões antigas do guia.
- Busca com acentos, palavras em campos diferentes, frases exatas e relevância.
- Montagem das telas de perfil, catálogo, detalhe, pesquisa e guia: navegação esperada, separação entre conhecimentos declarados e utilizados, texto escapado e controles administrativos. Estes testes executam as funções da interface em um ambiente JavaScript simulado; não verificam layout.
- Cobertura dos **321 conhecimentos iniciais em 20 áreas**: todos têm descrição e exemplo introdutório. Os exemplos são ilustrativos; experiências da empresa vêm dos posts.
- Atualização local validada sobre o schema extraído do ZIP anterior `mind-app-pesquisa-global.zip`: nome da empresa, área e publicação existentes foram preservados; novas tabelas ficaram disponíveis.
- Verificação de sintaxe dos arquivos JavaScript/MJS.

## Limites da verificação

- **Navegador real e revisão visual pendentes.** O ambiente não possuía navegador instalado e o download do navegador de teste não estava disponível. Responsividade, aparência e interações completas por mouse, toque e teclado precisam ser conferidas ao executar localmente.
- Banco externo não foi implantado nem conectado nesta entrega. O caminho PostgreSQL existente não foi validado contra um serviço real.
- A conta administrativa compartilhada e o fluxo existente de liberação de acesso foram preservados. Publicações e cadastro de conhecimentos não exigem aprovação.

Os testes usam bases temporárias, que não acompanham o ZIP. Para preservar os dados da sua instalação, siga `ATUALIZAR.md`.
