import {fail} from './domain.mjs';
import {knowledgeIntelligenceData,buildKnowledgeIntelligence} from './knowledge-intelligence.mjs';

const DAY = 86400000;
const day = value => String(value || '').slice(0, 10);
const unique = values => [...new Set(values)];
const percent = (n, total) => total ? Math.round(n / total * 100) : 0;
const byCount = (a, b) => b.posts - a.posts || a.name.localeCompare(b.name, 'pt-BR');

export function dashboardRange(params, clock = new Date()) {
  const today = clock.toISOString().slice(0, 10);
  const period = params.get('period') || '30';
  if (!['7', '30', '90', '365', 'all', 'custom'].includes(period)) fail('Período inválido.');
  let from = '', to = today;
  if (period === 'custom') {
    from = params.get('from') || '';
    to = params.get('to') || '';
    for (const value of [from, to]) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) fail('Informe datas válidas.');
    }
    if (from > to) fail('A data inicial deve vir antes da data final.');
    if (to > today) fail('Escolha um período até hoje.');
  } else if (period !== 'all') {
    from = new Date(Date.parse(today) - (Number(period) - 1) * DAY).toISOString().slice(0, 10);
  }
  const duration = from ? Math.round((Date.parse(to) - Date.parse(from)) / DAY) + 1 : 0;
  return {
    period, from, to, days: duration, area: params.get('area') || '',
    previousFrom: from ? new Date(Date.parse(from) - duration * DAY).toISOString().slice(0, 10) : '',
    previousTo: from ? new Date(Date.parse(from) - DAY).toISOString().slice(0, 10) : ''
  };
}

