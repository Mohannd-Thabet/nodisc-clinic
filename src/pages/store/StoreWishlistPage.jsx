import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Heart, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useStore } from '../../context/StoreContext';
import { storeProducts } from '../../data/storeProducts';
import StoreProductCard from '../../components/store/StoreProductCard';

export default function StoreWishlistPage() {
  const { lang } = useLanguage();
  const { wishlist } = useStore();
  const isAr = lang === 'ar';

  const savedProducts = storeProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div className="space-y-8 pb-16">
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link to="/store" className="hover:text-primary-600 inline-flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>{isAr ? 'رئيسية المتجر' : 'Store Home'}</span>
          </Link>
          <span>/</span>
          <span className="font-bold text-rose-600">{isAr ? 'المفضلة' : 'Wishlist'}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center gap-3">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            {isAr ? `المنتجات المفضلة (${savedProducts.length})` : `Saved Wishlist (${savedProducts.length})`}
          </h1>
        </div>

        {savedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedProducts.map((prod) => (
              <StoreProductCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
            <Heart className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              {isAr ? 'لم تقم بحفظ أي منتجات في المفضلة بعد' : 'No products saved in your wishlist yet.'}
            </p>
            <Link
              to="/store"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary-700 text-white font-bold text-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isAr ? 'تصفح منتجات المتجر' : 'Browse Store Products'}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
