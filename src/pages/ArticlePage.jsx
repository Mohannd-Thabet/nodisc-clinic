import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { articles } from '../data/articles';
import { doctorInfo } from '../data/doctorInfo';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  User, 
  Share2, 
  BookOpen, 
  CheckCircle,
  Phone,
  MessageCircle
} from 'lucide-react';

export default function ArticlePage() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="py-20 text-center max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">المقال غير موجود</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">عذراً، المقال الذي تحاول الوصول إليه غير متوفر أو تم نقله.</p>
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-700 text-white font-bold"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لصفحة المقالات</span>
        </Link>
      </div>
    );
  }

  // Related articles
  const relatedArticles = articles.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <article className="py-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-gold-600 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لكافة المقالات الطبية</span>
          </Link>
        </div>

        {/* Article Header Card */}
        <div className="bg-white dark:bg-slate-900 transition-colors rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800/90 shadow-soft mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary-50 text-primary-700 border border-primary-200">
              {article.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:text-slate-300">
              {article.coverBadge}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100 text-xs sm:text-sm text-slate-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-bold text-slate-900 dark:text-white">{article.author}</span>
                <span className="text-xs text-slate-500">{doctorInfo.title}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary-600" />
                <span>{article.date}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary-600" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Placeholder Banner for Article */}
        <div className="mb-10 rounded-3xl overflow-hidden bg-gradient-to-r from-primary-900 via-primary-800 to-secondary-700 p-8 sm:p-12 text-white relative shadow-soft">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold text-gold-300 block mb-2 uppercase tracking-wider">
              ملخص المقال
            </span>
            <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-medium">
              "{article.summary}"
            </p>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="bg-white dark:bg-slate-900 transition-colors rounded-3xl p-6 sm:p-12 border border-slate-200 dark:border-slate-800/90 shadow-soft prose prose-lg max-w-none text-slate-800 dark:text-slate-100 leading-relaxed">
          {article.content.map((block, idx) => {
            if (block.type === 'heading') {
              return (
                <h2
                  key={idx}
                  className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-8 mb-4 pt-4 border-t border-slate-100 flex items-center gap-2"
                >
                  <span className="w-2 h-6 bg-gold-400 rounded-full inline-block"></span>
                  <span>{block.text}</span>
                </h2>
              );
            }
            if (block.type === 'list') {
              return (
                <ul key={idx} className="space-y-2.5 my-4 pr-4">
                  {block.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-base text-slate-700 leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-primary-600 shrink-0 mt-2"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="text-base sm:text-lg text-slate-700 leading-loose my-4">
                {block.text}
              </p>
            );
          })}
        </div>

        {/* Author Bio Signature Box */}
        <div className="mt-10 bg-white dark:bg-slate-900 transition-colors rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800/90 shadow-soft flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-primary-800 text-gold-300 flex items-center justify-center shrink-0 shadow-md">
            <User className="w-10 h-10" />
          </div>

          <div className="flex-1 text-center sm:text-right space-y-1.5">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              بقلم: {doctorInfo.name}
            </h4>
            <p className="text-xs sm:text-sm text-secondary-700 font-semibold">
              {doctorInfo.title}
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              عيادات متخصصة بصنعاء والحديدة لعلاج أمراض وجراحات المخ والأعصاب وتشوهات وانزلاقات العمود الفقري.
            </p>
          </div>

          <div className="shrink-0 flex sm:flex-col gap-2 w-full sm:w-auto">
            <Link
              to="/contact"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs shadow transition-colors"
            >
              حجز موعد استشارة
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-14">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
              مقالات طبية ذات صلة
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white dark:bg-slate-900 transition-colors rounded-2xl p-6 border border-slate-200 dark:border-slate-800/90 shadow-soft hover:shadow-card-hover transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 mb-2 inline-block">
                      {rel.category}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                      <Link to={`/articles/${rel.id}`} className="hover:text-primary-700 transition-colors">
                        {rel.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                      {rel.summary}
                    </p>
                  </div>
                  <Link
                    to={`/articles/${rel.id}`}
                    className="text-xs font-bold text-primary-700 hover:text-gold-600 transition-colors inline-flex items-center gap-1"
                  >
                    <span>قراءة المقال</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
