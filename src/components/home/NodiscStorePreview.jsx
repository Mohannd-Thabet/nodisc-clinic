import React from 'react';
import { Link } from 'react-router-dom';
import { storeProducts } from '../../data/storeProducts';
import { 
  ShoppingCart, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  Activity, 
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function NodiscStorePreview() {
  const { lang, isRtl } = useLanguage();
  const isAr = lang === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const featured = storeProducts.slice(0, 4);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title & Store CTA */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800 mb-3">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{isAr ? 'تسوق المستلزمات الطبية المعتمدة' : 'Shop Certified Medical Supplies'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {isAr ? (
              <>
                متجر <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">نوديسك الطبي</span>
              </>
            ) : (
              <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">NODISC</span> Medical Store
              </>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            {isAr
              ? 'مشدات ودعامات تخصصية، أجهزة تحفيز TENS، ووسائد ميموري فوم مع خدمة التوصيل المنزلي.'
              : 'Orthopedic braces, TENS stimulators, memory foam cushions with home delivery service.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/nodisc-store"
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>{isAr ? 'دخول المتجر بالكامل' : 'Enter Entire Store'}</span>
            <Arrow className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Two Primary Choices Preview Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Link 
          to="/nodisc-store?cat=medical-supplies"
          className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-lg hover:scale-[1.01] transition-transform relative overflow-hidden group"
        >
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider block mb-1">
                {isAr ? 'القسم الأول' : 'Category 1'}
              </span>
              <h3 className="text-xl font-black mb-1">
                {isAr ? 'مستلزمات طبية ودعامات' : 'Medical Braces & Supports'}
              </h3>
              <p className="text-xs text-blue-200 max-w-xs">
                {isAr
                  ? 'مشدات قطنية، رقابي فيلادلفيا، عكازات، وسائد ميموري فوم'
                  : 'Lumbar supports, Philadelphia collars, crutches, orthopedic pillows'}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </Link>

        <Link 
          to="/nodisc-store?cat=physio-rehab"
          className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900 to-teal-950 text-white shadow-lg hover:scale-[1.01] transition-transform relative overflow-hidden group"
        >
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block mb-1">
                {isAr ? 'القسم الثاني' : 'Category 2'}
              </span>
              <h3 className="text-xl font-black mb-1">
                {isAr ? 'أجهزة ومستلزمات التأهيل والعلاج الطبيعي' : 'Rehab & Physiotherapy Devices'}
              </h3>
              <p className="text-xs text-emerald-200 max-w-xs">
                {isAr
                  ? 'أجهزة TENS الرقمية، أحزمة شد الفقرات، كمادات حرارية وجليد'
                  : 'Digital TENS units, spinal decompression belts, hot/cold therapy'}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
          </div>
        </Link>
      </div>

      {/* 4 Featured Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((prod) => (
          <div
            key={prod.id}
            className="flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 group"
          >
            <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <img 
                src={prod.image} 
                alt={prod.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 rtl:right-3 ltr:left-3">
                <span className="px-2 py-0.5 rounded-full bg-slate-900/80 text-gold-300 text-[10px] font-bold">
                  {prod.badge}
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-2 mb-1.5">
                  {prod.name}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                  {prod.shortDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {prod.priceYER.toLocaleString()} {isAr ? 'ريال' : 'YER'}
                  </span>
                </div>
                <Link
                  to="/nodisc-store"
                  className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
