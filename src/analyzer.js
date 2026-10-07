// Bounded English evidence extraction. A candidate is never a compliance verdict.
export const CATEGORIES = ['deadline', 'eligibility', 'prize', 'submission'];
export const MAX_TEXT = 60_000;
const PATTERNS = {
  deadline: /\b(deadlines?|due|closes?|closing|ends?|no later than)\b/i,
  eligibility: /\b(eligib\w*|ineligib\w*|residen\w*|countries|country|territor\w*|age|aged|years old|minors?|employees?|immediate family|sanction\w*|prohibited|legal majority|tax|payment|payee|withholding)\b/i,
  prize: /\b(prizes?|awards?|cash|USD|credits?|badges?|vouchers?|swag|stipend|scholarship)\b|\$\s*\d/i,
  submission: /\b(submit\w*|submission|repository|repositories|source code|demo video|demonstration|video|English|original\w*|new project|skill pack|scope\.md|prd\.md|spec\.md)\b/i,
};
const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'];
const MONTH_PATTERN = MONTHS.map(x => `${x.slice(0,3)}(?:${x.slice(3)})?`).join('|');
const OFFSETS = { UTC: 0, GMT: 0, Z: 0, EDT: -240, EST: -300, PDT: -420, PST: -480 };

export function safeUrl(value) {
  if (!value?.trim()) return '';
  try {
    const url = new URL(value.trim());
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : '';
  } catch { return ''; }
}

function zoneOffset(token) {
  const upper = token.toUpperCase();
  if (Object.hasOwn(OFFSETS, upper)) return OFFSETS[upper];
  const match = /^(?:UTC|GMT)?([+-])(\d{2}):?(\d{2})$/.exec(upper);
  if (!match) return null;
  const h = Number(match[2]), m = Number(match[3]);
  if (h > 14 || m > 59 || (h === 14 && m !== 0)) return null;
  // RFC3339 -00:00 means offset unknown, not necessarily UTC.
  if (match[1] === '-' && h === 0 && m === 0) return null;
  return (h * 60 + m) * (match[1] === '-' ? -1 : 1);
}

function calendarInstant(year, month, day, hour, minute, meridiem, zone) {
  if (year < 1970 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31 || minute > 59) return null;
  if (meridiem) {
    if (hour < 1 || hour > 12) return null;
    hour = hour % 12 + (meridiem.toLowerCase() === 'pm' ? 12 : 0);
  } else if (hour < 0 || hour > 23) return null;
  const local = new Date(Date.UTC(year, month - 1, day, hour, minute));
  if (local.getUTCFullYear() !== year || local.getUTCMonth() !== month - 1 || local.getUTCDate() !== day) return null;
  const offset = zoneOffset(zone);
  if (offset === null) return null;
  return new Date(local.getTime() - offset * 60_000).toISOString();
}

