import { Meal, WebsiteSettings } from '../types/menu';

export const RESTAURANT_INFO = {
  name: "Kendi's Kitchen",
  uppercaseName: "KENDI'S",
  scriptSuffix: 'Kitchen',
  category: 'Nigerian Restaurant & Home Delivery',
  address:
    '21st Street, Shops A1 & A2, BIU Complex, Opposite UNIBEN Main Gate, BDPA, Benin City, Edo State, Nigeria.',
  shortLocation: 'BDPA, Opposite UNIBEN Main Gate, Benin City',
  phoneDisplay: '08030799915',
  secondaryPhoneDisplay: '09023572404',
  phoneTel: 'tel:+2348030799915',
  secondaryPhoneTel: 'tel:+2349023572404',
  whatsappNumber: '2348030799915',
  secondaryWhatsappNumber: '2349023572404',
  whatsappBaseUrl: 'https://wa.me/2348030799915',
  secondaryWhatsappBaseUrl: 'https://wa.me/2349023572404',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=21st+Street+BIU+Complex+Opposite+UNIBEN+Main+Gate+BDPA+Benin+City+Edo+State+Nigeria',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=Opposite%20UNIBEN%20Main%20Gate%20BDPA%20Benin%20City%20Edo%20State%20Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed',
};

export const DEFAULT_WEBSITE_SETTINGS: WebsiteSettings = {
  restaurantName: "Kendi's Kitchen",
  currency: 'NGN',
  isOpen: true,
  address:
    '21st Street, Shops A1 & A2, BIU Complex, Opposite UNIBEN Main Gate, BDPA, Benin City, Edo State, Nigeria.',
  phone: '08030799915',
  secondaryPhone: '09023572404',
  email: '',
  openingHours: 'Call 08030799915 or 09023572404 for service hours',
  deliveryAvailable: true,
  deliveryNotice:
    'Home delivery is available. Enter your delivery address at checkout or call/WhatsApp 08030799915 / 09023572404 to confirm delivery coverage and fee.',
  deliveryFeeNaira: null,
  deliveryAreas: '',
  deliveryTimeEstimate: '',
  heroSubtitle: 'Delicious Meals, Made for You.',
  heroDescription:
    "Welcome to Kendi's Kitchen, your destination for delicious meals and convenient food ordering in Benin City. Explore our menu, place your order and enjoy great food delivered to you.",
  welcomeHeading: 'Delicious Meals, Made for You.',
  welcomeBody:
    "Located at 21st Street, Shops A1 & A2, BIU Complex, Opposite UNIBEN Main Gate, BDPA, Benin City, Kendi's Kitchen serves freshly cooked Nigerian rice dishes, proteins, soups, and swallows—with home delivery available.",
  menuNotice:
    'All prices shown in Nigerian Naira (₦). Add your favourite dishes to cart for pickup or home delivery.',
};

export const RESTAURANT_IMAGES = {
  hero: '/src/assets/images/hero_nigerian_jollof.jpg',
  culinaryPrep: '/src/assets/images/dish_oha_soup.jpg',
  aboutTable: '/src/assets/images/dish_ofada_rice.jpg',
};

export const AVAILABLE_DISH_IMAGES = [
  { label: 'Jollof Rice', path: '/src/assets/images/dish_jollof_chicken.jpg' },
  { label: 'Fried Rice', path: '/src/assets/images/dish_fried_rice_chicken.jpg' },
  { label: 'White Rice', path: '/src/assets/images/dish_white_rice_platter.jpg' },
  { label: 'Ofada Rice', path: '/src/assets/images/dish_ofada_rice.jpg' },
  { label: 'Fried Turkey', path: '/src/assets/images/dish_fried_turkey.jpg' },
  { label: 'Gizzard', path: '/src/assets/images/dish_peppered_gizzard.jpg' },
  { label: 'Oha Soup', path: '/src/assets/images/dish_oha_soup.jpg' },
  { label: 'White Soup', path: '/src/assets/images/dish_fufu_ofe_nsala.jpg' },
  { label: 'Ofe Onugbu', path: '/src/assets/images/dish_ofe_onugbu.jpg' },
  { label: 'Vegetable Soup', path: '/src/assets/images/dish_vegetable_soup.jpg' },
  { label: 'Banga Soup & Starch', path: '/src/assets/images/dish_banga_soup.jpg' },
  { label: 'Black Soup', path: '/src/assets/images/dish_black_soup.jpg' },
  { label: 'Okra Soup', path: '/src/assets/images/dish_eba_okra.jpg' },
  { label: 'Kitchen Jollof Hero', path: '/src/assets/images/hero_nigerian_jollof.jpg' },
];

