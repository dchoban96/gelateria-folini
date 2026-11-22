import { env } from 'cloudflare:workers';
import { seedFlavors, seedPosts, defaultSettings } from './seed';

export type Flavor = {
  id: number;
  name: string;
  description: string;
  description_en: string;
  category: 'gelato' | 'sorbetto' | 'torta' | 'creazione';
  image: string;
  color: string;
  tags: string;
  allergens: string;
  price: string;
  today: number;
  visible: number;
  sort: number;
};

export type Post = {
  id: number;
  slug: string;
  title: string;
  body: string;
  image: string;
  published_at: string;
  seo_title: string;
  seo_description: string;
};

export type PageSeo = { title: string; description: string };
export const SEO_PAGES = ['home', 'menu', 'contact', 'diary'] as const;
export type SeoPage = (typeof SEO_PAGES)[number];

export type DayHours = { open: string; close: string; closed: boolean };
export type Settings = {
  seasonOpen: string; // MM-DD
  seasonClose: string; // MM-DD
  hours: DayHours[]; // Monday first
  closedDate: string; // YYYY-MM-DD, the "closed today" switch
  notice: string;
  seo: Record<SeoPage, PageSeo>; // empty strings mean "use the built-in text"
  noindex: boolean; // hide the whole site from search engines until it is ready
};

export const CATEGORIES = ['gelato', 'sorbetto', 'torta', 'creazione'] as const;

const d1 = () => env.DB;
let ready: Promise<void> | null = null;

/** Creates the tables on first use and fills them with starter content once. */
export function ensure(): Promise<void> {
  ready ??= init().catch((e) => {
    ready = null;
    throw e;
  });
  return ready;
}

