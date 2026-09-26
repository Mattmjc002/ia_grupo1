const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const number = n => Number(n || 0).toLocaleString('pt-BR');
const shortDate = value => value ? value.slice(0, 10).split('-').reverse().join('/') : '—';
const btn = (label, action, id = '', cls = '') => `<button type="button" class="${cls}" data-action="${action}" data-id="${esc(id)}">${label}</button>`;
const empty = message => `<p class="empty compact-empty">${message}</p>`;
const title = (name, note = '') => `<div class="section-title"><h2>${name}</h2>${note ? `<p class="meta">${note}</p>` : ''}</div>`;
const table = (heads, body) => `<div class="tablewrap"><table><thead><tr>${heads.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${body}</tbody></table></div>`;

function trendLabel(now, previous) {
  if (previous === null) return 'Todo o histórico';
  if (!previous) return now ? 'Sem publicações no período anterior' : 'Nenhuma publicação nos dois períodos';
  const delta = Math.round((now - previous) / previous * 100);
  return `${delta > 0 ? '+' : ''}${delta}% em relação ao período anterior (${number(previous)})`;
}

function chart(series) {
  const max = Math.max(1, ...series.flatMap(s => [s.posts, s.comments]));
  const width = 800, height = 215, plot = 150, left = 34, step = (width - left - 16) / Math.max(1, series.length);
  const ticks = [0, .5, 1].map(f => `<g><line x1="${left}" x2="${width}" y1="${20 + plot - plot * f}" y2="${20 + plot - plot * f}" class="chart-grid"/><text x="25" y="${24 + plot - plot * f}" text-anchor="end">${Math.round(max * f)}</text></g>`).join('');
  const bars = series.map((s, i) => {
    const x = left + i * step + step * .15, bw = Math.max(1, step * .3);
    const label = `${shortDate(s.from)}${s.to !== s.from ? ' a ' + shortDate(s.to) : ''}: ${s.posts} publicações, ${s.comments} comentários`;
    return `<g><title>${label}</title><rect class="chart-posts" x="${x}" y="${20 + plot - s.posts / max * plot}" width="${bw}" height="${s.posts / max * plot}" rx="2"/><rect class="chart-comments" x="${x + bw + 1}" y="${20 + plot - s.comments / max * plot}" width="${bw}" height="${s.comments / max * plot}" rx="2"/>${i % Math.max(1, Math.ceil(series.length / 6)) === 0 ? `<text x="${x}" y="195">${shortDate(s.from).slice(0, 5)}</text>` : ''}</g>`;
  }).join('');
  return `<div class="chart-legend"><span><i class="legend-posts"></i>Publicações</span><span><i class="legend-comments"></i>Comentários</span></div><svg class="activity-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Evolução das publicações e comentários no período; valores disponíveis na tabela abaixo">${ticks}${bars}</svg><details class="chart-data"><summary>Consultar valores do gráfico</summary>${table(['Intervalo (UTC)', 'Publicações', 'Comentários'], series.map(s => `<tr><td>${shortDate(s.from)}${s.from !== s.to ? ' a ' + shortDate(s.to) : ''}</td><td>${s.posts}</td><td>${s.comments}</td></tr>`).join(''))}</details>`;
}

