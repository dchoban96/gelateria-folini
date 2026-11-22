import type { Status } from './season';
import type { Flavor } from './db';

export type Lang = 'it' | 'en';

export const paths = {
  it: { home: '/', menu: '/menu', diary: '/diario', contact: '/contatti', privacy: '/privacy' },
  en: { home: '/en', menu: '/en/menu', diary: '/diario', contact: '/en/contact', privacy: '/privacy' },
} as const;

export const ui = {
  it: {
    skip: 'Vai al contenuto',
    nav: { menu: 'Vetrina', diary: 'Diario', contact: 'Contatti' },
    other: 'EN',
    otherLabel: 'English version',
    days: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'],
    cats: { gelato: 'Gelati', sorbetto: 'Sorbetti', torta: 'Torte', creazione: 'Creazioni e idee' },
    cat1: { gelato: 'gelato', sorbetto: 'sorbetto', torta: 'torta', creazione: 'creazione' },
    home: {
      title: 'Gelateria Folini, Sondrio. Gelato fatto da Max',
      desc: 'Gelati e sorbetti artigianali in Piazzale Merizzi a Sondrio. Aperti solo nella bella stagione: guarda i gusti in vetrina e gli orari.',
      h1: 'gelato fatto da max.',
      lead: 'Gelati e sorbetti artigianali in Piazzale Merizzi, a Sondrio. Aperti solo nella bella stagione.',
      cta: 'Guarda la vetrina',
      today: 'oggi in vetrina',
      winterGrid: 'li ritrovi a primavera',
      all: 'Tutta la vetrina',
      aboutH: 'dietro il banco, max',
      aboutLead: 'Capelli bianchi all’insù, occhiali neri grossi, braccia piene di tatuaggi. Lo riconosci da lontano.',
      about: [
        'Dietro il banco di Piazzale Merizzi c’è Max. Il gelato lo fa lui: gelati e sorbetti, pochi ingredienti scelti bene, la ricetta di una volta senza scorciatoie.',
        'Poi c’è quello che non era in programma. Un sorbetto rosa di dragon fruit, una torta coperta di lamponi, una pizza fatta di gelato. Le idee arrivano così, e il giorno dopo sono in vetrina.',
        'La gelateria apre solo nella bella stagione. D’inverno Max prova, sbaglia e riprova. A primavera si ricomincia, e qualche gusto nuovo c’è sempre.',
      ],
      tiles: [
        ['Max', 'gelatiere, e il resto lo vedi'],
        ['Gli occhiali', 'neri e grossi, sempre quelli'],
        ['Il gelato', 'gelati e sorbetti di alta qualità'],
        ['Le torte', 'si ordinano su WhatsApp'],
      ],
      cakesH: 'torte gelato',
      order: 'Ordina su WhatsApp',
      allCakes: 'Tutte le torte',
      proof: '4,7 su 5 su Google, da 127 persone passate dal banco.',
      proofLink: 'Leggi le recensioni',
      diaryH: 'dal diario di max',
      diaryAll: 'Tutto il diario',
    },
    menu: {
      title: 'La vetrina: gusti, sorbetti e torte. Gelateria Folini',
      desc: 'Tutti i gusti di Gelateria Folini a Sondrio: gelati, sorbetti, torte gelato su ordinazione e le idee di Max, con allergeni.',
      h1: 'la vetrina',
      lead: 'I gusti cambiano con la stagione e con l’umore di Max. Quelli segnati “oggi” sono al banco adesso.',
      all: 'Tutti',
      builderH: 'Componi il tuo cono',
      builderHint: 'Scegli fino a tre gusti.',
      says: 'Max dice:',
      today: 'oggi al banco',
      allergens: 'Allergeni:',
      count: (n: number) => (n === 1 ? '1 voce' : `${n} voci`),
      none: 'Nessun gusto con questo filtro, per ora.',
      allergenNote: 'Per allergie e intolleranze chiedi sempre al banco: in laboratorio si lavorano latte, uova, glutine e frutta a guscio.',
    },
    contact: {
      title: 'Contatti e orari. Gelateria Folini, Sondrio',
      desc: 'Gelateria Folini è in Piazzale Merizzi 1 a Sondrio. Orari di apertura, stagione, telefono e WhatsApp.',
      h1: 'vieni a trovarci',
      lead: 'Siamo in Piazzale Merizzi, a due passi dal centro di Sondrio. Per torte e ordini scrivi su WhatsApp, risponde Max.',
      address: 'Indirizzo',
      phone: 'Telefono',
      insta: 'Instagram',
      wa: 'Scrivi su WhatsApp',
      maps: 'Apri in Google Maps',
      hoursH: 'orari',
      season: (a: string, b: string) => `Stagione: dal ${a} al ${b}. Fuori stagione la gelateria è chiusa.`,
      closed: 'chiuso',
    },
    diary: {
      title: 'Il diario di Max. Gelateria Folini',
      desc: 'Foto e appunti dal laboratorio di Gelateria Folini a Sondrio: gusti nuovi, torte ed esperimenti raccontati da Max.',
    },
    foot: {
      say: 'Gelati e sorbetti di alta qualità, fatti a Sondrio.',
      cta: 'Ordina una torta',
      ctaSub: 'Su WhatsApp, risponde Max.',
      privacy: 'Privacy e cookie',
      admin: 'Area riservata',
    },
    waCake: (name: string) => `Ciao Max, vorrei ordinare: ${name}.`,
    waHello: 'Ciao Max, vorrei un’informazione.',
  },
  en: {
    skip: 'Skip to content',
    nav: { menu: 'Flavours', diary: 'Diary', contact: 'Contact' },
    other: 'IT',
    otherLabel: 'Versione italiana',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    cats: { gelato: 'Gelato', sorbetto: 'Sorbets', torta: 'Cakes', creazione: 'Creations and ideas' },
    cat1: { gelato: 'gelato', sorbetto: 'sorbet', torta: 'cake', creazione: 'creation' },
    home: {
      title: 'Gelateria Folini, Sondrio. Gelato made by Max',
      desc: 'Artisan gelato and sorbets in Piazzale Merizzi, Sondrio. Open in the warm season only: see today’s flavours and opening hours.',
      h1: 'gelato made by max.',
      lead: 'Artisan gelato and sorbets in Piazzale Merizzi, Sondrio. Open in the warm season only.',
      cta: 'See the flavours',
      today: 'in the counter today',
      winterGrid: 'back in spring',
      all: 'All flavours',
      aboutH: 'behind the counter, max',
      aboutLead: 'White hair standing up, chunky black glasses, arms covered in tattoos. You spot him from across the square.',
      about: [
        'Max stands behind the counter in Piazzale Merizzi. He makes the gelato himself: gelato and sorbets, a few well-chosen ingredients, the old recipe with no shortcuts.',
        'Then there is everything that was not planned. A pink dragon fruit sorbet, a cake covered in raspberries, a pizza made of gelato. Ideas turn up like that, and the next day they are in the counter.',
        'The shop opens in the warm season only. In winter Max tries, fails and tries again. In spring it all starts over, and there is always a new flavour or two.',
      ],
      tiles: [
        ['Max', 'gelato maker, the rest you can see'],
        ['The glasses', 'black and chunky, always the same'],
        ['The gelato', 'top quality gelato and sorbets'],
        ['The cakes', 'order them on WhatsApp'],
      ],
      cakesH: 'gelato cakes',
      order: 'Order on WhatsApp',
      allCakes: 'All cakes',
      proof: '4.7 out of 5 on Google, from 127 people who stopped at the counter.',
      proofLink: 'Read the reviews',
      diaryH: 'from max’s diary',
      diaryAll: 'The whole diary (Italian)',
    },
    menu: {
      title: 'Flavours, sorbets and cakes. Gelateria Folini',
      desc: 'Every flavour at Gelateria Folini in Sondrio: gelato, sorbets, made-to-order gelato cakes and Max’s ideas, with allergens.',
      h1: 'the counter',
      lead: 'Flavours change with the season and with Max’s mood. The ones marked “today” are in the counter right now.',
      all: 'All',
      builderH: 'Build your cone',
      builderHint: 'Pick up to three flavours.',
      says: 'Max says:',
      today: 'in today',
      allergens: 'Allergens:',
      count: (n: number) => (n === 1 ? '1 item' : `${n} items`),
      none: 'No flavours match this filter for now.',
      allergenNote: 'For allergies and intolerances always ask at the counter: the kitchen handles milk, eggs, gluten and nuts.',
    },
    contact: {
      title: 'Contact and opening hours. Gelateria Folini, Sondrio',
      desc: 'Gelateria Folini is at Piazzale Merizzi 1, Sondrio. Opening hours, season, phone and WhatsApp.',
      h1: 'come find us',
      lead: 'We are in Piazzale Merizzi, a short walk from the centre of Sondrio. For cakes and orders write on WhatsApp, Max replies.',
      address: 'Address',
      phone: 'Phone',
      insta: 'Instagram',
      wa: 'Write on WhatsApp',
      maps: 'Open in Google Maps',
      hoursH: 'opening hours',
      season: (a: string, b: string) => `Season: ${a} to ${b}. The shop is closed out of season.`,
      closed: 'closed',
    },
    foot: {
      say: 'Top quality gelato and sorbets, made in Sondrio.',
      cta: 'Order a cake',
      ctaSub: 'On WhatsApp, Max replies.',
      privacy: 'Privacy and cookies',
      admin: 'Staff area',
    },
    waCake: (name: string) => `Ciao Max, I would like to order: ${name}.`,
    waHello: 'Ciao Max, I have a question.',
  },
} as const;