// Counts derive from persisted content. No views, logins or inferred expertise.
export function buildDashboard(data, filters, clock = new Date()) {
  const {people, areas, positions, posts, comments, reactions, knowledgeItems, knowledgeAreas, postKnowledge, userKnowledge} = data;
  const inRange = value => (!filters.from || day(value) >= filters.from) && day(value) <= filters.to;
  const inPrevious = value => filters.from && day(value) >= filters.previousFrom && day(value) <= filters.previousTo;
  const peopleMap = new Map(people.map(p => [p.id, p]));
  const postMap = new Map(posts.map(p => [p.id, p]));
  const activePeople = people.filter(p => p.status === 'active' && !p.is_admin);
  const team = activePeople.filter(p => !filters.area || p.area_id === filters.area);
  const teamIds = new Set(team.map(p => p.id));
  const belongs = p => !filters.area || peopleMap.get(p.user_id)?.area_id === filters.area;
  const scopePosts = posts.filter(belongs);
  const scopeIds = new Set(scopePosts.map(p => p.id));
  const current = scopePosts.filter(p => inRange(p.created_at));
  const previous = scopePosts.filter(p => inPrevious(p.created_at));
  const currentIds = new Set(current.map(p => p.id));
  const periodComments = comments.filter(c => inRange(c.created_at) && scopeIds.has(c.post_id));
  const authors = unique(current.map(p => p.user_id)).filter(id => teamIds.has(id));
  const participants = unique([...authors, ...comments.filter(c => inRange(c.created_at) && teamIds.has(c.user_id)).map(c => c.user_id)]);
  const postLinks = new Map();
  const knowledgeLinks = new Map();
  for (const link of postKnowledge) {
    if (!postMap.has(link.post_id)) continue;
    if (!postLinks.has(link.post_id)) postLinks.set(link.post_id, []);
    postLinks.get(link.post_id).push(link.knowledge_id);
    if (!knowledgeLinks.has(link.knowledge_id)) knowledgeLinks.set(link.knowledge_id, []);
    knowledgeLinks.get(link.knowledge_id).push(link.post_id);
  }
  const scopedReactions = reactions.filter(r => currentIds.has(r.post_id));
  const currentKnowledgeIds = unique(current.flatMap(p => postLinks.get(p.id) || []));
  const appliedEver = new Set(scopePosts.flatMap(p => postLinks.get(p.id) || []));
  const knowledgeAreaMap = new Map(knowledgeAreas.map(a => [a.id, a.name]));
  const areaMap = new Map(areas.map(a => [a.id, a.name]));
  const knowledge = knowledgeItems.map(k => {
    const linked = (knowledgeLinks.get(k.id) || []).map(id => postMap.get(id)).filter(belongs);
    const recent = linked.filter(p => currentIds.has(p.id));
    const priorCount = linked.filter(p => inPrevious(p.created_at)).length;
    const authorIds = unique(recent.map(p => p.user_id));
    return {
      id: k.id, name: k.name, area: knowledgeAreaMap.get(k.area_id), source: k.source,
      posts: recent.length, previous: filters.from ? priorCount : null,
      authors: authorIds.length,
      sectors: unique(authorIds.map(id => peopleMap.get(id)?.area_id).filter(Boolean)).length,
      allTimePosts: linked.length,
      lastUsed: linked.map(p => p.created_at).sort().at(-1) || null,
      declared: userKnowledge.filter(link => link.knowledge_id === k.id && teamIds.has(link.user_id)).length
    };
  }).sort(byCount);

  const sectors = areas.filter(a => !filters.area || a.id === filters.area).map(a => {
    const members = activePeople.filter(p => p.area_id === a.id);
    const memberIds = new Set(members.map(p => p.id));
    const authored = posts.filter(p => memberIds.has(p.user_id) && inRange(p.created_at));
    const written = comments.filter(c => memberIds.has(c.user_id) && inRange(c.created_at));
    const contributing = unique([...authored.map(p => p.user_id), ...written.map(c => c.user_id)]).length;
    return {
      id: a.id, name: a.name, members: members.length, participants: contributing,
      participation: percent(contributing, members.length), posts: authored.length,
      comments: written.length, knowledge: unique(authored.flatMap(p => postLinks.get(p.id) || [])).length
    };
  }).sort(byCount);

  const contributors = team.map(person => {
    const authored = current.filter(p => p.user_id === person.id);
    const ids = new Set(authored.map(p => p.id));
    const written = comments.filter(c => c.user_id === person.id && inRange(c.created_at));
    return {
      id: person.id, name: person.name, area: areaMap.get(person.area_id) || 'Sem setor',
      posts: authored.length, comments: written.length,
      knowledge: unique(authored.flatMap(p => postLinks.get(p.id) || [])).length,
      likes: reactions.filter(r => r.kind === 'like' && ids.has(r.post_id)).length,
      lastContribution: [...authored, ...written].map(x => x.created_at).sort().at(-1) || null
    };
  }).filter(p => p.posts || p.comments).sort((a, b) => b.posts - a.posts || b.comments - a.comments || a.name.localeCompare(b.name, 'pt-BR'));

  const topPosts = current.map(p => {
    const discussion = comments.filter(c => c.post_id === p.id);
    const likes = reactions.filter(r => r.post_id === p.id && r.kind === 'like').length;
    const saves = reactions.filter(r => r.post_id === p.id && r.kind === 'save').length;
    return {
      id: p.id, title: p.title, author: p.author, area: areaMap.get(peopleMap.get(p.user_id)?.area_id) || 'Administração',
      created_at: p.created_at, comments: discussion.length, likes, saves,
      knowledge: (postLinks.get(p.id) || []).length
    };
  }).sort((a, b) => (b.comments + b.likes + b.saves) - (a.comments + a.likes + a.saves) || b.created_at.localeCompare(a.created_at));

  const start = filters.from || [...scopePosts, ...comments.filter(c => scopeIds.has(c.post_id))].map(p => day(p.created_at)).filter(d => d <= filters.to).sort()[0] || filters.to;
  const days = Math.round((Date.parse(filters.to) - Date.parse(start)) / DAY) + 1;
  const interval = days <= 31 ? 1 : days <= 100 ? 7 : Math.ceil(days / 24);
  const timeline = [];
  for (let offset = 0; offset < days; offset += interval) {
    const from = new Date(Date.parse(start) + offset * DAY).toISOString().slice(0, 10);
    const to = new Date(Math.min(Date.parse(filters.to), Date.parse(from) + (interval - 1) * DAY)).toISOString().slice(0, 10);
    timeline.push({from, to, posts: current.filter(p => day(p.created_at) >= from && day(p.created_at) <= to).length, comments: periodComments.filter(c => day(c.created_at) >= from && day(c.created_at) <= to).length});
  }
  const withoutConversation = topPosts.filter(p => !p.comments);
  const before90 = new Date(clock.getTime() - 90 * DAY).toISOString();
  return {
    generatedAt: clock.toISOString(), filters,
    summary: {
      members: team.length, participants: participants.length, participation: percent(participants.length, team.length),
      authors: authors.length, posts: current.length, previousPosts: filters.from ? previous.length : null,
      comments: periodComments.length,
      likes: scopedReactions.filter(r => r.kind === 'like').length,
      saves: scopedReactions.filter(r => r.kind === 'save').length,
      knowledge: currentKnowledgeIds.length, appliedEver: appliedEver.size,
      catalog: knowledgeItems.length, knowledgeAreas: knowledgeAreas.length,
      classified: current.filter(p => (postLinks.get(p.id) || []).length).length,
      classification: percent(current.filter(p => (postLinks.get(p.id) || []).length).length, current.length),
      community: knowledgeItems.filter(k => k.source === 'community' && inRange(k.created_at) && (!filters.area || peopleMap.get(k.created_by)?.area_id === filters.area)).length,
      knowledgeAcrossSectors: knowledge.filter(k => k.posts && k.sectors > 1).length
    },
    timeline, sectors, knowledge: knowledge.filter(k => k.posts), contributors, topPosts,
    attention: {
      singleAuthor: knowledge.filter(k => k.posts && k.authors === 1),
      declaredWithoutPosts: knowledge.filter(k => k.declared && !k.allTimePosts),
      withoutConversation, unclassified: topPosts.filter(p => !p.knowledge),
      quietSectors: sectors.filter(a => a.members && !a.participants),
      stale: knowledge.filter(k => k.lastUsed && k.lastUsed < before90)
    },
    organization: {
      active: activePeople.length, pending: people.filter(p => !p.is_admin && p.status === 'pending').length,
      blocked: people.filter(p => !p.is_admin && p.status === 'blocked').length,
      areas: areas.length, positions: positions.length,
      areasWithoutPositions: areas.filter(a => !positions.some(p => p.area_id === a.id)).length,
      stage: data.company.stage
    },
    audit: data.audit
  };
}