export const MEALS: Meal[] = [
  // ================= RICE DISHES =================
  {
    id: 'jollof-rice',
    name: 'Jollof Rice',
    category: 'Rice Dishes',
    shortDescription:
      'Smoky, richly seasoned Nigerian Jollof Rice slow-cooked in a vibrant tomato and pepper blend.',
    fullDescription:
      "Classic Nigerian party-style Jollof Rice prepared fresh at Kendi's Kitchen in rich blended tomato, tatase, scotch bonnet, and aromatic spices. Pair with Fried Turkey or Gizzard for a complete meal.",
    prepStyle: 'Rice Dish',
    price: 1500,
    image: '/src/assets/images/dish_jollof_chicken.jpg',
    imageAlt: 'Plate of Nigerian Jollof Rice served hot with seasoned protein and plantain',
    featured: true,
  },
  {
    id: 'fried-rice',
    name: 'Fried Rice',
    category: 'Rice Dishes',
    shortDescription:
      'Aromatic Nigerian Fried Rice stir-fried in savoury stock with carrots, sweet corn, and green peas.',
    fullDescription:
      'Long-grain parboiled rice infused with seasoned stock, thyme, curry, and colourful mixed vegetables—fried to light, fragrant perfection for dine-in, pickup, or home delivery.',
    prepStyle: 'Rice Dish',
    price: 1700,
    image: '/src/assets/images/dish_fried_rice_chicken.jpg',
    imageAlt: 'Plate of Nigerian Fried Rice with mixed vegetables and spiced protein',
    featured: true,
  },
  {
    id: 'white-rice',
    name: 'White Rice',
    category: 'Rice Dishes',
    shortDescription:
      'Fluffy steamed long-grain Nigerian White Rice served with rich tomato-pepper stew and fried plantain.',
    fullDescription:
      'Clean, fluffy steamed white rice served alongside slow-simmered Nigerian red tomato stew and golden plantain slices—ready to pair with your favourite protein.',
    prepStyle: 'Rice Dish',
    price: 1200,
    image: '/src/assets/images/dish_white_rice_platter.jpg',
    imageAlt: 'Nigerian White Rice plated with rich tomato stew and sweet fried plantain',
  },
  {
    id: 'ofada-rice',
    name: 'Ofada Rice',
    category: 'Rice Dishes',
    shortDescription:
      'Authentic aromatic Nigerian Ofada rice served with spicy green pepper ayamase sauce and assorted meats.',
    fullDescription:
      'Locally harvested Nigerian brown Ofada rice with its signature earthy aroma, paired with traditional green pepper sauce (ayamase), boiled egg, and tender assorted meats.',
    prepStyle: 'Signature Local Rice',
    price: 2500,
    image: '/src/assets/images/dish_ofada_rice.jpg',
    imageAlt: 'Traditional Nigerian Ofada Rice served on leaf with spicy sauce and meats',
    featured: true,
  },

  // ================= PROTEIN AND EXTRAS =================
  {
    id: 'fried-turkey',
    name: 'Fried Turkey',
    category: 'Protein and Extras',
    shortDescription:
      'Golden, crispy fried turkey wing & drumstick seasoned deeply in Nigerian spices and herbs.',
    fullDescription:
      'Succulent turkey cuts marinated in ginger, garlic, thyme, and seasoning broth before being fried crisp on the outside and tender inside. Ideal add-on for any rice or soup order.',
    prepStyle: 'Protein & Extra',
    price: 2500,
    image: '/src/assets/images/dish_fried_turkey.jpg',
    imageAlt: 'Golden brown crispy Nigerian Fried Turkey served ready to eat',
    featured: true,
  },
  {
    id: 'gizzard',
    name: 'Gizzard',
    category: 'Protein and Extras',
    shortDescription:
      'Tender peppered chicken gizzard sautéed in onions, bell peppers, and spicy ata-rodo sauce.',
    fullDescription:
      'Well-cleaned chicken gizzards simmered until tender and tossed in a fiery, aromatic sauce with sliced onions and sweet bell peppers. Great as an extra side or rice topper.',
    prepStyle: 'Protein & Extra',
    price: 1500,
    image: '/src/assets/images/dish_peppered_gizzard.jpg',
    imageAlt: 'Bowl of Nigerian peppered Gizzard sautéed with onions and bell peppers',
  },

  // ================= SOUPS AND SWALLOWS =================
  {
    id: 'oha-soup',
    name: 'Oha Soup',
    category: 'Soups and Swallows',
    shortDescription:
      'Traditional Oha leaf soup thickened with cocoyam and rich assorted meats, served with swallow.',
    fullDescription:
      'Authentic Nigerian Ofe Oha prepared with hand-torn fresh oha leaves, cocoyam paste thickener, palm oil, ogiri, stockfish, and tender beef—paired with your choice of swallow.',
    prepStyle: 'Soup & Swallow',
    price: 2800,
    image: '/src/assets/images/dish_oha_soup.jpg',
    imageAlt: 'Bowl of authentic Nigerian Oha Soup simmered with assorted meats and stockfish',
    featured: true,
  },
  {
    id: 'white-soup',
    name: 'White Soup',
    category: 'Soups and Swallows',
    shortDescription:
      'Aromatic Nigerian Ofe Nsala (White Soup) cooked without palm oil in rich spiced broth with swallow.',
    fullDescription:
      'Comforting Nigerian White Soup (Ofe Nsala) prepared with uda, ehuru, fresh utazi leaves, yam thickener, and tender protein—served warm with smooth swallow.',
    prepStyle: 'Soup & Swallow',
    price: 3200,
    image: '/src/assets/images/dish_fufu_ofe_nsala.jpg',
    imageAlt: 'Bowl of Nigerian White Soup (Ofe Nsala) served beside smooth swallow wraps',
  },
  {
    id: 'ofe-onugbu',
    name: 'Ofe Onugbu',
    category: 'Soups and Swallows',
    shortDescription:
      'Rich Nigerian Bitterleaf soup (Ofe Onugbu) simmered with cocoyam, stockfish, and assorted meats.',
    fullDescription:
      'Hearty traditional Ofe Onugbu slow-cooked with thoroughly washed bitterleaf, cocoyam thickener, ogiri okpei, dry fish, and assorted meats—paired with warm swallow.',
    prepStyle: 'Soup & Swallow',
    price: 2800,
    image: '/src/assets/images/dish_ofe_onugbu.jpg',
    imageAlt: 'Traditional Nigerian Ofe Onugbu (Bitterleaf Soup) cooked with assorted meats',
  },
  {
    id: 'vegetable-soup',
    name: 'Vegetable Soup',
    category: 'Soups and Swallows',
    shortDescription:
      'Fresh leafy Nigerian Vegetable Soup cooked in palm oil pepper base with fish, ponmo, and beef.',
    fullDescription:
      'Vibrant sautéed green leafy vegetable soup cooked in rich locust-bean and palm-oil pepper sauce loaded with fish, ponmo, and tender meats—served with your choice of swallow or rice.',
    prepStyle: 'Soup & Swallow',
    price: 2600,
    image: '/src/assets/images/dish_vegetable_soup.jpg',
    imageAlt: 'Rich Nigerian Vegetable Soup cooked with fried fish and roasted cowskin',
  },
  {
    id: 'banga-soup-and-starch',
    name: 'Banga Soup & Starch',
    category: 'Soups and Swallows',
    shortDescription:
      'Delta-Edo style palm-fruit Banga Soup simmered in aromatic spices and paired with golden Starch.',
    fullDescription:
      'Rich palm-nut Banga Soup seasoned with traditional spices (ataiko, oburunbebe stick, beletete), fresh fish, and meat—celebrating classic Benin and Delta comfort alongside smooth Starch.',
    prepStyle: 'Soup & Swallow',
    price: 3000,
    image: '/src/assets/images/dish_banga_soup.jpg',
    imageAlt: 'Rich Nigerian Banga Soup cooked with palm-fruit extract and fresh fish',
    featured: true,
  },
  {
    id: 'black-soup',
    name: 'Black Soup',
    category: 'Soups and Swallows',
    shortDescription:
      'Benin-style traditional Black Soup made with blended scent leaf, bitterleaf, palm oil, and meats.',
    fullDescription:
      'Beloved Edo heritage Black Soup crafted from finely pounded scent leaves, uziza, and bitterleaf simmered in seasoned stock with assorted meats and dried fish—served hot with swallow.',
    prepStyle: 'Benin Classic Soup & Swallow',
    price: 2800,
    image: '/src/assets/images/dish_black_soup.jpg',
    imageAlt: 'Plate of Benin-style Nigerian Black Soup served beside smooth swallow',
  },
  {
    id: 'okra-soup',
    name: 'Okra Soup',
    category: 'Soups and Swallows',
    shortDescription:
      'Freshly chopped spiced Nigerian Okra draw soup loaded with tender meat and served with swallow.',
    fullDescription:
      'Crisp-cooked Nigerian Okra Soup infused with rich pepper stew, palm oil, crayfish, and tender assorted proteins—served hot with smooth Eba, Semovita, or Fufu.',
    prepStyle: 'Soup & Swallow',
    price: 2500,
    image: '/src/assets/images/dish_eba_okra.jpg',
    imageAlt: 'Plate of spiced Nigerian Okra Soup served alongside smooth Eba swallow',
  },
];

export function formatPrice(price: number | null | undefined): string {
  if (typeof price === 'number' && price > 0) {
    return `₦${price.toLocaleString('en-NG')}`;
  }
  return 'Contact for Price';
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

export function toTelHref(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  if (!digits) return RESTAURANT_INFO.phoneTel;
  return digits.startsWith('0') ? `tel:+234${digits.slice(1)}` : `tel:+${digits}`;
}

export function toWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  if (!digits) return RESTAURANT_INFO.whatsappNumber;
  return digits.startsWith('0') ? `234${digits.slice(1)}` : digits;
}

export function buildWhatsAppOrderUrl(message: string, phoneOverride?: string): string {
  const num = phoneOverride ? toWhatsAppNumber(phoneOverride) : RESTAURANT_INFO.whatsappNumber;
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}
