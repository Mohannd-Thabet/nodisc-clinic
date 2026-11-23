import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { libraryData } from '../../data/libraryData';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Play,
  FileText,
  Video,
  Stethoscope,
  Activity,
  HelpCircle,
  User
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function LatestArticles() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState('all');

  const TAB_TYPES = [
    { key: 'all',       labelAr: 'الكل',              labelEn: 'All',           icon: BookOpen },
    { key: 'condition', labelAr: 'حالات مرضية',       labelEn: 'Conditions',    icon: Stethoscope },
    { key: 'article',   labelAr: 'مقالات طبية',       labelEn: 'Articles',      icon: FileText },
    { key: 'procedure', labelAr: 'عمليات وإجراءات',   labelEn: 'Procedures',    icon: Activity },
    { key: 'video',     labelAr: 'فيديوهات توعوية',   labelEn: 'Videos',        icon: Video },
    { key: 'faq',       labelAr: 'أسئلة شائعة',       labelEn: 'FAQs',          icon: HelpCircle },
  ];

  const typeColors = {
    condition: 'bg-red-50 text-red-700 border-red-200',
    article:   'bg-blue-50 text-blue-700 border-blue-200',
    procedure: 'bg-purple-50 text-purple-700 border-purple-200',
    video:     'bg-amber-50 text-amber-700 border-amber-200',
    faq:       'bg-teal-50 text-teal-700 border-teal-200',
  };

  const filtered =
    activeTab === 'all'
      ? libraryData
      : libraryData.filter((item) => item.type === activeTab);

  const displayItems = filtered.slice(0, 6);

  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-primary-600 dark:text-secondary-400 bg-primary-50 dark:bg-primary-950/50 px-3 py-1.5 rounded-full border border-primary-100 dark:border-primary-900 mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isAr ? 'المكتبة الطبية التثقيفية' : 'Medical Education Library'}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {isAr ? 'مقالات وفيديوهات طبية معتمدة' : 'Accredited Medical Articles & Videos'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl leading-relaxed">
              {isAr
                ? 'محتوى طبي تثقيفي متنوع حول جراحة الأعصاب وصحة العمود الفقري، أشرف على إعداده ومراجعته د. محمد الجرباني'
                : 'Diverse educational medical content on neurosurgery and spinal health, prepared and reviewed by Dr. Mohammed Al-Jarbani.'}
            </p>
          </div>
          <Link
            to="/library"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-secondary-400 hover:bg-primary-700 hover:text-white hover:border-primary-700 font-bold text-sm shadow-sm hover:shadow-md transition-all self-start group"
          >
            <span>{isAr ? 'المكتبة الطبية الكاملة' : 'Full Medical Library'}</span>
            {isAr
              ? <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            }
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-2xl w-fit">
          {TAB_TYPES.map(({ key, labelAr, labelEn, icon: Icon }) => {
            const count = key === 'all' ? libraryData.length : libraryData.filter((i) => i.type === key).length;
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-primary-700 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary-700 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gold-300' : 'text-slate-400'}`} />
                <span>{isAr ? labelAr : labelEn}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${isActive ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item) => {
            const isVideo = item.type === 'video';
            const isFaq = item.type === 'faq';
            return (
              <Link
                key={item.id}
                to={`/library/${item.slug}`}
                className="group bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-primary-400 dark:hover:border-secondary-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
              >
                {/* Thumbnail / FAQ Header */}
                {!isFaq ? (
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                      onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Type Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border backdrop-blur-md ${typeColors[item.type] || ''}`}>
                        {isVideo && <Video className="w-3 h-3" />}
                        <span>{item.typeLabel}</span>
                      </span>
                    </div>

                    {/* Video Play Button Overlay */}
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="w-14 h-14 rounded-full bg-white/90 text-primary-800 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                          <Play className="w-6 h-6 fill-current ml-0.5" />
                        </span>
                        {item.videoDuration && (
                          <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/80 text-white text-[11px] font-mono font-bold">
                            {item.videoDuration}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  /* FAQ Row Style */
                  <div className="p-5 pb-0 flex items-start gap-3">
                    <span className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                      <HelpCircle className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 mt-2">
                      {isAr ? 'سؤال شائع' : 'Frequently Asked'}
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    {!isFaq && (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <span className="text-primary-600 dark:text-secondary-400 font-semibold truncate max-w-[150px]">
                          {item.departmentName}
                        </span>
                        <span>·</span>
                        <span className="tabular-nums">{item.publishedAt}</span>
                      </div>
                    )}
                    <h3 className={`font-bold text-slate-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-secondary-400 transition-colors line-clamp-2 leading-snug ${isFaq ? 'text-sm mt-1' : 'text-sm'}`}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200 dark:border-slate-700 text-xs">
                    <span className="flex items-center gap-1.5 text-slate-400 truncate max-w-[65%]">
                      <User className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.authorName}</span>
                    </span>
                    <span className="font-bold text-primary-700 dark:text-secondary-400 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all shrink-0">
                      <span>
                        {isVideo
                          ? (isAr ? 'شاهد' : 'Watch')
                          : isFaq
                          ? (isAr ? 'عرض الإجابة' : 'View Answer')
                          : (isAr ? 'اقرأ' : 'Read')}
                      </span>
                      {isAr
                        ? <ArrowLeft className="w-3.5 h-3.5" />
                        : <ArrowRight className="w-3.5 h-3.5" />
                      }
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* No results message */}
        {displayItems.length === 0 && (
          <div className="text-center py-16 text-slate-400 dark:text-slate-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">{isAr ? 'لا توجد عناصر في هذا التصنيف حالياً' : 'No items in this category yet.'}</p>
          </div>
        )}

        {/* CTA Row */}
        {filtered.length > 6 && (
          <div className="mt-10 text-center">
            <Link
              to={`/library${activeTab !== 'all' ? `?type=${activeTab}` : ''}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary-700 to-secondary-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <span>
                {isAr
                  ? `عرض المزيد (${filtered.length - 6} إضافية)`
                  : `Show More (${filtered.length - 6} more)`}
              </span>
              {isAr
                ? <ArrowLeft className="w-4 h-4" />
                : <ArrowRight className="w-4 h-4" />
              }
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
