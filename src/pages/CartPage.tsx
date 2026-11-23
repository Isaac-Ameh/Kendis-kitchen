import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PaystackPop from '@paystack/inline-js';
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  ExternalLink,
  MapPin,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Store,
  Trash2,
  Truck,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAppAuth } from '../context/AppAuthContext';
import { useMenu } from '../context/MenuContext';
import {
  RESTAURANT_IMAGES,
  RESTAURANT_INFO,
  buildWhatsAppOrderUrl,
  formatNaira,
  formatPrice,
  toTelHref,
} from '../data/meals';
import { DeliveryInfo } from '../types/menu';
import { PageHero } from '../components/PageHero';
import { DishImage } from '../components/DishImage';
import { parseApiJson } from '../lib/api';

interface PaidReceipt {
  reference: string;
  totalNaira: number;
  paidAt?: string;
  channel?: string;
  deliveryInfo?: DeliveryInfo | null;
  items: Array<{
    mealId: string;
    name: string;
    unitPriceNaira: number;
    quantity: number;
    lineTotalNaira: number;
  }>;
}

export function CartPage() {
  const {
    items,
    isLoading,
    totalItems,
    subtotal,
    hasUnpricedItems,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const { isSignedIn, getToken, email, fullName } = useAppAuth();
  const { siteSettings } = useMenu();
  const [searchParams, setSearchParams] = useSearchParams();

  const deliveryAvailable = siteSettings.deliveryAvailable !== false;
  const configuredDeliveryFee =
    typeof siteSettings.deliveryFeeNaira === 'number' && siteSettings.deliveryFeeNaira > 0
      ? siteSettings.deliveryFeeNaira
      : 0;

  const [customerName, setCustomerName] = useState(fullName || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState(email || '');
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>(
    deliveryAvailable ? 'delivery' : 'pickup'
  );
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState<
    'idle' | 'initializing' | 'awaiting' | 'verifying'
  >('idle');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [fallbackAuthUrl, setFallbackAuthUrl] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<PaidReceipt | null>(null);

  useEffect(() => {
    if (fullName && !customerName) setCustomerName(fullName);
    if (email && !customerEmail) setCustomerEmail(email);
  }, [fullName, email, customerName, customerEmail]);

  useEffect(() => {
    if (!deliveryAvailable && fulfillmentType === 'delivery') {
      setFulfillmentType('pickup');
    }
  }, [deliveryAvailable, fulfillmentType]);

  const phoneDisplay = siteSettings.phone || RESTAURANT_INFO.phoneDisplay;
  const secondaryPhone =
    siteSettings.secondaryPhone !== undefined
      ? siteSettings.secondaryPhone
      : RESTAURANT_INFO.secondaryPhoneDisplay;

  const activeDeliveryFee =
    fulfillmentType === 'delivery' && deliveryAvailable ? configuredDeliveryFee : 0;
  const orderTotal = subtotal + activeDeliveryFee;

  const verifyPaymentOnServer = useCallback(
    async (reference: string) => {
      setPaymentStatus('verifying');
      setPaymentError(null);
      try {
        const token = await getToken();
        if (!token) {
          throw new Error('Your session expired. Please sign in again.');
        }

        const res = await fetch(
          `/api/payments/paystack/verify/${encodeURIComponent(reference)}`,
          {
            credentials: 'same-origin',
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await parseApiJson<{
          verified?: boolean;
          receipt?: PaidReceipt;
          error?: string;
        }>(res, 'Could not verify Paystack payment.');

        if (!data.verified || !data.receipt) {
          throw new Error(data.error || 'Could not verify Paystack payment.');
        }

        setReceipt(data.receipt);
        setFallbackAuthUrl(null);
        clearCart();
      } catch (err) {
        setPaymentError(
          err instanceof Error ? err.message : 'Unable to verify Paystack payment.'
        );
      } finally {
        setPaymentStatus('idle');
      }
    },
    [getToken, clearCart]
  );

  // Support Paystack redirect callback (?reference=... or ?trxref=...)
  useEffect(() => {
    const callbackRef = searchParams.get('reference') || searchParams.get('trxref');
    if (callbackRef && /^(KK|EMK|MK|YMK)-[A-Za-z0-9_-]{6,64}$/.test(callbackRef)) {
      setSearchParams({}, { replace: true });
      void verifyPaymentOnServer(callbackRef);
    }
  }, [searchParams, setSearchParams, verifyPaymentOnServer]);

  const buildOrderMessage = (): string => {
    const lines = [
      `Hello ${siteSettings.restaurantName},`,
      'I would like to place an order:',
      ...items.map((item) => {
        const linePrice =
          typeof item.meal.price === 'number' && item.meal.price > 0
            ? ` (${formatNaira(item.meal.price * item.quantity)})`
            : '';
        return `- ${item.quantity}x ${item.meal.name}${linePrice}`;
      }),
    ];
    if (!hasUnpricedItems && subtotal > 0) {
      lines.push(`Meals Subtotal: ${formatNaira(subtotal)}`);
      if (activeDeliveryFee > 0) {
        lines.push(`Delivery Fee: ${formatNaira(activeDeliveryFee)}`);
      }
      lines.push(`Order Total: ${formatNaira(orderTotal)}`);
    }
    if (customerName.trim()) {
      lines.push(`Name: ${customerName.trim()}`);
    }
    if (customerPhone.trim()) {
      lines.push(`Phone: ${customerPhone.trim()}`);
    }
    lines.push(
      `Fulfillment: ${fulfillmentType === 'delivery' ? 'Home Delivery' : 'Restaurant Pickup (BDPA)'}`
    );
    if (fulfillmentType === 'delivery' && deliveryAddress.trim()) {
      lines.push(`Delivery Address: ${deliveryAddress.trim()}`);
    }
    if (deliveryInstructions.trim()) {
      lines.push(`Instructions: ${deliveryInstructions.trim()}`);
    }
    lines.push(
      hasUnpricedItems
        ? 'Please confirm current Naira (₦) prices and delivery/preparation timing.'
        : 'Please confirm preparation and delivery/pickup timing.'
    );
    return lines.join('\n');
  };

  const whatsappPrimaryUrl = buildWhatsAppOrderUrl(buildOrderMessage(), phoneDisplay);
  const whatsappSecondaryUrl = secondaryPhone
    ? buildWhatsAppOrderUrl(buildOrderMessage(), secondaryPhone)
    : null;

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildOrderMessage());
      setCopiedSummary(true);
      window.setTimeout(() => setCopiedSummary(false), 2000);
    } catch {
      // Ignore clipboard failure in restricted contexts
    }
  };

  const canPayOnline = isSignedIn && !hasUnpricedItems && subtotal > 0;

  const handlePayWithPaystack = async () => {
    if (!canPayOnline) return;
    if (!customerName.trim() || !customerPhone.trim()) {
      setPaymentError('Please enter your name and phone number before continuing to payment.');
      return;
    }
    if (fulfillmentType === 'delivery' && !deliveryAddress.trim()) {
      setPaymentError('Please enter your delivery address for home delivery.');
      return;
    }

    setPaymentStatus('initializing');
    setPaymentError(null);
    setFallbackAuthUrl(null);

    try {
      const token = await getToken();
      if (!token) {
        throw new Error('Please sign in to proceed with online payment.');
      }

      const deliveryInfoPayload: DeliveryInfo = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        fulfillmentType,
        deliveryAddress: fulfillmentType === 'delivery' ? deliveryAddress.trim() : '',
        deliveryInstructions: deliveryInstructions.trim(),
      };

      const initRes = await fetch('/api/payments/paystack/initialize', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            mealId: item.meal.id,
            quantity: item.quantity,
          })),
          deliveryInfo: deliveryInfoPayload,
        }),
      });

      const initData = await parseApiJson<{
        access_code?: string;
        reference?: string;
        authorization_url?: string;
        error?: string;
      }>(initRes, 'Unable to start Paystack checkout.');

      if (!initData.access_code || !initData.reference) {
        throw new Error(initData.error || 'Unable to start Paystack checkout.');
      }

      const { access_code, reference, authorization_url } = initData;

      if (authorization_url) {
        setFallbackAuthUrl(authorization_url);
      }

      setPaymentStatus('awaiting');
      const popup = new PaystackPop();
      popup.resumeTransaction(access_code, {
        onSuccess: (tx) => {
          const verifiedRef = tx?.reference || reference;
          void verifyPaymentOnServer(verifiedRef);
        },
        onCancel: () => {
          setPaymentStatus('idle');
          setPaymentError('Payment window was closed before completing payment.');
        },
        onError: (err) => {
          setPaymentStatus('idle');
          setPaymentError(
            err?.message ||
              'Could not display the Paystack modal in this frame. You can use the direct Paystack checkout link below.'
          );
        },
      });
    } catch (err) {
      setPaymentStatus('idle');
      setPaymentError(
        err instanceof Error ? err.message : 'Unable to start Paystack payment.'
      );
    }
  };

  return (
    <div>
      <PageHero
        eyebrow="Online Food Ordering"
        title="Order Cart &amp; Checkout"
        subtitle="Review your selected dishes, choose home delivery or restaurant pickup, and complete your order with Paystack or WhatsApp."
        image={RESTAURANT_IMAGES.culinaryPrep}
        imageAlt="Freshly cooked Nigerian soup at Kendi's Kitchen"
      />

      <section className="py-12 sm:py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {receipt ? (
            <div className="max-w-xl mx-auto bg-[#FFFFFF] rounded-xl border border-[#15803D]/25 p-6 sm:p-8 space-y-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-7 h-7 text-[#15803D] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">
                    Payment Confirmed
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-[#1C1917]">
                    Thank You for Your Order
                  </h2>
                  <p className="mt-1 text-sm text-[#57534E]">
                    Reference:{' '}
                    <code className="text-xs bg-[#F4EFE8] px-1.5 py-0.5 rounded text-[#1C1917]">
                      {receipt.reference}
                    </code>
                  </p>
                </div>
              </div>

              <div className="border-y border-[#1C1917]/10 py-4 space-y-2.5 text-sm">
                {receipt.items.map((item) => (
                  <div key={item.mealId} className="flex items-center justify-between gap-4">
                    <span className="text-[#1C1917]">
                      {item.quantity} × {item.name}
                    </span>
                    <span className="tabular-nums font-medium text-[#1C1917]">
                      {formatNaira(item.lineTotalNaira)}
                    </span>
                  </div>
                ))}
                {receipt.deliveryInfo?.deliveryFeeNaira && receipt.deliveryInfo.deliveryFeeNaira > 0 && (
                  <div className="flex items-center justify-between gap-4 pt-2 border-t border-[#1C1917]/8 text-[#57534E]">
                    <span>Home Delivery Fee</span>
                    <span className="tabular-nums font-medium text-[#1C1917]">
                      {formatNaira(receipt.deliveryInfo.deliveryFeeNaira)}
                    </span>
                  </div>
                )}
              </div>

              {receipt.deliveryInfo && (
                <div className="p-4 rounded-lg bg-[#FAF7F2] border border-[#1C1917]/10 text-xs text-[#57534E] space-y-1">
                  <p className="font-semibold text-[#1C1917]">
                    {receipt.deliveryInfo.fulfillmentType === 'delivery'
                      ? 'Home Delivery Details'
                      : 'Restaurant Pickup'}
                  </p>
                  <p>
                    {receipt.deliveryInfo.customerName} · {receipt.deliveryInfo.customerPhone}
                  </p>
                  {receipt.deliveryInfo.deliveryAddress && (
                    <p>Address: {receipt.deliveryInfo.deliveryAddress}</p>
                  )}
                  {receipt.deliveryInfo.deliveryInstructions && (
                    <p>Note: {receipt.deliveryInfo.deliveryInstructions}</p>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1C1917]">Total Paid (Paystack)</span>
                <span className="tabular-nums font-display text-2xl font-semibold text-[#5A0B1E]">
                  {formatNaira(receipt.totalNaira)}
                </span>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/menu"
                  onClick={() => setReceipt(null)}
                  className="px-6 py-3 rounded-lg bg-[#5A0B1E] hover:bg-[#731129] text-[#FAF7F2] text-sm font-medium transition-colors"
                >
                  Order More Meals
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-lg border border-[#1C1917]/15 text-sm font-medium text-[#1C1917] hover:bg-[#F4EFE8] transition-colors"
                >
                  Contact Kitchen
                </Link>
              </div>
            </div>
          ) : isLoading ? (
            <div className="max-w-lg mx-auto text-center py-12 px-6 bg-[#FFFFFF] rounded-xl border border-[#1C1917]/8">
              <div className="w-8 h-8 mx-auto rounded-full border-2 border-[#5A0B1E]/20 border-t-[#5A0B1E] animate-spin" />
              <p className="mt-4 text-sm text-[#57534E]">Loading your order...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="max-w-lg mx-auto text-center py-12 px-6 bg-[#FFFFFF] rounded-xl border border-[#5A0B1E]/12">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#F4EFE8] text-[#5A0B1E] flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold text-[#1C1917]">
                Your Order Cart Is Empty
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-[#57534E] leading-relaxed">
                Explore our Rice Dishes, Protein and Extras, and Soups and Swallows to build your
                order from {siteSettings.restaurantName}.
              </p>
              <Link
                to="/menu"
                className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#5A0B1E] hover:bg-[#731129] text-[#FAF7F2] text-sm font-medium transition-colors"
              >
                <span>Browse Our Menu</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Cart Items List */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#5A0B1E]/12">
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#1C1917]">
                    Selected Meals ({totalItems})
                  </h2>
                  <button
                    type="button"
                    onClick={clearCart}
                    disabled={paymentStatus !== 'idle'}
                    className="text-xs sm:text-sm font-medium text-[#57534E] hover:text-[#B91C1C] transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Clear Order
                  </button>
                </div>

                {items.map(({ meal, quantity }) => (
                  <article
                    key={meal.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 bg-[#FFFFFF] rounded-xl border border-[#5A0B1E]/10 p-4 sm:p-5"
                  >
                    <Link
                      to={`/menu/${meal.id}`}
                      className="w-full sm:w-32 aspect-[4/3] rounded-lg overflow-hidden bg-[#F4EFE8] shrink-0"
                    >
                      <DishImage
                        src={meal.image}
                        alt={meal.imageAlt}
                        title={meal.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#57534E]">{meal.category}</p>
                      <h3 className="mt-0.5 font-display text-lg font-semibold text-[#1C1917]">
                        <Link
                          to={`/menu/${meal.id}`}
                          className="hover:text-[#5A0B1E] transition-colors"
                        >
                          {meal.name}
                        </Link>
                      </h3>
                      <p className="mt-1 tabular-nums text-xs sm:text-sm text-[#15803D] font-medium">
                        {formatPrice(meal.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#1C1917]/8">
                      {/* Quantity Stepper */}
                      <div className="inline-flex items-center rounded-lg border border-[#1C1917]/15 bg-[#FAF7F2]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(meal.id, quantity - 1)}
                          aria-label={`Decrease quantity of ${meal.name}`}
                          className="p-2 text-[#1C1917] hover:bg-[#F4EFE8] rounded-l-lg transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="tabular-nums px-3 text-sm font-semibold text-[#1C1917] min-w-[2rem] text-center">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(meal.id, quantity + 1)}
                          aria-label={`Increase quantity of ${meal.name}`}
                          className="p-2 text-[#1C1917] hover:bg-[#F4EFE8] rounded-r-lg transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Total or Qty Label */}
                      <div className="text-right min-w-[6.5rem]">
                        <p className="tabular-nums text-sm font-semibold text-[#5A0B1E]">
                          {typeof meal.price === 'number' && meal.price > 0
                            ? formatNaira(meal.price * quantity)
                            : `${quantity} × Plate`}
                        </p>
                      </div>

                      {/* Remove Item */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(meal.id)}
                        aria-label={`Remove ${meal.name} from order`}
                        className="p-2 rounded-lg text-[#57534E] hover:text-[#B91C1C] hover:bg-[#B91C1C]/8 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </article>
                ))}

                <div className="pt-2">
                  <Link
                    to="/menu"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#5A0B1E] hover:text-[#B91C1C] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Add More Dishes</span>
                  </Link>
                </div>
              </div>

              {/* Checkout Details + Order Summary */}
              <aside className="lg:col-span-5 bg-[#FFFFFF] rounded-xl border border-[#5A0B1E]/12 p-6 sm:p-7 space-y-5">
                <h2 className="font-display text-xl font-semibold text-[#1C1917]">
                  Checkout &amp; Delivery Details
                </h2>

                {/* Fulfillment Option */}
                <div className="grid grid-cols-2 gap-2.5">
                  {deliveryAvailable && (
                    <button
                      type="button"
                      onClick={() => setFulfillmentType('delivery')}
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                        fulfillmentType === 'delivery'
                          ? 'bg-[#5A0B1E] text-white border-[#5A0B1E]'
                          : 'bg-[#FAF7F2] text-[#1C1917] border-[#1C1917]/15 hover:bg-[#F4EFE8]'
                      }`}
                    >
                      <Truck className="w-4 h-4 shrink-0" />
                      <span>Home Delivery</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setFulfillmentType('pickup')}
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                      !deliveryAvailable ? 'col-span-2' : ''
                    } ${
                      fulfillmentType === 'pickup'
                        ? 'bg-[#5A0B1E] text-white border-[#5A0B1E]'
                        : 'bg-[#FAF7F2] text-[#1C1917] border-[#1C1917]/15 hover:bg-[#F4EFE8]'
                    }`}
                  >
                    <Store className="w-4 h-4 shrink-0" />
                    <span>Pickup (BDPA)</span>
                  </button>
                </div>

                {/* Delivery Notice Box */}
                {fulfillmentType === 'delivery' && deliveryAvailable && (
                  <div className="p-3.5 rounded-lg bg-[#15803D]/8 border border-[#15803D]/20 text-xs text-[#1C1917] space-y-1">
                    <p className="font-semibold text-[#15803D]">Home Delivery Available</p>
                    <p className="text-[#57534E] leading-relaxed">{siteSettings.deliveryNotice}</p>
                    {siteSettings.deliveryAreas && (
                      <p className="text-[#57534E]">
                        <strong className="text-[#1C1917]">Areas:</strong>{' '}
                        {siteSettings.deliveryAreas}
                      </p>
                    )}
                    {siteSettings.deliveryTimeEstimate && (
                      <p className="text-[#57534E]">
                        <strong className="text-[#1C1917]">Estimated Time:</strong>{' '}
                        {siteSettings.deliveryTimeEstimate}
                      </p>
                    )}
                  </div>
                )}

                {fulfillmentType === 'pickup' && (
                  <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#1C1917]/10 text-xs text-[#57534E] flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#5A0B1E] shrink-0 mt-0.5" />
                    <span>Pickup Address: {siteSettings.address}</span>
                  </div>
                )}

                {/* Customer Contact & Address Fields */}
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="checkout-name"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-1"
                      >
                        Your Name
                      </label>
                      <input
                        id="checkout-name"
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Full name"
                        className="w-full rounded-lg border border-[#1C1917]/15 bg-[#FAF7F2] px-3 py-2 text-xs sm:text-sm text-[#1C1917]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="checkout-phone"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        id="checkout-phone"
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g., 0803..."
                        className="w-full rounded-lg border border-[#1C1917]/15 bg-[#FAF7F2] px-3 py-2 text-xs sm:text-sm text-[#1C1917]"
                      />
                    </div>
                  </div>

                  {!email && (
                    <div>
                      <label
                        htmlFor="checkout-email"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-1"
                      >
                        Email for Online Receipt
                      </label>
                      <input
                        id="checkout-email"
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="Enter email for Paystack receipt"
                        className="w-full rounded-lg border border-[#1C1917]/15 bg-[#FAF7F2] px-3 py-2 text-xs sm:text-sm text-[#1C1917]"
                      />
                    </div>
                  )}

                  {fulfillmentType === 'delivery' && deliveryAvailable && (
                    <div>
                      <label
                        htmlFor="delivery-address"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-1"
                      >
                        Delivery Address *
                      </label>
                      <input
                        id="delivery-address"
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="House/hostel number, street, landmark in Benin City"
                        className="w-full rounded-lg border border-[#1C1917]/15 bg-[#FAF7F2] px-3 py-2 text-xs sm:text-sm text-[#1C1917]"
                      />
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="order-note"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-1"
                    >
                      {fulfillmentType === 'delivery'
                        ? 'Delivery Instructions (Optional)'
                        : 'Pickup / Preparation Note (Optional)'}
                    </label>
                    <textarea
                      id="order-note"
                      rows={2}
                      value={deliveryInstructions}
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
                      placeholder={
                        fulfillmentType === 'delivery'
                          ? 'Gate colour, call on arrival, spice preference...'
                          : 'Preferred pickup time or preparation notes...'
                      }
                      className="w-full rounded-lg border border-[#1C1917]/15 bg-[#FAF7F2] px-3.5 py-2 text-xs text-[#1C1917] placeholder:text-[#57534E]/60 focus:outline-none focus:ring-2 focus:ring-[#5A0B1E]"
                    />
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-2.5 text-sm border-y border-[#1C1917]/10 py-4">
                  <div className="flex items-center justify-between text-[#57534E]">
                    <span>Items Subtotal ({totalItems})</span>
                    <span className="tabular-nums font-semibold text-[#1C1917]">
                      {hasUnpricedItems ? 'Contact for Price' : formatNaira(subtotal)}
                    </span>
                  </div>
                  {fulfillmentType === 'delivery' && deliveryAvailable && (
                    <div className="flex items-center justify-between text-[#57534E]">
                      <span>Delivery Fee</span>
                      <span className="tabular-nums font-semibold text-[#1C1917]">
                        {activeDeliveryFee > 0 ? formatNaira(activeDeliveryFee) : 'Confirmed on call'}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-3 pt-1 border-t border-[#1C1917]/8">
                    <span className="font-semibold text-[#1C1917]">Order Total</span>
                    <span className="tabular-nums font-display text-lg font-semibold text-[#15803D]">
                      {hasUnpricedItems ? 'Contact for Price' : formatNaira(orderTotal)}
                    </span>
                  </div>
                </div>

                {paymentError && (
                  <div
                    role="alert"
                    className="rounded-lg bg-[#B91C1C]/8 border border-[#B91C1C]/20 p-3.5 flex items-start gap-2.5 text-xs text-[#B91C1C]"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{paymentError}</p>
                  </div>
                )}

                <div className="space-y-3 pt-1">
                  {canPayOnline && (
                    <button
                      type="button"
                      onClick={handlePayWithPaystack}
                      disabled={paymentStatus !== 'idle'}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#1C1917] hover:bg-black disabled:opacity-60 text-[#FAF7F2] text-sm font-semibold transition-colors cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>
                        {paymentStatus === 'initializing'
                          ? 'Starting Paystack...'
                          : paymentStatus === 'awaiting'
                          ? 'Complete Payment in Paystack...'
                          : paymentStatus === 'verifying'
                          ? 'Verifying Payment...'
                          : `Pay ${formatNaira(orderTotal)} with Paystack`}
                      </span>
                    </button>
                  )}

                  {!isSignedIn && !hasUnpricedItems && subtotal > 0 && (
                    <Link
                      to="/sign-in?redirect_url=/cart"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-[#1C1917]/20 text-sm font-medium text-[#1C1917] hover:bg-[#F4EFE8] transition-colors"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Sign In to Pay {formatNaira(orderTotal)} Online</span>
                    </Link>
                  )}

                  <a
                    href={whatsappPrimaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-sm font-semibold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order via WhatsApp ({phoneDisplay})</span>
                  </a>

                  {whatsappSecondaryUrl && secondaryPhone && (
                    <a
                      href={whatsappSecondaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-[#15803D]/30 text-[#15803D] hover:bg-[#15803D]/5 text-xs sm:text-sm font-semibold transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Line 2 ({secondaryPhone})</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => void handleCopySummary()}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-[#5A0B1E]/25 text-sm font-medium text-[#5A0B1E] hover:bg-[#F4EFE8] transition-colors cursor-pointer"
                  >
                    {copiedSummary ? (
                      <>
                        <Check className="w-4 h-4 text-[#15803D]" />
                        <span>Order Summary Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Order Summary</span>
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <a
                      href={toTelHref(phoneDisplay)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#5A0B1E] hover:bg-[#731129] text-white text-xs sm:text-sm font-medium transition-colors tabular-nums"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{phoneDisplay}</span>
                    </a>
                    {secondaryPhone && (
                      <a
                        href={toTelHref(secondaryPhone)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#5A0B1E] hover:bg-[#731129] text-white text-xs sm:text-sm font-medium transition-colors tabular-nums"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{secondaryPhone}</span>
                      </a>
                    )}
                  </div>

                  {fallbackAuthUrl && (
                    <a
                      href={fallbackAuthUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs font-medium transition-colors"
                    >
                      <span>Open Paystack Checkout Page</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <p className="text-xs text-[#57534E] leading-relaxed">
                  {hasUnpricedItems
                    ? `Direct WhatsApp or phone ordering confirms today's Naira (₦) price and delivery/pickup details with ${siteSettings.restaurantName}.`
                    : `Pay securely online via Paystack when signed in, or send your order directly via WhatsApp to ${phoneDisplay}${
                        secondaryPhone ? ` / ${secondaryPhone}` : ''
                      }.`}
                </p>
              </aside>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
