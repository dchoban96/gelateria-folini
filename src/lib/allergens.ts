// The 14 EU allergens. Max types them as plain words in the admin ("latte, frutta a guscio");
// each word that matches becomes an icon on the menu.
export type Allergen = { key: string; it: string; en: string; color: string; match: RegExp; svg: string };

export const ALLERGENS: Allergen[] = [
  {
    key: 'glutine', it: 'glutine', en: 'gluten', color: '#7a7d4f', match: /glutin|gluten|grano|frumento|cereal/i,
    svg: '<rect x="11.25" y="8" width="1.5" height="13" rx=".75"/><ellipse cx="12" cy="5" rx="2" ry="3"/><ellipse cx="8.6" cy="9" rx="1.8" ry="3" transform="rotate(-32 8.6 9)"/><ellipse cx="15.4" cy="9" rx="1.8" ry="3" transform="rotate(32 15.4 9)"/><ellipse cx="8.6" cy="14" rx="1.8" ry="3" transform="rotate(-32 8.6 14)"/><ellipse cx="15.4" cy="14" rx="1.8" ry="3" transform="rotate(32 15.4 14)"/>',
  },
  {
    key: 'crostacei', it: 'crostacei', en: 'crustaceans', color: '#0f8f84', match: /crostace|crustac/i,
    svg: '<ellipse cx="12" cy="14.5" rx="5.5" ry="4.5"/><circle cx="5.5" cy="7" r="2.6"/><circle cx="18.5" cy="7" r="2.6"/><g fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"><path d="M7.5 12 5.8 9M16.500 12l1.700-3M6.500 15.500 3.500 16M6.800 17.500 4.500 19.500M17.500 15.500l3 .5M17.200 17.500l2.300 2"/></g>',
  },
  {
    key: 'uova', it: 'uova', en: 'eggs', color: '#86506b', match: /uov|egg/i,
    svg: '<path d="M12 3.500c3.200 0 6 5.300 6 9.500a6 6 0 0 1-12 0c0-4.200 2.800-9.500 6-9.500z"/>',
  },
  {
    key: 'pesce', it: 'pesce', en: 'fish', color: '#b97f00', match: /pesce|fish/i,
    svg: '<path d="M2.500 12c3-4.200 7-5.200 11-4.200 2.200.6 4 2.100 5 4.200-1 2.100-2.800 3.600-5 4.200-4 1-8 0-11-4.200z"/><path d="M17.500 12 22 7.800v8.400z"/><circle cx="6.500" cy="11.300" r="1" fill="var(--c)"/>',
  },
  {
    key: 'arachidi', it: 'arachidi', en: 'peanuts', color: '#d9771a', match: /arachid|peanut/i,
    svg: '<path d="M9.500 2.800a4.200 4.200 0 0 1 4.200 4.200c0 1.600.9 2.300 2 3.300a5.700 5.700 0 1 1-8.300 7.200c-1-1.900-.2-3.600-.7-5.500C6.300 10.300 5.300 9.200 5.300 7a4.200 4.200 0 0 1 4.200-4.200z"/><path d="M8 6.500l3 2M11.500 13.500l4 2.500M10.500 16.500l3 2" fill="none" stroke="var(--c)" stroke-width="1.200" stroke-linecap="round"/>',
  },
  {
    key: 'soia', it: 'soia', en: 'soy', color: '#c2185b', match: /soia|soy/i,
    svg: '<ellipse cx="12" cy="12" rx="9.500" ry="4.300" transform="rotate(-30 12 12)"/><circle cx="7.700" cy="14.500" r="1.700" fill="var(--c)"/><circle cx="12" cy="12" r="1.700" fill="var(--c)"/><circle cx="16.300" cy="9.500" r="1.700" fill="var(--c)"/>',
  },
  {
    key: 'latte', it: 'latte', en: 'milk', color: '#6f6a6a', match: /latte|lattosio|milk|panna|burro/i,
    svg: '<path d="M10 2.500h4v3.200l2.200 3.100v10.700a2 2 0 0 1-2 2H9.800a2 2 0 0 1-2-2V8.800L10 5.700z"/><rect x="9.600" y="12" width="4.800" height="4.200" rx=".6" fill="var(--c)"/>',
  },
  {
    key: 'guscio', it: 'frutta a guscio', en: 'nuts', color: '#a86a12', match: /guscio|nocciol|noci|pistacch|mandorl|nut/i,
    svg: '<path d="M12 21.500c-4.200-2-7.200-5.200-7.200-9.300a7.200 7.200 0 0 1 14.400 0c0 4.100-3 7.300-7.200 9.300z"/><path d="M5.500 10c4.300 2 8.700 2 13 0" fill="none" stroke="var(--c)" stroke-width="1.500"/>',
  },
  {
    key: 'sedano', it: 'sedano', en: 'celery', color: '#7a62a8', match: /sedano|celery/i,
    svg: '<circle cx="12" cy="6" r="3.400"/><circle cx="7.300" cy="10.200" r="3.200"/><circle cx="16.700" cy="10.200" r="3.200"/><rect x="11" y="8" width="2" height="13.500" rx="1"/>',
  },
  {
    key: 'senape', it: 'senape', en: 'mustard', color: '#0d4a4a', match: /senape|mustard/i,
    svg: '<path d="M11 2h2v3.200l2.600 2.500V20a2 2 0 0 1-2 2h-3.200a2 2 0 0 1-2-2V7.700L11 5.200z"/><rect x="9.800" y="11.500" width="4.400" height="5" rx=".6" fill="var(--c)"/>',
  },
  {
    key: 'sesamo', it: 'sesamo', en: 'sesame', color: '#c8621c', match: /sesam/i,
    svg: '<path d="M8 3.500c2 2.500 3 4 3 5.500a3 3 0 0 1-6 0c0-1.500 1-3 3-5.500z"/><path d="M16.500 6c2 2.500 3 4 3 5.500a3 3 0 0 1-6 0c0-1.500 1-3 3-5.500z"/><path d="M10.500 13c2 2.500 3 4 3 5.500a3 3 0 0 1-6 0c0-1.500 1-3 3-5.500z"/>',
  },
  {
    key: 'solfiti', it: 'solfiti', en: 'sulphites', color: '#d81b60', match: /solfit|sulph|sulf/i,
    svg: '<path d="M7 3h10c0 5-1.500 8-4 8.800V19h3v2H8v-2h3v-7.200C8.500 11 7 8 7 3z"/>',
  },
  {
    key: 'lupini', it: 'lupini', en: 'lupin', color: '#3f8588', match: /lupin/i,
    svg: '<path d="M12 2.500l3 3.300H9zM12 6.800l4 3.700H8zM12 11.500l5 4.200H7z"/><rect x="11.250" y="14" width="1.500" height="7.500" rx=".75"/>',
  },
  {
    key: 'molluschi', it: 'molluschi', en: 'molluscs', color: '#d9532f', match: /mollusc/i,
    svg: '<path d="M12 20.500C6 20.500 3 15.500 3 11.500a9 9 0 0 1 18 0c0 4-3 9-9 9z"/><path d="M12 20V4M12 20 6.500 6M12 20l5.500-14" fill="none" stroke="var(--c)" stroke-width="1.200"/>',
  },
];

/** The allergens named in a free-text field, in the standard order. */
export function findAllergens(text: string): Allergen[] {
  return ALLERGENS.filter((a) => a.match.test(text));
}
