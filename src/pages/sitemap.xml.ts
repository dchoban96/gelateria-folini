import type { APIRoute } from 'astro';
import { listPosts } from '../lib/db';

export const GET: APIRoute = async ({ url }) => {
  const posts = await listPosts(500);
  const pages = ['/', '/menu', '/diario', '/contatti', '/en', '/en/menu', '/en/contact', '/privacy'];
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const entries = [
    ...pages.map((p) => `<url><loc>${esc(url.origin + p)}</loc></url>`),
    ...posts.map((p) => `<url><loc>${esc(`${url.origin}/diario/${p.slug}`)}</loc><lastmod>${p.published_at.slice(0, 10)}</lastmod></url>`),
  ];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join('')}</urlset>`, {
    headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  });
};
