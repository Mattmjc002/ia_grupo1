MIND — atualização da versão anterior para a v1.1 Conhecimento
A principal mudança foi que a MIND deixou de tratar conhecimento apenas como uma lista de competências cadastradas e passou a ter uma camada de inteligência organizacional sobre o conhecimento da empresa.
- O catálogo foi ampliado de aproximadamente 321 registros para 1.580 conhecimentos, organizados nas mesmas 20 macroáreas.
- Esses 1.580 registros são consolidados em 1.563 conceitos únicos, evitando que um mesmo conhecimento precise existir como conceitos separados só porque aparece em áreas diferentes.
- Foi criada uma matriz de afinidade, permitindo que um conhecimento tenha relação com várias áreas ao mesmo tempo e com pesos diferentes. Por exemplo, Python pode ter forte relação com Tecnologia e Dados, mas também relação com Engenharia, Pesquisa e outras áreas.
- Foram adicionados 89 perfis profissionais, como Back-end, Front-end, DevOps, Ciência de Dados, Engenharia de Dados, Pesquisa Operacional, Processos, Qualidade, Supply Chain, Produto, PMO, Comercial, FP&A etc.
- Foram adicionadas 12 dimensões de capacidade, como técnica, analítica, operacional, estratégica, gerencial, comercial, criativa, interpessoal, regulatória, científica, pedagógica e digital.
- A MIND agora consegue gerar um perfil profissional inferido para cada colaborador com base nos conhecimentos que ele possui e utiliza, sem alterar a área oficial definida pela empresa.
- O sistema passou a diferenciar área oficial da empresa de perfil de conhecimento identificado pela MIND.
- O organograma ganhou um novo modo chamado Rede de conhecimentos, em que colaboradores e conhecimentos aparecem como nós conectados por linhas.
- Ao selecionar uma pessoa ou conhecimento, as conexões relacionadas ficam destacadas e o restante da rede é visualmente reduzido.
- Foi criado um sistema de cobertura ponderada de conhecimento. A MIND não calcula simplesmente quantas pessoas da empresa sabem Java, por exemplo; ela tenta considerar para quais pessoas Java realmente é relevante.
- Foi criado um índice de risco de conhecimento, que considera cobertura, concentração em poucas pessoas, documentação existente, atualidade das evidências e relevância daquele conhecimento.
- A rede usa estados visuais de risco: vermelho para crítico, amarelo para atenção, verde para saudável e cinza quando não existem dados suficientes.
- Os limites iniciais de cobertura estão configurados em 35% para crítico e 65% para atenção, mas agora são parâmetros do sistema e podem ser alterados posteriormente.
- A MIND passou a detectar pontes de conhecimento, ou seja, pessoas que conectam diferentes áreas e conjuntos de competências.
- Também passou a detectar competências transversais, quando alguém demonstra conhecimentos fortes fora do padrão predominante de sua área oficial.
- O perfil do colaborador agora pode mostrar sua distribuição por macroáreas, perfis profissionais e capacidades.
- O dashboard administrativo ganhou um Radar de Conhecimento, mostrando saúde das áreas, conhecimentos críticos, conhecimentos em atenção, conhecimentos saudáveis, principais riscos, pontes entre áreas e competências transversais.
- Foi adicionada a função Simular saída, que permite ao administrador retirar virtualmente um colaborador da rede sem apagar nada e ver quais conhecimentos ficariam mais frágeis ou sem outro detentor.
- Essa simulação também procura pessoas potencialmente adequadas para receber a transferência daquele conhecimento.
- A estrutura já foi preparada para o futuro fluxo de offboarding e sucessão de conhecimento.
- Conhecimentos declarados no perfil e conhecimentos efetivamente utilizados em publicações podem servir como evidências diferentes para o motor de inteligência.
- A recência dessas evidências também passou a fazer parte da arquitetura.
- O sistema continua permitindo que a própria empresa crie novos conhecimentos; os 1.580 não são um limite.
- A estrutura do banco foi ampliada com tabelas específicas para conceitos, afinidades, perfis profissionais, capacidades e configuração de risco.
- Foi criado o novo módulo de backend knowledge-intelligence.mjs, responsável pela lógica dessa inteligência.
- Foi criado o documento INTELIGENCIA_CONHECIMENTO.md, registrando a arquitetura e as regras dessa nova camada.
- A versão foi atualizada para 1.1.0.
O que não mudou conceitualmente é importante também: a MIND não decide que um funcionário “deve” mudar de área e não substitui a estrutura formal da empresa. A área e o cargo oficiais continuam sendo definidos pela empresa; a camada nova funciona como leitura analítica do conhecimento existente.
Também não implementamos ainda o “Pergunte à MIND” com IA/RAG. O que essa versão fez foi construir justamente a fundação para isso: agora existe um grafo estruturado de pessoas → conhecimentos → áreas → perfis → capacidades → risco.
E validei novamente essa versão: 14 de 14 testes automatizados estão passando.
Se quiser registrar em uma frase curta no histórico de versões, eu usaria:
v1.1 — Inteligência de Conhecimento: expansão do catálogo para 1.580 conhecimentos e criação de uma rede organizacional capaz de inferir perfis profissionais, medir cobertura e risco de conhecimento, identificar competências transversais e simular o impacto da saída de colaboradores.