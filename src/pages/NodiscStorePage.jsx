import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { 
  storeCategories, 
  storeSubCategories, 
  storeProducts 
} from '../data/storeProducts';
import { 
  ShoppingCart, 
  UploadCloud, 
  Search, 
  Filter, 
  Check, 
  ShieldCheck, 
  Activity, 
  Star, 
  Plus, 
  Minus, 
  Trash2, 
  X, 
  FileText, 
  Clock, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle,
  Phone,
  Eye,
  Copy
} from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';

export const walletOptions = [
  {
    id: 'kuraimi',
    name: 'الكريمي حاسب',
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

export default function NodiscStorePage() {
  const { lang, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [selectedWalletId, setSelectedWalletId] = useState('kuraimi');
  const { 
    cart, 
    cartCount, 
    cartSubtotalYER, 
    addToCart: ctxAddToCart, 
    updateQuantity: ctxUpdateQty, 
    removeFromCart: ctxRemove, 
    clearCart,
    isCartOpen,
    setIsCartOpen,
    openCart,
    closeCart
  } = useCart();

  // Active Category State: 'all', 'medical-supplies', 'physio-rehab'
  const [selectedMainCategory, setSelectedMainCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Shopping Cart & Checkout Modals
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Checkout Form State
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    phone: '',
    city: 'صنعاء (توصيل فوري خلال ساعات)',
    address: '',
    paymentMethod: 'cod',
    deliveryMethod: 'delivery',
    notes: '',
  });

  // Prescription Upload Modal State
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [prescriptionStage, setPrescriptionStage] = useState('form'); // 'form' | 'uploading' | 'pharmacist_reviewed' | 'confirmed'
  const [prescriptionData, setPrescriptionData] = useState({
    patientName: '',
    phone: '',
    city: 'صنعاء',
    notes: '',
    imageName: ''
  });

  // Selected Product Detail Modal & Quantity
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);

  // Handle URL Query Params
  useEffect(() => {
    const cat = searchParams.get('cat');
    const action = searchParams.get('action');

    if (cat === 'medical-supplies' || cat === 'physio-rehab') {
      setSelectedMainCategory(cat);
    }
    if (action === 'prescription') {
      setIsPrescriptionModalOpen(true);
    }
    if (action === 'cart') {
      setIsCartOpen(true);
    }
  }, [searchParams]);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return storeProducts.filter((product) => {
      // Main category filter
      if (selectedMainCategory !== 'all' && product.category !== selectedMainCategory) {
        return false;
      }
      // Sub category filter
      if (selectedSubCategory !== 'all' && product.subCategory !== selectedSubCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.shortDesc.toLowerCase().includes(query);
        const matchesIndications = product.indications.some(ind => ind.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesIndications;
      }
      return true;
    });
  }, [selectedMainCategory, selectedSubCategory, searchQuery]);

  // Cart operations using context
  const addToCart = (product, quantity = 1) => {
    ctxAddToCart(product, quantity);
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    const item = cart.find(i => i.product.id === id);
    if (item) {
      if (item.quantity + delta <= 0) {
        ctxRemove(id, item.option);
      } else {
        ctxUpdateQty(id, item.option, item.quantity + delta);
      }
    }
  };

  const removeFromCart = (id) => {
    const item = cart.find(i => i.product.id === id);
    if (item) {
      ctxRemove(id, item.option);
    }
  };

  const cartTotalYER = cartSubtotalYER;
  const cartTotalItems = cartCount;

  // Handle Prescription Demo Submission
  const handlePrescriptionSubmit = (e) => {
    e.preventDefault();
    setPrescriptionStage('uploading');
    setTimeout(() => {
      setPrescriptionStage('pharmacist_reviewed');
    }, 1500);
  };

  // Handle Checkout Order Submission
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const fakeOrderNumber = 'NOD-ORD-' + Math.floor(100000 + Math.random() * 900000);
    const summaryItems = cart.map(i => `${i.product.name} (الكمية: ${i.quantity})`).join('\n');
    
    const paymentLabels = {
      cod: 'الدفع نقداً عند الاستلام (Cash on Delivery)',
      kuraimi: 'الكريمي حاسب (حساب: 784545908)',
      onecash: 'محفظة ون كاش (رقم: 772070207)',
      flousak: 'محفظة فلوسك (رقم: 772070207)',
      jawali: 'محفظة جوالي (رقم: 772070207)',
      jeeb: 'محفظة جيب (رقم: 772070207)',
    };

    setOrderSuccess({
      code: fakeOrderNumber,
      name: checkoutData.name,
      phone: checkoutData.phone,
      address: `${checkoutData.city} - ${checkoutData.address}`,
      total: cartTotalYER,
      payment: paymentLabels[checkoutData.paymentMethod] || 'دفع إلكتروني (محفظة يمنية)',
      paymentMethodKey: checkoutData.paymentMethod,
      items: summaryItems
    });
    
    clearCart();
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 pb-20">
      
      {/* Store Header & Prescription Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-slate-900 text-white py-12 sm:py-16 border-b border-primary-800/40">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white/20 bg-white shadow-2xl shrink-0 p-1">
                  <img 
                    src="/assets/nodisc_photo.jpg" 
                    alt="شعار متجر نوديسك NODISC" 
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-500/20 text-secondary-300 text-xs font-bold border border-secondary-500/30 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>متجر نوديسك للمستلزمات الطبية والتأهيل التخصصي</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                    متجر <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-cyan-300">نوديسك الطبي</span>
                  </h1>
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                مشدات ودعامات العمود الفقري، الرقابي الطبية المعتمدة، وأجهزة ومستلزمات العلاج الطبيعي والتأهيل المنزلي مع خدمة التوصيل في صنعاء وجميع المحافظات.
              </p>
            </div>

            {/* Prescription Upload Card (As Requested by Dr. Al-Jarbani) */}
            <div className="w-full lg:w-96 p-5 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-md shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary-500/20 rounded-full blur-2xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-gold-400/20 text-gold-300 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white">طلب بدوائك / ارفع وصفتك</h3>
                    <p className="text-[11px] text-slate-300">خدمة مراجعة الروشتة الطبية وتجهيزها</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  صور وصفتك أو روشتة الدكتور وسيقوم صيدلي نوديسك بتسعير الأصناف المتوفرة وتجهيزها للتوصيل مباشرة.
                </p>

                <button
                  onClick={() => {
                    setPrescriptionStage('form');
                    setIsPrescriptionModalOpen(true);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>ارفع الروشتة الطبية الآن</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Choices Tabs (كما ذكر الدكتور بالحرف: خياران رئيسيان) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Choice 1: مستلزمات طبية */}
          <button
            onClick={() => {
              setSelectedMainCategory(selectedMainCategory === 'medical-supplies' ? 'all' : 'medical-supplies');
              setSelectedSubCategory('all');
            }}
            className={`p-5 rounded-3xl text-right transition-all flex items-center justify-between border shadow-lg ${
              selectedMainCategory === 'medical-supplies'
                ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white border-blue-500 shadow-blue-900/20 scale-[1.01]'
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-white border-slate-200 dark:border-slate-800 hover:border-blue-500/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                selectedMainCategory === 'medical-supplies' ? 'bg-white/20 text-white' : 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
              }`}>
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">القسم الأول</span>
                <h3 className="font-extrabold text-base sm:text-lg leading-tight">1. مستلزمات طبية ودعامات</h3>
                <p className={`text-xs mt-0.5 line-clamp-1 ${selectedMainCategory === 'medical-supplies' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  مشدات العمود الفقري، الرقابي الطبية، عكازات، وسائد ومفارش ميموري فوم
                </p>
              </div>
            </div>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              selectedMainCategory === 'medical-supplies' ? 'bg-white text-blue-800' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}>
              <Check className="w-4 h-4" />
            </div>
          </button>

          {/* Choice 2: أجهزة ومستلزمات العلاج الطبيعي والتأهيل */}
          <button
            onClick={() => {
              setSelectedMainCategory(selectedMainCategory === 'physio-rehab' ? 'all' : 'physio-rehab');
              setSelectedSubCategory('all');
            }}
            className={`p-5 rounded-3xl text-right transition-all flex items-center justify-between border shadow-lg ${
              selectedMainCategory === 'physio-rehab'
                ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white border-emerald-500 shadow-emerald-900/20 scale-[1.01]'
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-white border-slate-200 dark:border-slate-800 hover:border-emerald-500/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                selectedMainCategory === 'physio-rehab' ? 'bg-white/20 text-white' : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
              }`}>
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">القسم الثاني</span>
                <h3 className="font-extrabold text-base sm:text-lg leading-tight">2. أجهزة ومستلزمات العلاج الطبيعي والتأهيل</h3>
                <p className={`text-xs mt-0.5 line-clamp-1 ${selectedMainCategory === 'physio-rehab' ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  أجهزة التحفيز TENS، أحزمة شد الفقرات، كمادات الحرارة والجليد، ومطاطات التأهيل
                </p>
              </div>
            </div>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              selectedMainCategory === 'physio-rehab' ? 'bg-white text-emerald-800' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}>
              <Check className="w-4 h-4" />
            </div>
          </button>

        </div>
      </section>

      {/* Search Bar & Subcategory Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن مشد، رقبية، جهاز TENS..."
              className="w-full pr-10 pl-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium focus:outline-none focus:border-secondary-500 shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Cart Floating Button Preview on Mobile & Desktop */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold shadow-md shadow-primary-700/20 active:scale-95 transition-all self-end md:self-auto"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>سلة المشتريات</span>
            <span className="w-5 h-5 rounded-full bg-gold-400 text-slate-950 font-black text-[11px] flex items-center justify-center">
              {cartTotalItems}
            </span>
            <span className="border-r border-white/20 pr-2 mr-1">
              {cartTotalYER.toLocaleString()} ريال
            </span>
          </button>
        </div>

        {/* Subcategories Scrollable Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
          {storeSubCategories
            .filter(sub => selectedMainCategory === 'all' || sub.categoryId === 'all' || sub.categoryId === selectedMainCategory)
            .map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubCategory(sub.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedSubCategory === sub.id
                    ? 'bg-secondary-600 text-white shadow-sm shadow-secondary-600/30'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {sub.name}
              </button>
            ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 my-8">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="font-bold text-base text-slate-700 dark:text-slate-200">لا توجد أصناف مطابقة للبحث</h3>
            <p className="text-xs text-slate-500 mt-1">يرجى تجربة كلمات بحث أخرى أو اختيار جميع الأقسام.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-secondary-500/40 transition-all duration-300 group"
              >
                {/* Image & Badge */}
                <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/assets/medical/spine_disc.webp';
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-primary-900/80 backdrop-blur-md text-gold-300 text-[10px] font-black border border-gold-400/30">
                      {product.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400">({product.reviewsCount})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => setSelectedProduct(product)}
                      className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug hover:text-primary-600 dark:hover:text-secondary-400 cursor-pointer line-clamp-2 mb-2"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-base font-black text-primary-700 dark:text-secondary-400">
                        {product.priceYER.toLocaleString()} <span className="text-xs font-normal">ريال</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ما يعادل ~ ${product.priceUSD}
                      </div>
                    </div>

                    {cart.find(i => i.product.id === product.id) ? (
                      <div className="flex items-center gap-1 bg-primary-50 dark:bg-primary-950/60 p-1 rounded-2xl border border-primary-200 dark:border-primary-800">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, -1)}
                          className="w-7 h-7 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors shadow-xs"
                          title="تقليل أو حذف من السلة"
                        >
                          {cart.find(i => i.product.id === product.id)?.quantity === 1 ? (
                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                          ) : (
                            <Minus className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <span className="w-5 text-center text-xs font-bold font-mono text-primary-700 dark:text-secondary-400">
                          {cart.find(i => i.product.id === product.id)?.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, 1)}
                          className="w-7 h-7 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors shadow-xs"
                          title="زيادة الكمية"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedProduct(product);
                            setModalQuantity(1);
                          }}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all"
                        >
                          تحديد كمية
                        </button>
                        <button
                          type="button"
                          onClick={() => addToCart(product, 1)}
                          className="p-2.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-600/20 active:scale-95 transition-all"
                          title="إضافة قطعة واحدة إلى السلة"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Floating Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 max-w-md w-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left">
            {/* Cart Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white shadow-xs p-0.5 shrink-0">
                  <img src="/assets/nodisc_photo.jpg" alt="شعار نوديسك" className="w-full h-full object-contain rounded-lg" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                    سلة متجر نوديسك ({cartTotalItems})
                  </h3>
                  <span className="text-[10px] text-slate-400">مستلزمات ودعامات طبية معتمدة</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button 
                    onClick={clearCart}
                    className="text-xs font-bold text-red-500 hover:text-red-700 dark:hover:text-red-400 px-2.5 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-1 transition-colors"
                    title="حذف جميع المنتجات من السلة"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>إفراغ السلة</span>
                  </button>
                )}
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="p-5 flex-1 overflow-y-auto space-y-3.5">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-slate-400 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                    <ShoppingCart className="w-8 h-8 opacity-40" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">السلة فارغة حالياً</p>
                    <p className="text-xs text-slate-400 mt-1">تصفح المنتجات وأضف ما تحتاجه للشفاء والتأهيل.</p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 px-5 py-2.5 rounded-2xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    تصفح منتجات المتجر
                  </button>
                </div>
              ) : (
                cart.map((item) => {
                  const prod = item.product || item;
                  const qty = item.quantity || 1;
                  return (
                    <div 
                      key={prod.id} 
                      className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                    >
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="w-14 h-14 rounded-xl object-cover shrink-0 bg-white"
                        onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">{prod.name}</h4>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {prod.priceYER.toLocaleString()} ريال للقطعة
                        </div>
                        <div className="text-xs font-black text-primary-600 dark:text-secondary-400 mt-1">
                          الإجمالي: {(prod.priceYER * qty).toLocaleString()} ريال
                        </div>
                      </div>

                      {/* Quantity Controls & Delete Action */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        {/* Remove item button */}
                        <button
                          onClick={() => removeFromCart(prod.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                          title="حذف هذا المنتج من السلة"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>

                        {/* Plus / Minus Buttons */}
                        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-700 px-1 py-0.5 rounded-xl border border-slate-200 dark:border-slate-600 shadow-xs">
                          <button 
                            onClick={() => updateQuantity(prod.id, -1)}
                            className="w-6 h-6 rounded-lg text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 text-xs transition-colors"
                            title="تقليل الكمية"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold font-mono w-5 text-center text-slate-900 dark:text-white">{qty}</span>
                          <button 
                            onClick={() => updateQuantity(prod.id, 1)}
                            className="w-6 h-6 rounded-lg text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 text-xs transition-colors"
                            title="زيادة الكمية"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">المجموع الإجمالي:</span>
                  <div className="text-right">
                    <div className="text-lg font-black text-primary-700 dark:text-secondary-400">
                      {cartTotalYER.toLocaleString()} ريال
                    </div>
                    <div className="text-[10px] text-slate-400">
                      التوصيل متوفر في صنعاء والمحافظات
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary-700 to-secondary-500 hover:from-primary-800 hover:to-secondary-600 text-white font-black text-sm shadow-lg shadow-primary-700/20 active:scale-95 transition-all"
                  >
                    متابعة الشراء وإتمام الطلب ({cartTotalItems} قطع)
                  </button>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    مواصلة التسوق
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Prescription Upload Modal (الروشتة الطبية) */}
      {isPrescriptionModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm"
            onClick={() => setIsPrescriptionModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gold-400/20 text-gold-500 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  طلب الدواء والمستلزمات عبر الوصفة الطبية (الروشتة)
                </h3>
              </div>
              <button 
                onClick={() => setIsPrescriptionModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content Based on Stage */}
            <div className="p-6">
              {prescriptionStage === 'form' && (
                <form onSubmit={handlePrescriptionSubmit} className="space-y-4">
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    قم بإرفاق صورة الروشتة التي كتبها الدكتور محمد الجرباني أو أي وصفة طبية أخرى، وسيقوم صيدلي نوديسك بمطابقتها مع المخزون وإرسال التسعيرة وتفاصيل التوصيل.
                  </p>

                  {/* File Upload Box */}
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-primary-500 rounded-2xl p-6 text-center cursor-pointer bg-slate-50 dark:bg-slate-800/40 transition-colors">
                    <UploadCloud className="w-10 h-10 text-primary-500 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      اضغط لاختيار صورة الروشتة من جهازك أو كاميرا الهاتف
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, JPEG حتى 10 ميجابايت</p>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setPrescriptionData(prev => ({ ...prev, imageName: e.target.files[0].name }));
                        }
                      }}
                      className="hidden" 
                      id="rx-upload"
                    />
                    <label 
                      htmlFor="rx-upload"
                      className="mt-3 inline-block px-4 py-1.5 rounded-xl bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-xs font-bold cursor-pointer"
                    >
                      {prescriptionData.imageName ? `تم اختيار: ${prescriptionData.imageName}` : 'اختيار ملف / التقاط صورة'}
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">اسم المريض *</label>
                      <input 
                        type="text"
                        required
                        value={prescriptionData.patientName}
                        onChange={(e) => setPrescriptionData(prev => ({ ...prev, patientName: e.target.value }))}
                        placeholder="مثال: أحمد عبد الله"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">رقم الهاتف / الواتساب *</label>
                      <input 
                        type="tel"
                        required
                        value={prescriptionData.phone}
                        onChange={(e) => setPrescriptionData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="77XXXXXXX"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">المدينة / عنوان التوصيل *</label>
                    <input 
                      type="text"
                      required
                      value={prescriptionData.city}
                      onChange={(e) => setPrescriptionData(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="صنعاء - شارع تعز / أو المحافظة"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">ملاحظات إضافية للصيدلاني</label>
                    <textarea 
                      rows={2}
                      value={prescriptionData.notes}
                      onChange={(e) => setPrescriptionData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="أية أدوية بديلة تقبلها أو تفاصيل عن المقاس للمشدات..."
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-700 to-secondary-500 text-white font-bold text-xs shadow-md shadow-primary-700/20 active:scale-95 transition-all"
                  >
                    إرسال الروشتة للمراجعة الفورية
                  </button>
                </form>
              )}

              {prescriptionStage === 'uploading' && (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm font-bold text-slate-800 dark:text-white">جاري رفع الروشتة وإحالتها لصيدلي نوديسك...</p>
                  <p className="text-xs text-slate-400">يرجى الانتظار ثوانٍ معدودة</p>
                </div>
              )}

              {prescriptionStage === 'pharmacist_reviewed' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>تمت مراجعة الروشتة وتحديد الأصناف من قبل صيدلي نوديسك بنجاح!</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      الصيدلاني المناوب: د. صيدلي مركز نوديسك • الروشتة برقم ملف: NOD-RX-884
                    </p>
                  </div>

                  <div className="space-y-2 border rounded-2xl p-4 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">الأصناف المجهزة والمتاحة في وصفتك:</h4>
                    <div className="flex justify-between text-xs py-1 border-b border-slate-200 dark:border-slate-700">
                      <span>1. مشد قطني تخصصي لدعم الديسك (مقاس L)</span>
                      <span className="font-bold">28,000 ريال</span>
                    </div>
                    <div className="flex justify-between text-xs py-1 border-b border-slate-200 dark:border-slate-700">
                      <span>2. مركب فيتامين B فورت للأعصاب (علبة 60 كبسولة)</span>
                      <span className="font-bold">8,500 ريال</span>
                    </div>
                    <div className="flex justify-between text-xs py-1 border-b border-slate-200 dark:border-slate-700">
                      <span>3. كمادة علاجية باردة/حارة لفقرات الظهر</span>
                      <span className="font-bold">7,000 ريال</span>
                    </div>
                    <div className="flex justify-between text-xs pt-2 font-black text-primary-700 dark:text-secondary-400">
                      <span>إجمالي الوصفة الطبية:</span>
                      <span>43,500 ريال يمني</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setPrescriptionStage('confirmed')}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
                    >
                      تأكيد الطلب وبدء التوصيل فوراً
                    </button>
                    <button
                      onClick={() => setIsPrescriptionModalOpen(false)}
                      className="px-4 py-3 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              )}

              {prescriptionStage === 'confirmed' && (
                <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white">تم تأكيد طلب وصفتك بنجاح!</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                    تم إحالة الطلب لقسم التجهيز والتوصيل، وسيتواصل معك مندوب صيدلية نوديسك على الرقم ({prescriptionData.phone || '77XXXXXXX'}) قبل التحرك للتسليم.
                  </p>
                  <button
                    onClick={() => setIsPrescriptionModalOpen(false)}
                    className="px-6 py-2.5 rounded-xl bg-primary-700 text-white text-xs font-bold"
                  >
                    حسناً، تم
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Checkout Modal (إتمام الطلب) */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={() => setIsCheckoutOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 z-10 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white shadow-xs p-0.5 shrink-0">
                  <img src="/assets/nodisc_photo.jpg" alt="شعار نوديسك" className="w-full h-full object-contain rounded-lg" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">إتمام طلب الشراء والتوصيل</h3>
                  <span className="text-[11px] text-slate-400">متجر نوديسك الطبي — توصيل سريع</span>
                </div>
              </div>
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selected Products Preview inside Checkout with Delete Action */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>أصناف الطلب ({cart.length}):</span>
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-[10px] text-red-500 hover:text-red-700 flex items-center gap-1 font-bold"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>حذف الكل</span>
                  </button>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-4 text-xs text-slate-400 space-y-2">
                  <p>تم إفراغ السلة بالكامل، ولا يوجد منتجات لتأكيدها.</p>
                  <button
                    type="button"
                    onClick={() => setIsCheckoutOpen(false)}
                    className="px-4 py-2 rounded-xl bg-primary-700 text-white font-bold text-xs"
                  >
                    العودة للمتجر للتسوق
                  </button>
                </div>
              ) : (
                <div className="max-h-36 overflow-y-auto space-y-1.5 divide-y divide-slate-100 dark:divide-slate-700/60 pr-1">
                  {cart.map((item) => {
                    const prod = item.product || item;
                    const qty = item.quantity || 1;
                    return (
                      <div key={prod.id} className="pt-1.5 first:pt-0 flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2 truncate flex-1 min-w-0">
                          <span className="font-bold text-slate-800 dark:text-slate-200 truncate">{prod.name}</span>
                          <span className="text-[11px] font-mono font-black text-primary-600 dark:text-secondary-400 shrink-0">×{qty}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-[11px] font-bold text-slate-600 dark:text-slate-300">
                            {(prod.priceYER * qty).toLocaleString()} ريال
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFromCart(prod.id)}
                            className="p-1 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                            title="حذف هذا المنتج من الطلب"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <form onSubmit={handleCheckoutSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">الاسم الكامل *</label>
                  <input 
                    required 
                    type="text" 
                    value={checkoutData.name}
                    onChange={(e) => setCheckoutData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="اسم المستلم" 
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">رقم الهاتف للتواصل *</label>
                  <input 
                    required 
                    type="tel" 
                    value={checkoutData.phone}
                    onChange={(e) => setCheckoutData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="77XXXXXXX أو 78XXXXXXX" 
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">المحافظة والمدينة *</label>
                  <select 
                    value={checkoutData.city}
                    onChange={(e) => setCheckoutData(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                  >
                    <option value="صنعاء (توصيل سريع خلال ساعات)">صنعاء (توصيل سريع خلال ساعات)</option>
                    <option value="عدن">عدن</option>
                    <option value="تعز">تعز</option>
                    <option value="إب">إب</option>
                    <option value="الحديدة">الحديدة</option>
                    <option value="حضرموت / المكلا">حضرموت / المكلا</option>
                    <option value="بقية المحافظات">بقية المحافظات</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">العنوان بالتفصيل *</label>
                  <input 
                    required 
                    type="text" 
                    value={checkoutData.address}
                    onChange={(e) => setCheckoutData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="الشارع، الحي، أقرب معلم بارز" 
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    طريقة الدفع وتأكيد الحساب *
                  </label>

                  {/* Dropdown Menu for Payment Method */}
                  <select 
                    value={checkoutData.paymentMethod === 'cod' ? 'cod' : 'wallet'}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'cod') {
                        setCheckoutData(prev => ({ ...prev, paymentMethod: 'cod' }));
                      } else {
                        setCheckoutData(prev => ({ ...prev, paymentMethod: selectedWalletId || 'kuraimi' }));
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-secondary-500 shadow-xs mb-3"
                  >
                    <option value="cod">💵 نقدًا عند التسليم (الدفع عند الاستلام)</option>
                    <option value="wallet">💳 محافظ إلكترونية وتحويل بنكي</option>
                  </select>

                  {/* If Cash on Delivery is selected */}
                  {checkoutData.paymentMethod === 'cod' && (
                    <div className="p-3.5 rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 space-y-1 animate-in fade-in-50">
                      <div className="flex items-center gap-2">
                        <span className="text-base">💵</span>
                        <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-100">
                          الدفع نقدًا عند التسليم (Cash on Delivery)
                        </h4>
                      </div>
                      <p className="text-[11px] text-emerald-800 dark:text-emerald-300 pr-6 leading-relaxed">
                        يتم تسليم المنتجات إليك أولاً وفحصها، ثم تدفع كامل المبلغ لمندوب التوصيل يداً بيد.
                      </p>
                    </div>
                  )}

                  {/* If Electronic Wallets is selected */}
                  {checkoutData.paymentMethod !== 'cod' && (
                    <div className="space-y-2.5 animate-in fade-in-50 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-secondary-500" />
                          <span>اختر المحفظة الإلكترونية التي ترغب بالتحويل عبرها:</span>
                        </span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                          بدون عمولة تحويل
                        </span>
                      </div>

                      {/* Wallets Grid with Circular Icons */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {walletOptions.map((wallet) => {
                          const isSelected = checkoutData.paymentMethod === wallet.id;
                          return (
                            <button
                              type="button"
                              key={wallet.id}
                              onClick={() => {
                                setSelectedWalletId(wallet.id);
                                setCheckoutData(prev => ({ ...prev, paymentMethod: wallet.id }));
                              }}
                              className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center relative group ${
                                isSelected
                                  ? `${wallet.colorBorder} ${wallet.colorBg} shadow-md scale-[1.02] ring-2 ring-offset-1 ${wallet.colorRing}`
                                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/70 hover:border-slate-300 dark:hover:border-slate-700'
                              }`}
                            >
                              {isSelected && (
                                <span className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-xs">
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </span>
                              )}

                              {/* Circular Icon designed from the provided images */}
                              <div className="w-12 h-12 rounded-full p-0.5 bg-white shadow-md border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden mb-1.5 group-hover:scale-105 transition-transform">
                                <img 
                                  src={wallet.logo} 
                                  alt={wallet.name}
                                  className="w-full h-full object-cover rounded-full"
                                />
                              </div>

                              <h5 className="text-[11px] font-black text-slate-900 dark:text-white leading-tight">
                                {wallet.name}
                              </h5>
                              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5 font-bold" dir="ltr">
                                {wallet.account}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Selected Wallet Detail & Copy Card */}
                      {(() => {
                        const selectedWallet = walletOptions.find(w => w.id === checkoutData.paymentMethod) || walletOptions[0];
                        return (
                          <div className={`p-4 rounded-2xl border-2 ${selectedWallet.colorBorder} ${selectedWallet.colorBg} space-y-2.5 mt-2 animate-in fade-in-50`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="w-11 h-11 rounded-full p-0.5 bg-white shadow-sm border-2 border-slate-200 dark:border-slate-700 overflow-hidden flex-shrink-0">
                                  <img src={selectedWallet.logo} alt={selectedWallet.name} className="w-full h-full object-cover rounded-full" />
                                </div>
                                <div>
                                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">المحفظة المختارة للتحويل:</span>
                                  <h4 className="text-xs font-black text-slate-900 dark:text-white">{selectedWallet.name} — {selectedWallet.subtitle}</h4>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(selectedWallet.account);
                                  setCopiedAccount(true);
                                  setTimeout(() => setCopiedAccount(false), 2000);
                                }}
                                className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-[11px] font-bold hover:bg-slate-50 flex items-center gap-1 shadow-xs transition-all active:scale-95"
                              >
                                {copiedAccount ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    <span className="text-emerald-600 font-bold">تم النسخ!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>نسخ الرقم</span>
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
                                <span className="text-slate-600 dark:text-slate-400">اسم المستفيد:</span>
                                <span className="font-bold text-slate-900 dark:text-white">{selectedWallet.owner}</span>
                              </div>
                            </div>

                            <div className="text-[10px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5 leading-relaxed bg-white/40 dark:bg-slate-900/40 p-2 rounded-xl">
                              <span className="text-amber-500 font-bold shrink-0">💡 تعليمات التحويل:</span>
                              <span>يرجى تحويل مبلغ الفاتورة إلى الرقم الموضح أعلاه، ثم إرسال صورة إشعار التحويل عبر الواتساب (772070207) لتجهيز وشحن طلبك فوراً.</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-950/40 text-xs text-primary-900 dark:text-primary-200 mt-2 flex justify-between items-center">
                  <span>إجمالي الفاتورة:</span>
                  <strong className="text-sm font-black">{cartTotalYER.toLocaleString()} ريال يمني</strong>
                </div>

                {/* Confirm & Cancel Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-primary-700 to-secondary-500 hover:from-primary-800 hover:to-secondary-600 text-white font-black text-xs shadow-md active:scale-95 transition-all"
                  >
                    تأكيد الطلب النهائي
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCheckoutOpen(false)}
                    className="px-5 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all"
                  >
                    إلغاء والتراجع
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Order Success Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={() => setOrderSuccess(null)} />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 text-center space-y-4 z-10 animate-in zoom-in-95 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white shadow-md mx-auto p-1">
              <img src="/assets/nodisc_photo.jpg" alt="شعار نوديسك" className="w-full h-full object-contain rounded-xl" />
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto -mt-6 shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-black text-lg text-slate-900 dark:text-white">تم استلام طلب الشراء بنجاح!</h3>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-right">
              <p>رقم الطلب: <strong className="font-mono text-primary-600 dark:text-secondary-400 font-bold" dir="ltr">{orderSuccess.code}</strong></p>
              <p>المستلم: <strong>{orderSuccess.name}</strong> ({orderSuccess.phone})</p>
              <p>عنوان التوصيل: <strong>{orderSuccess.address}</strong></p>
              <div className="flex items-center gap-2 pt-0.5">
                <span>طريقة الدفع:</span>
                {orderSuccess.paymentMethodKey && orderSuccess.paymentMethodKey !== 'cod' && walletOptions.find(w => w.id === orderSuccess.paymentMethodKey) ? (
                  <span className="inline-flex items-center gap-1.5 font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-700 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-600">
                    <img 
                      src={walletOptions.find(w => w.id === orderSuccess.paymentMethodKey)?.logo} 
                      alt="" 
                      className="w-4 h-4 rounded-full object-cover" 
                    />
                    <span>{orderSuccess.payment}</span>
                  </span>
                ) : (
                  <strong>{orderSuccess.payment}</strong>
                )}
              </div>
              <p>الإجمالي: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{orderSuccess.total.toLocaleString()} ريال</strong></p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a
                href={`https://wa.me/967772070207?text=${encodeURIComponent(`السلام عليكم، قمت بطلب من متجر نوديسك:\nرقم الطلب: ${orderSuccess.code}\nالمستلم: ${orderSuccess.name}\nالهاتف: ${orderSuccess.phone}\nالعنوان: ${orderSuccess.address}\nطريقة الدفع: ${orderSuccess.payment}\nالإجمالي: ${orderSuccess.total.toLocaleString()} ريال يمني\nالمنتجات:\n${orderSuccess.items}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <span>إرسال الفاتورة عبر الواتساب</span>
              </a>
              <button
                onClick={() => setOrderSuccess(null)}
                className="py-3 px-5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-in zoom-in-95 my-8">
            <div className="relative aspect-[16/9] bg-slate-100 dark:bg-slate-800">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 left-4 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full bg-primary-900/90 text-gold-300 text-xs font-bold">
                  {selectedProduct.badge}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                  {selectedProduct.name}
                </h3>
                <div className="text-lg font-black text-primary-700 dark:text-secondary-400 mt-1">
                  {selectedProduct.priceYER.toLocaleString()} ريال <span className="text-xs text-slate-400 font-normal">(~${selectedProduct.priceUSD})</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedProduct.fullDesc}
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">دواعي الاستخدام الطبية:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {selectedProduct.indications.map((ind, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-secondary-500 shrink-0" />
                      <span>{ind}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Selector Before Adding to Cart */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    تحديد الكمية المطلوبة:
                  </span>
                  <span className="text-[11px] text-slate-400">
                    الإجمالي: {(selectedProduct.priceYER * modalQuantity).toLocaleString()} ريال
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setModalQuantity(prev => Math.max(1, prev - 1))}
                    className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 flex items-center justify-center font-bold hover:bg-slate-100 dark:hover:bg-slate-600 active:scale-95 transition-all"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-sm text-slate-900 dark:text-white">
                    {modalQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setModalQuantity(prev => prev + 1)}
                    className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 flex items-center justify-center font-bold hover:bg-slate-100 dark:hover:bg-slate-600 active:scale-95 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    addToCart(selectedProduct, modalQuantity);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-primary-700 to-secondary-500 hover:from-primary-800 hover:to-secondary-600 text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>
                    إضافة {modalQuantity > 1 ? `(${modalQuantity} قطع)` : ''} إلى سلة الشراء — {(selectedProduct.priceYER * modalQuantity).toLocaleString()} ريال
                  </span>
                </button>
                <a
                  href={`https://wa.me/967772070207?text=${encodeURIComponent(`مرحباً، أود الاستفسار عن توفر: ${selectedProduct.name} (الكمية: ${modalQuantity})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>استفسار واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