export function renderDashboard(data, areas) {
  if (!data) return '<div class="card empty" role="status">Carregando indicadores da empresa…</div>';
  const s = data.summary, f = data.filters, attention = data.attention, org = data.organization, ki = data.intelligence;
  const riskLabel = status => ({critical:'Crítico',attention:'Atenção',healthy:'Distribuído',unknown:'Sem base suficiente'}[status] || status);
  const range = f.from ? `${shortDate(f.from)} a ${shortDate(f.to)}` : `Todo o histórico até ${shortDate(f.to)}`;
  const metrics = [
    ['Publicações', s.posts, trendLabel(s.posts, s.previousPosts), 'blue'],
    ['Participação da equipe', `${s.participation}%`, `${s.participants} de ${s.members} colaboradores publicaram ou comentaram`, 'green'],
    ['Conhecimentos aplicados', s.knowledge, `${s.appliedEver} já utilizados no histórico deste setor`, 'purple'],
    ['Comentários recebidos', s.comments, 'No período, inclusive em publicações antigas', 'blue'],
    ['Pessoas que publicaram', s.authors, 'Colaboradores com ao menos uma publicação no período', 'green'],
    ['Reconhecimentos', s.likes, 'Acumulados nas publicações criadas no período', 'amber'],
    ['Salvamentos', s.saves, 'Acumulados nas publicações criadas no período', 'purple'],
    ['Novos conhecimentos', s.community, 'Cadastrados pela equipe no período', 'amber'],
    ['Conceitos conectados', s.catalogConcepts ?? s.catalog, `${s.professionalProfiles || 0} perfis profissionais usados na matriz`, 'purple'],
    ['Riscos críticos', s.criticalKnowledge || 0, `${s.attentionKnowledge || 0} conhecimentos em atenção pela cobertura e concentração`, 'amber']
  ];
  const knowledgeRows = data.knowledge.map(k => `<tr><td>${btn(esc(k.name), 'knowledge-detail', k.id, 'text-link')}<small class="block">${esc(k.area)}</small></td><td>${k.posts}</td><td>${k.authors}</td><td>${k.sectors}</td><td>${k.previous === null ? '—' : k.previous === 0 ? 'Novo no período' : `${k.posts - k.previous >= 0 ? '+' : ''}${k.posts - k.previous} publicações`}</td><td>${shortDate(k.lastUsed)}</td></tr>`).join('');
  const alerts = [
    ['Conhecimento concentrado', attention.singleAuthor.length, 'Temas publicados por uma única pessoa no período. Convide outras pessoas a registrar suas experiências.', attention.singleAuthor, 'knowledge-detail'],
    ['Experiência ainda sem registro', attention.declaredWithoutPosts.length, 'Conhecimentos selecionados nos perfis, sem publicações no histórico deste setor.', attention.declaredWithoutPosts, 'knowledge-detail'],
    ['Temas sem novos relatos há 90 dias', attention.stale.length, 'A última publicação deste tema tem mais de 90 dias. Confira se há novidades para compartilhar.', attention.stale, 'knowledge-detail'],
    ['Publicações sem comentários', attention.withoutConversation.length, 'Registros do período que podem se beneficiar de uma conversa com a equipe.', attention.withoutConversation.map(p => ({id:p.id,name:p.title})), 'search-open-post']
  ];
  return `<div class="row between pagehead"><div><span class="eyebrow">ADMINISTRAÇÃO · MIND</span><h1>Gestão do conhecimento</h1><p class="muted">Entenda o que a empresa compartilha e onde o conhecimento pode circular mais.</p></div><div class="row">${btn('Atualizar', 'dashboard-refresh')}${btn('Exportar CSV', 'dashboard-export', '', 'primary')}</div></div>
    <form data-form="dashboard-filters" class="card dashboard-filters">
      <label>Período<select name="period" id="dashboard-period">${[['7','Últimos 7 dias'],['30','Últimos 30 dias'],['90','Últimos 90 dias'],['365','Últimos 12 meses (365 dias)'],['all','Todo o histórico'],['custom','Personalizado']].map(([v,l]) => `<option value="${v}" ${f.period===v?'selected':''}>${l}</option>`).join('')}</select></label>
      <label>Setor dos colaboradores<select name="area"><option value="">Toda a empresa</option>${areas.map(a=>`<option value="${esc(a.id)}" ${f.area===a.id?'selected':''}>${esc(a.name)}</option>`).join('')}</select></label>
      <div id="dashboard-custom" class="date-pair ${f.period==='custom'?'':'hidden'}"><label>De<input type="date" name="from" value="${f.from}" ${f.period==='custom'?'required':''}></label><label>Até<input type="date" name="to" value="${f.to}" ${f.period==='custom'?'required':''}></label></div>
      <button type="submit" class="primary">Aplicar filtros</button>
    </form>
    <div class="row between dashboard-caption"><p class="meta">${range} · ${esc(areas.find(a=>a.id===f.area)?.name || 'Toda a empresa')} · datas em UTC</p><span class="meta">Atualizado em ${new Date(data.generatedAt).toLocaleString('pt-BR')}</span></div>
    ${!s.posts&&!s.comments?'<div class="notice dashboard-empty">Ainda não há publicações ou comentários neste período. Os indicadores serão preenchidos conforme a equipe compartilhar conhecimentos.</div>':''}
    <div class="metric-grid">${metrics.map(([label,value,note,color])=>`<article class="card metric-card ${color}"><h2>${label}</h2><strong>${typeof value==='number'?number(value):value}</strong><p class="meta">${note}</p></article>`).join('')}</div>
    <div class="dashboard-grid">
      <section class="card dashboard-wide">${title('Como o compartilhamento evolui','Publicações por data de criação e comentários por data de envio.')}${chart(data.timeline)}</section>
      <section class="card">${title('Organização do conhecimento')}<div class="quality-metric"><strong>${s.posts?s.classification+'%':'—'}</strong><p>das publicações do período classificadas por conhecimento</p></div><div class="progress-track"><span style="width:${s.classification}%"></span></div><div class="checkline"><strong>${s.catalog}</strong> conhecimentos disponíveis na MIND</div><div class="checkline"><strong>${s.knowledgeAreas}</strong> áreas de conhecimento no catálogo</div><div class="checkline"><strong>${s.knowledgeAcrossSectors}</strong> temas publicados por mais de um setor no período</div>${attention.unclassified.length?`<details class="attention-details"><summary>${attention.unclassified.length} publicações sem classificação</summary>${attention.unclassified.map(p=>btn(esc(p.title),'search-open-post',p.id,'list-link')).join('')}</details>`:''}<p class="meta">O catálogo é uma referência ampla. A empresa escolhe os temas relevantes para sua atuação.</p></section>
    </div>
    ${ki ? `<section class="dashboard-section">${title('Radar de conhecimento da empresa','A MIND cruza conhecimentos declarados, publicações e afinidades profissionais. A área oficial continua sendo definida pela empresa.')}
      <div class="knowledge-health-grid">
        <article class="card knowledge-health critical"><span>CRÍTICO</span><strong>${ki.summary.critical}</strong><p>Conhecimentos com maior risco combinado de cobertura, concentração e documentação.</p></article>
        <article class="card knowledge-health attention"><span>ATENÇÃO</span><strong>${ki.summary.attention}</strong><p>Conhecimentos cuja distribuição merece acompanhamento.</p></article>
        <article class="card knowledge-health healthy"><span>DISTRIBUÍDO</span><strong>${ki.summary.healthy}</strong><p>Conhecimentos com cobertura mais saudável entre pessoas relevantes.</p></article>
        <article class="card knowledge-health unknown"><span>SEM BASE</span><strong>${ki.summary.unknown}</strong><p>Conceitos ainda sem dados suficientes para calcular cobertura.</p></article>
      </div>
      <div class="dashboard-grid knowledge-intelligence-grid">
        <section class="card">${title('Cobertura por domínio','Percentual médio de cobertura entre conceitos relevantes para cada macroárea de conhecimento.')}${table(['Domínio','Cobertura','Críticos','Atenção','Distribuídos'],ki.domainHealth.filter(d=>d.concepts).slice(0,20).map(d=>`<tr><td>${esc(d.name)}</td><td><div class="cell-progress"><span>${d.coverage}%</span><div class="progress-track risk-progress"><span style="width:${d.coverage}%"></span></div></div></td><td>${d.critical}</td><td>${d.attention}</td><td>${d.healthy}</td></tr>`).join(''))}</section>
        <section class="card">${title('Pontes e competências transversais','Sinais de pessoas que conectam domínios diferentes. Não alteram cargo nem área oficial.')}
          <h3>Pontes de conhecimento</h3>${ki.bridges.slice(0,6).map(p=>`<div class="checkline">${btn(esc(p.name),'person-profile',p.id,'text-link')}<small class="block">${p.domains.map(d=>`${esc(d.name)} ${d.share}%`).join(' · ')}</small></div>`).join('')||empty('Ainda não há conexões suficientes para identificar pontes.')}
          <h3 class="dashboard-subtitle">Competências transversais</h3>${ki.transversal.slice(0,6).map(p=>`<div class="checkline">${btn(esc(p.name),'person-profile',p.id,'text-link')}<small class="block">${esc(p.officialArea)} → ${esc(p.domain)} ${p.share}%</small></div>`).join('')||empty('Ainda não há sinais transversais suficientes.')}
        </section>
      </div>
      <section class="card dashboard-section">${title('Conhecimentos com maior risco','A cobertura usa a porcentagem ponderada das pessoas para quem o conhecimento é relevante, em vez de contar toda a empresa igualmente.')}${ki.concepts.filter(c=>c.known).slice(0,25).length?table(['Conhecimento','Cobertura','Risco','Detentores','Documentação','Situação'],ki.concepts.filter(c=>c.known).slice(0,25).map(c=>`<tr><td>${c.knowledge_id?btn(esc(c.name),'knowledge-detail',c.knowledge_id,'text-link'):esc(c.name)}<small class="block">${c.areaAffinities.slice(0,3).map(a=>`${esc(a.name)} ${a.weight}%`).join(' · ')}</small></td><td>${c.coverage}%</td><td>${c.risk}%</td><td>${c.holders.length}</td><td>${c.documentation}%</td><td><span class="risk-badge ${c.riskStatus}">${riskLabel(c.riskStatus)}</span></td></tr>`).join('')):empty('Ainda não há dados suficientes para calcular riscos.')}</section>
    </section>` : ''}
    <section class="card dashboard-section">${title('Participação por setor','Setor atual dos autores, incluindo contribuições em feeds gerais. Participantes são colaboradores ativos que publicaram ou comentaram no período.')}${data.sectors.length?table(['Setor','Colaboradores','Participação','Publicações','Comentários escritos','Conhecimentos'],data.sectors.map(a=>`<tr><td>${btn(esc(a.name),'dashboard-sector',a.id,'text-link')}</td><td>${a.members}</td><td><div class="cell-progress"><span>${a.participants}/${a.members} · ${a.participation}%</span><div class="progress-track"><span style="width:${a.participation}%"></span></div></div></td><td>${a.posts}</td><td>${a.comments}</td><td>${a.knowledge}</td></tr>`).join('')):empty('Configure os setores para acompanhar a participação.')}${attention.quietSectors.length?`<p class="meta">Sem contribuições neste período: ${attention.quietSectors.map(a=>esc(a.name)).join(', ')}.</p>`:''}</section>
    <section class="dashboard-section">${title('Oportunidades para compartilhar','Sinais para orientar conversas, documentação e troca de experiências.')}<div class="attention-grid">${alerts.map(([label,count,note,items,action])=>`<article class="card attention-card"><div class="row between"><h3>${label}</h3><strong class="attention-count">${count}</strong></div><p class="meta">${note}</p>${items.length?`<details class="attention-details"><summary>Ver ${count} ${count===1?'item':'itens'}</summary><div class="scroll-list">${items.map(k=>btn(esc(k.name),action,k.id,'list-link')).join('')}</div></details>`:'<span class="meta">Nenhum item nesta condição.</span>'}</article>`).join('')}</div></section>
    <section class="card dashboard-section">${title('Conhecimentos em circulação','Aplicações registradas no período, autores distintos e presença entre setores. Clique em um tema para consultar as publicações.')}${knowledgeRows?table(['Conhecimento','Publicações','Autores','Setores','Variação','Último relato'],knowledgeRows):empty('Os conhecimentos associados às publicações aparecerão aqui.')}</section>
    <section class="card dashboard-section">${title('Pessoas que compartilham','Participação registrada na MIND. A quantidade de publicações não mede domínio de um tema nem desempenho profissional.')}${data.contributors.length?table(['Colaborador','Publicações','Comentários escritos','Conhecimentos usados','Reconhecimentos recebidos','Última contribuição'],data.contributors.map(p=>`<tr><td>${btn(esc(p.name),'person-profile',p.id,'text-link')}<small class="block">${esc(p.area)}</small></td><td>${p.posts}</td><td>${p.comments}</td><td>${p.knowledge}</td><td>${p.likes}</td><td>${shortDate(p.lastContribution)}</td></tr>`).join('')):empty('Nenhuma contribuição de colaboradores neste período.')}</section>
    <section class="card dashboard-section">${title('Publicações e conversas','Publicações criadas no período, ordenadas pela soma de comentários, reconhecimentos e salvamentos acumulados.')}${data.topPosts.length?table(['Publicação','Autor / setor','Comentários','Reconhecimentos','Salvamentos','Criada em'],data.topPosts.map(p=>`<tr><td>${btn(esc(p.title),'search-open-post',p.id,'text-link')}</td><td>${esc(p.author)}<small class="block">${esc(p.area)}</small></td><td>${p.comments}</td><td>${p.likes}</td><td>${p.saves}</td><td>${shortDate(p.created_at)}</td></tr>`).join('')):empty('Nenhuma publicação neste período.')}</section>
    <div class="dashboard-grid dashboard-section"><section class="card">${title('Estrutura e acessos','Situação atual de toda a empresa, independente dos filtros acima.')}<div class="organization-grid"><div><strong>${org.active}</strong><span>Colaboradores ativos</span></div><div><strong>${org.pending}</strong><span>Cadastros pendentes</span></div><div><strong>${org.blocked}</strong><span>Contas bloqueadas</span></div><div><strong>${org.areas}</strong><span>Setores</span></div><div><strong>${org.positions}</strong><span>Cargos</span></div><div><strong>${org.areasWithoutPositions}</strong><span>Setores sem cargos</span></div></div><p class="meta">Etapa: ${{areas:'Configuração de áreas',roles:'Configuração de cargos',open:'Cadastros abertos'}[org.stage]}</p><div class="row">${btn('Gerenciar equipe','dashboard-members')}${btn('Configurar empresa','dashboard-setup')}${btn('Editar guia','guide-edit')}</div></section><section class="card">${title('Histórico administrativo','Últimas alterações. O responsável é informado ao usar a conta compartilhada.')}${data.audit.length?`<div class="audit-list">${data.audit.map(a=>`<div class="checkline"><strong>${esc(a.actor)}</strong><p>${esc(a.action)}</p><small>${new Date(a.created_at).toLocaleString('pt-BR')}</small></div>`).join('')}</div>`:empty('As alterações administrativas aparecerão aqui.')}</section></div>
    <details class="card dashboard-method"><summary>Como interpretar os indicadores</summary><ul><li>O período considera dias completos em UTC. A comparação usa o intervalo imediatamente anterior com a mesma duração.</li><li>O filtro de setor usa o cargo atual do autor, mesmo quando a publicação está no feed geral. Mudanças de setor refletem nessa classificação.</li><li>Participação considera contas ativas de colaboradores e registros de publicações ou comentários. A conta administrativa fica fora dessa taxa; suas publicações aparecem na visão de toda a empresa.</li><li>Reconhecimentos, salvamentos e comentários na tabela de publicações são totais acumulados dos posts criados no período. A série e o cartão de comentários contam envios ocorridos no período, inclusive em posts anteriores.</li><li>Os salvamentos são apresentados apenas como totais. A biblioteca pessoal de cada colaborador permanece privada.</li><li>Conhecimento concentrado significa um único autor com registro no período; conhecimentos declarados no perfil são informados pelo próprio colaborador.</li><li>O Radar de conhecimento usa conceitos canônicos e uma matriz de afinidade entre conhecimentos, macroáreas, perfis profissionais e capacidades. A classificação inferida é um sinal analítico e nunca altera a área oficial do colaborador.</li><li>A cobertura é ponderada pela relevância estimada do conhecimento para cada pessoa. Assim, um conhecimento de desenvolvimento não é cobrado de toda a empresa da mesma forma.</li><li>O risco combina cobertura, concentração de detentores, documentação e atualidade. Os limites iniciais são 35% para crítico e 65% para atenção e podem ser refinados conforme o uso da empresa.</li><li>Temas sem novos relatos há 90 dias consideram o histórico até a atualização deste painel. Ausência de publicação não significa falta de conhecimento.</li><li>Somente publicações de contas atualmente ativas entram no painel. Comentários preservados nessas publicações continuam sendo contados. Exclusões e edições se refletem nos totais.</li><li>Os dados são atualizados ao abrir o dashboard, aplicar filtros ou clicar em Atualizar. Não há medição de visualizações ou leitura nesta versão.</li></ul></details>`;
}

