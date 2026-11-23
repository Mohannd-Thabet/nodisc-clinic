import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getLibraryItemBySlug, libraryData } from '../data/libraryData';
import Breadcrumbs from '../components/common/Breadcrumbs';
import {
  ArrowLeft,
  Clock,
  User,
  BookOpen,
  Tag,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Maximize,
  HelpCircle,
  Video,
  CheckCircle2,
  Calendar,
  Share2,
  MessageCircle
} from 'lucide-react';

const typeColors = {
  condition: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800',
  article: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  procedure: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  video: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  faq: 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 border-teal-200 dark:border-teal-800',
};

export default function LibraryDetailPage() {
  const { slug } = useParams();
  const item = getLibraryItemBySlug(slug);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  if (!item) return <Navigate to="/library" replace />;

  const isVideo = item.type === 'video';
  const isFaq = item.type === 'faq';

  // Related items from the same department
  const relatedItems = libraryData
    .filter((l) => l.id !== item.id && (l.departmentId === item.departmentId || l.type === item.type))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Header / Hero */}
      <section className="relative bg-gradient-to-br from-primary-950 via-primary-900 to-slate-900 text-white py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-secondary-400 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link
              to={`/library?type=${item.type}`}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border backdrop-blur-sm ${
                typeColors[item.type] || ''
              }`}
            >
              {isVideo && <Video className="w-3.5 h-3.5" />}
              {isFaq && <HelpCircle className="w-3.5 h-3.5" />}
              <span>{item.typeLabel}</span>
            </Link>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-300 font-medium">{item.departmentName}</span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-400 tabular-nums">{item.publishedAt}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight mb-4">
            {item.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gold-400" />
              <span>{item.authorName}</span>
            </span>
            {item.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                <span>{item.readTime}</span>
              </span>
            )}
            {isVideo && item.videoDuration && (
              <span className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-md text-amber-300 font-mono font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>مدة الفيديو: {item.videoDuration}</span>
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: 'المكتبة الطبية', to: '/library' },
            { label: item.typeLabel, to: `/library?type=${item.type}` },
            { label: item.title },
          ]}
        />

        <article className="py-8 space-y-8">
          {/* VIDEO PLAYER SECTION (if type === 'video') */}
          {isVideo && (
            <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
              {/* Screen Area */}
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isPlaying ? 'opacity-40 scale-105' : 'opacity-75'
                  }`}
                  onError={(e) => {
                    e.target.src = '/assets/full_logo.jpg';
                  }}
                />

                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 flex flex-col justify-between p-4 sm:p-6">
                  {/* Top Bar inside Player */}
                  <div className="flex items-center justify-between text-white text-xs">
                    <span className="px-3 py-1 rounded-full bg-red-600/90 font-bold flex items-center gap-1.5 shadow">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      فيديو طبي معتمد
                    </span>
                    <span className="text-slate-300 font-mono">{item.videoDuration || '04:20'}</span>
                  </div>

                  {/* Center Play Button */}
                  <div className="flex flex-col items-center justify-center text-center space-y-3">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white text-primary-900 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 hover:bg-gold-400 group"
                      aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل الفيديو'}
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 fill-current" />
                      ) : (
                        <Play className="w-8 h-8 fill-current ml-1" />
                      )}
                    </button>
                    <p className="text-xs sm:text-sm text-white font-bold bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                      {isPlaying
                        ? 'جارٍ تشغيل معاينة الفيديو التوعوي (محاكاة تفاعلية)...'
                        : `اضغط للمشاهدة — المدة: ${item.videoDuration || '04:20'}`}
                    </p>
                  </div>

                  {/* Bottom Controls / Progress Bar */}
                  <div className="space-y-2">
                    {/* Simulated Timeline */}
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
                      <div
                        className={`h-full bg-gradient-to-r from-secondary-400 to-gold-400 rounded-full transition-all duration-300 ${
                          isPlaying ? 'w-2/3 animate-pulse' : 'w-1/6'
                        }`}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-300">
                      <span>{isPlaying ? '02:45' : '00:00'}</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setIsPlaying(false)}
                          className="hover:text-white"
                          title="إعادة التشغيل"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                        <Volume2 className="w-3.5 h-3.5" />
                        <Maximize className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Note & Chapters */}
              <div className="p-5 sm:p-7 space-y-5 text-white">
                {item.videoPreviewNote && (
                  <p className="text-xs text-sky-300 bg-sky-950/50 p-3.5 rounded-xl border border-sky-800/60 leading-relaxed">
                    💡 {item.videoPreviewNote}
                  </p>
                )}

                {item.videoChapters && item.videoChapters.length > 0 && (
                  <div>
                    <h3 className="text-sm font-black text-gold-300 mb-3 flex items-center gap-2">
                      <span>فصول ومحطات الفيديو التوضيحية:</span>
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {item.videoChapters.map((chap, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setActiveChapterIndex(idx);
                            setIsPlaying(true);
                          }}
                          className={`text-start p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                            activeChapterIndex === idx
                              ? 'bg-primary-900/60 border-primary-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          <span className="font-medium line-clamp-1">{chap.title}</span>
                          <span className="font-mono text-gold-400 bg-black/40 px-2 py-0.5 rounded text-[11px] shrink-0 mr-2">
                            {chap.time}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Standard Article Header Image (if NOT video) */}
          {!isVideo && (
            <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 max-h-96">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/full_logo.jpg';
                }}
              />
            </div>
          )}

          {/* Summary Box */}
          <div className="bg-primary-50 dark:bg-primary-950/40 rounded-3xl p-6 sm:p-7 border border-primary-100 dark:border-primary-900/60 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary-700 dark:text-secondary-400 mb-2">
              خلاصة المادة الطبية
            </h2>
            <p className="text-base sm:text-lg text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
              {item.summary}
            </p>
          </div>

          {/* FAQ Specific Answer Box */}
          {isFaq && item.faqAnswer && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-teal-500/30 dark:border-teal-500/20 shadow-md space-y-4">
              <div className="flex items-center gap-3 text-teal-600 dark:text-teal-400">
                <HelpCircle className="w-6 h-6" />
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  الإجابة الطبية المعتمدة
                </h2>
              </div>
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed bg-teal-50/50 dark:bg-teal-950/20 p-5 rounded-2xl border border-teal-100 dark:border-teal-900">
                {item.faqAnswer}
              </p>
            </div>
          )}

          {/* Structured Content Sections */}
          {item.sections && item.sections.length > 0 && (
            <div className="space-y-5">
              {item.sections.map((section, idx) => (
                <section
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-primary-200 dark:hover:border-primary-800"
                >
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-700 to-secondary-500 flex items-center justify-center text-white text-xs font-black shadow-sm shrink-0">
                      0{idx + 1}
                    </span>
                    <span>{section.heading}</span>
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed pr-11">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          )}

          {/* Doctor Credential / Medical Review Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-5">
            <img
              src="/assets/doctor_photo.webp"
              alt="د. محمد عبدالله الجرباني"
              className="w-20 h-20 rounded-2xl object-cover border-2 border-primary-500 shadow-md shrink-0"
              onError={(e) => {
                e.target.src = '/assets/full_logo.jpg';
              }}
            />
            <div className="flex-1 text-center sm:text-start space-y-1">
              <span className="text-[11px] font-bold text-primary-600 dark:text-secondary-400 uppercase tracking-wider">
                مراجعة واعتماد المادة العلمية
              </span>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                د. محمد عبد الله الجرباني
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                استشاري جراحة المخ والأعصاب والعمود الفقري — رئيس ومؤسس صرح نوديسك الطبي (مركز ابن سينا التخصصي، صنعاء)
              </p>
            </div>
            <Link
              to="/booking"
              className="shrink-0 px-5 py-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-secondary-400 font-bold text-xs border border-primary-200 dark:border-primary-800 hover:bg-primary-700 hover:text-white transition-all"
            >
              طلب استشارة
            </Link>
          </div>

          {/* Action Callouts */}
          <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-800 text-white rounded-3xl p-8 sm:p-10 shadow-xl text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black">
              هل لديك استفسار أو ترغب في تقييم حالتك سريرياً؟
            </h3>
            <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto leading-relaxed">
              يقدم د. محمد الجرباني وفريق نوديسك استشارات متخصصة لمراجعة صور الرنين وتحديد البرنامج الأنسب لحالتك
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-400 text-slate-950 font-black shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>حجز موعد استشارة سريرية</span>
              </Link>
              <a
                href="https://wa.me/967772070207"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 backdrop-blur-sm transition-all text-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>استفسار واتساب (772070207)</span>
              </a>
            </div>
          </div>

          {/* Related Articles & Videos */}
          {relatedItems.length > 0 && (
            <div className="pt-6 space-y-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-600 dark:text-secondary-400" />
                <span>مواد طبية ذات صلة</span>
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedItems.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/library/${rel.slug}`}
                    className="group bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary-400 dark:hover:border-secondary-500 transition-all hover:-translate-y-1 shadow-sm"
                  >
                    <span className="text-[10px] font-bold text-primary-600 dark:text-secondary-400 block mb-1">
                      {rel.typeLabel}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-secondary-400 transition-colors line-clamp-2 mb-2">
                      {rel.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 block tabular-nums">
                      {rel.publishedAt}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
