import React, { useState } from 'react';
import SectionTitle from '../components/common/SectionTitle';
import ArticleCard from '../components/cards/ArticleCard';
import { articles } from '../data/articles';
import { BookOpen, Search, Filter } from 'lucide-react';

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'كافة المقالات' },
    { id: 'العمود الفقري', label: 'العمود الفقري' },
    { id: 'جراحة الدماغ', label: 'جراحة الدماغ' },
    { id: 'صحة العمود الفقري', label: 'صحة الظهر والوقاية' },
    { id: 'أمراض المخ والأعصاب', label: 'أمراض المخ والأعصاب' }
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesSearch = 
      art.title.includes(searchQuery) || 
      art.summary.includes(searchQuery) ||
      art.category.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-800 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-soft">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-slate-900 transition-colors/10 text-gold-300 border border-white/15 text-xs font-semibold mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>المكتبة الطبية والتثقيف الصحي</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black mb-4">
              المقالات والإرشادات الطبية
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              معلومات طبية موثوقة ومبسطة يشاركها الدكتور محمد عبدالله الجرباني لرفع الوعي الصحي بأمراض الدماغ والعمود الفقري والأعصاب.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Category Filter Controls */}
        <div className="bg-white dark:bg-slate-900 transition-colors rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800/90 shadow-soft mb-10 flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Categories pills */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في المقالات..."
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm outline-none transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 transition-colors rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">لا توجد مقالات مطابقة لبحثك</h3>
            <p className="text-sm text-slate-500">جرب كلمات بحث أخرى أو اختر فئة مختلفة.</p>
          </div>
        )}

        {/* Medical disclaimer note */}
        <div className="mt-16 text-center">
          <p className="text-xs text-slate-500 bg-white dark:bg-slate-900 transition-colors inline-block px-5 py-3 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl">
            * المقالات المنشورة تهدف إلى التوعية والتثقيف الصحي العام، ولا تغني بأي حال عن الفحص السريري المباشر وتشخيص الطبيب المعالج.
          </p>
        </div>
      </div>
    </div>
  );
}
