import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getNewsBySlug, newsAndVisits } from '../data/mediaAndCases';
import Breadcrumbs from '../components/common/Breadcrumbs';
import {
  Calendar,
  Tag,
  ArrowLeft,
  MessageCircle,
  Share2,
  Newspaper,
  ChevronLeft
} from 'lucide-react';

export default function NewsDetailPage() {
  const { slug } = useParams();
  const item = getNewsBySlug(slug);

  if (!item) return <Navigate to="/media-center" replace />;

  // Related news (other items)
  const related = newsAndVisits.filter((n) => n.id !== item.id).slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: item.title, text: item.summary, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط الخبر');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Hero Image */}
      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

        {/* Overlay Content */}
        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-primary-700/90 text-gold-200 text-[11px] font-bold border border-gold-500/30 backdrop-blur-sm">
                {item.badge}
              </span>
              <span className="text-xs text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-secondary-400" />
                {item.date}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-300">{item.category}</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-white leading-tight">
              {item.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: 'المركز الإعلامي', to: '/media-center' },
            { label: 'الأخبار والزيارات', to: '/media-center?tab=news' },
            { label: item.title },
          ]}
        />

        <article className="py-8 space-y-8">
          {/* Summary Box */}
          <div className="bg-primary-50 dark:bg-primary-950/40 rounded-3xl p-6 border border-primary-100 dark:border-primary-900/60">
            <p className="text-base sm:text-lg text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
              {item.summary}
            </p>
          </div>

          {/* Full Content */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            {item.content.split('\n\n').map((para, idx) => (
              <p key={idx} className="text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" />
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:border-primary-400 dark:hover:border-secondary-500 hover:shadow-md transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>مشاركة الخبر</span>
            </button>
            <a
              href={`https://wa.me/967772070207?text=أرغب في الاستفسار عن: ${encodeURIComponent(item.title)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>استفسار واتساب</span>
            </a>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-700 to-secondary-500 text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <span>احجز موعدك الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Related News */}
          {related.length > 0 && (
            <div className="pt-6 space-y-5">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-primary-600 dark:text-secondary-400" />
                <span>أخبار أخرى من المركز الإعلامي</span>
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/news/${rel.slug}`}
                    className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary-400 dark:hover:border-secondary-500 hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className="h-32 overflow-hidden">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-[10px] font-bold text-primary-600 dark:text-secondary-400">
                        {rel.badge}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-secondary-400 transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {rel.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back Link */}
          <div className="pt-4">
            <Link
              to="/media-center"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 dark:text-secondary-400 hover:underline"
            >
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <span>العودة إلى المركز الإعلامي</span>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
