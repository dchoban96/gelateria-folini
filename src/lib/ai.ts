import Anthropic from '@anthropic-ai/sdk';
import { env } from 'cloudflare:workers';

// "Genera con AI" in the admin area. One short Claude call per click.
// The key is a Worker secret: `npx wrangler secret put ANTHROPIC_API_KEY` (locally: .dev.vars).

export type AiKind = 'flavor' | 'flavor_en' | 'post' | 'seo_title' | 'seo_description';
export type AiInput = { kind: AiKind; title?: string; text?: string; category?: string; page?: string };

const VOICE = `Scrivi per il sito di Gelateria Folini, una gelateria artigianale in Piazzale Merizzi a Sondrio, aperta solo nella bella stagione. Il gelato lo fa Max, il titolare: capelli bianchi, occhiali neri grossi, tatuaggi.

Il tono è quello di Max quando parla al banco: italiano semplice e diretto, frasi brevi, concreto, con un filo di ironia. Descrivi sapore, consistenza e ingredienti, non fare pubblicità. Niente punti esclamativi, niente emoji, niente parole come "delizioso", "irresistibile", "esplosione di gusto", "esperienza".

Usa solo le informazioni che ricevi. Non inventare ingredienti, allergeni, provenienze, premi, prezzi, date o storie: se un dettaglio non c'è, resta sul generico. Chi legge può avere allergie, quindi un ingrediente inventato è un errore grave.

Rispondi solo con il testo richiesto, pronto da incollare: nessuna premessa, nessuna spiegazione, nessuna virgoletta attorno, nessun elenco, nessun markdown.`;

const TASKS: Record<AiKind, { ask: (i: AiInput) => string; max: number }> = {
  flavor: {
    max: 600,
    ask: (i) =>
      `Scrivi la descrizione per il menu di questo prodotto (tipo: ${i.category || 'gelato'}): "${i.title}".\n` +
      (i.text ? `Appunti di Max, da rispettare e riscrivere meglio:\n${i.text}\n` : '') +
      `Due frasi, al massimo 220 caratteri in tutto.`,
  },
  flavor_en: {
    max: 600,
    ask: (i) =>
      `Translate this menu description into natural British English for tourists. Keep the same meaning, tone and length, and do not add anything. Product: "${i.title}".\nItalian text:\n${i.text}`,
  },
  post: {
    max: 20000,
    ask: (i) =>
      `Scrivi un breve post per il diario di Max dal titolo "${i.title}". Parla Max, in prima persona.\n` +
      (i.text ? `Appunti di Max, da usare come unica fonte dei fatti:\n${i.text}\n` : 'Non hai altri appunti: resta su quello che il titolo dice, senza aggiungere fatti.\n') +
      `Da due a quattro paragrafi brevi, separati da una riga vuota. Massimo 900 caratteri.`,
  },
  seo_title: {
    max: 60,
    ask: (i) =>
      `Scrivi il meta title per Google di questa pagina del sito: ${i.page || i.title}.\n` +
      (i.text ? `Contenuto della pagina:\n${i.text.slice(0, 1500)}\n` : '') +
      `Massimo 58 caratteri. Deve dire cosa c'è nella pagina e contenere "Gelateria Folini"; se c'è spazio anche "Sondrio". Niente punto finale.`,
  },
  seo_description: {
    max: 160,
    ask: (i) =>
      `Scrivi la meta description per Google di questa pagina del sito: ${i.page || i.title}.\n` +
      (i.text ? `Contenuto della pagina:\n${i.text.slice(0, 1500)}\n` : '') +
      `Una o due frasi, tra 120 e 155 caratteri. Deve far capire cosa si trova nella pagina e invogliare a passare in gelateria a Sondrio.`,
  },
};

export class AiError extends Error {}

export const aiConfigured = () => !!env.ANTHROPIC_API_KEY;

export async function generate(input: AiInput): Promise<string> {
  const task = TASKS[input.kind];
  if (!task) throw new AiError('Richiesta non valida.');
  if (!env.ANTHROPIC_API_KEY) throw new AiError('L’AI non è ancora attiva su questo sito: va collegata da chi lo gestisce. Intanto puoi scrivere il testo a mano.');
  if (!input.title?.trim() && !input.page?.trim()) throw new AiError('Scrivi prima il titolo: serve all’AI per sapere di cosa parlare.');
  if (input.kind === 'flavor_en' && !input.text?.trim()) throw new AiError('Scrivi prima la descrizione in italiano: l’AI la traduce.');

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, maxRetries: 1, timeout: 45_000 });
  try {
    const res = await client.beta.messages.create({
      model: 'claude-opus-5-5',
      max_tokens: 16000,
      // short copy: thinking stays on (it cannot be disabled on this model) but at the lowest depth
      output_config: { effort: 'low' },
      // if a safety classifier declines, the API retries on a fallback model within the same call
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: VOICE,
      messages: [{ role: 'user', content: task.ask(input) }],
    });
    if (res.stop_reason === 'refusal') throw new AiError('L’AI non ha voluto scrivere questo testo. Prova a cambiare il titolo o gli appunti.');
    const text = res.content
      .map((b) => (b.type === 'text' ? b.text : ''))
      .join('')
      .trim()
      .replace(/^["«“]|["»”]$/g, '');
    if (!text) throw new AiError('L’AI non ha scritto niente. Riprova.');
    return text.length > task.max ? text.slice(0, text.lastIndexOf(' ', task.max)).replace(/[,;:]$/, '') : text;
  } catch (e) {
    if (e instanceof AiError) throw e;
    if (e instanceof Anthropic.AuthenticationError) throw new AiError('La chiave AI non è valida. Va controllata nelle impostazioni del sito.');
    if (e instanceof Anthropic.RateLimitError) throw new AiError('Troppe richieste all’AI in poco tempo. Aspetta un minuto e riprova.');
    if (e instanceof Anthropic.APIConnectionError) throw new AiError('Non riesco a raggiungere l’AI. Controlla la connessione e riprova.');
    if (e instanceof Anthropic.APIError) throw new AiError(`L’AI ha risposto con un errore (${e.status ?? '?'}). Riprova tra poco.`);
    throw e;
  }
}
