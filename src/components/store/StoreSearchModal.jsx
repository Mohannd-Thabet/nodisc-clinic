import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Tag, Layers, Package, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useStore } from '../../context/StoreContext';
import { storeCategories, storeSubCategories, storeProducts } from '../../data/storeProducts';

export default function StoreSearchModal() {
  const { lang, isRtl } = useLanguage();
  const { isStoreSearchOpen, closeStoreSearch, formatPrice } = useStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const isAr = lang === 'ar';

  useEffect(() => {
    if (isStoreSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setQuery('');
    }
  }, [isStoreSearchOpen]);

  const quickTerms = isAr
    ? ['مشد قطني', 'رقبية', 'TENS', 'فيتامين', 'وسادة طبية', 'كمادات', 'شد الفقرات']
    : ['Lumbar', 'Collar', 'TENS', 'Neuro-B', 'Pillow', 'Gel Pack', 'Traction'];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        sections: storeCategories,
        subCategories: storeSubCategories.filter((s) => s.id !== 'all').slice(0, 6),
        products: storeProducts.slice(0, 6),
      };
    }

    return {
      sections: storeCategories.filter(
        (c) => c.name.toLowerCase().includes(q) || c.nameEn.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
      ),
      subCategories: storeSubCategories.filter(
        (s) => s.id !== 'all' && (s.name.toLowerCase().includes(q) || s.nameEn.toLowerCase().includes(q))
      ),
      products: storeProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.nameEn && p.nameEn.toLowerCase().includes(q)) ||
          p.shortDesc.toLowerCase().includes(q) ||
          (p.badge && p.badge.toLowerCase().includes(q))
      ),
    };
  }, [query]);

  if (!isStoreSearchOpen) return null;

  const goTo = (path) => {
    closeStoreSearch();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={closeStoreSearch} />

      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-primary-600 dark:text-secondary-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isAr
                ? 'ابحث في المجموعات الرئيسية، التصنيفات الفرعية، ومنتجات الصيدلية فقط...'
                : 'Search store main sections, categories, and pharmacy products...'
            }
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white outline-none placeholder-slate-400"
          />
          <button
            type="button"
            onClick={closeStoreSearch}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Store Search Terms */}
        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
            {isAr ? 'بحث سريع:' : 'Quick Search:'}
          </span>
          {quickTerms.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-primary-700 dark:text-secondary-400 hover:bg-primary-600 hover:text-white transition-colors"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {/* Main Sections */}
          {results.sections.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>{isAr ? 'المجموعات الرئيسية' : 'Main Sections'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {results.sections.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => goTo(`/store/categories?section=${sec.id}`)}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-950/50 text-start transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    <img
                      src={sec.image}
                      alt={sec.name}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <span className="text-xs font-bold text-slate-800 dark:text-white truncate">
                      {isAr ? sec.name : sec.nameEn}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Subcategories */}
          {results.subCategories.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mb-2">
                <Tag className="w-3.5 h-3.5" />
                <span>{isAr ? 'التصنيفات الفرعية' : 'Sub-Categories'}</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {results.subCategories.map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => goTo(`/store/categories?section=${sub.categoryId}&sub=${sub.id}`)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary-600 hover:text-white text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
                  >
                    {isAr ? sub.name : sub.nameEn}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pharmacy Products */}
          {results.products.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mb-2">
                <Package className="w-3.5 h-3.5" />
                <span>{isAr ? 'منتجات الصيدلية والمستلزمات' : 'Pharmacy & Supply Products'}</span>
              </h4>
              <div className="space-y-2">
                {results.products.map((prod) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => goTo(`/store/product/${prod.slug}`)}
                    className="w-full flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-950/50 border border-slate-200 dark:border-slate-700 text-start transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-primary-700 dark:group-hover:text-secondary-400">
                          {isAr ? prod.name : prod.nameEn}
                        </div>
                        <div className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                          {formatPrice(prod.priceYER, prod.priceUSD)}
                        </div>
                      </div>
                    </div>
                    {isRtl ? <ArrowLeft className="w-4 h-4 text-slate-400 shrink-0" /> : <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.sections.length === 0 && results.subCategories.length === 0 && results.products.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm">
              {isAr ? 'لم يتم العثور على منتجات مطابقة في المتجر' : 'No matching store products found.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
