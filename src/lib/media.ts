import { env } from 'cloudflare:workers';

const TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
const MAX = 8 * 1024 * 1024;

/** Stores an uploaded photo and returns its public path, or an Italian error message. */
export async function saveImage(file: unknown): Promise<{ path?: string; error?: string }> {
  if (!(file instanceof File) || file.size === 0) return {};
  const ext = TYPES[file.type];
  if (!ext) return { error: 'Questa foto non si può caricare. Usa una foto JPG, PNG o WebP.' };
  if (file.size > MAX) return { error: 'La foto è troppo pesante (massimo 8 MB). Prova con una foto più piccola.' };
  const key = `${crypto.randomUUID()}.${ext}`;
  await env.MEDIA.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
  return { path: `/media/${key}` };
}

export async function removeImage(path: string) {
  if (path?.startsWith('/media/')) await env.MEDIA.delete(path.slice('/media/'.length));
}
