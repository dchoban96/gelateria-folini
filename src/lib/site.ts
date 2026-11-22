export const SITE = {
  name: 'Gelateria Folini',
  street: 'Piazzale Merizzi 1',
  city: '23100 Sondrio (SO)',
  phone: '375 653 9154',
  phoneHref: 'tel:+393756539154',
  instagram: 'https://www.instagram.com/massimogelato/',
  instagramHandle: '@massimogelato',
  maps: 'https://www.google.com/maps/search/?api=1&query=Gelateria+Folini+Piazzale+Merizzi+1+Sondrio',
  reviews: 'https://www.google.com/search?q=Gelateria+Folini+Sondrio+recensioni',
  vat: 'P.IVA da inserire',
};

export function whatsapp(text: string) {
  return `https://wa.me/393756539154?text=${encodeURIComponent(text)}`;
}