export function dashboardCSV(data, areas) {
  // Neutralize spreadsheet formulas while preserving UTF-8 accents and delimiters.
  const cell = value => {
    let str = String(value ?? '');
    if (/^[\s]*[=+@-]/.test(str) || /^[\t\r\n]/.test(str)) str = "'" + str;
    return '"' + str.replace(/"/g, '""') + '"';
  };
  const s = data.summary;
  const rows = [
    ['MIND · Gestão do conhecimento'],['Gerado em', data.generatedAt],
    ['Período',data.filters.from||'Todo o histórico',data.filters.to],
    ['Setor dos autores',areas.find(a=>a.id===data.filters.area)?.name||'Toda a empresa'],
    ['Datas em UTC. Reações acumuladas em posts criados no período.'],[],
    ['Indicador','Valor'],['Publicações',s.posts],['Publicações no período anterior',s.previousPosts??'Não se aplica'],
    ['Colaboradores ativos',s.members],['Participantes',s.participants],['Participação (%)',s.participation],
    ['Conhecimentos aplicados',s.knowledge],['Comentários no período',s.comments],['Reconhecimentos acumulados',s.likes],['Salvamentos acumulados',s.saves],['Novos conhecimentos da equipe',s.community],[],
    ['POR SETOR'],['Setor','Colaboradores','Participantes','Participação (%)','Publicações','Comentários escritos','Conhecimentos'],
    ...data.sectors.map(a=>[a.name,a.members,a.participants,a.participation,a.posts,a.comments,a.knowledge]),[],
    ['CONHECIMENTOS'],['Conhecimento','Área','Publicações','Autores','Setores','Publicações no período anterior','Último relato'],
    ...data.knowledge.map(k=>[k.name,k.area,k.posts,k.authors,k.sectors,k.previous??'',k.lastUsed]),[],
    ['CONTRIBUIÇÕES'],['Colaborador','Setor','Publicações','Comentários escritos','Conhecimentos','Reconhecimentos','Última contribuição'],
    ...data.contributors.map(p=>[p.name,p.area,p.posts,p.comments,p.knowledge,p.likes,p.lastContribution]),[],
    ['PUBLICAÇÕES'],['Título','Autor','Setor atual','Comentários acumulados','Reconhecimentos acumulados','Salvamentos acumulados','Criação'],
    ...data.topPosts.map(p=>[p.title,p.author,p.area,p.comments,p.likes,p.saves,p.created_at]),[],
    ...(data.intelligence ? [['RADAR DE CONHECIMENTO'],['Conceitos canônicos',data.intelligence.summary.concepts],['Críticos',data.intelligence.summary.critical],['Atenção',data.intelligence.summary.attention],['Distribuídos',data.intelligence.summary.healthy],[],['MAIORES RISCOS'],['Conhecimento','Cobertura (%)','Risco (%)','Detentores','Documentação (%)','Situação'],...data.intelligence.concepts.filter(c=>c.known).slice(0,100).map(c=>[c.name,c.coverage,c.risk,c.holders.length,c.documentation,c.riskStatus]),[]] : []),
    ['OPORTUNIDADES'],['Tipo','Item'],
    ...data.attention.singleAuthor.map(k=>['Um único autor no período',k.name]),
    ...data.attention.declaredWithoutPosts.map(k=>['Declarado sem relatos no histórico',k.name]),
    ...data.attention.stale.map(k=>['Sem novos relatos há 90 dias',k.name]),
    ...data.attention.withoutConversation.map(p=>['Sem comentários',p.title])
  ];
  return '\uFEFF' + rows.map(row=>row.map(cell).join(';')).join('\r\n');
}
