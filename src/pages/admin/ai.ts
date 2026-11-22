import type { APIRoute } from 'astro';
import { generate, AiError, type AiKind } from '../../lib/ai';

// POST /admin/ai — only reachable when logged in (see middleware). Returns { text } or { error }.
const KINDS: AiKind[] = ['flavor', 'flavor_en', 'post', 'seo_title', 'seo_description'];
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

// a simple brake so a stuck button or a script cannot burn through the AI budget
let windowStart = 0;
let count = 0;

export const POST: APIRoute = async ({ request, url }) => {
  if (request.headers.get('origin') !== url.origin) return json({ error: 'Richiesta non valida.' }, 403);
  const now = Date.now();
  if (now - windowStart > 60_000) { windowStart = now; count = 0; }
  if (++count > 12) return json({ error: 'Troppe richieste in un minuto. Aspetta un attimo e riprova.' }, 429);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Richiesta non valida.' }, 400);
  }
  const kind = String(body.kind) as AiKind;
  if (!KINDS.includes(kind)) return json({ error: 'Richiesta non valida.' }, 400);
  const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
  try {
    const text = await generate({ kind, title: str(body.title, 200), text: str(body.text, 6000), category: str(body.category, 40), page: str(body.page, 200) });
    return json({ text });
  } catch (e) {
    if (e instanceof AiError) return json({ error: e.message }, 422);
    console.error('ai', e);
    return json({ error: 'Qualcosa è andato storto con l’AI. Riprova tra poco.' }, 500);
  }
};
