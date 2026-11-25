import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Home, Grid } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { storeProducts } from '../../data/storeProducts';
import StoreMainSectionsBar from '../../components/store/StoreMainSectionsBar';
import StoreSubCategoriesBar from '../../components/store/StoreSubCategoriesBar';
import StoreProductCard from '../../components/store/StoreProductCard';

export default function StoreCategoriesPage() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSection = searchParams.get('section') || 'all';
  const initialSub = searchParams.get('sub') || 'all';

  const [selectedSection, setSelectedSection] = useState(initialSection);
  const [selectedSub, setSelectedSub] = useState(initialSub);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const sec = searchParams.get('section') || 'all';
    const sub = searchParams.get('sub') || 'all';
    setSelectedSection(sec);
    setSelectedSub(sub);
  }, [searchParams]);

  const handleSelectSection = (secId) => {
    setSelectedSection(secId);
    setSelectedSub('all');
    if (secId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ section: secId });
    }
  };

  const filteredProducts = useMemo(() => {
    return storeProducts.filter((p) => {
      if (selectedSection !== 'all' && p.category !== selectedSection) return false;
      if (selectedSub !== 'all' && p.subCategory !== selectedSub) return false;
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
  }, [selectedSection, selectedSub, searchQuery]);

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumbs */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link to="/store" className="hover:text-primary-600 inline-flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>{isAr ? 'رئيسية المتجر' : 'Store Home'}</span>
          </Link>
          <span>/</span>
          <span className="font-bold text-primary-700 dark:text-secondary-400">
            {isAr ? 'التصنيفات وكل المنتجات' : 'Categories & All Products'}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Prominent Main Sections Filter Bar at Top */}
        <StoreMainSectionsBar
          selectedSection={selectedSection}
          onSelectSection={handleSelectSection}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showSearchInput={true}
        />

        {/* Horizontal Sub-Categories Bar when a specific Main Section is selected */}
        {selectedSection !== 'all' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
              {isAr ? 'الأقسام الفرعية:' : 'Sub-Categories:'}
            </div>
            <StoreSubCategoriesBar
              sectionId={selectedSection}
              selectedSubCategory={selectedSub}
              onSelectSubCategory={setSelectedSub}
            />
          </div>
        )}

        {/* Products Grid */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
            <Grid className="w-4 h-4 text-primary-600" />
            <span>
              {isAr
                ? `عرض ${filteredProducts.length} منتج`
                : `Showing ${filteredProducts.length} Products`}
            </span>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <StoreProductCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 text-slate-400">
            {isAr ? 'لا توجد منتجات مطابقة لبحثك' : 'No matching products found.'}
          </div>
        )}
      </div>
    </div>
  );
}
