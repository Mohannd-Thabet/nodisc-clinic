import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, BookOpen } from 'lucide-react';

export default function ArticleCard({ article }) {
  return (
    <article className="group bg-white dark:bg-slate-900 transition-colors rounded-2xl border border-slate-200 dark:border-slate-800/90 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Placeholder Graphic Cover Banner */}
        <div className="relative h-44 bg-gradient-to-br from-primary-900 via-primary-700 to-secondary-600 p-5 flex flex-col justify-between overflow-hidden">
          {/* Subtle medical wave pattern backdrop */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white dark:bg-slate-900 transition-colors/10 blur-xl"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-slate-900 transition-colors/20 backdrop-blur-sm text-white border border-white/20">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{article.category}</span>
            </span>
            <span className="text-xs text-white/80 font-medium">
              {article.readTime}
            </span>
          </div>

          <div className="relative z-10">
            <span className="text-xs font-medium text-gold-300">
              دليل تثقيفي طبي
            </span>
            <h4 className="text-white font-bold text-base sm:text-lg line-clamp-2 mt-1 group-hover:text-gold-200 transition-colors">
              {article.title}
            </h4>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-primary-600" />
              <span>{article.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-primary-600" />
              <span>{article.author}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-700 transition-colors line-clamp-2">
            <Link to={`/articles/${article.id}`}>
              {article.title}
            </Link>
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
            {article.summary}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0">
        <Link
          to={`/articles/${article.id}`}
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-primary-700 text-slate-700 hover:text-white font-semibold text-sm transition-all duration-200 group-hover:bg-primary-50 group-hover:text-primary-700 group-hover:hover:bg-primary-700 group-hover:hover:text-white"
        >
          <span>اقرأ المقال بالكامل</span>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
