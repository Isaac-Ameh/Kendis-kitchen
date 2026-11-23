import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Flame,
  MapPin,
  MessageCircle,
  Phone,
  Soup,
  Star,
  Truck,
  UtensilsCrossed,
} from 'lucide-react';
import {
  RESTAURANT_IMAGES,
  RESTAURANT_INFO,
  buildWhatsAppOrderUrl,
  formatNaira,
  toTelHref,
} from '../data/meals';
import { useMenu } from '../context/MenuContext';
import { useCart } from '../context/CartContext';
import { MealCard } from '../components/MealCard';
import { DishImage } from '../components/DishImage';

interface PublicReview {
  id: string;
  mealName: string;
  customerName: string;
  rating: number;
  comment: string;
  isVerifiedPurchase: boolean;
  createdAt: string;
}

export function HomePage() {
  const { meals, siteSettings } = useMenu();
  const { totalItems } = useCart();
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [reviewSummary, setReviewSummary] = useState<{
    totalReviews: number;
    averageRating: number;
  }>({ totalReviews: 0, averageRating: 0 });

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.reviews)) {
          setReviews(data.reviews);
        }
        if (data?.summary) {
          setReviewSummary({
            totalReviews: Number(data.summary.totalReviews) || 0,
            averageRating: Number(data.summary.averageRating) || 0,
          });
        }
      })
      .catch(() => {
        // Keep honest empty reviews state on network failure
      });
  }, []);

  const primaryPhone = siteSettings.phone || RESTAURANT_INFO.phoneDisplay;
  const secondaryPhone =
    siteSettings.secondaryPhone !== undefined
      ? siteSettings.secondaryPhone
      : RESTAURANT_INFO.secondaryPhoneDisplay;
  const address = siteSettings.address || RESTAURANT_INFO.address;
  const deliveryAvailable = siteSettings.deliveryAvailable !== false;

  const featuredMeals = meals.filter((meal) => meal.featured).slice(0, 6);
  const quickWhatsAppUrl = buildWhatsAppOrderUrl(
    `Hello ${siteSettings.restaurantName}, I would like to place an order for food delivery or pickup.`,
    primaryPhone
  );

  const categoryCards = [
    {
      name: 'Rice Dishes',
      description:
        'Smoky Jollof Rice, Nigerian Fried Rice, White Rice, and authentic Ofada Rice with rich sauce.',
      image: '/src/assets/images/dish_jollof_chicken.jpg',
      count: meals.filter((m) => m.category === 'Rice Dishes').length,
    },
    {
      name: 'Protein and Extras',
      description:
        'Golden crispy Fried Turkey and spiced Peppered Gizzard to elevate any meal.',
      image: '/src/assets/images/dish_fried_turkey.jpg',
      count: meals.filter((m) => m.category === 'Protein and Extras').length,
    },
    {
      name: 'Soups and Swallows',
      description:
        'Oha Soup, White Soup, Ofe Onugbu, Vegetable Soup, Banga Soup & Starch, Black Soup, and Okra Soup.',
      image: '/src/assets/images/dish_oha_soup.jpg',
      count: meals.filter((m) => m.category === 'Soups and Swallows').length,
    },
  ];

  const galleryItems = [
    {
      src: '/src/assets/images/dish_jollof_chicken.jpg',
      label: 'Jollof Rice',
      alt: 'Nigerian party Jollof Rice served with seasoned chicken',
    },
    {
      src: '/src/assets/images/dish_ofada_rice.jpg',
      label: 'Ofada Rice',
      alt: 'Local Nigerian Ofada Rice with Ayamase green pepper sauce',
    },
    {
      src: '/src/assets/images/dish_fried_turkey.jpg',
      label: 'Fried Turkey',
      alt: 'Seasoned crispy Nigerian Fried Turkey',
    },
    {
      src: '/src/assets/images/dish_peppered_gizzard.jpg',
      label: 'Peppered Gizzard',
      alt: 'Spicy sautéed Nigerian peppered gizzard',
    },
    {
      src: '/src/assets/images/dish_banga_soup.jpg',
      label: 'Banga Soup & Starch',
      alt: 'Rich palm fruit Banga Soup with fresh fish',
    },
    {
      src: '/src/assets/images/dish_black_soup.jpg',
      label: 'Black Soup',
      alt: 'Traditional Edo-style Nigerian Black Soup',
    },
  ];

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="relative min-h-[88vh] flex items-center bg-[#5A0B1E] text-[#FAF7F2] overflow-hidden">
        <div className="absolute inset-0">
          <DishImage
            src={RESTAURANT_IMAGES.hero}
            alt="Nigerian jollof rice platter served at Kendi's Kitchen"
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#3A0613]/95 via-[#5A0B1E]/82 to-[#3A0613]/55"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#3A0613]/85 via-transparent to-[#3A0613]/40"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-20 sm:py-36">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-[#86EFAC]">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>Opposite UNIBEN Main Gate, BDPA · Benin City</span>
            </p>

            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white text-balance leading-[1.08]">
              {siteSettings.heroSubtitle || 'Delicious Meals, Made for You.'}
            </h1>

            <p className="mt-4 text-sm sm:text-base text-[#FAF7F2]/90 leading-relaxed max-w-xl">
              {siteSettings.heroDescription}
            </p>

            {deliveryAvailable && (
              <p className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#FCA5A5]">
                <Truck className="w-4 h-4 shrink-0" />
                <span>Home Delivery Available across Benin City</span>
              </p>
            )}

            {/* Two Prominent Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#B91C1C] hover:bg-[#991B1B] text-white text-sm sm:text-base font-semibold transition-colors whitespace-nowrap shrink-0 shadow-sm"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={totalItems > 0 ? '/cart' : '/menu'}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-white/40 bg-black/25 hover:bg-white/15 text-white text-sm sm:text-base font-semibold backdrop-blur-xs transition-colors whitespace-nowrap shrink-0"
              >
                <span>Order Now</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Short Restaurant Introduction */}
      <section className="py-16 sm:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B91C1C]">
                Welcome to {siteSettings.restaurantName}
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917] text-balance leading-[1.15]">
                {siteSettings.welcomeHeading}
              </h2>
              <p className="mt-5 text-base text-[#57534E] leading-relaxed">
                {siteSettings.welcomeBody}
              </p>
              <p className="mt-4 text-base text-[#57534E] leading-relaxed">
                Whether you are dining right outside UNIBEN Main Gate or ordering for convenient
                home delivery in Benin City, every pot is cooked with care, quality ingredients, and
                authentic Nigerian flavour.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#5A0B1E] hover:text-[#B91C1C] transition-colors"
                >
                  <span>About {siteSettings.restaurantName}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#15803D] hover:text-[#166534] transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Visit Us in BDPA</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <div className="relative h-full min-h-[300px] sm:min-h-[380px] rounded-xl overflow-hidden bg-[#F4EFE8] border border-[#5A0B1E]/10">
                <DishImage
                  src={RESTAURANT_IMAGES.culinaryPrep}
                  alt="Authentic Nigerian Oha Soup prepared fresh at Kendi's Kitchen"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Featured Meals */}
      <section className="py-16 sm:py-24 bg-[#F4EFE8]/75 border-y border-[#5A0B1E]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B91C1C]">
                Customer Favourites
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917] text-balance">
                Featured Meals
              </h2>
              <p className="mt-3 text-base text-[#57534E] leading-relaxed">
                Explore rice classics, crispy fried turkey, peppered gizzard, and traditional Nigerian
                soups from our kitchen. Need help ordering? Call{' '}
                <a
                  href={toTelHref(primaryPhone)}
                  className="font-semibold text-[#5A0B1E] hover:underline tabular-nums"
                >
                  {primaryPhone}
                </a>
                {secondaryPhone ? (
                  <>
                    {' '}or{' '}
                    <a
                      href={toTelHref(secondaryPhone)}
                      className="font-semibold text-[#5A0B1E] hover:underline tabular-nums"
                    >
                      {secondaryPhone}
                    </a>
                  </>
                ) : null}
                .
              </p>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#5A0B1E] hover:text-[#B91C1C] transition-colors whitespace-nowrap shrink-0"
            >
              <span>View Full Menu ({meals.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#5A0B1E] hover:bg-[#731129] text-[#FAF7F2] text-sm sm:text-base font-medium transition-colors"
            >
              <span>Explore All {meals.length} Dishes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Popular Menu Categories */}
      <section className="py-16 sm:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B91C1C]">
              Browse by Category
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917] text-balance">
              Popular Menu Categories
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {categoryCards.map((cat) => (
              <Link
                key={cat.name}
                to={`/menu?category=${encodeURIComponent(cat.name)}`}
                className="group bg-[#FFFFFF] rounded-xl border border-[#5A0B1E]/10 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#F4EFE8]">
                  <DishImage
                    src={cat.image}
                    alt={cat.name}
                    title={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-xl font-semibold text-[#1C1917] group-hover:text-[#5A0B1E] transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-xs font-semibold text-[#15803D] tabular-nums">
                      {cat.count} {cat.count === 1 ? 'dish' : 'dishes'}
                    </span>
                  </div>
                  <p className="mt-2.5 text-sm text-[#57534E] leading-relaxed flex-1">
                    {cat.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#5A0B1E]">
                    <span>Explore {cat.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Home Delivery Promotion Banner */}
      <section className="py-14 sm:py-20 bg-[#5A0B1E] text-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#86EFAC]">
                <Truck className="w-4 h-4" />
                <span>
                  {deliveryAvailable ? 'Home Delivery Available' : 'Pickup & Direct Enquiries'}
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white text-balance leading-[1.15]">
                Fresh Food Delivered Straight to Your Doorstep
              </h2>
              <p className="text-sm sm:text-base text-[#FAF7F2]/85 leading-relaxed max-w-2xl">
                {siteSettings.deliveryNotice ||
                  "Order your favourite meals online from Kendi's Kitchen and provide your delivery address and instructions at checkout."}
              </p>

              {(siteSettings.deliveryAreas ||
                siteSettings.deliveryTimeEstimate ||
                (typeof siteSettings.deliveryFeeNaira === 'number' &&
                  siteSettings.deliveryFeeNaira > 0)) && (
                <div className="pt-2 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-[#FAF7F2]/90">
                  {typeof siteSettings.deliveryFeeNaira === 'number' &&
                    siteSettings.deliveryFeeNaira > 0 && (
                      <span>
                        <strong className="text-white">Delivery Fee:</strong>{' '}
                        {formatNaira(siteSettings.deliveryFeeNaira)}
                      </span>
                    )}
                  {siteSettings.deliveryAreas && (
                    <span>
                      <strong className="text-white">Areas:</strong> {siteSettings.deliveryAreas}
                    </span>
                  )}
                  {siteSettings.deliveryTimeEstimate && (
                    <span>
                      <strong className="text-white">Timing:</strong>{' '}
                      {siteSettings.deliveryTimeEstimate}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#B91C1C] hover:bg-[#991B1B] text-white text-sm font-semibold transition-colors"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={quickWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Delivery Enquiry</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Food Gallery */}
      <section className="py-16 sm:py-24 bg-[#F4EFE8]/75 border-b border-[#5A0B1E]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B91C1C]">
                From Our Kitchen
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917]">
                Food Gallery
              </h2>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#5A0B1E] hover:text-[#B91C1C] transition-colors"
            >
              <span>Order Any Dish</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.label}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EBE3D5] border border-[#5A0B1E]/10"
              >
                <DishImage
                  src={item.src}
                  alt={item.alt}
                  title={item.label}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-4 py-3">
                  <p className="text-xs sm:text-sm font-semibold text-white">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Customer Reviews (Verified Only — Zero Fake Testimonials) */}
      <section className="py-16 sm:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B91C1C]">
                Customer Feedback
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917]">
                Verified Customer Reviews
              </h2>
            </div>
            {reviewSummary.totalReviews > 0 && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFFFFF] border border-[#5A0B1E]/12 text-sm font-semibold text-[#1C1917] tabular-nums">
                <Star className="w-4 h-4 text-[#B91C1C] fill-current" />
                <span>{reviewSummary.averageRating.toFixed(1)} / 5.0</span>
                <span className="text-[#57534E] font-normal">
                  ({reviewSummary.totalReviews}{' '}
                  {reviewSummary.totalReviews === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            )}
          </div>

          {reviews.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.slice(0, 6).map((rev) => (
                <article
                  key={rev.id}
                  className="bg-[#FFFFFF] rounded-xl border border-[#5A0B1E]/10 p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#B91C1C] tabular-nums">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{rev.rating}.0 / 5</span>
                      </span>
                      {rev.isVerifiedPurchase && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#15803D]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verified Order</span>
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#1C1917] leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#1C1917]/8 text-xs text-[#57534E] flex items-center justify-between gap-2">
                    <span className="font-semibold text-[#1C1917]">{rev.customerName}</span>
                    <span>{rev.mealName}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 bg-[#FFFFFF] rounded-xl border border-[#5A0B1E]/10 p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="max-w-xl space-y-2">
                <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                  Real Reviews from Verified Orders
                </h3>
                <p className="text-sm text-[#57534E] leading-relaxed">
                  Only customers who have completed an order at {siteSettings.restaurantName} can
                  submit a verified meal review from their account. Order your meal today and share
                  your honest experience!
                </p>
              </div>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#5A0B1E] hover:bg-[#731129] text-[#FAF7F2] text-sm font-semibold transition-colors shrink-0"
              >
                <span>Place Your First Order</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us & Location / Contact Section (8) */}
      <section className="py-16 sm:py-24 bg-[#F4EFE8]/75 border-t border-[#5A0B1E]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            <div className="pt-6 border-t border-[#5A0B1E]/15">
              <div className="w-11 h-11 rounded-lg bg-[#5A0B1E]/8 text-[#5A0B1E] flex items-center justify-center">
                <Flame className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-[#1C1917]">
                Freshly Cooked Nigerian Meals
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-[#57534E] leading-relaxed">
                Rice dishes, crispy fried turkey, peppered gizzard, and rich soups cooked fresh daily
                for quality and great taste.
              </p>
            </div>

            <div className="pt-6 border-t border-[#5A0B1E]/15">
              <div className="w-11 h-11 rounded-lg bg-[#15803D]/10 text-[#15803D] flex items-center justify-center">
                <Soup className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-[#1C1917]">
                Reliable Home Delivery
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-[#57534E] leading-relaxed">
                Order from campus, office, or home in Benin City and provide your delivery address
                and instructions right at checkout.
              </p>
            </div>

            <div className="pt-6 border-t border-[#5A0B1E]/15">
              <div className="w-11 h-11 rounded-lg bg-[#B91C1C]/10 text-[#B91C1C] flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-[#1C1917]">
                Opposite UNIBEN Main Gate
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-[#57534E] leading-relaxed">
                Easy to find at {address}
              </p>
            </div>
          </div>

          {/* 8. Location & Contact Card */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#5A0B1E]/12 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B91C1C]">
                Visit or Call Us
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                Location &amp; Direct Contact
              </h2>
              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#5A0B1E] shrink-0 mt-0.5" />
                <span>{address}</span>
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-[#1C1917] tabular-nums">
                <a
                  href={toTelHref(primaryPhone)}
                  className="inline-flex items-center gap-2 text-[#5A0B1E] hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  <span>{primaryPhone}</span>
                </a>
                {secondaryPhone && (
                  <a
                    href={toTelHref(secondaryPhone)}
                    className="inline-flex items-center gap-2 text-[#5A0B1E] hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{secondaryPhone}</span>
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#5A0B1E]/25 text-sm font-semibold text-[#5A0B1E] hover:bg-[#FAF7F2] transition-colors"
              >
                <span>Get Directions</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={quickWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