export function parseDates(quote) {
  const results = [];
  let remainder = quote;
  // Require explicit year, clock time, and zone. Unsupported grammar stays unresolved.
  const english = new RegExp(`\\b(${MONTH_PATTERN})\\.?\\s+(\\d{1,2})(?:st|nd|rd|th)?[,]?\\s+(\\d{4})(?:\\s+at|[,])?\\s+(\\d{1,2})(?::(\\d{2}))?\\s*(am|pm)?\\s+((?:UTC|GMT)[+-]\\d{2}:?\\d{2}|[A-Z]{1,5}|[+-]\\d{2}:?\\d{2})(?![\\w:+-])`, 'gi');
  const iso = /\b(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(Z|[+-]\d{2}:?\d{2})(?![\w:+-])/gi;
  for (const m of quote.matchAll(english)) {
    const ambiguousSuffix = /^\s*(?:\/\s*[A-Z]|or\s+(?:UTC|GMT|EDT|EST|PDT|PST|CST|IST)\b)/i.test(quote.slice(m.index+m[0].length));
    const instant = ambiguousSuffix ? null : calendarInstant(+m[3], MONTHS.findIndex(x => x.slice(0,3) === m[1].slice(0,3).toLowerCase()) + 1, +m[2], +m[4], +(m[5] || 0), m[6], m[7]);
    results.push({ matched: m[0], instant, reason: instant ? '' : 'Invalid calendar date, clock time, or ambiguous/unsupported timezone.' });
    remainder=remainder.replace(m[0],'');
  }
  for (const m of quote.matchAll(iso)) {
    const instant = calendarInstant(+m[1], +m[2], +m[3], +m[4], +m[5], '', m[6]);
    results.push({ matched: m[0], instant, reason: instant ? '' : 'Invalid calendar date, clock time, or timezone offset.' });
    remainder=remainder.replace(m[0],'');
  }
  if (results.length && new RegExp(`\\b(?:${MONTH_PATTERN})\\.?\\s+\\d|\\b\\d{4}-\\d{2}-\\d{2}`, 'i').test(remainder)) results.push({matched:'',instant:null,reason:'Additional date wording in this passage could not be resolved. Review the full original passage.'});
  if (!results.length) results.push({ matched: '', instant: null, reason: 'No supported explicit date + time + timezone. Check the source; no time was inferred.' });
  return results;
}

export function prizeType(quote) {
  const noncash = /\b(credits?|badges?|vouchers?|swag|merchandise|subscription|in.kind|non.cash)\b/i.test(quote);
  const cash = /\bcash\b|\bUSD\s*\d|\$\s*\d/i.test(quote);
  const creditOnly = /(?:USD\s*|\$\s*)[\d,.]+\s+(?:in\s+)?(?:\w+\s+){0,2}(?:credits?|vouchers?)\b/i.test(quote) && !/\b(?:cash prizes?|cash awards?|in cash)\b/i.test(quote);
  if (noncash && cash && creditOnly) return 'Noncash benefit — monetary face value';
  if (noncash && cash) return 'Mixed / inspect wording';
  if (noncash) return 'Noncash benefit';
  if (cash && /\b(no|not|without)\s+(?:a\s+)?cash\b/i.test(quote)) return 'No cash / inspect wording';
  if (cash) return 'Cash or monetary value — verify';
  return 'Award type unspecified';
}

export function analyzeSources(input) {
  if (!Array.isArray(input) || !input.length) throw new Error('Paste the main rules before analyzing.');
  const sources = input.filter(s => s.text?.trim()).map((s, i) => ({ id: `s${i+1}`, label: s.label?.trim().slice(0,100) || `Source ${i+1}`, url: safeUrl(s.url), text: s.text }));
  if (!sources.length) throw new Error('Paste the main rules before analyzing.');
  if (sources.reduce((n,s) => n+s.text.length, 0) > MAX_TEXT) throw new Error('Use at most 60,000 characters across both sources.');
  const evidence = [], deadlines = [];
  for (const source of sources) {
    for (const line of source.text.matchAll(/[^\r\n]+/g)) {
      const quote = line[0].trim();
      if (!quote) continue;
      const start = line.index + line[0].indexOf(quote);
      for (const category of CATEGORIES) {
        if (!PATTERNS[category].test(quote)) continue;
        const item = { id: `e${evidence.length+1}`, category, sourceId: source.id, quote, start, end: start+quote.length };
        if (category === 'prize') item.prizeType = prizeType(quote);
        evidence.push(item);
        if (category === 'deadline') {
          for (const parsed of parseDates(quote)) deadlines.push({ ...item, ...parsed, id: `d${deadlines.length+1}`, evidenceId: item.id });
        }
      }
    }
  }
  const warnings = [];
  for (const category of CATEGORIES) {
    if (!evidence.some(e => e.category === category)) warnings.push({ code: `missing-${category}`, text: `${category[0].toUpperCase()+category.slice(1)} evidence not found. Check the complete official rules; this does not mean there is no requirement.` });
  }
  const instants = new Set(deadlines.filter(d => d.instant).map(d => d.instant));
  if (instants.size > 1) warnings.unshift({ code: 'deadline-conflict', text: 'Different deadline instants found. Check whether they describe the same milestone; no source is automatically preferred.' });
  if (deadlines.some(d => !d.instant)) warnings.push({ code: 'unresolved-deadline', text: 'Some deadline wording is unresolved. Do not assume a timezone or that another parsed date replaces it.' });
  if (evidence.some(e => e.category === 'eligibility')) warnings.push({ code: 'eligibility-review', text: 'Eligibility needs your personal facts and the full rules. This report does not decide whether you may enter or receive a prize.' });
  const tasks = evidence.filter(e => e.category === 'submission' && /\b(must|required|requirement|provide|include|upload|submit|need|only|public|original|English)\b/i.test(e.quote)).map(e => ({ id: `t-${e.id}`, text: e.quote, evidenceId: e.id, kind: 'Source requirement candidate' }));
  tasks.unshift({ id: 't-deadline', text: 'Confirm the submission deadline and all timezone/updated-rule conflicts.', kind: 'Review action' });
  tasks.push({ id: 't-eligibility', text: 'Check age, residence, exclusions and prize-payment conditions against your own facts.', kind: 'Review action' });
  for (const warning of warnings.filter(w => w.code.startsWith('missing-'))) tasks.push({ id: `t-${warning.code}`, text: warning.text, kind: 'Missing information' });
  return { sources, evidence, deadlines, warnings, tasks, conflict: instants.size > 1 };
}

export function formatInstant(instant, zone) {
  if (!instant) return 'Unresolved — review source';
  return new Intl.DateTimeFormat('en-GB', { timeZone: zone, year:'numeric', month:'short', day:'2-digit', hour:'2-digit', minute:'2-digit', hourCycle:'h23', timeZoneName:'short' }).format(new Date(instant));
}
