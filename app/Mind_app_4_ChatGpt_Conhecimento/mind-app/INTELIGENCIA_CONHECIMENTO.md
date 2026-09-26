# MIND — Inteligência de conhecimento

Esta versão transforma o catálogo em um grafo de conhecimento organizacional. A estrutura oficial da empresa continua sendo a fonte de verdade para área e cargo. Os sinais calculados pela MIND são analíticos: ajudam a encontrar conhecimento, visualizar concentração e planejar transferência, mas não reclassificam pessoas automaticamente.

## Escala atual

- 20 macroáreas de conhecimento.
- 1.580 registros de catálogo.
- 1.563 conceitos canônicos após deduplicação entre áreas.
- 89 perfis profissionais.
- 12 dimensões transversais de capacidade.
- 2.502 afinidades conceito ↔ macroárea, 1.846 afinidades conceito ↔ perfil profissional e 9.106 afinidades conceito ↔ capacidade na versão atual do catálogo.
- A comunidade continua podendo criar novos conhecimentos; portanto, o catálogo não é um limite máximo.

## Modelo

O catálogo físico (`knowledge_items`) preserva a área em que cada termo foi cadastrado. A camada derivada cria `knowledge_concepts`, permitindo que o mesmo conceito seja único mesmo quando aparece em mais de uma macroárea. As tabelas de afinidade atribuem pesos de 0 a 100 entre conceito, macroárea, perfil profissional e capacidade.

Exemplo conceitual: `Python` pode ter afinidade muito alta com Tecnologia e Dados, além de afinidades menores com Ciência, Engenharia e Finanças. Isso evita classificar uma pessoa por uma única etiqueta.

## Perfil inferido

Cada pessoa recebe vetores de domínios, perfis profissionais e capacidades. A evidência parte de conhecimentos declarados no perfil e de conhecimentos realmente associados às publicações. Publicações repetidas aumentam a evidência; a recência também contribui. O resultado possui uma confiança própria e aparece separado da área oficial.

## Cobertura ponderada

Um conceito não é cobrado de toda a empresa. Para cada pessoa, a MIND estima a relevância daquele conceito usando o perfil individual e o perfil agregado da área oficial. Somente relevâncias acima do piso configurado entram no denominador.

`cobertura = soma(relevância das pessoas relevantes que possuem o conceito) / soma(relevância de todas as pessoas relevantes)`

Assim, Java pode ser relevante para desenvolvedores sem ser exigido de uma pessoa de Comercial. Se alguém de Comercial souber Java, a conexão continua existindo, mas ela não distorce a necessidade do núcleo técnico.

## Risco

O índice de risco combina:

- falta de cobertura;
- concentração em poucos detentores;
- falta de documentação/publicações;
- envelhecimento da evidência;
- importância média daquele conhecimento para as pessoas relevantes.

Os limites iniciais de cobertura são 35% para crítico e 65% para atenção. Eles ficam em `knowledge_risk_config`, e foram mantidos como parâmetros — não como verdade universal.

## Rede visual

Em **Organograma > Rede de conhecimentos**, os nós de pessoas se conectam aos nós de conhecimento. Ao selecionar uma pessoa ou conceito, suas ligações são destacadas e o restante da rede é atenuado. A situação do conhecimento usa vermelho para crítico, amarelo para atenção, verde para saudável e cinza quando ainda não existem dados suficientes.

O painel lateral mostra cobertura, risco, documentação, afinidades de área, perfis relacionados e detentores do conhecimento.

## Perfis, pontes e competências transversais

O perfil individual mostra a leitura da MIND por domínio, perfil profissional e capacidade transversal. O motor também detecta pessoas que conectam diferentes domínios (`bridgeScore`) e competências que aparecem fora do padrão predominante da área oficial. Esses sinais servem para descobrir colaboração potencial e talentos transversais, nunca para decidir movimentações de pessoas automaticamente.

## Dashboard administrativo

O Radar de conhecimento mostra a saúde agregada das macroáreas, quantidade de conhecimentos críticos/em atenção/saudáveis, principais riscos, pontes entre áreas e competências transversais. O CSV do dashboard também inclui a seção de Radar.

## Simulação de saída

Administradores podem abrir o perfil de um colaborador e usar **Simular saída**. Nenhum dado é alterado. O motor recalcula a rede ignorando aquela pessoa e mostra:

- conhecimentos ligados ao colaborador;
- novos conhecimentos críticos;
- conceitos sem outro detentor;
- queda média de cobertura;
- variação de risco e cobertura por conceito;
- pessoas com maior relevância como possíveis destinatárias para transferência.

Isso forma a base do fluxo futuro de offboarding guiado e sucessão de conhecimento.

## Persistência e migração

As tabelas de inteligência são derivadas e podem ser reconstruídas pelo `syncKnowledgeIntelligence`. A reconstrução não apaga `user_knowledge`, publicações ou estrutura da empresa. A migração adiciona `proficiency` e `updated_at` a `user_knowledge` quando necessário.

## Próximas extensões naturais

A arquitetura já aceita novos conceitos, perfis e regras. A próxima camada pode usar embeddings/RAG para sugerir conhecimentos a partir do texto das publicações e responder perguntas com fontes, mantendo o grafo atual como contexto estruturado e explicável.
