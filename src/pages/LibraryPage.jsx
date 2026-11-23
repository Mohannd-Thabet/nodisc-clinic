import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { libraryData } from '../data/libraryData';
import Breadcrumbs from '../components/common/Breadcrumbs';
import {
  BookOpen,
  Clock,
  ChevronLeft,
  ChevronDown,
  User,
  Play,
  HelpCircle,
  Video,
  FileText,
  Stethoscope,
  Activity,
  Sparkles
} from 'lucide-react';

const typeColors = {
  condition: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800',
  article: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  procedure: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  video: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  faq: 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 border-teal-200 dark:border-teal-800',
};

const typeIcons = {
  all: BookOpen,
  condition: Stethoscope,
  article: FileText,
  procedure: Activity,
  video: Video,
  faq: HelpCircle,
};

export default function LibraryPage() {
  const { lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'all';
  const [activeType, setActiveType] = useState(initialType);
  const [openFaqId, setOpenFaqId] = useState(null);

  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam) {
      setActiveType(typeParam);
    }
  }, [searchParams]);

  const handleTypeChange = (key) => {
    setActiveType(key);
    if (key === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ type: key });
    }
  };

  const types = [
    { key: 'all', label: 'الكل' },
    { key: 'condition', label: 'حالات مرضية' },
    { key: 'article', label: 'مقالات طبية' },
    { key: 'procedure', label: 'عمليات وإجراءات' },
    { key: 'video', label: 'فيديوهات توعوية' },
    { key: 'faq', label: 'أسئلة شائعة' },
  ];

  const filtered =
    activeType === 'all'
      ? libraryData
      : libraryData.filter((item) => item.type === activeType);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-700 text-white py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-secondary-400/20 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-5">
            <BookOpen className="w-4 h-4 text-gold-300" />
            <span className="text-xs font-bold text-gold-200">المرجع الطبي التثقيفي المعتمد</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">المكتبة الطبية التثقيفية</h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            مقالات وفيديوهات توعوية وحالات سريرية موثوقة حول صحة العمود الفقري وجراحة الأعصاب، يشرف عليها د. محمد عبدالله الجرباني
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{ label: 'المكتبة الطبية' }]} />

        {/* Filter Tabs */}
        <div className="py-6">
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm w-fit">
            {types.map((t) => {
              const Icon = typeIcons[t.key] || BookOpen;
              const count =
                t.key === 'all'
                  ? libraryData.length
                  : libraryData.filter((i) => i.type === t.key).length;
              const isActive = activeType === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => handleTypeChange(t.key)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-primary-700 text-white shadow-md shadow-primary-700/20 scale-[1.02]'
                      : 'text-slate-600 dark:text-slate-300 hover:text-primary-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gold-300' : 'text-slate-400'}`} />
                  <span>{t.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Dedicated View if activeType === 'faq' */}
        {activeType === 'faq' ? (
          <section className="pb-16 max-w-4xl space-y-4">
            {filtered.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                    className="w-full p-5 text-start flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                        <HelpCircle className="w-4 h-4" />
                      </span>
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-primary-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 leading-relaxed space-y-4">
                      <p className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                        {item.faqAnswer}
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-slate-400 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          {item.authorName}
                        </span>
                        <Link
                          to={`/library/${item.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-primary-700 dark:text-secondary-400 hover:underline"
                        >
                          <span>عرض صفحة السؤال المستقلة</span>
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        ) : (
          /* Grid View for Articles, Conditions, Procedures, Videos, or All */
          <section className="pb-16">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => {
                const isVideo = item.type === 'video';
                return (
                  <Link
                    key={item.id}
                    to={`/library/${item.slug}`}
                    className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-primary-400 dark:hover:border-secondary-600 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Thumbnail Container */}
                      <div className="h-48 relative overflow-hidden bg-slate-950">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                          onError={(e) => {
                            e.target.src = '/assets/full_logo.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {/* Top Category Badge */}
                        <div className="absolute top-3 right-3 z-10">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border backdrop-blur-md ${
                              typeColors[item.type] || ''
                            }`}
                          >
                            {isVideo && <Video className="w-3 h-3 text-amber-600" />}
                            <span>{item.typeLabel}</span>
                          </span>
                        </div>

                        {/* Video Play Overlay */}
                        {isVideo && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="w-14 h-14 rounded-full bg-white/95 dark:bg-slate-900/95 text-primary-700 dark:text-gold-400 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                              <Play className="w-6 h-6 fill-current ml-0.5" />
                            </span>
                            {item.videoDuration && (
                              <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-white text-[11px] font-mono font-bold tracking-wider">
                                {item.videoDuration}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-2.5">
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span className="text-primary-600 dark:text-secondary-400 font-semibold truncate max-w-[150px]">
                            {item.departmentName}
                          </span>
                          <span>•</span>
                          <span className="tabular-nums">{item.publishedAt}</span>
                        </div>

                        <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-secondary-400 transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                          {item.summary}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-400 truncate max-w-[65%]">
                        <User className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{item.authorName}</span>
                      </div>
                      <span className="font-bold text-primary-600 dark:text-secondary-400 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                        <span>{isVideo ? 'شاهد الفيديو' : 'اقرأ'}</span>
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-slate-400 dark:text-slate-500">
                <p className="text-sm">لا توجد عناصر في هذا التصنيف حالياً</p>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
