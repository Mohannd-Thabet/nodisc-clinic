import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { storeSubCategories } from '../../data/storeProducts';

export default function StoreSubCategoriesBar({
  sectionId,
  selectedSubCategory,
  onSelectSubCategory,
}) {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const subs = storeSubCategories.filter(
    (s) => s.id === 'all' || s.categoryId === sectionId
  );

  if (subs.length <= 1) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
      {subs.map((sub) => {
        const active = selectedSubCategory === sub.id;
        return (
          <button
            key={sub.id}
            type="button"
            onClick={() => onSelectSubCategory(sub.id)}
            className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              active
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
            }`}
          >
            {isAr ? sub.name : sub.nameEn}
          </button>
        );
      })}
    </div>
  );
}
