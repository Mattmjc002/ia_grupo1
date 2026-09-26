# MIND — Inteligência de conhecimento 1.1.1

A MIND ajuda a preservar e compartilhar o que a empresa registra que sabe. Não prescreve o que ela deveria saber. A camada de descoberta por afinidade continua existindo, mas não participa do risco.

## Catálogo e escopo

O catálogo base tem 1.580 itens, 20 macroáreas e 1.563 conceitos canônicos. A comunidade pode acrescentar termos. A normalização liga itens equivalentes a um conceito; declarações da mesma pessoa e posts vinculados a vários aliases contam uma vez por conceito. Afinidades com 89 perfis profissionais e 12 capacidades são usadas para descoberta, nunca para atribuir importância ou necessidade.

Um conceito entra na análise quando há declaração de colaborador ativo/bloqueado ou publicação de autor ativo/bloqueado. Um item apenas cadastrado no catálogo, inclusive comunitário ainda sem uso, não entra. Pendentes não entram. Administradores podem documentar, mas não são detentores da equipe.

As fontes são user_knowledge, posts e post_knowledge. Guias genéricos do catálogo não são documentação da empresa. Comentários, curtidas, salvamentos, cargo, afinidade e tamanho da equipe não atribuem domínio nem influenciam o risco.

holders contém somente declarações de colaboradores ativos. connections inclui também autores ativos sem declaração. O mapa identifica a natureza de cada conexão. Nenhuma declaração é uma certificação.

## Regras e precedência

Motor: server/knowledge-risk.mjs. Modelo: observed-evidence-v1.

| Ordem | Condição observada | Situação |
|---|---|---|
| 1 | Zero declarações ativas, mas declarações históricas de inativos | Risco alto — sem detentor ativo identificado |
| 2 | Publicações sem declaração ativa ou histórica | Dados insuficientes — confirmar detentores |
| 3 | Uma declaração ativa e nenhuma publicação | Risco alto — concentração e ausência de registros |
| 4 | Uma declaração ativa; ausência de publicações com várias declarações; apenas um autor; ou último registro há mais de 180 dias | Atenção — motivo observado |
| 5 | Nenhum alerta acima, mas sem data válida de publicação | Dados insuficientes |
| 6 | Duas ou mais declarações ativas, dois ou mais autores e registro recente | Sem alerta observado — não significa risco zero |

Motivos: perda de detentor/ausência de declaração, concentração de declarações, ausência de posts, registro antigo, concentração de autores, data não avaliável. Um alerta observável pode aparecer mesmo com lacunas em outros dados. Isso não produz uma pontuação estimada.

A data é a última updated_at ou created_at válida não futura dos posts. A janela é estritamente maior que 180 dias completos em UTC. Essa é a recência do registro, não uma revisão técnica. Datas inválidas/ausentes/futuras não produzem falsa atualidade.

Categorias internas critical, attention, healthy e unknown permanecem por compatibilidade visual. Seus rótulos são Risco alto, Atenção, Sem alerta observado e Dados insuficientes. Não há entidade de criticidade.

## Sem denominadores inventados

Não existe equipe-alvo definida pela empresa nem rubrica validada de completude documental. Por isso coverage, documentation e risk são null (não zero), não têm cálculo e não são mostrados como porcentagens. Foram retirados importance, relevantPeople, relevantCount e coverageStatus. A quantidade de posts e autores é evidência de registro, não comprovação de documentação completa.

## Contratos

GET /api/knowledge/network exige sessão ativa e filtra posts por canRead. Declarações continuam organizacionais, como nos perfis: um conceito pode entrar por declaração mesmo quando seus posts são restritos àquela conta. Zero posts é relativo ao escopo visível. O administrador vê o histórico completo.

GET /api/admin/dashboard exige administrador. O filtro de setor seleciona o setor atual dos declarantes/autores antes da análise. Riscos usam situação atual e todo o histórico; outros indicadores mantêm o período selecionado. Posts administrativos aparecem na análise de toda a empresa.

Campos dos conceitos observados:

- id, name, source, knowledge_id e knowledge_ids: identidade canônica e aliases.
- primaryAreas, areaAffinities, professionalAffinities: descoberta; não entram no risco.
- holders: pessoa, declaração, proficiência autodeclarada e publicações.
- connections: pessoas ativas vinculadas, declared e publications.
- formerHolderCount: declarações de pessoas inativas no cenário.
- riskStatus, assessment, known, riskModel, observed, mainReason, reasons e limitations: avaliação explicável.
- publications, authors, lastUsed, ageDays, documentationStatus e freshness: registros observados.
- risk, coverage e documentation: null, compatibilidade de leitura sem cálculo numérico.

summary.concepts agora é o total observado. summary.catalogConcepts é o total canônico do catálogo; excludedCatalogConcepts é a diferença. critical + attention + healthy + unknown = concepts, independente de eventual conceptLimit. domainHealth agrupa apenas conceitos observados por áreas primárias; um conceito pode aparecer em mais de um domínio, então as linhas não devem ser somadas como conceitos únicos.

Dashboard e CSV incluem todos os observados, sem o corte anterior de 25/100 itens. O mapa mantém 36 conceitos por filtro para legibilidade e permite buscar outros. Há texto junto às cores; CSV mantém proteção contra fórmulas.

## Simulação

GET /api/admin/knowledge/simulate?id=... exige administrador. Reavalia sem a pessoa entre os ativos, preservando declarações históricas e posts. Não altera dados.

Retorna beforeHolders, remainingHolders, lostDeclaredHolder, beforeStatus, afterStatus, publicationsPreserved e mainReason. Não retorna queda de cobertura ou probabilidade. orphaned conta apenas conceitos que perdem uma declaração real e ficam sem outra ativa; saída de mero autor não inventa detentor perdido. newCritical mantém o nome legado para novos alertas de risco alto.

Pessoas sugeridas para conversa são autores ativos do próprio tema sem declaração. Não se presume domínio ou disponibilidade; a escolha de transferência cabe à empresa.

## Persistência e compatibilidade

Nenhuma migração destrutiva ou preenchimento manual é necessário. knowledge_risk_config permanece no esquema para compatibilidade, mas seus limites são ignorados. O índice de afinidades INTELLIGENCE_VERSION = 3 não mudou.

Exclusão de posts ou retirada de declaração remove suas evidências. Não foi criado histórico de exclusões. Bloqueio preserva declarações e posts no banco. Feeds mantêm autores ativos; a análise de risco mantém evidências históricas de bloqueados. Reativar a conta restaura os posts ao feed.

## Testes e limites

npm test cobre catálogo sem evidência, declaração, post sem declaração, aliases, datas, independência de cargo/afinidade, bloqueio, simulação, setor, autorização, CSV e composição HTML. Bancos de teste são temporários.

Ainda não implementados: evento formal de desligamento, histórico de declarações removidas, revisão documental validada, equipe-alvo definida pela empresa e dependências cadastradas. Nada disso é presumido pelo modelo.
