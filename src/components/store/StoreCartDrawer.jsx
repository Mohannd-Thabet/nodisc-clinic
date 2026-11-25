import React, { useState } from 'react';
import {
  X,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  CreditCard,
  Phone,
  MapPin,
  Copy,
  Check,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';

export const walletOptions = [
  {
    id: 'kuraimi',
    name: 'الكريمي حاسب',
    nameEn: 'Al-Kuraimi',
    subtitle: 'بنك الكريمي الإسلامي',
    account: '784545908',
    type: 'رقم الحساب المميز',
    logo: '/assets/wallets/kuraimi.jpg',
    colorBorder: 'border-blue-500',
    colorBg: 'bg-blue-50 dark:bg-blue-950/40',
    colorRing: 'ring-blue-500',
    owner: 'د. محمد عبدالله الجرباني / نوديسك',
  },
  {
    id: 'jawali',
    name: 'محفظة جوالي',
    nameEn: 'Jawali',
    subtitle: 'Jawali (كاك بنك)',
    account: '772070207',
    type: 'رقم المحفظة / الهاتف',
    logo: '/assets/wallets/jawali.jpg',
    colorBorder: 'border-amber-500',
    colorBg: 'bg-amber-50 dark:bg-amber-950/40',
    colorRing: 'ring-amber-500',
    owner: 'نوديسك كلينك — مبيعات المتجر',
  },
  {
    id: 'jeeb',
    name: 'محفظة جيب',
    nameEn: 'Jeeb',
    subtitle: 'Jeeb (بنك التضامن)',
    account: '772070207',
    type: 'رقم المحفظة / الهاتف',
    logo: '/assets/wallets/jeeb.jpg',
    colorBorder: 'border-sky-500',
    colorBg: 'bg-sky-50 dark:bg-sky-950/40',
    colorRing: 'ring-sky-500',
    owner: 'نوديسك كلينك — مبيعات المتجر',
  },
  {
    id: 'onecash',
    name: 'محفظة ون كاش',
    nameEn: 'OneCash',
    subtitle: 'OneCash (بما)',
    account: '772070207',
    type: 'رقم المحفظة / الهاتف',
    logo: '/assets/wallets/onecash.jpg',
    colorBorder: 'border-red-500',
    colorBg: 'bg-red-50 dark:bg-red-950/40',
    colorRing: 'ring-red-500',
    owner: 'نوديسك كلينك — مبيعات المتجر',
  },
  {
    id: 'flousak',
    name: 'محفظة فلوسك',
    nameEn: 'Flousak',
    subtitle: 'Flousak (بنك اليمن والكويت)',
    account: '772070207',
    type: 'رقم المحفظة / الهاتف',
    logo: '/assets/wallets/flousak.jpg',
    colorBorder: 'border-emerald-500',
    colorBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    colorRing: 'ring-emerald-500',
    owner: 'نوديسك كلينك — مبيعات المتجر',
  },
];

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
  const [governorate, setGovernorate] = useState('صنعاء');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [selectedWalletId, setSelectedWalletId] = useState('kuraimi');
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  if (!isCartOpen) return null;

  const subtotalUSD = cart.reduce(
    (sum, item) => sum + (item.product.priceUSD || Math.round(item.product.priceYER / 535)) * item.quantity,
    0
  );

  const selectedWallet = walletOptions.find((w) => w.id === paymentMethod) || walletOptions[0];

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderCode = `ND-${Math.floor(100000 + Math.random() * 900000)}`;
    const paymentLabel =
      paymentMethod === 'cod'
        ? isAr ? 'نقدًا عند التسليم (الدفع عند الاستلام)' : 'Cash on Delivery'
        : `${selectedWallet.name} (${selectedWallet.account})`;

    const itemsSummary = cart
      .map((i) => `- ${i.product.name} × ${i.quantity}${i.option ? ` (${i.option})` : ''}`)
      .join('\n');

    setOrderSuccess({
      code: orderCode,
      name: customerName,
      phone: customerPhone,
      address: `${governorate} — ${customerAddress}`,
      payment: paymentLabel,
      paymentMethodKey: paymentMethod,
      totalFormatted: formatPrice(cartSubtotalYER, subtotalUSD),
      totalYER: cartSubtotalYER,
      items: itemsSummary,
    });

    clearCart();
    setShowCheckout(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={closeCart} />

      <div className="relative z-10 w-full max-w-lg bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-950 text-white">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-gold-400" />
            <h3 className="font-black text-sm sm:text-base">
              {showCheckout
                ? isAr ? 'إتمام الطلب والدفع' : 'Checkout & Payment'
                : isAr ? `سلة التسوق (${cartCount})` : `Shopping Cart (${cartCount})`}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setOrderSuccess(null);
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
          {orderSuccess ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white shadow-md mx-auto p-1">
                <img src="/assets/nodisc_photo.jpg" alt="شعار نوديسك" className="w-full h-full object-contain rounded-xl" />
              </div>
              <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto -mt-6 shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
              </div>

              <h3 className="font-black text-lg text-slate-900 dark:text-white">
                {isAr ? 'تم استلام طلب الشراء بنجاح!' : 'Order Received Successfully!'}
              </h3>

              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-start border border-slate-200 dark:border-slate-700">
                <p>
                  {isAr ? 'رقم الطلب:' : 'Order Code:'}{' '}
                  <strong className="font-mono text-primary-600 dark:text-secondary-400 font-bold" dir="ltr">
                    {orderSuccess.code}
                  </strong>
                </p>
                <p>{isAr ? 'المستلم:' : 'Recipient:'} <strong>{orderSuccess.name}</strong> ({orderSuccess.phone})</p>
                <p>{isAr ? 'عنوان التوصيل:' : 'Delivery Address:'} <strong>{orderSuccess.address}</strong></p>
                <div className="flex items-center gap-2 pt-0.5 flex-wrap">
                  <span>{isAr ? 'طريقة الدفع:' : 'Payment Method:'}</span>
                  {orderSuccess.paymentMethodKey !== 'cod' &&
                  walletOptions.find((w) => w.id === orderSuccess.paymentMethodKey) ? (
                    <span className="inline-flex items-center gap-1.5 font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-700 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-600">
                      <img
                        src={walletOptions.find((w) => w.id === orderSuccess.paymentMethodKey)?.logo}
                        alt=""
                        className="w-4 h-4 rounded-full object-cover"
                      />
                      <span>{orderSuccess.payment}</span>
                    </span>
                  ) : (
                    <strong>{orderSuccess.payment}</strong>
                  )}
                </div>
                <p>
                  {isAr ? 'الإجمالي:' : 'Total:'}{' '}
                  <strong className="text-emerald-600 dark:text-emerald-400 font-black">
                    {orderSuccess.totalFormatted}
                  </strong>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <a
                  href={`https://wa.me/967772070207?text=${encodeURIComponent(
                    `السلام عليكم، قمت بطلب من متجر نوديسك:\nرقم الطلب: ${orderSuccess.code}\nالمستلم: ${orderSuccess.name}\nالهاتف: ${orderSuccess.phone}\nالعنوان: ${orderSuccess.address}\nطريقة الدفع: ${orderSuccess.payment}\nالإجمالي: ${orderSuccess.totalFormatted}\nالمنتجات:\n${orderSuccess.items}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <span>{isAr ? 'إرسال الفاتورة عبر الواتساب' : 'Send Invoice via WhatsApp'}</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setOrderSuccess(null);
                    closeCart();
                  }}
                  className="py-3 px-5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold"
                >
                  {isAr ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-16 text-center space-y-3 text-slate-400">
              <ShoppingCart className="w-12 h-12 mx-auto opacity-30" />
              <p className="text-sm font-bold">{isAr ? 'سلة التسوق فارغة حالياً' : 'Your cart is empty'}</p>
            </div>
          ) : showCheckout ? (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'الاسم الكامل *' : 'Full Name *'}
                </label>
                <input
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none focus:border-primary-500"
                  placeholder={isAr ? 'أدخل اسم المستلم الثلاثي' : 'Recipient full name'}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'رقم الهاتف / الواتساب *' : 'Phone / WhatsApp *'}
                  </label>
                  <div className="relative">
                    <input
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none focus:border-primary-500"
                      placeholder="77xxxxxxx"
                    />
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'المحافظة *' : 'Governorate *'}
                  </label>
                  <select
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold outline-none focus:border-primary-500"
                  >
                    <option value="صنعاء">صنعاء</option>
                    <option value="عدن">عدن</option>
                    <option value="تعز">تعز</option>
                    <option value="الحديدة">الحديدة</option>
                    <option value="حضرموت / المكلا">حضرموت / المكلا</option>
                    <option value="بقية المحافظات">بقية المحافظات</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'العنوان بالتفصيل *' : 'Detailed Address *'}
                </label>
                <div className="relative">
                  <input
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none focus:border-primary-500"
                    placeholder={isAr ? 'الشارع، الحي، أقرب معلم بارز' : 'Street, District, Landmark'}
                  />
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Payment Method Dropdown + Detailed Wallets / COD */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isAr ? 'طريقة الدفع وتأكيد الحساب *' : 'Payment Method & Confirmation *'}
                </label>

                <select
                  value={paymentMethod === 'cod' ? 'cod' : 'wallet'}
                  onChange={(e) => {
                    if (e.target.value === 'cod') {
                      setPaymentMethod('cod');
                    } else {
                      setPaymentMethod(selectedWalletId || 'kuraimi');
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-secondary-500 mb-3"
                >
                  <option value="cod">💵 {isAr ? 'نقدًا عند التسليم (الدفع عند الاستلام)' : 'Cash on Delivery'}</option>
                  <option value="wallet">💳 {isAr ? 'محافظ إلكترونية وتحويل بنكي' : 'Electronic Wallets & Bank Transfer'}</option>
                </select>

                {/* Cash on Delivery Card */}
                {paymentMethod === 'cod' && (
                  <div className="p-3.5 rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base">💵</span>
                      <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-100">
                        {isAr ? 'الدفع نقدًا عند التسليم (Cash on Delivery)' : 'Cash on Delivery'}
                      </h4>
                    </div>
                    <p className="text-[11px] text-emerald-800 dark:text-emerald-300 leading-relaxed">
                      {isAr
                        ? 'يتم تسليم المنتجات إليك أولاً وفحصها، ثم تدفع كامل المبلغ لمندوب التوصيل يداً بيد.'
                        : 'Inspect your products upon arrival and pay the delivery courier directly.'}
                    </p>
                  </div>
                )}

                {/* Electronic Wallets Grid + Selected Wallet Detail & Copy */}
                {paymentMethod !== 'cod' && (
                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-secondary-500" />
                        <span>{isAr ? 'اختر المحفظة الإلكترونية التي ترغب بالتحويل عبرها:' : 'Select your e-wallet:'}</span>
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                        {isAr ? 'بدون عمولة تحويل' : '0% Fee'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {walletOptions.map((wallet) => {
                        const isSelected = paymentMethod === wallet.id;
                        return (
                          <button
                            type="button"
                            key={wallet.id}
                            onClick={() => {
                              setSelectedWalletId(wallet.id);
                              setPaymentMethod(wallet.id);
                            }}
                            className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center relative group ${
                              isSelected
                                ? `${wallet.colorBorder} ${wallet.colorBg} shadow-md scale-[1.02] ring-2 ring-offset-1 ${wallet.colorRing}`
                                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/70 hover:border-slate-300'
                            }`}
                          >
                            {isSelected && (
                              <span className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-xs">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </span>
                            )}

                            <div className="w-11 h-11 rounded-full p-0.5 bg-white shadow-md border-2 border-slate-200 dark:border-slate-700 overflow-hidden mb-1.5">
                              <img src={wallet.logo} alt={wallet.name} className="w-full h-full object-cover rounded-full" />
                            </div>

                            <h5 className="text-[11px] font-black text-slate-900 dark:text-white leading-tight">
                              {isAr ? wallet.name : wallet.nameEn}
                            </h5>
                            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5 font-bold" dir="ltr">
                              {wallet.account}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected Wallet Detail & Copy Card */}
                    <div className={`p-3.5 rounded-2xl border-2 ${selectedWallet.colorBorder} ${selectedWallet.colorBg} space-y-2.5 mt-2`}>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-full p-0.5 bg-white shadow-sm border-2 border-slate-200 overflow-hidden shrink-0">
                            <img src={selectedWallet.logo} alt={selectedWallet.name} className="w-full h-full object-cover rounded-full" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">
                              {isAr ? 'المحفظة المختارة للتحويل:' : 'Selected Wallet:'}
                            </span>
                            <h4 className="text-xs font-black text-slate-900 dark:text-white">
                              {selectedWallet.name} — {selectedWallet.subtitle}
                            </h4>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard?.writeText(selectedWallet.account);
                            setCopiedAccount(true);
                            setTimeout(() => setCopiedAccount(false), 2000);
                          }}
                          className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-[11px] font-bold flex items-center gap-1 shadow-xs shrink-0"
                        >
                          {copiedAccount ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600">{isAr ? 'تم النسخ!' : 'Copied!'}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{isAr ? 'نسخ الرقم' : 'Copy'}</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="bg-white/90 dark:bg-slate-900/90 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">{selectedWallet.type}:</span>
                          <span className="font-mono text-sm font-black text-primary-700 dark:text-secondary-400 tracking-wider" dir="ltr">
                            {selectedWallet.account}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-600 dark:text-slate-400">{isAr ? 'اسم المستفيد:' : 'Beneficiary:'}</span>
                          <span className="font-bold text-slate-900 dark:text-white">{selectedWallet.owner}</span>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5 leading-relaxed bg-white/40 dark:bg-slate-900/40 p-2 rounded-xl">
                        <span className="text-amber-500 font-bold shrink-0">💡 {isAr ? 'تعليمات التحويل:' : 'Instructions:'}</span>
                        <span>
                          {isAr
                            ? 'يرجى تحويل مبلغ الفاتورة إلى الرقم الموضح أعلاه، ثم إرسال صورة إشعار التحويل عبر الواتساب (772070207) لتجهيز وشحن طلبك فوراً.'
                            : 'Transfer the invoice amount to the account above and send the transfer receipt via WhatsApp (772070207).'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Summary Box */}
              <div className="p-3.5 rounded-2xl bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 text-xs space-y-1.5">
                <div className="font-black text-primary-900 dark:text-primary-200 border-b border-primary-200/60 dark:border-primary-800 pb-1.5">
                  {isAr ? 'ملخص الدفع المحدد:' : 'Selected Payment Summary:'}
                </div>
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>{isAr ? 'وسيلة الدفع:' : 'Payment Method:'}</span>
                  <strong className="text-slate-900 dark:text-white">
                    {paymentMethod === 'cod'
                      ? isAr ? 'نقدًا عند التسليم' : 'Cash on Delivery'
                      : `${selectedWallet.name} (${selectedWallet.account})`}
                  </strong>
                </div>
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>{isAr ? 'عدد المنتجات:' : 'Items Count:'}</span>
                  <strong>{cartCount}</strong>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-primary-200/60 dark:border-primary-800">
                  <span className="font-bold">{isAr ? 'إجمالي الفاتورة:' : 'Invoice Total:'}</span>
                  <strong className="text-base font-black text-emerald-600 dark:text-emerald-400">
                    {formatPrice(cartSubtotalYER, subtotalUSD)}
                  </strong>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary-700 to-emerald-600 hover:from-primary-800 hover:to-emerald-700 text-white font-black text-xs shadow-md active:scale-95 transition-all"
                >
                  {isAr ? 'تأكيد الطلب النهائي' : 'Confirm Final Order'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs"
                >
                  {isAr ? 'تراجع' : 'Back'}
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
                  onError={(e) => { e.target.src = '/assets/nodisc_photo.jpg'; }}
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
        {cart.length > 0 && !showCheckout && !orderSuccess && (
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
