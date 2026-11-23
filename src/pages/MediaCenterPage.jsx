import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  successStories, 
  newsAndVisits, 
  educationalVideos, 
  approvedReviews 
} from '../data/mediaAndCases';
import { 
  Newspaper, 
  Award, 
  Video, 
  Star, 
  MessageSquare, 
  Calendar, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Share2, 
  Send,
  Eye,
  AlertCircle
} from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';

export default function MediaCenterPage() {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';
  
  // Tabs: 'stories', 'news', 'videos', 'reviews'
  const [activeTab, setActiveTab] = useState('stories');

  // Review submission state (Moderation simulation)
  const [reviewForm, setReviewForm] = useState({
    name: '',
    service: isAr ? 'كشف واستشارة عمود فقري' : 'Spine Consultation',
    rating: 5,
    comment: ''
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Active Story Detail
  const [selectedStory, setSelectedStory] = useState(null);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setReviewForm({ name: '', service: isAr ? 'كشف واستشارة عمود فقري' : 'Spine Consultation', rating: 5, comment: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 pb-20">
      
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-slate-900 text-white py-14 sm:py-20 border-b border-primary-800/40">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-500/20 text-secondary-300 text-xs font-bold border border-secondary-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'المركز الإعلامي ونبض نوديسك' : 'NODISC Media Center'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
            {isAr ? (
              <>قصص النجاح، الأخبار، <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-cyan-300">والتوعية الطبية</span></>
            ) : (
              <>Success Stories, News, <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-cyan-300">&amp; Medical Awareness</span></>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            {isAr
              ? 'منصة تفاعلية حية توثق رحلات شفاء مرضى الانزلاق الغضروفي، الزيارات الاستشارية، فعاليات العيادة، والفيديوهات التوعوية المعتمدة من الدكتور محمد الجرباني.'
              : 'A live interactive platform documenting disc herniation recovery journeys, consultation visits, clinic events, and educational videos by Dr. Mohammed Al-Jarbani.'}
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-2 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          
          <button
            onClick={() => setActiveTab('stories')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'stories'
                ? 'bg-gradient-to-r from-primary-700 to-secondary-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{isAr ? 'قصص النجاح والشفاء' : 'Success Stories'}</span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'news'
                ? 'bg-gradient-to-r from-primary-700 to-secondary-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>{isAr ? 'الأخبار والزيارات' : 'News & Visits'}</span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'videos'
                ? 'bg-gradient-to-r from-primary-700 to-secondary-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>{isAr ? 'الفيديوهات الطبية' : 'Medical Videos'}</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'reviews'
                ? 'bg-gradient-to-r from-primary-700 to-secondary-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{isAr ? 'تقييمات وآراء المرضى' : 'Patient Reviews'}</span>
          </button>

        </div>
      </section>

      {/* TAB 1: قصص النجاح والشفاء المعتمدة */}
      {activeTab === 'stories' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 animate-in fade-in">
          <SectionTitle 
            title={isAr ? 'قصص نجاح واقعية من عيادة ومركز نوديسك' : 'Real Success Stories from NODISC Clinic'}
            subtitle={isAr ? 'حالات موثقة سريرياً قبل وبعد العلاج الجراحي والتحفظي' : 'Clinically documented cases before and after surgical and conservative treatment'}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {successStories.map((story) => (
              <div 
                key={story.id}
                className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-secondary-500/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[11px] font-black border border-emerald-200 dark:border-emerald-800">
                      {story.badge}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-black text-base text-slate-900 dark:text-white mb-2 leading-snug">
                    {story.patientName}
                  </h3>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5 mb-4">
                    <div className="font-bold text-primary-700 dark:text-secondary-400">
                      {isAr ? 'التشخيص:' : 'Diagnosis:'} <span className="font-medium text-slate-700 dark:text-slate-300">{story.diagnosis}</span>
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {isAr ? 'العلاج:' : 'Treatment:'} <span className="font-medium text-slate-600 dark:text-slate-300">{story.treatmentType}</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed mb-6">
                    <div>
                      <span className="font-bold text-red-600 dark:text-red-400 block mb-0.5">{isAr ? 'قبل العلاج:' : 'Before Treatment:'}</span>
                      <p className="text-slate-600 dark:text-slate-300">{story.beforeStatus}</p>
                    </div>
                    <div>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">{isAr ? 'بعد العلاج:' : 'After Treatment:'}</span>
                      <p className="text-slate-600 dark:text-slate-300">{story.afterStatus}</p>
                    </div>
                  </div>

                  {/* Patient Quote */}
                  <blockquote className="p-4 rounded-2xl bg-primary-50/50 dark:bg-primary-950/30 border-r-4 border-primary-600 text-xs italic text-slate-700 dark:text-slate-300 mb-4">
                    "{story.patientQuote}"
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {story.duration}
                  </span>
                  <span>{story.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Your Story / Experience Callout */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-primary-900 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-1">
                {isAr ? 'هل تلقيت العلاج في عيادة الدكتور الجرباني أو مركز نوديسك؟' : 'Did you receive treatment at Dr. Al-Jarbani\'s clinic or NODISC center?'}
              </h3>
              <p className="text-xs text-slate-300">
                {isAr ? 'شارك قصتك وتجربتك لمساعدة مرضى آخرين على استعادة الأمل والشفاء.' : 'Share your story to help other patients regain hope and recovery.'}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('reviews')}
              className="px-6 py-3 rounded-2xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-black text-xs shadow-md active:scale-95 transition-all whitespace-nowrap"
            >
              {isAr ? 'أضف تجربتك وتقييمك الآن' : 'Add Your Review Now'}
            </button>
          </div>
        </section>
      )}

      {/* TAB 2: الأخبار والزيارات الطبية */}
      {activeTab === 'news' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 animate-in fade-in">
          <SectionTitle 
            title={isAr ? 'آخر أخبار العيادة والزيارات الطبية التخصصية' : 'Latest Clinic News & Medical Visits'}
            subtitle={isAr ? 'متابعة مستمرة لأنشطة المركز وتدشين أحدث التقنيات الطبية في اليمن' : 'Continuous coverage of center activities and the latest medical technologies in Yemen'}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {newsAndVisits.map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.slug}`}
                className="flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary-400 dark:hover:border-secondary-500 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={isAr ? item.title : (item.titleEn || item.title)} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-primary-900/90 text-gold-300 text-[10px] font-bold backdrop-blur-md border border-gold-500/30">
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-secondary-500" />
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.category}</span>
                    </div>

                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug mb-3 group-hover:text-primary-700 dark:group-hover:text-secondary-400 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-primary-600 dark:text-secondary-400">
                    <span>{isAr ? 'قراءة الخبر كاملاً' : 'Read Full Article'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* TAB 3: الفيديوهات التوعوية والشروحات الطبية */}
      {activeTab === 'videos' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 animate-in fade-in">
          <SectionTitle 
            title={isAr ? 'فيديوهات وشروحات طبية مرئية' : 'Medical Video Explanations'}
            subtitle={isAr ? 'شروحات علمية مبسطة للدكتور محمد الجرباني حول أمراض العمود الفقري والمخ' : 'Simplified scientific explanations by Dr. Mohammed Al-Jarbani on spine and brain conditions'}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {educationalVideos.map((vid) => (
              <div 
                key={vid.id}
                className="flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative aspect-video bg-slate-950 flex items-center justify-center group cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-red-600 group-hover:bg-red-700 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold">
                    {vid.duration}
                  </div>
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-bold">
                    YouTube
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-secondary-500 mb-1 block">
                      {vid.category}
                    </span>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug mb-2">
                      {vid.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {vid.description}
                    </p>
                  </div>

                  <a
                    href={vid.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-600 hover:text-white text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{isAr ? 'مشاهدة الفيديو على القناة الرسمية' : 'Watch on Official Channel'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 4: تقييمات وآراء المرضى مع ميزة المراجعة الإدارية (Moderation) */}
      {activeTab === 'reviews' && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 animate-in fade-in">
          <SectionTitle 
            title={isAr ? 'تقييمات وآراء المرضى وتجربتهم السريرية' : 'Patient Reviews & Clinical Experiences'}
            subtitle={isAr ? 'نلتزم بأعلى معايير الشفافية والمراجعة الطبية الدقيقة للآراء' : 'We uphold the highest standards of transparency and careful medical review'}
          />

          {/* List of Approved Reviews */}
          <div className="space-y-4 mt-8">
            {approvedReviews.map((rev) => (
              <div 
                key={rev.id}
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-secondary-400 font-black text-sm flex items-center justify-center">
                      {rev.author[0]}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                        {rev.author}
                      </h4>
                      <span className="text-[11px] text-slate-400">{rev.service} • {rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pr-12">
                  "{rev.text}"
                </p>
              </div>
            ))}
          </div>

          {/* Review Submission Form with Strict Moderation Warning */}
          <div className="mt-12 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-secondary-500/20 text-secondary-500 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {isAr ? 'أضف تقييمك وتجربتك الشخصية' : 'Add Your Personal Review'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isAr ? 'رأيك يهمنا في تطوير خدمات العيادة ومركز نوديسك' : 'Your feedback helps us improve clinic and NODISC center services'}
                </p>
              </div>
            </div>

            {/* Moderation Notice */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-3 mb-6">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                <strong>{isAr ? 'تنويه إداري:' : 'Admin Notice:'}</strong>{' '}
                {isAr
                  ? 'تخضع كافة التعليقات والتقييمات للمراجعة والتدقيق الإداري من قبل إدارة العيادة قبل نشرها علناً، وذلك للحفاظ على بيئة صحية إيجابية ومنع أي إساءة، ولتوجيه أية شكاوى خاصة إلى المعالجة المباشرة.'
                  : 'All comments and reviews are subject to administrative review before public publication, to maintain a positive environment and handle any complaints directly.'}
              </p>
            </div>

            {reviewSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2 animate-in zoom-in-95">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-300">
                  {isAr ? 'شكراً لك! تم استلام تقييمك بنجاح' : 'Thank you! Your review was received successfully'}
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  {isAr
                    ? 'تمت إحالة تعليقك إلى لوحة المراجعة الإدارية وسوف يظهر على الموقع فور اعتماده.'
                    : 'Your comment has been sent to the admin review panel and will appear on the site once approved.'}
                </p>
                <button
                  onClick={() => setReviewSubmitted(false)}
                  className="mt-3 text-xs font-bold underline text-emerald-800 dark:text-emerald-300"
                >
                  {isAr ? 'إضافة تقييم آخر' : 'Add Another Review'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {isAr ? 'اسمك الكامل *' : 'Full Name *'}
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder={isAr ? 'مثال: عبد الله السعدي' : 'e.g. Abdullah Al-Saadi'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-secondary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {isAr ? 'الخدمة التي تلقيتها *' : 'Service Received *'}
                    </label>
                    <select 
                      value={reviewForm.service}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, service: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-secondary-500"
                    >
                      <option>{isAr ? 'كشف واستشارة عمود فقري' : 'Spine Consultation'}</option>
                      <option>{isAr ? 'جلسات تأهيل مركز نوديسك' : 'NODISC Rehabilitation Sessions'}</option>
                      <option>{isAr ? 'جراحة ميكروسكوبية للانزلاق الغضروفي' : 'Microscopic Disc Surgery'}</option>
                      <option>{isAr ? 'جراحة المخ والأعصاب' : 'Neurosurgery'}</option>
                      <option>{isAr ? 'متجر ومستلزمات نوديسك الطبية' : 'NODISC Medical Supplies Store'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    {isAr ? 'تقييمك بالنجوم *' : 'Star Rating *'}
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                        className="p-1 hover:scale-125 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${star <= reviewForm.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-700'}`} />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-500 mr-2">
                      ({reviewForm.rating} {isAr ? 'من 5 نجوم' : 'of 5 stars'})
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'تفاصيل تجربتك ورأيك *' : 'Your Experience Details *'}
                  </label>
                  <textarea 
                    rows={4} 
                    required 
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder={isAr ? 'اكتب تجربتك السريرية ومدى تحسنك مع الدكتور وفريق نوديسك...' : 'Write about your clinical experience and improvement with the doctor and NODISC team...'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-secondary-500 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-primary-700 to-secondary-500 text-white font-black text-xs shadow-md shadow-primary-700/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isAr ? 'إرسال التقييم للمراجعة والاعتماد' : 'Submit Review for Approval'}</span>
                </button>
              </form>
            )}
          </div>
        </section>
      )}

    </div>
  );
}
