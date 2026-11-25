import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Home, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { storeProducts } from '../../data/storeProducts';
import StoreProductCard from '../../components/store/StoreProductCard';

export default function StoreOffersPage() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const offers = storeProducts.filter((p) => p.discountPercent && p.discountPercent > 0);

  return (
    <div className="space-y-8 pb-16">
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link to="/store" className="hover:text-primary-600 inline-flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>{isAr ? 'رئيسية المتجر' : 'Store Home'}</span>
          </Link>
          <span>/</span>
          <span className="font-bold text-rose-600">{isAr ? 'العروض والتخفيضات' : 'Offers & Discounts'}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-rose-950 to-primary-950 text-white p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-black">
              <Tag className="w-3.5 h-3.5" />
              <span>{isAr ? `${offers.length} عروض سارية` : `${offers.length} Active Deals`}</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black">
              {isAr ? 'العروض والتخفيضات الحصرية' : 'Exclusive Offers & Discounts'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {isAr
                ? 'وفّر حتى 25% على المستلزمات الطبية وأجهزة العلاج الطبيعي المعتمدة.'
                : 'Save up to 25% on certified medical supplies and physiotherapy devices.'}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-gold-300 text-xs font-bold border border-white/15">
            <Clock className="w-4 h-4" />
            <span>{isAr ? 'لفترة محدودة أو حتى نفاذ الكمية' : 'Limited Time Offer'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((prod) => (
            <StoreProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
