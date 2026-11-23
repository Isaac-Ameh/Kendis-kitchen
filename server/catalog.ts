export interface ServerMealInfo {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  prepStyle: string;
  priceNaira: number;
  priceConfirmed: boolean;
  image: string;
  imageAlt: string;
  isAvailable: boolean;
  isFeatured: boolean;
}

export const INITIAL_SERVER_MEALS: ServerMealInfo[] = [
  {
    id: 'jollof-rice',
    name: 'Jollof Rice',
    category: 'Rice Dishes',
    shortDescription:
      'Smoky, richly seasoned Nigerian Jollof Rice slow-cooked in a vibrant tomato and pepper blend.',
    fullDescription:
      "Classic Nigerian party-style Jollof Rice prepared fresh at Kendi's Kitchen in rich blended tomato, tatase, scotch bonnet, and aromatic spices. Pair with Fried Turkey or Gizzard for a complete meal.",
    prepStyle: 'Rice Dish',
    priceNaira: 1500,
    priceConfirmed: true,
    image: '/src/assets/images/dish_jollof_chicken.jpg',
    imageAlt: 'Plate of Nigerian Jollof Rice served hot with seasoned protein and plantain',
    isAvailable: true,
    isFeatured: true,
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
    priceNaira: 1700,
    priceConfirmed: true,
    image: '/src/assets/images/dish_fried_rice_chicken.jpg',
    imageAlt: 'Plate of Nigerian Fried Rice with mixed vegetables and spiced protein',
    isAvailable: true,
    isFeatured: true,
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
    priceNaira: 1200,
    priceConfirmed: true,
    image: '/src/assets/images/dish_white_rice_platter.jpg',
    imageAlt: 'Nigerian White Rice plated with rich tomato stew and sweet fried plantain',
    isAvailable: true,
    isFeatured: false,
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
    priceNaira: 2500,
    priceConfirmed: true,
    image: '/src/assets/images/dish_ofada_rice.jpg',
    imageAlt: 'Traditional Nigerian Ofada Rice served on leaf with spicy sauce and meats',
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: 'fried-turkey',
    name: 'Fried Turkey',
    category: 'Protein and Extras',
    shortDescription:
      'Golden, crispy fried turkey wing & drumstick seasoned deeply in Nigerian spices and herbs.',
    fullDescription:
      'Succulent turkey cuts marinated in ginger, garlic, thyme, and seasoning broth before being fried crisp on the outside and tender inside. Ideal add-on for any rice or soup order.',
    prepStyle: 'Protein & Extra',
    priceNaira: 2500,
    priceConfirmed: true,
    image: '/src/assets/images/dish_fried_turkey.jpg',
    imageAlt: 'Golden brown crispy Nigerian Fried Turkey served ready to eat',
    isAvailable: true,
    isFeatured: true,
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
    priceNaira: 1500,
    priceConfirmed: true,
    image: '/src/assets/images/dish_peppered_gizzard.jpg',
    imageAlt: 'Bowl of Nigerian peppered Gizzard sautéed with onions and bell peppers',
    isAvailable: true,
    isFeatured: false,
  },
  {
    id: 'oha-soup',
    name: 'Oha Soup',
    category: 'Soups and Swallows',
    shortDescription:
      'Traditional Oha leaf soup thickened with cocoyam and rich assorted meats, served with swallow.',
    fullDescription:
      'Authentic Nigerian Ofe Oha prepared with hand-torn fresh oha leaves, cocoyam paste thickener, palm oil, ogiri, stockfish, and tender beef—paired with your choice of swallow.',
    prepStyle: 'Soup & Swallow',
    priceNaira: 2800,
    priceConfirmed: true,
    image: '/src/assets/images/dish_oha_soup.jpg',
    imageAlt: 'Bowl of authentic Nigerian Oha Soup simmered with assorted meats and stockfish',
    isAvailable: true,
    isFeatured: true,
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
    priceNaira: 3200,
    priceConfirmed: true,
    image: '/src/assets/images/dish_fufu_ofe_nsala.jpg',
    imageAlt: 'Bowl of Nigerian White Soup (Ofe Nsala) served beside smooth swallow wraps',
    isAvailable: true,
    isFeatured: false,
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
    priceNaira: 2800,
    priceConfirmed: true,
    image: '/src/assets/images/dish_ofe_onugbu.jpg',
    imageAlt: 'Traditional Nigerian Ofe Onugbu (Bitterleaf Soup) cooked with assorted meats',
    isAvailable: true,
    isFeatured: false,
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
    priceNaira: 2600,
    priceConfirmed: true,
    image: '/src/assets/images/dish_vegetable_soup.jpg',
    imageAlt: 'Rich Nigerian Vegetable Soup cooked with fried fish and roasted cowskin',
    isAvailable: true,
    isFeatured: false,
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
    priceNaira: 3000,
    priceConfirmed: true,
    image: '/src/assets/images/dish_banga_soup.jpg',
    imageAlt: 'Rich Nigerian Banga Soup cooked with palm-fruit extract and fresh fish',
    isAvailable: true,
    isFeatured: true,
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
    priceNaira: 2800,
    priceConfirmed: true,
    image: '/src/assets/images/dish_black_soup.jpg',
    imageAlt: 'Plate of Benin-style Nigerian Black Soup served beside smooth swallow',
    isAvailable: true,
    isFeatured: false,
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
    priceNaira: 2500,
    priceConfirmed: true,
    image: '/src/assets/images/dish_eba_okra.jpg',
    imageAlt: 'Plate of spiced Nigerian Okra Soup served alongside smooth Eba swallow',
    isAvailable: true,
    isFeatured: false,
  },
];

// Live runtime catalog with published realistic Benin City prices (synced dynamically with Supabase when configured)
export const liveMealCatalog = new Map<string, ServerMealInfo>(
  INITIAL_SERVER_MEALS.map((meal) => [meal.id, { ...meal }])
);

export const SERVER_MEAL_CATALOG: Record<string, ServerMealInfo> = Object.fromEntries(
  INITIAL_SERVER_MEALS.map((m) => [m.id, m])
);

export function getCatalogMeal(mealId: string): ServerMealInfo | undefined {
  return liveMealCatalog.get(mealId);
}

export function isKnownCatalogMeal(mealId: string): boolean {
  return liveMealCatalog.has(mealId);
}
