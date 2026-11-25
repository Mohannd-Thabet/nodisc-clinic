import React from 'react';
import { Link } from 'react-router-dom';
import { libraryData } from '../../data/libraryData';
import { educationalVideos } from '../../data/mediaAndCases';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Play,
  Video,
  User,
  Eye,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import SequentialCarousel from '../common/SequentialCarousel';

const fallbackArticleImages = [
  '/assets/medical/clinical_4.jpg',
  '/assets/medical/clinical_5.jpg',
  '/assets/images/dept_pain_clinic_1795286628900.jpg',
  '/assets/medical/clinical_6.jpg',
  '/assets/medical/clinical_7.jpg',
  '/assets/medical/clinical_8.jpg',
];

const typeColors = {
  condition: 'bg-red-50 text-red-700 border-red-200',
  article:   'bg-blue-50 text-blue-700 border-blue-200',
  procedure: 'bg-purple-50 text-purple-700 border-purple-200',
  video:     'bg-amber-50 text-amber-700 border-amber-200',
  faq:       'bg-teal-50 text-teal-700 border-teal-200',
};

export default function LatestArticles() {
  const { lang, isRtl } = useLanguage();
  const isAr = lang === 'ar';

  const articleItems = libraryData.filter((item) => item.type !== 'faq').slice(0, 8);
  const featuredVideo = educationalVideos[0];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-primary-600 dark:text-secondary-400 bg-primary-50 dark:bg-primary-950/50 px-3 py-1.5 rounded-full border border-primary-100 dark:border-primary-900 mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isAr ? 'المكتبة الطبية التثقيفية' : 'Medical Education Library'}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {isAr ? 'مقالات وحالات طبية وفيديو توعوي بارز' : 'Medical Articles, Cases & Featured Video'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl leading-relaxed">
              {isAr
                ? 'محتوى طبي تثقيفي متنوع حول جراحة الأعصاب وصحة العمود الفقري، أشرف على إعداده ومراجعته د. محمد الجرباني.'
                : 'Diverse educational medical content on neurosurgery and spinal health, prepared and reviewed by Dr. Mohammed Al-Jarbani.'}
            </p>
          </div>
          <Link
            to="/library"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-secondary-400 hover:bg-primary-700 hover:text-white hover:border-primary-700 font-bold text-sm shadow-sm hover:shadow-md transition-all self-start group"
          >
            <span>{isAr ? 'المكتبة الطبية الكاملة' : 'Full Medical Library'}</span>
            {isRtl
              ? <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            }
          </Link>
        </div>

        {/* Layout: Sequential Articles Carousel + Featured Video Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Sequential Articles & Conditions Carousel (8 cols) */}
          <div className="lg:col-span-8 min-w-0">
            <SequentialCarousel
              items={articleItems}
              autoPlayInterval={4200}
              slidesPerView={{ mobile: 1, tablet: 2, desktop: 2 }}
              renderItem={(item, idx) => {
                const isVideo = item.type === 'video';
                const imgSrc = fallbackArticleImages[idx % fallbackArticleImages.length];
                return (
                  <Link
                    to={`/library/${item.slug}`}
                    className="group bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-primary-400 dark:hover:border-secondary-500 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="relative h-44 overflow-hidden bg-slate-900">
                      <img
                        src={imgSrc}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      <div className="absolute top-3 right-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border backdrop-blur-md ${typeColors[item.type] || ''}`}>
                          {isVideo && <Video className="w-3 h-3" />}
                          <span>{item.typeLabel}</span>
                        </span>
                      </div>

                      {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="w-12 h-12 rounded-full bg-white/90 text-primary-800 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <span className="text-primary-600 dark:text-secondary-400 font-semibold truncate max-w-[160px]">
                            {item.departmentName}
                          </span>
                          <span>·</span>
                          <span className="tabular-nums">{item.publishedAt}</span>
                        </div>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-secondary-400 transition-colors line-clamp-2 leading-snug">
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
                        <span className="font-bold text-primary-700 dark:text-secondary-400 inline-flex items-center gap-1 shrink-0">
                          <span>{isVideo ? (isAr ? 'شاهد' : 'Watch') : (isAr ? 'اقرأ' : 'Read')}</span>
                          {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              }}
            />
          </div>

          {/* Featured Educational Video Card (4 cols) */}
          {featuredVideo && (
            <div className="lg:col-span-4 flex flex-col">
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-slate-900 text-white border border-primary-800/60 shadow-2xl flex flex-col justify-between h-full">
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src="/assets/doctor_real.jpg"
                      alt={featuredVideo.title}
                      className="w-full h-full object-cover object-top opacity-80"
                      onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-black/40 to-transparent" />

                    <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400 text-slate-950 text-[11px] font-black shadow-lg">
                      <Video className="w-3.5 h-3.5" />
                      <span>{isAr ? 'فيديو توعوي بارز' : 'Featured Video'}</span>
                    </span>

                    <a
                      href={featuredVideo.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center group/play"
                    >
                      <span className="w-16 h-16 rounded-full bg-gold-400 text-slate-950 flex items-center justify-center shadow-2xl group-hover/play:scale-110 transition-transform">
                        <Play className="w-7 h-7 fill-current ml-0.5" />
                      </span>
                    </a>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] text-slate-300">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gold-400" />
                        <span>{featuredVideo.duration}</span>
                      </span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-secondary-400" />
                        <span>{featuredVideo.views}</span>
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base sm:text-lg leading-snug text-white">
                      {featuredVideo.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {featuredVideo.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <span className="text-xs text-gold-300 font-bold truncate">
                    {featuredVideo.doctor}
                  </span>
                  <a
                    href={featuredVideo.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-extrabold text-xs transition-all shrink-0"
                  >
                    <span>{isAr ? 'مشاهدة' : 'Watch'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