export function fmtDay(d: Date, lang: Lang) {
  return new Intl.DateTimeFormat(lang === 'it' ? 'it-IT' : 'en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(d);
}
export function fmtMd(md: string, lang: Lang) {
  return fmtDay(new Date(`2024-${md}T12:00:00Z`), lang);
}
export function fmtDate(iso: string, lang: Lang) {
  return new Intl.DateTimeFormat(lang === 'it' ? 'it-IT' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Rome' }).format(new Date(iso));
}

/** Short state for the header and a full sentence for the hero. */
export function statusText(s: Status, lang: Lang): { short: string; title: string; line: string } {
  const it = lang === 'it';
  switch (s.state) {
    case 'open':
      return it
        ? { short: `Aperti ora, fino alle ${s.until}`, title: 'Aperti adesso.', line: `Oggi fino alle ${s.until}. Ti aspettiamo al banco.` }
        : { short: `Open now, until ${s.until}`, title: 'Open right now.', line: `Until ${s.until} today. See you at the counter.` };
    case 'opensLater':
      return it
        ? { short: `Oggi apriamo alle ${s.opensAt}`, title: `Apriamo alle ${s.opensAt}.`, line: `Oggi siamo aperti dalle ${s.opensAt} alle ${s.until}.` }
        : { short: `Opening at ${s.opensAt} today`, title: `Opening at ${s.opensAt}.`, line: `Open today from ${s.opensAt} to ${s.until}.` };
    case 'closedNow':
      return it
        ? { short: 'Chiusi per oggi', title: 'Per oggi abbiamo chiuso.', line: 'Il gelato di domani è già in preparazione.' }
        : { short: 'Closed for today', title: 'Closed for today.', line: 'Tomorrow’s gelato is already on its way.' };
    case 'closedToday':
      return it
        ? { short: 'Oggi siamo chiusi', title: 'Oggi siamo chiusi.', line: 'Ci rivediamo al prossimo giorno di apertura.' }
        : { short: 'Closed today', title: 'Closed today.', line: 'See you on our next opening day.' };
    default: {
      const date = s.reopenDate ? fmtDay(s.reopenDate, lang) : '';
      return it
        ? { short: `Chiusi per l’inverno. Riapriamo il ${date}`, title: 'La vetrina dorme.', line: `Riapriamo il ${date}: mancano ${s.daysToOpen} giorni.` }
        : { short: `Closed for winter. Back on ${date}`, title: 'The counter is asleep.', line: `We reopen on ${date}: ${s.daysToOpen} days to go.` };
    }
  }
}

export function flavorDesc(f: Flavor, lang: Lang) {
  return lang === 'en' && f.description_en ? f.description_en : f.description;
}
export function flavorFact(f: Flavor, lang: Lang) {
  const tag = f.tags.split(',').map((t) => t.trim()).filter(Boolean)[0];
  const cat = ui[lang].cat1[f.category] ?? f.category;
  return lang === 'it' && tag ? `${cat}, ${tag}` : cat;
}
