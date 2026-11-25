import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Home,
  Heart,
  Star,
  ShoppingCart,
  CheckCircle2,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  Clock,
  MessageSquare,
  Send,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import {
  storeCategories,
  storeSubCategories,
  storeProducts,
  getProductBySlugOrId,
} from '../../data/storeProducts';
import SequentialCarousel from '../../components/common/SequentialCarousel';
import StoreProductCard from '../../components/store/StoreProductCard';

export default function StoreProductDetailPage() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const { formatPrice, toggleWishlist, isInWishlist } = useStore();
  const { addToCart, openCart } = useCart();
  const isAr = lang === 'ar';

  const product = getProductBySlugOrId(slug) || storeProducts[0];

  const [selectedOption, setSelectedOption] = useState(product?.options?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const [customReviewsMap, setCustomReviewsMap] = useState(() => {
    try {
      const saved = localStorage.getItem('nodisc_product_reviews_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const userReviews = customReviewsMap[product.id] || [];
  const allReviews = [...userReviews, ...(product.reviews || [])];
  const liveReviewsCount = (product.reviewsCount || 0) + userReviews.length;
  const liveRating = useMemo(() => {
    if (userReviews.length === 0) return product.rating;
    const baseTotal = (product.rating || 5) * (product.reviewsCount || 1);
    const addedTotal = userReviews.reduce((s, r) => s + r.rating, 0);
    return Number(((baseTotal + addedTotal) / ((product.reviewsCount || 1) + userReviews.length)).toFixed(1));
  }, [product.rating, product.reviewsCount, userReviews]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;
    const newRev = {
      id: `rev-${Date.now()}`,
      author: reviewAuthor.trim(),
      rating: reviewRating,
      date: new Date().toISOString().slice(0, 10),
      comment: reviewComment.trim(),
    };
    const nextMap = {
      ...customReviewsMap,
      [product.id]: [newRev, ...(customReviewsMap[product.id] || [])],
    };
    setCustomReviewsMap(nextMap);
    try {
      localStorage.setItem('nodisc_product_reviews_v1', JSON.stringify(nextMap));
    } catch {
      // ignore storage errors
    }
    setReviewAuthor('');
    setReviewRating(5);
    setReviewComment('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  // Auto-scroll to top when navigating to any product page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSelectedOption(product?.options?.[0] || null);
    setQuantity(1);
  }, [slug, product?.id]);

  // Related products sorted by priority (up to 8):
  // 1. Same subCategory
  // 2. Same main category
  // 3. Complementary sections
  // 4. In-stock & featured
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return storeProducts
      .filter((p) => p.id !== product.id)
      .sort((a, b) => {
        const score = (p) => {
          let s = 0;
          if (p.subCategory === product.subCategory) s += 1000;
          else if (p.category === product.category) s += 500;
          else s += 100; // complementary section
          if (p.inStock) s += 50;
          if (p.featured) s += 20;
          return s;
        };
        return score(b) - score(a);
      })
      .slice(0, 8);
  }, [product]);

  const mainCat = storeCategories.find((c) => c.id === product.category);
  const subCat = storeSubCategories.find((s) => s.id === product.subCategory);
  const wished = isInWishlist(product.id);

  const scrollToReviews = () => {
    const el = document.getElementById('reviews-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Breadcrumbs */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link to="/store" className="hover:text-primary-600 inline-flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>{isAr ? 'رئيسية المتجر' : 'Store Home'}</span>
          </Link>
          <span>/</span>
          {mainCat && (
            <>
              <Link to={`/store/categories?section=${mainCat.id}`} className="hover:text-primary-600">
                {isAr ? mainCat.name : mainCat.nameEn}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="font-bold text-primary-700 dark:text-secondary-400 truncate max-w-xs">
            {isAr ? product.name : product.nameEn || product.name}
          </span>
        </div>
      </div>

      {/* Product Main Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Image Gallery (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 aspect-square">
              <img
                src={product.image}
                alt={isAr ? product.name : product.nameEn}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
              />

              {product.discountPercent > 0 && (
                <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-rose-600 text-white text-xs font-black shadow-lg">
                  -{product.discountPercent}%
                </span>
              )}

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label={isAr ? 'حفظ في المفضلة' : 'Save to wishlist'}
                className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
                  wished
                    ? 'bg-rose-500 text-white scale-110'
                    : 'bg-white/95 dark:bg-slate-900/95 text-slate-500 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${wished ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          {/* Product Details & Purchase Controls (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {subCat && (
                  <span className="px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-secondary-400 text-xs font-bold border border-primary-100 dark:border-primary-800">
                    {isAr ? subCat.name : subCat.nameEn}
                  </span>
                )}
                {product.badge && (
                  <span className="px-3 py-1 rounded-full bg-gold-400/20 text-gold-700 dark:text-gold-300 text-xs font-bold border border-gold-400/30">
                    {isAr ? product.badge : product.badgeEn || product.badge}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-snug">
                {isAr ? product.name : product.nameEn || product.name}
              </h1>

              {/* Clickable Star Rating */}
              <button
                type="button"
                onClick={scrollToReviews}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-primary-600 transition-colors"
              >
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="font-black text-slate-900 dark:text-white">{liveRating}</span>
                <span className="underline">
                  ({liveReviewsCount} {isAr ? 'تقييم عملاء' : 'Reviews'})
                </span>
              </button>

              {/* Price & Discount */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                    {formatPrice(product.priceYER, product.priceUSD)}
                  </span>
                  {product.originalPriceYER && (
                    <span className="text-sm text-slate-400 line-through">
                      {formatPrice(product.originalPriceYER, product.originalPriceUSD)}
                    </span>
                  )}
                </div>

                {product.offerEndDate && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                    <Clock className="w-4 h-4" />
                    <span>{isAr ? `ينتهي العرض: ${product.offerEndDate}` : `Offer ends: ${product.offerEndDate}`}</span>
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isAr ? product.fullDesc : product.fullDescEn || product.fullDesc}
              </p>

              {/* Options */}
              {product.options && product.options.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    {isAr ? 'اختر المقاس / الخيار:' : 'Select Size / Option:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedOption(opt)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedOption === opt
                            ? 'bg-primary-700 text-white border-primary-700 shadow-sm'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-primary-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="inline-flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-black text-sm w-6 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addToCart(product, quantity, selectedOption);
                    openCart();
                  }}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-primary-700 hover:from-emerald-700 hover:to-primary-800 text-white font-black text-sm shadow-xl active:scale-95 transition-all"
                >
                  <ShoppingCart className="w-5 h-5 text-gold-300" />
                  <span>{isAr ? 'أضف للسلة الآن' : 'Add to Cart'}</span>
                </button>
              </div>
            </div>

            {/* Medical Indications & Trust Badges */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
              {product.indications && product.indications.length > 0 && (
                <div>
                  <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 mb-2">
                    {isAr ? 'دواعي الاستخدام الطبي:' : 'Medical Indications:'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.indications.map((ind, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{ind}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>{isAr ? 'منتج طبي أصلي معتمد' : 'Certified Authentic Product'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-primary-500" />
                  <span>{isAr ? 'توصيل سريع بصنعاء والمحافظات' : 'Fast Nationwide Delivery'}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-primary-600 dark:text-secondary-400" />
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {isAr ? 'تقييمات العملاء والمرضى' : 'Customer & Patient Reviews'}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-amber-500">
              <Star className="w-5 h-5 fill-amber-400" />
              <span>{liveRating} / 5</span>
              <span className="text-slate-400 text-xs">({liveReviewsCount})</span>
            </div>
          </div>

          {/* Add New Rating & Comment Form */}
          <form
            onSubmit={handleReviewSubmit}
            className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                {isAr ? 'أضف تقييمك وتعليقك على المنتج' : 'Add Your Rating & Review'}
              </h3>

              {/* Interactive Star Picker */}
              <div className="flex items-center gap-1" dir="ltr">
                {[1, 2, 3, 4, 5].map((starVal) => {
                  const active = (hoverRating || reviewRating) >= starVal;
                  return (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setReviewRating(starVal)}
                      onMouseEnter={() => setHoverRating(starVal)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`${starVal} stars`}
                      className="p-0.5 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          active ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="text-xs font-bold text-amber-500 ml-1.5">{reviewRating}/5</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4">
                <input
                  required
                  type="text"
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  placeholder={isAr ? 'الاسم الكريم *' : 'Your Name *'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm outline-none focus:border-primary-500"
                />
              </div>
              <div className="sm:col-span-6">
                <input
                  required
                  type="text"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder={isAr ? 'اكتب تعليقك وتجربتك مع المنتج *' : 'Write your review and experience *'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm outline-none focus:border-primary-500"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full h-full min-h-[40px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs shadow-sm active:scale-95 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إرسال' : 'Submit'}</span>
                </button>
              </div>
            </div>

            {reviewSuccess && (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isAr ? 'تمت إضافة تقييمك وتعليقك بنجاح!' : 'Your rating and review have been added!'}</span>
              </div>
            )}
          </form>

          {allReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{rev.author}</span>
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isAr
                ? 'لا توجد تعليقات نصية مضافة بعد — التقييم العام للمنتج بناءً على المبيعات السريرية ممتاز.'
                : 'No written reviews yet — clinical customer rating is highly positive.'}
            </p>
          )}
        </div>
      </section>

      {/* Related Products Carousel (up to 8 items, 4s auto-slide, pauses on hover/focus, no pause button) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {isAr ? 'منتجات مرتبطة بهذا المنتج' : 'Related Products'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'مستلزمات وأجهزة طبية مكملة مختارة بعناية بناءً على التصنيف الطبي والاحتياج العلاجي.'
              : 'Carefully curated complementary medical supplies based on clinical category.'}
          </p>
        </div>

        <SequentialCarousel
          items={relatedProducts}
          autoPlayInterval={4000}
          slidesPerView={{ mobile: 1, tablet: 2, desktop: 4 }}
          renderItem={(relProd) => <StoreProductCard product={relProd} />}
        />
      </section>
    </div>
  );
}
