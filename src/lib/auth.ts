import { env } from 'cloudflare:workers';

export const COOKIE = 'folini_admin';
const WEEK = 60 * 60 * 24 * 7;
const enc = new TextEncoder();

async function sign(data: string) {
  const secret = env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET is not set');
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function checkPassword(input: string) {
  const real = env.ADMIN_PASSWORD;
  if (!real || real.length < 8) return false;
  // compare digests so timing does not depend on where the strings differ
  return safeEqual(await sign(`pw:${input}`), await sign(`pw:${real}`));
}

export async function makeSession() {
  const exp = Math.floor(Date.now() / 1000) + WEEK;
  return { value: `${exp}.${await sign(`s:${exp}`)}`, maxAge: WEEK };
}

export async function validSession(value: string | undefined) {
  if (!value) return false;
  const [exp, sig] = value.split('.');
  if (!exp || !sig || +exp < Date.now() / 1000) return false;
  return safeEqual(sig, await sign(`s:${exp}`));
}
