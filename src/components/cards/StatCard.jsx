import React from 'react';

export default function StatCard({ stat }) {
  return (
    <div className="bg-white dark:bg-slate-900 transition-colors/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-800/80 shadow-soft hover:shadow-card-hover transition-all duration-300 text-center flex flex-col justify-between group hover:-translate-y-1">
      <div>
        <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary-700 tracking-tight mb-2 group-hover:text-gold-500 transition-colors">
          {stat.value}
        </div>
        
        <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug">
          {stat.label}
        </div>
      </div>

      {stat.note && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <span className={`text-xs block ${stat.unconfirmed ? 'text-slate-400 italic' : 'text-primary-600 font-medium'}`}>
            {stat.note}
          </span>
        </div>
      )}
    </div>
  );
}