export async function dashboardData(tx, params) {
  const filters = dashboardRange(params);
  const areas = await tx.all('SELECT * FROM areas ORDER BY name');
  if (filters.area && !areas.some(a => a.id === filters.area)) fail('Setor não encontrado.');
  const people = await tx.all('SELECT u.id,u.name,u.status,u.is_admin,p.area_id FROM users u LEFT JOIN positions p ON p.id=u.position_id');
  const posts = await tx.all("SELECT p.*,u.name AS author FROM posts p JOIN users u ON u.id=p.user_id WHERE u.status='active'");
  const postIds = new Set(posts.map(p => p.id));
  const comments = (await tx.all('SELECT * FROM comments')).filter(c => postIds.has(c.post_id));
  const data = {
    company: (await tx.all('SELECT * FROM company'))[0], areas, people, posts, comments,
    positions: await tx.all('SELECT * FROM positions'), reactions: await tx.all('SELECT * FROM reactions'),
    knowledgeItems: await tx.all('SELECT * FROM knowledge_items'), knowledgeAreas: await tx.all('SELECT * FROM knowledge_areas'),
    postKnowledge: await tx.all('SELECT * FROM post_knowledge'), userKnowledge: await tx.all('SELECT * FROM user_knowledge'),
    audit: await tx.all('SELECT * FROM audit ORDER BY created_at DESC LIMIT 12')
  };
  const report = buildDashboard(data, filters);
  const intelligenceRaw = await knowledgeIntelligenceData(tx);
  if (filters.area) intelligenceRaw.people = intelligenceRaw.people.filter(p => p.area_id === filters.area);
  const intelligence = buildKnowledgeIntelligence(intelligenceRaw);
  report.intelligence = intelligence;
  report.summary.catalogConcepts = intelligence.summary.catalogConcepts;
  report.summary.observedKnowledge = intelligence.summary.concepts;
  report.summary.professionalProfiles = intelligence.summary.professionalProfiles;
  report.summary.criticalKnowledge = intelligence.summary.critical;
  report.summary.attentionKnowledge = intelligence.summary.attention;
  return report;
}
