const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const riskLabel = status => ({critical:'Risco alto',attention:'Atenção',healthy:'Sem alerta observado',unknown:'Dados insuficientes'}[status] || 'Dados insuficientes');
export const evidenceDate = value => value ? new Date(value).toLocaleDateString('pt-BR', {timeZone:'UTC'}) : 'Sem data disponível';

export function renderRiskEvidence(concept) {
  return `<div class="row between"><h2>Riscos do conhecimento</h2><span class="risk-badge ${esc(concept.riskStatus)}">${riskLabel(concept.riskStatus)}</span></div>
    <p class="risk-reason">${esc(concept.mainReason)}</p>
    <div class="network-metrics"><div><strong>${concept.holders.length}</strong><span>Declaram domínio e estão ativos</span></div><div><strong>${concept.publications}</strong><span>Publicações vinculadas</span></div><div><strong>${concept.authors}</strong><span>Autores dos registros</span></div></div>
    <p class="meta">Último registro: ${evidenceDate(concept.lastUsed)}${concept.formerHolderCount ? ` · ${concept.formerHolderCount} declarações de pessoas hoje inativas` : ''}.</p>
    ${concept.reasons.length>1 ? `<ul class="risk-reasons">${concept.reasons.slice(1).map(reason=>`<li>${esc(reason)}</li>`).join('')}</ul>` : ''}
    <p class="meta">${esc(concept.limitations)} Cobertura não é calculada: a empresa ainda não definiu uma equipe-alvo.</p>`;
}

export function renderRiskTable(concepts) {
  if (!concepts.length) return '<p class="empty compact-empty">Ainda não há conhecimentos vinculados à empresa. Selecione conhecimentos nos perfis ou associe-os a publicações. O catálogo sozinho não gera alertas.</p>';
  return `<p class="meta">${concepts.length} conhecimentos com evidências. Alertas primeiro; registros com dados insuficientes também aparecem na lista.</p><div class="tablewrap risk-table"><table><thead><tr><th scope="col">Conhecimento</th><th scope="col">Situação</th><th scope="col">Detentores declarados ativos</th><th scope="col">Evidências de documentação</th><th scope="col">Motivo principal</th></tr></thead><tbody>${concepts.map(c=>`<tr><td>${c.knowledge_id?`<button type="button" class="text-link" data-action="knowledge-detail" data-id="${esc(c.knowledge_id)}">${esc(c.name)}</button>`:esc(c.name)}<small class="block">${c.primaryAreas.map(a=>esc(a.name)).join(' · ')}</small></td><td><span class="risk-badge ${esc(c.riskStatus)}">${riskLabel(c.riskStatus)}</span></td><td>${c.holders.length}</td><td>${c.publications} publicações · ${c.authors} autores<small class="block">Último registro: ${evidenceDate(c.lastUsed)}</small></td><td>${esc(c.mainReason)}</td></tr>`).join('')}</tbody></table></div>`;
}

export function renderRiskMethod() {
  return `<details class="dashboard-method"><summary>Como os alertas de risco são definidos</summary><ul>
    <li>Entram apenas conceitos com declarações ou publicações da empresa, inclusive histórico de contas bloqueadas. Itens exclusivos do catálogo ficam fora, inclusive do total de dados insuficientes.</li>
    <li>Risco alto: declaração de apenas uma pessoa ativa sem nenhuma publicação vinculada, ou histórico de declarações sem detentor ativo identificado.</li>
    <li>Atenção: uma única declaração ativa, ausência de publicações, registros concentrados em um autor ou último registro há mais de 180 dias. Especialização pode ser normal; a empresa decide se precisa agir.</li>
    <li>Dados insuficientes: há publicações, mas ninguém declarou domínio, ou faltam datas válidas e não há outro alerta observável. Isso não prova que não existam especialistas.</li>
    <li>Sem alerta observado: duas ou mais declarações ativas, publicações de pelo menos dois autores e registro nos últimos 180 dias. Não significa risco zero nem documentação completa.</li>
    <li>Não há percentual de risco, criticidade, importância presumida, cobertura exigida ou porcentagem de documentação. Afinidades e cargos não influenciam os alertas.</li>
    <li>Datas são de criação ou edição, não de revisão técnica. Quantidade de posts não mede qualidade; publicar sobre um tema não comprova domínio.</li>
  </ul></details>`;
}
