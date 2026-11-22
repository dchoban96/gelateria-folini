import { defineMiddleware } from 'astro:middleware';
import { COOKIE, validSession } from './lib/auth';

export const onRequest = defineMiddleware(async (ctx, next) => {
  const { pathname } = ctx.url;
  if (pathname.startsWith('/admin')) {
    const ok = await validSession(ctx.cookies.get(COOKIE)?.value);
    ctx.locals.admin = ok;
    if (!ok && pathname !== '/admin/login') return ctx.redirect('/admin/login');
    const res = await next();
    res.headers.set('cache-control', 'no-store');
    res.headers.set('x-robots-tag', 'noindex');
    return res;
  }
  return next();
});
