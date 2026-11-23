import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="breadcrumb" className="py-3 px-4 sm:px-0">
      <ol className="flex items-center flex-wrap gap-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-primary-700 dark:hover:text-secondary-400 transition-colors font-medium"
          >
            <Home className="w-3.5 h-3.5" />
            <span>الرئيسية</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1">
              <ChevronLeft className="w-3 h-3 text-slate-400 dark:text-slate-600" />
              {isLast || !item.to ? (
                <span className="font-bold text-slate-800 dark:text-white truncate max-w-[200px] sm:max-w-xs">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="hover:text-primary-700 dark:hover:text-secondary-400 transition-colors font-medium truncate max-w-[200px]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
