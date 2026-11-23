import { Link } from 'react-router-dom';
import { Clock, MapPin, MessageCircle, Phone, Truck } from 'lucide-react';
import {
  RESTAURANT_INFO,
  buildWhatsAppOrderUrl,
  toTelHref,
} from '../data/meals';
import { useMenu } from '../context/MenuContext';
import { BrandMark } from './BrandMark';

export function Footer() {
  const { siteSettings, meals } = useMenu();
  const currentYear = new Date().getFullYear();
  const phoneDisplay = siteSettings.phone || RESTAURANT_INFO.phoneDisplay;
  const secondaryPhoneDisplay =
    siteSettings.secondaryPhone !== undefined
      ? siteSettings.secondaryPhone
      : RESTAURANT_INFO.secondaryPhoneDisplay;
  const address = siteSettings.address || RESTAURANT_INFO.address;
  const deliveryAvailable = siteSettings.deliveryAvailable !== false;

  const quickWhatsAppUrl = buildWhatsAppOrderUrl(
    `Hello ${siteSettings.restaurantName}, I would like to ask about today's menu and place an order.`,
    phoneDisplay
  );

  return (
    <footer className="bg-[#5A0B1E] text-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Summary */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block" aria-label="Kendi's Kitchen home">
              <BrandMark variant="light" size="lg" />
            </Link>
            <p className="text-sm leading-relaxed text-[#FAF7F2]/85 max-w-sm">
              {address}
            </p>
            {deliveryAvailable && (
              <p className="inline-flex items-center gap-2 text-xs font-medium text-[#86EFAC]">
                <Truck className="w-4 h-4 shrink-0" />
                <span>Home Delivery Available in Benin City</span>
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href={quickWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Order on WhatsApp</span>
              </a>
              <a
                href={toTelHref(phoneDisplay)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/25 hover:bg-white/10 text-white text-xs font-semibold transition-colors tabular-nums"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{phoneDisplay}</span>
              </a>
              {secondaryPhoneDisplay && (
                <a
                  href={toTelHref(secondaryPhoneDisplay)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/25 hover:bg-white/10 text-white text-xs font-semibold transition-colors tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{secondaryPhoneDisplay}</span>
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]/65">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-[#FAF7F2]/85 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-[#FAF7F2]/85 hover:text-white transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#FAF7F2]/85 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#FAF7F2]/85 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-[#FAF7F2]/85 hover:text-white transition-colors">
                  Order Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Menu Categories */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]/65">
              Menu Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/menu?category=Rice+Dishes"
                  className="text-[#FAF7F2]/85 hover:text-white transition-colors"
                >
                  Rice Dishes
                </Link>
              </li>
              <li>
                <Link
                  to="/menu?category=Protein+and+Extras"
                  className="text-[#FAF7F2]/85 hover:text-white transition-colors"
                >
                  Protein and Extras
                </Link>
              </li>
              <li>
                <Link
                  to="/menu?category=Soups+and+Swallows"
                  className="text-[#FAF7F2]/85 hover:text-white transition-colors"
                >
                  Soups and Swallows
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-[#FAF7F2]/85 hover:text-white transition-colors">
                  View All {meals.length} Dishes
                </Link>
              </li>
            </ul>
          </div>

          {/* Location & Direct Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]/65">
              Location &amp; Contact
            </h3>
            <ul className="space-y-3 text-sm text-[#FAF7F2]/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#86EFAC] shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#86EFAC] shrink-0 mt-0.5" />
                <div className="flex flex-wrap gap-x-3 gap-y-1 tabular-nums font-medium">
                  <a href={toTelHref(phoneDisplay)} className="hover:text-white transition-colors">
                    {phoneDisplay}
                  </a>
                  {secondaryPhoneDisplay && (
                    <a
                      href={toTelHref(secondaryPhoneDisplay)}
                      className="hover:text-white transition-colors"
                    >
                      {secondaryPhoneDisplay}
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#86EFAC] shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{siteSettings.openingHours}</span>
              </li>
              <li>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-semibold text-[#86EFAC] hover:underline"
                >
                  Open Directions in Google Maps &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-12 pt-8 border-t border-[#FAF7F2]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#FAF7F2]/70">
          <p>
            &copy; {currentYear} {siteSettings.restaurantName}. {RESTAURANT_INFO.shortLocation}.
          </p>
          <p>
            Freshly prepared Nigerian meals &bull; Opposite UNIBEN Main Gate, BDPA, Benin City.
          </p>
        </div>
      </div>
    </footer>
  );
}
