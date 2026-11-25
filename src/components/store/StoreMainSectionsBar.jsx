import React, { useRef } from 'react';
import { Layers, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { storeCategories, storeProducts } from '../../data/storeProducts';

export default function StoreMainSectionsBar({
  selectedSection,
  onSelectSection,
  searchQuery = '',
  onSearchChange,
  showSearchInput = true,
}) {
  const { lang, isRtl } = useLanguage();
  const isAr = lang === 'ar';
  const scrollRef = useRef(null);

  const scrollByAmount = (dir) => {
    if (!scrollRef.current) return;
    const amount = 260;
    scrollRef.current.scrollBy({
      left: dir * amount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-primary-100 dark:border-slate-700 shadow-xl p-5 sm:p-6 space-y-5">
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-700 to-emerald-600 text-white flex items-center justify-center shadow-md shrink-0">
            <Layers className="w-5 h-5 text-gold-300" />
          </div>
          <div>
            <h2 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
              {isAr ? 'المجموعات الرئيسية للمتجر' : 'Main Store Sections'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isAr
                ? `${storeCategories.length} مجموعات رئيسية · ${storeProducts.length} منتج طبي وصيدلاني معتمد`
                : `${storeCategories.length} Main Sections · ${storeProducts.length} Certified Products`}
            </p>
          </div>
        </div>

        {showSearchInput && onSearchChange && (
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={isAr ? 'ابحث في منتجات المتجر فوراً...' : 'Instant search store products...'}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm outline-none focus:border-primary-500 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          </div>
        )}
      </div>

      {/* Highlighted Horizontal Scroll Bar with Edge Gradients & Arrows */}
      <div className="relative bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-2 border border-slate-200 dark:border-slate-700">
        {/* Left & Right Arrow Buttons */}
        <button
          type="button"
          onClick={() => scrollByAmount(-1)}
          aria-label="Scroll Left"
          className="hidden sm:flex absolute left-1.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-600 shadow-md items-center justify-center text-slate-700 dark:text-white hover:bg-primary-600 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => scrollByAmount(1)}
          aria-label="Scroll Right"
          className="hidden sm:flex absolute right-1.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-600 shadow-md items-center justify-center text-slate-700 dark:text-white hover:bg-primary-600 hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Edge Blur / Fade Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-50 dark:from-slate-800/80 to-transparent z-10 rounded-l-2xl" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-50 dark:from-slate-800/80 to-transparent z-10 rounded-r-2xl" />

        {/* Scrollable Tabs */}
        <div
          ref={scrollRef}
          className="flex items-center gap-2.5 overflow-x-auto no-scrollbar px-2 sm:px-8 py-1 scroll-smooth"
        >
          {/* All Sections Tab */}
          <button
            type="button"
            onClick={() => onSelectSection('all')}
            className={`shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all border ${
              selectedSection === 'all'
                ? 'bg-primary-700 text-white border-primary-700 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-primary-400'
            }`}
          >
            <span>{isAr ? 'جميع المجموعات' : 'All Sections'}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                selectedSection === 'all' ? 'bg-gold-400 text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}
            >
              {storeProducts.length}
            </span>
          </button>

          {/* Individual Main Sections */}
          {storeCategories.map((cat) => {
            const count = storeProducts.filter((p) => p.category === cat.id).length;
            const active = selectedSection === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectSection(cat.id)}
                className={`shrink-0 flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all border ${
                  active
                    ? 'bg-primary-700 text-white border-primary-700 shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-primary-400'
                }`}
              >
                <img
                  src={cat.image}
                  alt={isAr ? cat.name : cat.nameEn}
                  className="w-7 h-7 rounded-lg object-cover shrink-0 border border-white/20"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span>{isAr ? cat.name : cat.nameEn}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    active ? 'bg-gold-400 text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
