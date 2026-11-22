import type { APIRoute } from 'astro';
import { getSettings } from '../lib/db';

export const GET: APIRoute = async ({ url }) => {
  const { noindex } = await getSettings();
  const body = noindex
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nDisallow: /admin\n\nSitemap: ${url.origin}/sitemap.xml\n`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
