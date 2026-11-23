import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Phone, Truck } from 'lucide-react';
import {
  RESTAURANT_IMAGES,
  RESTAURANT_INFO,
  formatNaira,
  toTelHref,
} from '../data/meals';
import { MealCategory } from '../types/menu';
import { useMenu } from '../context/MenuContext';
import { PageHero } from '../components/PageHero';
import { MealCard } from '../components/MealCard';
import { DishImage } from '../components/DishImage';

type FilterOption = 'All Meals' | MealCategory;

export function MenuPage() {
  const { meals, categories: liveCategories, siteSettings } = useMenu();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriesList: FilterOption[] = Array.from(
    new Set(['All Meals', ...liveCategories, ...meals.map((m) => m.category).filter(Boolean)])
  );
  const initialParam = searchParams.get('category') as FilterOption | null;

  const [selectedCategory, setSelectedCategory] = useState<FilterOption>(
    initialParam && categoriesList.includes(initialParam) ? initialParam : 'All Meals'
  );

  useEffect(() => {
    const param = searchParams.get('category') as FilterOption | null;
    if (param && categoriesList.includes(param)) {
      setSelectedCategory(param);
    } else if (!param) {
      setSelectedCategory('All Meals');
    }
  }, [searchParams, liveCategories, meals]);

  const handleCategoryChange = (category: FilterOption) => {
    setSelectedCategory(category);
    if (category === 'All Meals') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const filteredMeals =
    selectedCategory === 'All Meals'
      ? meals
      : meals.filter((meal) => meal.category === selectedCategory);

  const phoneDisplay = siteSettings.phone || RESTAURANT_INFO.phoneDisplay;
  const secondaryPhone =
    siteSettings.secondaryPhone !== undefined
      ? siteSettings.secondaryPhone
      : RESTAURANT_INFO.secondaryPhoneDisplay;
  const deliveryAvailable = siteSettings.deliveryAvailable !== false;

  return (
    <div>
      <PageHero
        eyebrow="Kendi's Kitchen Menu"
        title="Explore Our Menu"
        subtitle="Freshly prepared rice dishes, crispy fried turkey, peppered gizzard, and traditional Nigerian soups and swallows — available for home delivery and pickup."
        image={RESTAURANT_IMAGES.hero}
        imageAlt="Plate of Nigerian Jollof Rice served with seasoned chicken"
      />

      <section className="py-12 sm:py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Home Delivery Banner */}
          {deliveryAvailable && (
            <div className="mb-8 rounded-xl bg-[#5A0B1E] text-[#FAF7F2] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start sm:items-center gap-3">
                <Truck className="w-5 h-5 text-[#86EFAC] shrink-0 mt-0.5 sm:mt-0" />
                <div className="text-xs sm:text-sm leading-relaxed">
                  <strong className="font-semibold text-white">Home Delivery Available:</strong>{' '}
                  {siteSettings.deliveryNotice}
                  {typeof siteSettings.deliveryFeeNaira === 'number' &&
                    siteSettings.deliveryFeeNaira > 0 && (
                      <span className="ml-2 font-semibold text-[#86EFAC]">
                        (Delivery Fee: {formatNaira(siteSettings.deliveryFeeNaira)})
                      </span>
                    )}
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold tabular-nums shrink-0">
                <a href={toTelHref(phoneDisplay)} className="inline-flex items-center gap-1 hover:underline">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{phoneDisplay}</span>
                </a>
                {secondaryPhone && (
                  <a
                    href={toTelHref(secondaryPhone)}
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{secondaryPhone}</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Category Filter Controls + Pricing Inquiry Notice */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-[#5A0B1E]/12">
            <div
              role="tablist"
              aria-label="Filter menu by category"
              className="flex flex-wrap items-center gap-2"
            >
              {categoriesList.map((category) => {
                const count =
                  category === 'All Meals'
                    ? meals.length
                    : meals.filter((m) => m.category === category).length;
                const isActive = selectedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#5A0B1E] text-[#FAF7F2]'
                        : 'bg-[#F4EFE8] text-[#1C1917] hover:bg-[#E7DFD2]'
                    }`}
                  >
                    {category}{' '}
                    <span className="tabular-nums opacity-80">({count})</span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs sm:text-sm text-[#57534E]">
              <span>{siteSettings.menuNotice}</span>
            </div>
          </div>

          {/* Complete Meals Grid */}
          <div
            id="menu-grid"
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>

          {/* Bulk Order & Delivery Banner */}
          <div className="mt-16 rounded-2xl bg-[#F4EFE8] border border-[#5A0B1E]/12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-5 aspect-[4/3] lg:aspect-auto lg:h-full bg-[#EBE3D5]">
                <DishImage
                  src={RESTAURANT_IMAGES.culinaryPrep}
                  alt="Freshly cooked Nigerian Oha Soup at Kendi's Kitchen"
                  title="Kendi's Kitchen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B91C1C]">
                  Dine-In · Pickup · Home Delivery
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                  Delicious Meals, Made for You.
                </h2>
                <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                  Visit us at {siteSettings.address} or call {phoneDisplay}
                  {secondaryPhone ? ` / ${secondaryPhone}` : ''} for bulk food trays, student
                  group orders, and doorstep home delivery across Benin City.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    to="/cart"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#5A0B1E] hover:bg-[#731129] text-white text-sm font-medium transition-colors"
                  >
                    <span>Proceed to Cart</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#5A0B1E]/25 text-[#5A0B1E] hover:bg-white text-sm font-medium transition-colors"
                  >
                    <span>Request Catering / Delivery Info</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
