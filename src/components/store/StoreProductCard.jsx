import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { storeSubCategories } from '../../data/storeProducts';

export default function StoreProductCard({ product }) {
  const { lang } = useLanguage();
  const { formatPrice, toggleWishlist, isInWishlist } = useStore();
  const { addToCart, openCart } = useCart();
  const isAr = lang === 'ar';

  const wished = isInWishlist(product.id);
  const subCat = storeSubCategories.find((s) => s.id === product.subCategory);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.options?.[0] || null);
    openCart();
  };

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-primary-400 transition-all duration-300 flex flex-col overflow-hidden h-full">
      {/* Image + Badges + Wishlist */}
      <Link to={`/store/product/${product.slug}`} className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800 block">
        <img
          src={product.image}
          alt={isAr ? product.name : product.nameEn || product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
        />

        {/* Discount Badge */}
        {product.discountPercent > 0 && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-rose-600 text-white text-[11px] font-black shadow-md">
            -{product.discountPercent}%
          </span>
        )}

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isAr ? 'حفظ في المفضلة' : 'Save to wishlist'}
          className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-all ${
            wished
              ? 'bg-rose-500 text-white scale-110'
              : 'bg-white/90 dark:bg-slate-900/90 text-slate-500 hover:text-rose-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${wished ? 'fill-white' : ''}`} />
        </button>

        {product.badge && (
          <span className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-lg bg-slate-950/75 text-gold-300 text-[10px] font-bold backdrop-blur-sm">
            {isAr ? product.badge : product.badgeEn || product.badge}
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold text-primary-600 dark:text-secondary-400 bg-primary-50 dark:bg-primary-950/60 px-2 py-0.5 rounded-md truncate max-w-[65%]">
              {subCat ? (isAr ? subCat.name : subCat.nameEn) : product.category}
            </span>

            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <Link to={`/store/product/${product.slug}`} className="block">
            <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary-700 dark:group-hover:text-secondary-400 transition-colors leading-snug">
              {isAr ? product.name : product.nameEn || product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Quick Add */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div>
            <div className="font-black text-sm text-emerald-600 dark:text-emerald-400">
              {formatPrice(product.priceYER, product.priceUSD)}
            </div>
            {product.originalPriceYER && (
              <div className="text-[10px] text-slate-400 line-through">
                {formatPrice(product.originalPriceYER, product.originalPriceUSD)}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs shadow-sm active:scale-95 transition-all shrink-0"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-gold-300" />
            <span>{isAr ? 'أضف للسلة' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
