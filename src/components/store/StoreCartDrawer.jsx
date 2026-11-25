import React, { useState } from 'react';
import {
  X,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  CreditCard,
  Banknote,
  Phone,
  MapPin,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';

export default function StoreCartDrawer() {
  const { lang } = useLanguage();
  const {
    cart,
    cartCount,
    cartSubtotalYER,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const { formatPrice } = useStore();
  const isAr = lang === 'ar';

  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderDone, setOrderDone] = useState(false);

  if (!isCartOpen) return null;

  const subtotalUSD = cart.reduce(
    (sum, item) => sum + (item.product.priceUSD || Math.round(item.product.priceYER / 535)) * item.quantity,
    0
  );

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderDone(true);
    setTimeout(() => {
      clearCart();
      setShowCheckout(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={closeCart} />

      <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-950 text-white">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-gold-400" />
            <h3 className="font-black text-sm sm:text-base">
              {isAr ? `سلة التسوق (${cartCount})` : `Shopping Cart (${cartCount})`}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setOrderDone(false);
              setShowCheckout(false);
              closeCart();
            }}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {orderDone ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="font-black text-lg text-slate-900 dark:text-white">
                {isAr ? 'تم استلام طلبك بنجاح!' : 'Order Received Successfully!'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                {isAr
                  ? 'سيتواصل معك فريق صيدلية نوديسك خلال دقائق لتأكيد العنوان وتجهيز التوصيل.'
                  : 'NODISC Pharmacy team will contact you shortly to confirm delivery details.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setOrderDone(false);
                  closeCart();
                }}
                className="px-6 py-2.5 rounded-xl bg-primary-700 text-white font-bold text-xs"
              >
                {isAr ? 'متابعة التسوق' : 'Continue Shopping'}
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-16 text-center space-y-3 text-slate-400">
              <ShoppingCart className="w-12 h-12 mx-auto opacity-30" />
              <p className="text-sm font-bold">{isAr ? 'سلة التسوق فارغة حالياً' : 'Your cart is empty'}</p>
            </div>
          ) : showCheckout ? (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between">
                <span className="font-bold">{isAr ? 'إجمالي الطلب:' : 'Order Total:'}</span>
                <span className="font-black text-base text-emerald-600 dark:text-emerald-400">
                  {formatPrice(cartSubtotalYER, subtotalUSD)}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <input
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-primary-500"
                  placeholder={isAr ? 'أدخل اسم المستلم' : 'Recipient name'}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp'}
                </label>
                <div className="relative">
                  <input
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-primary-500"
                    placeholder="77xxxxxxx"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'عنوان التوصيل' : 'Delivery Address'}
                </label>
                <div className="relative">
                  <input
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-primary-500"
                    placeholder={isAr ? 'المدينة، الحي، أقرب معلم' : 'City, Street, Landmark'}
                  />
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  {isAr ? 'طريقة الدفع' : 'Payment Method'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                      paymentMethod === 'cod'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Banknote className="w-4 h-4" />
                    <span>{isAr ? 'نقداً عند الاستلام' : 'Cash on Delivery'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                      paymentMethod === 'wallet'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-secondary-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>{isAr ? 'محفظة إلكترونية' : 'E-Wallet / Bank'}</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs"
                >
                  {isAr ? 'رجوع' : 'Back'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
                >
                  {isAr ? 'تأكيد وإرسال الطلب' : 'Confirm Order'}
                </button>
              </div>
            </form>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.option || 'def'}`}
                className="flex gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                  onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2">
                    {isAr ? item.product.name : item.product.nameEn || item.product.name}
                  </h4>
                  {item.option && (
                    <span className="inline-block text-[10px] text-slate-500 mt-0.5">
                      {isAr ? 'الخيار:' : 'Option:'} {item.option}
                    </span>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                      {formatPrice(item.product.priceYER * item.quantity, (item.product.priceUSD || 0) * item.quantity)}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.option, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.option, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id, item.option)}
                        className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && !showCheckout && !orderDone && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3 bg-slate-50 dark:bg-slate-950">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-slate-600 dark:text-slate-400">{isAr ? 'الإجمالي:' : 'Total:'}</span>
              <span className="font-black text-lg text-emerald-600 dark:text-emerald-400">
                {formatPrice(cartSubtotalYER, subtotalUSD)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowCheckout(true)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-primary-700 hover:from-emerald-700 hover:to-primary-800 text-white font-extrabold text-sm shadow-lg transition-all"
            >
              {isAr ? 'إتمام الطلب والدفع' : 'Proceed to Checkout'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
