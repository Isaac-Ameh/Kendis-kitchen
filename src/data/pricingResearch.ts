export interface ObservedPriceReference {
  restaurant: string;
  location: string;
  observedItem: string;
  observedRange: string;
  sourceUrl: string;
  researchDate: string;
}

export interface DishPricingProposal {
  mealId: string;
  mealName: string;
  category: 'Rice Dishes' | 'Protein and Extras' | 'Soups and Swallows';
  observedReferences: ObservedPriceReference[];
  marketBaselineSummary: string;
  recommendedPriceNaira: number;
  pricingRationale: string;
  isEstimatedRecommendation: true;
  researchDate: string;
}

export const RESEARCH_DATE = '2026-11-23';

export const DISH_PRICING_PROPOSALS: DishPricingProposal[] = [
  {
    mealId: 'jollof-rice',
    mealName: 'Jollof Rice',
    category: 'Rice Dishes',
    observedReferences: [
      {
        restaurant: 'Benin City / UNIBEN Gate Corridor Benchmark',
        location: 'BDPA / Ugbowo, Benin City',
        observedItem: 'Jollof Rice (Base Portion)',
        observedRange: '₦1,200–₦2,000',
        sourceUrl: 'https://zainandbestfoods.com',
        researchDate: RESEARCH_DATE,
      },
    ],
    marketBaselineSummary: 'Editable draft estimate (BDPA / UNIBEN Main Gate corridor: ₦1,200–₦2,000)',
    recommendedPriceNaira: 1500,
    pricingRationale:
      'Editable draft starting price for a standard portion of Jollof Rice prior to Manager confirmation.',
    isEstimatedRecommendation: true,
    researchDate: RESEARCH_DATE,
  },
  {
    mealId: 'fried-rice',
    mealName: 'Fried Rice',
    category: 'Rice Dishes',
    observedReferences: [
      {
        restaurant: 'Benin City / UNIBEN Gate Corridor Benchmark',
        location: 'BDPA / Ugbowo, Benin City',
        observedItem: 'Fried Rice (Base Portion)',
        observedRange: '₦1,400–₦2,200',
        sourceUrl: 'https://homeandawayfoods.com',
        researchDate: RESEARCH_DATE,
      },
    ],
    marketBaselineSummary: 'Editable draft estimate (BDPA / UNIBEN Main Gate corridor: ₦1,400–₦2,200)',
    recommendedPriceNaira: 1700,
    pricingRationale:
      'Editable draft starting price for vegetable-rich Nigerian Fried Rice prior to Manager confirmation.',
    isEstimatedRecommendation: true,
    researchDate: RESEARCH_DATE,
  },
  {
    mealId: 'white-rice',
    mealName: 'White Rice',
    category: 'Rice Dishes',
    observedReferences: [
      {
        restaurant: 'Benin City / UNIBEN Gate Corridor Benchmark',
        location: 'BDPA / Ugbowo, Benin City',
        observedItem: 'White Rice & Stew (Base Portion)',
        observedRange: '₦1,000–₦1,800',
        sourceUrl: 'https://bikassfood.com',
        researchDate: RESEARCH_DATE,
      },
    ],
    marketBaselineSummary: 'Editable draft estimate (BDPA / UNIBEN Main Gate corridor: ₦1,000–₦1,800)',
    recommendedPriceNaira: 1200,
    pricingRationale:
      'Editable draft starting price for White Rice & Stew prior to Manager confirmation.',
    isEstimatedRecommendation: true,
    researchDate: RESEARCH_DATE,
  },
  {
    mealId: 'ofada-rice',
    mealName: 'Ofada Rice',
    category: 'Rice Dishes',
    observedReferences: [
      {
        restaurant: 'Benin City Dining Benchmark',
        location: 'Benin City',
        observedItem: 'Ofada Rice & Ayamase Sauce',
        observedRange: '₦2,200–₦3,500',
        sourceUrl: 'https://spoonsng.com',
        researchDate: RESEARCH_DATE,
      },
    ],
    marketBaselineSummary: 'Editable draft estimate (Benin City dining range: ₦2,200–₦3,500)',
    recommendedPriceNaira: 2500,
    pricingRationale:
      'Editable draft estimate accounting for local Ofada rice and peppered ayamase sauce.',
    isEstimatedRecommendation: true,
    researchDate: RESEARCH_DATE,
  },
  {
    mealId: 'fried-turkey',
    mealName: 'Fried Turkey',
    category: 'Protein and Extras',
    observedReferences: [
      {
        restaurant: 'Benin City Protein Add-on Benchmark',
        location: 'BDPA / Benin City',
        observedItem: 'Fried Turkey Piece',
        observedRange: '₦2,000–₦3,500',
        sourceUrl: 'https://zainandbestfoods.com',
        researchDate: RESEARCH_DATE,
      },
    ],
    marketBaselineSummary: 'Editable draft estimate (Benin City turkey portion: ₦2,000–₦3,500)',
    recommendedPriceNaira: 2500,
    pricingRationale:
      'Editable draft price for seasoned Fried Turkey cut depending on cut size.',
    isEstimatedRecommendation: true,
    researchDate: RESEARCH_DATE,
  },
  {
    mealId: 'gizzard',
    mealName: 'Gizzard',
    category: 'Protein and Extras',
    observedReferences: [
      {
        restaurant: 'Benin City Protein Add-on Benchmark',
        location: 'BDPA / Benin City',
        observedItem: 'Peppered Gizzard Portion',
        observedRange: '₦1,200–₦2,200',
        sourceUrl: 'https://homeandawayfoods.com',
        researchDate: RESEARCH_DATE,
      },
    ],
    marketBaselineSummary: 'Editable draft estimate (Benin City peppered gizzard: ₦1,200–₦2,200)',
    recommendedPriceNaira: 1500,
    pricingRationale:
      'Editable draft price for a portion of sautéed peppered chicken gizzard.',
    isEstimatedRecommendation: true,
    researchDate: RESEARCH_DATE,
  },
  {
    mealId: 'oha-soup',
    mealName: 'Oha Soup',
    category: 'Soups and Swallows',
    observedReferences: [
      {
        restaurant: 'Benin City Soup & Swallow Benchmark',
        location: 'Benin City',
        observedItem: 'Oha Soup & Swallow',
        observedRange: '₦2,500–₦3,500',
        sourceUrl: 'https://harvesttablerestaurant.com.ng',
        researchDate: RESEARCH_DATE,
      },
    ],
    marketBaselineSummary: 'Editable draft estimate (Benin City range: ₦2,500–₦3,500)',
    recommendedPriceNaira: 2800,
    pricingRationale:
      'Editable draft price for Oha Soup with swallow and base protein.',
    isEstimatedRecommendation: true,
    researchDate: RESEARCH_DATE,
  },
  {
    mealId: 'white-soup',
    mealName: 'White Soup',
    category: 'Soups and Swallows',
    observedReferences: [
      {
        restaurant: 'Benin City Soup & Swallow Benchmark',
        location: 'Benin City',
        observedItem: 'Ofe Nsala (White Soup) & Swallow',
        observedRange: '₦2,800–₦3,800',
        sourceUrl: 'https://spoonsng.com',
        researchDate: RESEARCH_DATE,
      },
    ],
    marketBaselineSummary: 'Editable draft estimate (Benin City range: ₦2,800–₦3,800)',
    recommendedPriceNaira: 3200,
    pricingRationale:
      'Editable draft price for spiced White Soup (Ofe Nsala) with swallow.',
    isEstimatedRecommendation: true,
    researchDate: RESEARCH_DATE,
  },
  {
    mealId: 'ofe-onugbu',
    mealName: 'Ofe Onugbu',
    category: 'Soups and Swallows',
    observedReferences: [
      {
        restaurant: 'Benin City Soup & Swallow Benchmark',
        location: 'Benin City',
        observedItem: 'Bitterleaf Soup (Ofe Onugbu) & Swallow',
        observedRange: '₦2,500–₦3,500',
        sourceUrl: 'https://harvesttablerestaurant.com.ng',
        researchDate: RESEARCH_DATE,
      },
    ],
    marketBaselineSummary: 'Editable draft estimate (Benin City range: ₦2,500–₦3,500)',
    recommendedPriceNaira: 2800,
    pricingRationale:
      'Editable draft price for Ofe Onugbu (bitterleaf soup) paired with swallow.',
    isEstimatedRecommendation: true,
    researchDate: RESEARCH_DATE,
  },
  {
    mealId: 'vegetable-soup',
    mealName: 'Vegetable Soup',
    category: 'Soups and Swallows',
    observedReferences: [
      {
        restaurant: 'Benin City Soup & Swallow Benchmark',
        location: 'BDPA / Benin City',
        observedItem: 'Vegetable Soup & Swallow',
        observedRange: '₦2,400–₦3,200',
        sourceUrl: 'https://homeandawayfoods.com',
        researchDate: RESEARCH_DATE,
      },
    ],
    marketBaselineSummary: 'Editable draft estimate (Benin City range: ₦2,400–₦3,200)',
    recommendedPriceNaira: 2600,
    pricingRationale:
      'Editable draft price for fresh Nigerian Vegetable Soup with swallow.',
    isEstimatedRecommendation: true,
    researchDate: RESEARCH_DATE,
  },
  {
    mealId: 'banga-soup-and-starch',
    mealName: 'Banga Soup & Starch',
    category: 'Soups and Swallows',
    observedReferences: [
      {
        restaurant: 'Benin City Local Kitchen Benchmark',
        location: 'Benin City',
        observedItem: 'Banga Soup & Starch',
        observedRange: '₦2,800–₦3,800',
        sourceUrl: 'https://spoonsng.com',
        researchDate: RESEARCH_DATE,
      },
    ],
    marketBaselineSummary: 'Editable draft estimate (Benin City range: ₦2,800–₦3,800)',
    recommendedPriceNaira: 3000,
    pricingRationale:
      'Editable draft price for Banga Soup & Starch prior to Manager confirmation.',
    isEstimatedRecommendation: true,
    researchDate: RESEARCH_DATE,
  },
  {
    mealId: 'black-soup',
    mealName: 'Black Soup',
    category: 'Soups and Swallows',
    observedReferences: [
      {
        restaurant: 'Benin City Local Kitchen Benchmark',
        location: 'BDPA / Benin City',
        observedItem: 'Benin Black Soup & Swallow',
        observedRange: '₦2,500–₦3,500',
        sourceUrl: 'https://harvesttablerestaurant.com.ng',
        researchDate: RESEARCH_DATE,
      },
    ],
    marketBaselineSummary: 'Editable draft estimate (Benin City range: ₦2,500–₦3,500)',
    recommendedPriceNaira: 2800,
    pricingRationale:
      'Editable draft price for Benin Black Soup served with swallow.',
    isEstimatedRecommendation: true,
    researchDate: RESEARCH_DATE,
  },
  {
    mealId: 'okra-soup',
    mealName: 'Okra Soup',
    category: 'Soups and Swallows',
    observedReferences: [
      {
        restaurant: 'Benin City Soup & Swallow Benchmark',
        location: 'BDPA / Benin City',
        observedItem: 'Okra Soup & Swallow',
        observedRange: '₦2,200–₦3,000',
        sourceUrl: 'https://homeandawayfoods.com',
        researchDate: RESEARCH_DATE,
      },
    ],
    marketBaselineSummary: 'Editable draft estimate (Benin City range: ₦2,200–₦3,000)',
    recommendedPriceNaira: 2500,
    pricingRationale:
      'Editable draft price for spiced Nigerian Okra Soup served with swallow.',
    isEstimatedRecommendation: true,
    researchDate: RESEARCH_DATE,
  },
];
