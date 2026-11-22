import type { Settings } from './db';

// Starter content. The flavour list, descriptions, season dates and hours are SAMPLES for Max to confirm.
export const defaultSettings: Settings = {
  seasonOpen: '03-15',
  seasonClose: '10-15',
  hours: Array.from({ length: 7 }, () => ({ open: '12:00', close: '22:30', closed: false })),
  closedDate: '',
  notice: '',
  seo: {
    home: { title: '', description: '' },
    menu: { title: '', description: '' },
    contact: { title: '', description: '' },
    diary: { title: '', description: '' },
  },
  noindex: false,
};

type SeedFlavor = {
  name: string;
  description: string;
  description_en: string;
  category: string;
  color: string;
  image?: string;
  tags?: string;
  allergens?: string;
  price?: string;
};

export const seedFlavors: SeedFlavor[] = [
  { name: 'Dragon fruit', category: 'sorbetto', color: '#e83e9c', image: '/img/dragon-fruit.webp', tags: 'vegano,senza lattosio', description: 'Sorbetto di pitaya rossa. Fresco, appena dolce, con i semini che scrocchiano. Il rosa è tutto suo.', description_en: 'Red pitaya sorbet. Fresh, lightly sweet, with tiny crunchy seeds. The pink is all its own.' },
  { name: 'Dulce de leche', category: 'gelato', color: '#d99a4e', image: '/img/dulce-de-leche.webp', allergens: 'latte', description: 'Crema al caramello di latte, variegata a mano con altro dulce de leche. Per chi non ha paura del dolce.', description_en: 'Milk caramel gelato, rippled by hand with more dulce de leche. For people who are not afraid of sweet.' },
  { name: 'Noci e miele', category: 'gelato', color: '#e8cf9a', image: '/img/noci-miele.webp', allergens: 'latte, frutta a guscio', description: 'Fior di latte, gherigli di noce interi e miele versato sopra a filo.', description_en: 'Fior di latte, whole walnut halves and a thread of honey poured on top.' },
  { name: 'Pistacchio', category: 'gelato', color: '#a9bf5a', allergens: 'latte, frutta a guscio', description: 'Solo pasta di pistacchio, latte e zucchero. Verde spento, come deve essere.', description_en: 'Just pistachio paste, milk and sugar. A dull green, as it should be.' },
  { name: 'Fior di latte', category: 'gelato', color: '#f3ead8', allergens: 'latte', description: 'Latte, panna, zucchero. Il gusto da cui si capisce una gelateria.', description_en: 'Milk, cream, sugar. The flavour that tells you everything about a gelateria.' },
  { name: 'Nocciola', category: 'gelato', color: '#b98556', allergens: 'latte, frutta a guscio', description: 'Nocciole tostate, tonde e profumate. Sta bene con tutto, soprattutto col cioccolato.', description_en: 'Toasted hazelnuts, round and fragrant. Good with everything, chocolate above all.' },
  { name: 'Cioccolato fondente', category: 'gelato', color: '#5a3324', allergens: 'latte', description: 'Scuro e deciso, poco zucchero. Lascia la bocca pulita.', description_en: 'Dark and firm, low on sugar. Leaves a clean finish.' },
  { name: 'Stracciatella', category: 'gelato', color: '#efe6d4', allergens: 'latte', description: 'Fior di latte e scaglie di cioccolato fondente spezzate a mano.', description_en: 'Fior di latte with hand-broken shards of dark chocolate.' },
  { name: 'Limone', category: 'sorbetto', color: '#f4dc5b', tags: 'vegano,senza lattosio', description: 'Succo di limone, acqua, zucchero. Aspro quanto serve dopo pranzo.', description_en: 'Lemon juice, water, sugar. As sharp as you need after lunch.' },
  { name: 'Fragola', category: 'sorbetto', color: '#e2334f', tags: 'vegano,senza lattosio', description: 'Fragole frullate e poco altro. Cambia colore con la stagione, come le fragole.', description_en: 'Blended strawberries and little else. The colour shifts with the season, like the fruit.' },
  { name: 'Lampone', category: 'sorbetto', color: '#c9245a', tags: 'vegano,senza lattosio', description: 'Lamponi interi passati al setaccio. Profumo forte, punta acida.', description_en: 'Whole raspberries pushed through a sieve. Strong scent, a sour edge.' },
  { name: 'Torta lamponi e cioccolato bianco', category: 'torta', color: '#e2334f', image: '/img/torta-lamponi.webp', allergens: 'latte, glutine, uova', price: 'su ordinazione', description: 'Semifreddo bianco su base morbida, lamponi freschi in cerchio e margherite di cioccolato bianco.', description_en: 'White semifreddo on a soft base, a ring of fresh raspberries and white chocolate daisies.' },
  { name: 'Torta al pistacchio', category: 'torta', color: '#bfd07a', image: '/img/torta-pistacchio.webp', allergens: 'latte, glutine, uova, frutta a guscio', price: 'su ordinazione', description: 'Semifreddo al pistacchio coperto di granella, su una base rossa che si vede al taglio.', description_en: 'Pistachio semifreddo covered in chopped pistachios, on a red base that shows when you cut it.' },
  { name: 'Casanova', category: 'creazione', color: '#f58a2c', allergens: 'chiedi al banco', description: 'La coppa della casa. Com’è fatta oggi te lo dice Max al banco.', description_en: 'The house sundae. Ask Max at the counter how it is made today.' },
  { name: 'Pizza Ice', category: 'creazione', color: '#e83e9c', allergens: 'chiedi al banco', description: 'Una pizza, ma di gelato: si taglia a spicchi e si divide. Per i compleanni va ordinata prima.', description_en: 'A pizza, but made of gelato: cut it in slices and share. Order ahead for birthdays.' },
  { name: 'Noci, miele e fior di latte', category: 'creazione', color: '#e8cf9a', description: 'Idea di Max: una pallina di noci e miele, una di fior di latte, niente panna. Il miele fa già tutto.', description_en: 'Max’s idea: one scoop of walnut and honey, one of fior di latte, no cream. The honey does the work.' },
  { name: 'Rosa e verde', category: 'creazione', color: '#a9bf5a', description: 'Idea di Max: dragon fruit sotto, pistacchio sopra. Fresco prima, tondo dopo.', description_en: 'Max’s idea: dragon fruit below, pistachio on top. Fresh first, round after.' },
];

export const seedPosts = [
  {
    slug: 'dragon-fruit-il-rosa',
    title: 'Dragon fruit: quel rosa non è un colorante',
    image: '/img/dragon-fruit.webp',
    published_at: '2026-07-18T10:00:00.000Z',
    body: 'Me lo chiedono tutti i giorni: «Ma è vero quel colore?». È vero. La pitaya rossa è così di suo, io ci metto acqua, zucchero e basta.\n\nI puntini neri sono i semi. Restano interi e scrocchiano un po’ sotto i denti, come nel kiwi.\n\nÈ un sorbetto, quindi niente latte. Provatelo da solo la prima volta, poi ditemi con cosa lo abbinereste.',
  },
  {
    slug: 'noci-e-miele',
    title: 'Noci e miele, finito a mano',
    image: '/img/noci-miele.webp',
    published_at: '2026-08-02T10:00:00.000Z',
    body: 'Questa vaschetta la finisco sempre per ultima, quando il gelato è già in vetrina: prima le noci, poi il miele a filo.\n\nNon lo mescolo. Così ogni pallina è diversa: a qualcuno tocca più miele, a qualcuno più noci. Fa parte del gioco.',
  },
];