async function init() {
  const db = d1();
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS flavors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      description_en TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT 'gelato',
      image TEXT NOT NULL DEFAULT '',
      color TEXT NOT NULL DEFAULT '#f0b866',
      tags TEXT NOT NULL DEFAULT '',
      allergens TEXT NOT NULL DEFAULT '',
      price TEXT NOT NULL DEFAULT '',
      today INTEGER NOT NULL DEFAULT 1,
      visible INTEGER NOT NULL DEFAULT 1,
      sort INTEGER NOT NULL DEFAULT 0
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      body TEXT NOT NULL DEFAULT '',
      image TEXT NOT NULL DEFAULT '',
      published_at TEXT NOT NULL
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)`),
  ]);
  // columns added after the first release
  const cols = ((await db.prepare(`PRAGMA table_info(posts)`).all()).results as { name: string }[]).map((c) => c.name);
  for (const col of ['seo_title', 'seo_description']) {
    if (!cols.includes(col)) await db.prepare(`ALTER TABLE posts ADD COLUMN ${col} TEXT NOT NULL DEFAULT ''`).run();
  }
  const seeded = await db.prepare(`SELECT value FROM settings WHERE key = 'seeded'`).first();
  if (seeded) return;
  const stmts = [
    db.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES ('site', ?)`).bind(JSON.stringify(defaultSettings)),
    db.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES ('seeded', '1')`),
  ];
  seedFlavors.forEach((f, i) =>
    stmts.push(
      db
        .prepare(
          `INSERT INTO flavors (name, description, description_en, category, image, color, tags, allergens, price, today, visible, sort)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1, ?)`,
        )
        .bind(f.name, f.description, f.description_en, f.category, f.image ?? '', f.color, f.tags ?? '', f.allergens ?? '', f.price ?? '', i * 10),
    ),
  );
  seedPosts.forEach((p) =>
    stmts.push(
      db.prepare(`INSERT INTO posts (slug, title, body, image, published_at) VALUES (?, ?, ?, ?, ?)`).bind(p.slug, p.title, p.body, p.image, p.published_at),
    ),
  );
  await db.batch(stmts);
}

/* ---------- settings ---------- */
export async function getSettings(): Promise<Settings> {
  await ensure();
  const row = await d1().prepare(`SELECT value FROM settings WHERE key = 'site'`).first();
  try {
    const saved = JSON.parse(row?.value ?? '{}');
    return { ...defaultSettings, ...saved, seo: { ...defaultSettings.seo, ...(saved.seo ?? {}) } };
  } catch {
    return defaultSettings;
  }
}
export async function saveSettings(s: Settings) {
  await ensure();
  await d1().prepare(`INSERT INTO settings (key, value) VALUES ('site', ?1) ON CONFLICT(key) DO UPDATE SET value = ?1`).bind(JSON.stringify(s)).run();
}

/* ---------- flavors ---------- */
export async function listFlavors(opts: { all?: boolean } = {}): Promise<Flavor[]> {
  await ensure();
  const where = opts.all ? '' : 'WHERE visible = 1';
  const { results } = await d1().prepare(`SELECT * FROM flavors ${where} ORDER BY sort, id`).all();
  return results as Flavor[];
}
export async function getFlavor(id: number): Promise<Flavor | null> {
  await ensure();
  return (await d1().prepare(`SELECT * FROM flavors WHERE id = ?`).bind(id).first()) as Flavor | null;
}
export async function saveFlavor(f: Omit<Flavor, 'id' | 'sort'> & { id?: number }) {
  await ensure();
  const v = [f.name, f.description, f.description_en, f.category, f.image, f.color, f.tags, f.allergens, f.price, f.today, f.visible];
  if (f.id) {
    await d1()
      .prepare(`UPDATE flavors SET name=?, description=?, description_en=?, category=?, image=?, color=?, tags=?, allergens=?, price=?, today=?, visible=? WHERE id=?`)
      .bind(...v, f.id)
      .run();
  } else {
    await d1()
      .prepare(
        `INSERT INTO flavors (name, description, description_en, category, image, color, tags, allergens, price, today, visible, sort)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT COALESCE(MAX(sort), 0) + 10 FROM flavors))`,
      )
      .bind(...v)
      .run();
  }
}
export async function deleteFlavor(id: number) {
  await ensure();
  await d1().prepare(`DELETE FROM flavors WHERE id = ?`).bind(id).run();
}
export async function setToday(ids: number[]) {
  await ensure();
  const db = d1();
  const stmts = [db.prepare(`UPDATE flavors SET today = 0`)];
  for (const id of ids) stmts.push(db.prepare(`UPDATE flavors SET today = 1 WHERE id = ?`).bind(id));
  await db.batch(stmts);
}

/* ---------- posts ---------- */
export async function listPosts(limit = 100): Promise<Post[]> {
  await ensure();
  const { results } = await d1().prepare(`SELECT * FROM posts ORDER BY published_at DESC, id DESC LIMIT ?`).bind(limit).all();
  return results as Post[];
}
export async function getPost(id: number): Promise<Post | null> {
  await ensure();
  return (await d1().prepare(`SELECT * FROM posts WHERE id = ?`).bind(id).first()) as Post | null;
}
export async function getPostBySlug(slug: string): Promise<Post | null> {
  await ensure();
  return (await d1().prepare(`SELECT * FROM posts WHERE slug = ?`).bind(slug).first()) as Post | null;
}
export function slugify(s: string) {
  return (
    s
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 70) || 'post'
  );
}
export async function savePost(p: { id?: number; title: string; body: string; image: string; seo_title: string; seo_description: string }) {
  await ensure();
  if (p.id) {
    await d1()
      .prepare(`UPDATE posts SET title=?, body=?, image=?, seo_title=?, seo_description=? WHERE id=?`)
      .bind(p.title, p.body, p.image, p.seo_title, p.seo_description, p.id)
      .run();
    return;
  }
  let slug = slugify(p.title);
  if (await getPostBySlug(slug)) slug = `${slug}-${Date.now().toString(36)}`;
  await d1()
    .prepare(`INSERT INTO posts (slug, title, body, image, published_at, seo_title, seo_description) VALUES (?, ?, ?, ?, ?, ?, ?)`)
    .bind(slug, p.title, p.body, p.image, new Date().toISOString(), p.seo_title, p.seo_description)
    .run();
}
export async function deletePost(id: number) {
  await ensure();
  await d1().prepare(`DELETE FROM posts WHERE id = ?`).bind(id).run();
}
