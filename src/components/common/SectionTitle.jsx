import React from 'react';

export default function SectionTitle({
  subtitle,
  title,
  description,
  align = 'center',
  light = false,
  className = ''
}) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 ${isCenter ? 'text-center mx-auto' : 'text-right'} max-w-3xl ${className}`}>
      {subtitle && (
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3 tracking-wide ${
          light 
            ? 'bg-white dark:bg-slate-900 transition-colors/10 text-gold-300 border border-white/15' 
            : 'bg-primary-50 text-primary-700 border border-primary-200'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
          <span>{subtitle}</span>
        </div>
      )}
      
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight ${
        light ? 'text-white' : 'text-slate-900 dark:text-white'
      }`}>
        {title}
      </h2>

      {/* Decorative divider */}
      <div className={`flex items-center gap-1.5 my-4 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <span className={`h-1 rounded-full ${light ? 'bg-gold-400 w-12' : 'bg-primary-700 w-12'}`}></span>
        <span className="h-1 w-2.5 rounded-full bg-gold-400"></span>
        <span className={`h-1 w-1.5 rounded-full ${light ? 'bg-white dark:bg-slate-900 transition-colors/40' : 'bg-slate-300'}`}></span>
      </div>

      {description && (
        <p className={`text-base sm:text-lg leading-relaxed ${
          light ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'
        }`}>
          {description}
        </p>
      )}
    </div>
  );
}
