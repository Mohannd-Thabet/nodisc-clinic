import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Tag,
  Clock,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  Layers,
  Grid,
  Heart,
  UploadCloud,
  Sparkles,
  Home,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import {
  storeCategories,
  storeSubCategories,
  storeProducts,
} from '../../data/storeProducts';
import SequentialCarousel from '../../components/common/SequentialCarousel';
import StoreMainSectionsBar from '../../components/store/StoreMainSectionsBar';
import StoreMainGroupCard from '../../components/store/StoreMainGroupCard';

export default function StoreHomePage() {
  const { lang, isRtl } = useLanguage();
  const { formatPrice, wishlistCount } = useStore();
  const { addToCart, openCart, cartCount } = useCart();
  const isAr = lang === 'ar';

  const [selectedSection, setSelectedSection] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState(() =>
    storeCategories.reduce((acc, c) => ({ ...acc, [c.id]: true }), {})
  );
  const [subCategoryBySection, setSubCategoryBySection] = useState({});

  const offerProducts = useMemo(
    () => storeProducts.filter((p) => p.discountPercent && p.discountPercent > 0),
    []
  );

  const visibleSections = useMemo(() => {
    if (selectedSection === 'all') return storeCategories;
    return storeCategories.filter((c) => c.id === selectedSection);
  }, [selectedSection]);

  const toggleSectionExpand = (id) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Breadcrumbs */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-primary-600 inline-flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>{isAr ? 'المركز الطبي' : 'Medical Center'}</span>
          </Link>
          <span>/</span>
          <span className="font-bold text-primary-700 dark:text-secondary-400">
            {isAr ? 'متجر نوديسك الصيدلاني' : 'NODISC Pharmacy Store'}
          </span>
        </div>
      </div>

      {/* 1. Offers & Discounts Carousel at the very top of /store */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-primary-950 to-slate-900 text-white p-6 sm:p-8 lg:p-10 shadow-2xl border border-primary-800/50 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Offers Header */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl sm:text-3xl font-black text-white">
                    {isAr ? 'أحدث العروض والتخفيضات' : 'Latest Offers & Discounts'}
                  </h1>
                  <span className="px-3 py-1 rounded-full bg-gold-400 text-slate-950 text-xs font-black">
                    {isAr ? `${offerProducts.length} عروض` : `${offerProducts.length} Offers`}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {isAr
                    ? 'خصومات حصرية على الدعامات الطبية وأجهزة التأهيل والمكملات العصبية لفترة محدودة.'
                    : 'Exclusive discounts on spinal braces, rehab equipment, and neuro supplements.'}
                </p>
              </div>
            </div>

            <Link
              to="/store/offers"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-extrabold text-xs shadow-lg transition-all self-start sm:self-auto shrink-0"
            >
              <span>{isAr ? 'عرض العروض' : 'View All Offers'}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </div>

          {/* Offers Sequential Carousel (3.5s auto-slide, 3/2/1 cards, circular arrows, bottom dots, no pause button) */}
          <div className="relative z-10">
            <SequentialCarousel
              items={offerProducts}
              autoPlayInterval={3500}
              slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
              dotActiveClass="bg-gold-400 w-6"
              dotInactiveClass="bg-white/30 w-2"
              arrowClass="bg-slate-900/90 text-white border-white/20 hover:bg-gold-400 hover:text-slate-950 hover:border-gold-400"
              renderItem={(prod) => {
                const mainCat = storeCategories.find((c) => c.id === prod.category);
                const subCat = storeSubCategories.find((s) => s.id === prod.subCategory);
                return (
                  <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl overflow-hidden border border-white/15 shadow-xl flex flex-col h-full">
                    <Link to={`/store/product/${prod.slug}`} className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800 block group">
                      <img
                        src={prod.image}
                        alt={isAr ? prod.name : prod.nameEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
                      />
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-black shadow-lg">
                        -{prod.discountPercent}%
                      </span>
                      {prod.offerEndDate && (
                        <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950/80 text-gold-300 text-[10px] font-bold backdrop-blur-sm">
                          <Clock className="w-3 h-3" />
                          <span>{isAr ? `ينتهي: ${prod.offerEndDate}` : `Ends: ${prod.offerEndDate}`}</span>
                        </span>
                      )}
                    </Link>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-bold text-primary-600 dark:text-secondary-400 truncate">
                          {mainCat ? (isAr ? mainCat.name : mainCat.nameEn) : ''}
                          {subCat ? ` · ${isAr ? subCat.name : subCat.nameEn}` : ''}
                        </div>
                        <Link to={`/store/product/${prod.slug}`}>
                          <h3 className="font-extrabold text-xs sm:text-sm line-clamp-2 hover:text-primary-700 dark:hover:text-secondary-400 transition-colors">
                            {isAr ? prod.name : prod.nameEn || prod.name}
                          </h3>
                        </Link>
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                        <div>
                          <div className="font-black text-base text-emerald-600 dark:text-emerald-400">
                            {formatPrice(prod.priceYER, prod.priceUSD)}
                          </div>
                          {prod.originalPriceYER && (
                            <div className="text-[11px] text-slate-400 line-through">
                              {formatPrice(prod.originalPriceYER, prod.originalPriceUSD)}
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            addToCart(prod, 1, prod.options?.[0] || null);
                            openCart();
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md active:scale-95 transition-all"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>{isAr ? 'أضف للسلة' : 'Add to Cart'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </div>
      </section>

      {/* 2. Prominent Main Sections Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StoreMainSectionsBar
          selectedSection={selectedSection}
          onSelectSection={setSelectedSection}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showSearchInput={true}
        />
      </section>

      {/* 3. Collapsible Main Section Cards with Sub-Categories & Product Grids */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {visibleSections.map((section) => (
          <StoreMainGroupCard
            key={section.id}
            section={section}
            activeSub={subCategoryBySection[section.id] || 'all'}
            onSelectSubCategory={(subId) =>
              setSubCategoryBySection((prev) => ({ ...prev, [section.id]: subId }))
            }
            searchQuery={searchQuery}
            isExpanded={expandedSections[section.id] !== false}
            onToggleExpand={() => toggleSectionExpand(section.id)}
            hideGroupHeader={selectedSection !== 'all'}
          />
        ))}

        {/* All Products CTA Button (only shown when viewing All Sections) */}
        {selectedSection === 'all' && (
          <div className="text-center pt-4">
            <Link
              to="/store/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-700 to-emerald-600 hover:from-primary-800 hover:to-emerald-700 text-white font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <Grid className="w-5 h-5 text-gold-300" />
              <span>{isAr ? 'جميع المنتجات' : 'All Products'}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </div>
        )}
      </section>

      {/* 4. Moved Old Intro Box BELOW "جميع المنتجات" Button */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-primary-900 via-primary-800 to-emerald-900 text-white p-8 sm:p-10 shadow-xl border border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-gold-300 text-xs font-bold border border-white/15">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? 'متجر صيدلية نوديسك التخصصي' : 'NODISC Specialized Pharmacy Store'}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                {isAr ? 'متجر صيدلية نوديسك' : 'NODISC Pharmacy Store'}
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed">
                {isAr
                  ? 'مستلزمات ودعامات طبية أصلية للعمود الفقري والأعصاب، أجهزة تأهيل منزلي، ومكملات صيدلانية موصوفة بإشراف د. محمد الجرباني.'
                  : 'Authentic spine & nerve medical supports, home rehab devices, and neuro supplements supervised by Dr. Al-Jarbani.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/store/offers"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow transition-colors"
              >
                <Tag className="w-4 h-4" />
                <span>{isAr ? `العروض (${offerProducts.length})` : `Offers (${offerProducts.length})`}</span>
              </Link>

              <Link
                to="/store/wishlist"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
              >
                <Heart className="w-4 h-4 text-rose-300" />
                <span>{isAr ? `المفضلة (${wishlistCount})` : `Wishlist (${wishlistCount})`}</span>
              </Link>

              <Link
                to="/store/prescription"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-extrabold text-xs shadow transition-colors"
              >
                <UploadCloud className="w-4 h-4" />
                <span>{isAr ? 'طلب بصورة وصفة' : 'Upload Rx'}</span>
              </Link>

              <button
                type="button"
                onClick={openCart}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{isAr ? `السلة (${cartCount})` : `Cart (${cartCount})`}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
