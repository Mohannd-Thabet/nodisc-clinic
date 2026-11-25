import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ChevronDown, ChevronUp, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { storeSubCategories, storeProducts } from '../../data/storeProducts';
import StoreSubCategoriesBar from './StoreSubCategoriesBar';
import StoreProductCard from './StoreProductCard';

export default function StoreMainGroupCard({
  section,
  activeSub = 'all',
  onSelectSubCategory,
  searchQuery = '',
  isExpanded = true,
  onToggleExpand,
  hideGroupHeader = false,
}) {
  const { lang, isRtl } = useLanguage();
  const isAr = lang === 'ar';

  const sectionSubsCount = storeSubCategories.filter((s) => s.categoryId === section.id).length;

  const filteredProducts = storeProducts.filter((p) => {
    if (p.category !== section.id) return false;
    if (activeSub !== 'all' && p.subCategory !== activeSub) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        (p.nameEn && p.nameEn.toLowerCase().includes(q)) ||
        p.shortDesc.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // When viewing all groups (hideGroupHeader === false) and sub === 'all', show first 4 preview products;
  // when a specific group is selected (hideGroupHeader === true), show ALL products of that group.
  const displayedProducts =
    !hideGroupHeader && activeSub === 'all' && !searchQuery.trim()
      ? filteredProducts.slice(0, 4)
      : filteredProducts;

  const showBody = hideGroupHeader ? true : isExpanded;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
      {/* Group Header (Hidden when hideGroupHeader === true to eliminate duplication) */}
      {!hideGroupHeader && (
        <div className="p-5 sm:p-6 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={section.image}
              alt={isAr ? section.name : section.nameEn}
              className="w-16 h-16 rounded-2xl object-cover shadow-md border border-slate-200 dark:border-slate-700 shrink-0"
              onError={(e) => { e.target.src = '/assets/nodisc_photo.jpg'; }}
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-800 dark:text-secondary-300 text-[10px] font-black">
                  <Layers className="w-3 h-3" />
                  <span>{isAr ? 'مجموعة رئيسية' : 'Main Section'}</span>
                </span>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  {isAr
                    ? `${sectionSubsCount} أقسام فرعية · ${filteredProducts.length} منتج`
                    : `${sectionSubsCount} Sub-categories · ${filteredProducts.length} Products`}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {isAr ? section.name : section.nameEn}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                {isAr ? section.description : section.descriptionEn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end md:self-auto">
            <Link
              to={`/store/categories?section=${section.id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs shadow-sm transition-colors"
            >
              <span>{isAr ? 'عرض المجموعة' : 'View Section'}</span>
              {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </Link>

            <button
              type="button"
              onClick={onToggleExpand}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-primary-400 text-xs font-bold transition-colors"
              aria-label={isExpanded ? (isAr ? 'طي الفروع' : 'Collapse') : (isAr ? 'عرض الفروع' : 'Expand')}
            >
              <span>{isExpanded ? (isAr ? 'طي الفروع' : 'Collapse') : (isAr ? 'عرض الفروع' : 'Expand')}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {/* Card Body: Sub-category filter bar + Product Grid */}
      {showBody && (
        <div className="p-5 sm:p-6 space-y-5">
          <StoreSubCategoriesBar
            sectionId={section.id}
            selectedSubCategory={activeSub}
            onSelectSubCategory={onSelectSubCategory}
          />

          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {displayedProducts.map((prod) => (
                <StoreProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-400">
              {isAr ? 'لا توجد منتجات مطابقة في هذا التصنيف حالياً' : 'No matching products in this sub-category.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
