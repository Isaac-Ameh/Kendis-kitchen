import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, MessageCircle, Phone, Truck } from 'lucide-react';
import {
  RESTAURANT_IMAGES,
  RESTAURANT_INFO,
  buildWhatsAppOrderUrl,
  toTelHref,
} from '../data/meals';
import { useMenu } from '../context/MenuContext';
import { PageHero } from '../components/PageHero';
import { DishImage } from '../components/DishImage';

export function AboutPage() {
  const { siteSettings } = useMenu();
  const primaryPhone = siteSettings.phone || RESTAURANT_INFO.phoneDisplay;
  const secondaryPhone =
    siteSettings.secondaryPhone !== undefined
      ? siteSettings.secondaryPhone
      : RESTAURANT_INFO.secondaryPhoneDisplay;
  const address = siteSettings.address || RESTAURANT_INFO.address;
  const whatsAppUrl = buildWhatsAppOrderUrl(
    `Hello ${siteSettings.restaurantName}, I would like to ask about today's meals and home delivery.`,
    primaryPhone
  );

  return (
    <div>
      <PageHero
        eyebrow="About Us"
        title={`${siteSettings.restaurantName} · Benin City`}
        subtitle="Serving delicious rice dishes, fried turkey, peppered gizzard, and traditional Nigerian soups opposite UNIBEN Main Gate, BDPA."
        image={RESTAURANT_IMAGES.aboutTable}
        imageAlt="Nigerian Fried Rice served with seasoned chicken at Kendi's Kitchen"
      />

      {/* Narrative */}
      <section className="py-16 sm:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B91C1C]">
                Who We Are
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917] text-balance leading-[1.15]">
                Delicious Meals, Made for You.
              </h2>
              <p className="text-base text-[#57534E] leading-relaxed">
                {siteSettings.restaurantName} is a Nigerian restaurant located at{' '}
                <strong className="font-semibold text-[#1C1917]">{address}</strong> Right opposite
                the University of Benin Main Gate, we serve fresh, hearty meals to students, staff,
                families, and residents across Benin City.
              </p>
              <p className="text-base text-[#57534E] leading-relaxed">
                From smoky Jollof Rice and spicy Ofada Rice to crispy Fried Turkey, Peppered
                Gizzard, and rich native soups like Oha Soup, White Soup, Banga Soup &amp; Starch,
                and Black Soup, every dish is prepared for taste, convenience, and satisfaction.
              </p>

              {siteSettings.deliveryAvailable !== false && (
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#15803D]">
                  <Truck className="w-4 h-4 shrink-0" />
                  <span>Home Delivery Available across Benin City</span>
                </p>
              )}

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#5A0B1E] hover:bg-[#731129] text-white text-sm font-medium transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
                <a
                  href={toTelHref(primaryPhone)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#5A0B1E]/20 text-sm font-medium text-[#5A0B1E] hover:bg-[#F4EFE8] transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4" />
                  <span>{primaryPhone}</span>
                </a>
                {secondaryPhone && (
                  <a
                    href={toTelHref(secondaryPhone)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#5A0B1E]/20 text-sm font-medium text-[#5A0B1E] hover:bg-[#F4EFE8] transition-colors tabular-nums"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{secondaryPhone}</span>
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[4/3] lg:h-full rounded-xl overflow-hidden bg-[#F4EFE8] border border-[#5A0B1E]/10">
                <DishImage
                  src={RESTAURANT_IMAGES.culinaryPrep}
                  alt="Simmering pot of Nigerian Oha Soup"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culinary Highlights */}
      <section className="py-16 sm:py-24 bg-[#F4EFE8]/75 border-y border-[#5A0B1E]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#EBE3D5]">
                  <DishImage
                    src="/src/assets/images/dish_fried_turkey.jpg"
                    alt="Crispy seasoned Nigerian Fried Turkey"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#EBE3D5]">
                  <DishImage
                    src="/src/assets/images/dish_ofada_rice.jpg"
                    alt="Ofada Rice with spicy green pepper Ayamase sauce"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-2 aspect-[16/9] rounded-xl overflow-hidden bg-[#EBE3D5]">
                  <DishImage
                    src="/src/assets/images/dish_jollof_chicken.jpg"
                    alt="Nigerian Jollof Rice served with seasoned chicken"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center space-y-8">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B91C1C]">
                  Our Menu Focus
                </p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917]">
                  Three Signatures of Our Kitchen
                </h2>
                <p className="mt-4 text-base text-[#57534E] leading-relaxed">
                  Explore our carefully organized menu covering rice classics, well-seasoned
                  proteins, and wholesome Nigerian soups.
                </p>
              </div>

              <div className="space-y-5 pt-6 border-t border-[#1C1917]/10">
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                    Rice Dishes
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-[#57534E] leading-relaxed">
                    Jollof Rice, Fried Rice, White Rice, and Ofada Rice cooked fresh daily.
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                    Protein and Extras
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-[#57534E] leading-relaxed">
                    Crispy golden Fried Turkey and tender spiced Gizzard.
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                    Soups and Swallows
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-[#57534E] leading-relaxed">
                    Oha Soup, White Soup, Ofe Onugbu, Vegetable Soup, Banga Soup &amp; Starch, Black
                    Soup, and Okra Soup.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#5A0B1E] hover:bg-[#731129] text-[#FAF7F2] text-sm font-medium transition-colors"
                >
                  <span>Explore Our Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-sm font-medium transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message Us on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
