export const fold = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export function queryParts(query) {
  const phrases = [...query.matchAll(/"([^"]+)"/g)].map(match => fold(match[1])).filter(Boolean);
  const rest = query.replace(/"[^"]+"/g, ' ');
  return {phrases, tokens:fold(rest).split(/\s+/).filter(Boolean)};
}

export function matchesQuery(text, query) {
  const normalized = fold(text), {phrases, tokens} = queryParts(query);
  return phrases.every(phrase => normalized.includes(phrase)) && tokens.every(token => normalized.includes(token));
}

export function relevance(query, fields) {
  const combined = fold(Object.values(fields).join(' '));
  const {phrases, tokens} = queryParts(query);
  if (!matchesQuery(combined, query)) return 0;
  let score = 0;
  for (const phrase of phrases) score += fold(fields.title).includes(phrase) ? 30 : 12;
  for (const token of tokens) {
    if (fold(fields.title).includes(token)) score += 12;
    if (fold(fields.knowledge).includes(token)) score += 9;
    if (fold(fields.author).includes(token)) score += 5;
    if (fold(fields.area).includes(token)) score += 3;
    if (fold(fields.body).includes(token)) score += 4;
    if (fold(fields.comment).includes(token)) score += 4;
  }
  return score;
}
