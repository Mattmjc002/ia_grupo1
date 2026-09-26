// Alertas qualitativos sobre registros da empresa. Não estima importância,
// probabilidade de perda, completude da documentação nem uma equipe ideal.
export const RISK_MODEL = 'observed-evidence-v1';
export const STALE_AFTER_DAYS = 180;
export const RISK_ORDER = {critical: 3, attention: 2, unknown: 1, healthy: 0};

export function latestEvidenceDate(values, clock = new Date()) {
  const valid = values.filter(value => value && Number.isFinite(Date.parse(value)) && Date.parse(value) <= clock.getTime());
  return valid.sort((a, b) => Date.parse(b) - Date.parse(a))[0] || null;
}

export function assessKnowledgeRisk({holders = [], formerHolderCount = 0, posts = [], clock = new Date()} = {}) {
  const authors = new Set(posts.map(p => p.user_id)).size;
  const lastUsed = latestEvidenceDate(posts.map(p => p.updated_at || p.created_at), clock);
  const ageDays = lastUsed ? Math.floor((clock.getTime() - Date.parse(lastUsed)) / 86400000) : null;
  const stale = ageDays !== null && ageDays > STALE_AFTER_DAYS;
  const reasons = [];
  let status = 'healthy';
  if (!holders.length) {
    if (formerHolderCount) {
      status = 'critical';
      reasons.push('Sem detentor ativo identificado; há declarações de colaboradores hoje inativos.');
    } else {
      status = 'unknown';
      reasons.push('Há publicações, mas não há domínio declarado. Confirme quem detém este conhecimento.');
    }
  } else {
    if (holders.length === 1) reasons.push('Conhecimento declarado por apenas uma pessoa ativa.');
    if (!posts.length) reasons.push('Nenhuma publicação vinculada na MIND.');
    if (stale) reasons.push(`Último registro há mais de ${STALE_AFTER_DAYS} dias; vale revisar.`);
    if (posts.length && authors === 1) reasons.push('Publicações concentradas em um único autor.');
    if (holders.length === 1 && !posts.length) status = 'critical';
    else if (reasons.length) status = 'attention';
    else if (!lastUsed) status = 'unknown';
  }
  if (posts.length && !lastUsed) reasons.push('Não há data válida suficiente para avaliar a atualização dos registros.');
  if (!reasons.length) reasons.push('Nenhum alerta observado nos registros atuais. Isso não comprova domínio nem documentação completa.');
  return {
    risk: null, riskStatus: status, known: status !== 'unknown',
    assessment: status === 'unknown' ? 'insufficient_data' : 'observed_signals',
    mainReason: reasons[0], reasons, riskModel: RISK_MODEL,
    publications: posts.length, authors, lastUsed, ageDays,
    documentation: null, coverage: null,
    documentationStatus: posts.length ? 'recorded_publications' : 'no_recorded_publications',
    freshness: !posts.length ? 'no_publications' : !lastUsed ? 'unknown' : stale ? 'review_suggested' : 'recent_record',
    limitations: 'Somente registros da MIND. Declaração não comprova domínio; publicações não comprovam documentação completa. A empresa decide se precisa agir.'
  };
}
