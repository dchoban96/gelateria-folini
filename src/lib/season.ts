import type { Settings } from './db';

export type Status = {
  state: 'open' | 'opensLater' | 'closedNow' | 'closedToday' | 'winter';
  inSeason: boolean;
  until?: string; // closing time today
  opensAt?: string; // opening time today
  daysToOpen?: number;
  reopenDate?: Date;
  dow: number; // 0 = Monday
  today: string; // YYYY-MM-DD in Rome
};

export function romeNow(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Rome',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      weekday: 'short',
      hourCycle: 'h23',
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  );
  const dow = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(parts.weekday);
  return {
    y: +parts.year,
    md: `${parts.month}-${parts.day}`,
    date: `${parts.year}-${parts.month}-${parts.day}`,
    hm: `${parts.hour}:${parts.minute}`,
    dow,
  };
}

export function getStatus(s: Settings, now = new Date()): Status {
  const n = romeNow(now);
  const inSeason =
    s.seasonOpen <= s.seasonClose ? n.md >= s.seasonOpen && n.md <= s.seasonClose : n.md >= s.seasonOpen || n.md <= s.seasonClose;
  const base = { inSeason, dow: n.dow, today: n.date };
  if (!inSeason) {
    const year = n.md > s.seasonOpen ? n.y + 1 : n.y;
    const reopen = new Date(`${year}-${s.seasonOpen}T12:00:00Z`);
    const today = new Date(`${n.date}T12:00:00Z`);
    return { ...base, state: 'winter', reopenDate: reopen, daysToOpen: Math.max(1, Math.round((+reopen - +today) / 86400000)) };
  }
  const h = s.hours[n.dow];
  if (s.closedDate === n.date || !h || h.closed) return { ...base, state: 'closedToday' };
  if (n.hm < h.open) return { ...base, state: 'opensLater', opensAt: h.open, until: h.close };
  if (n.hm < h.close) return { ...base, state: 'open', until: h.close };
  return { ...base, state: 'closedNow' };
}
