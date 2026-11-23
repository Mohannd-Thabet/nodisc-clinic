import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Home, 
  User, 
  Activity, 
  ShoppingCart, 
  Calendar
} from 'lucide-react';

export default function BottomNav() {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  const navItems = [
    { to: '/', label: isAr ? 'الرئيسية' : 'Home', icon: Home },
    { to: '/nodisc-pain-rehab', label: isAr ? 'نوديسك' : 'NODISC', icon: Activity },
    { to: '/nodisc-store', label: isAr ? 'المتجر' : 'Store', icon: ShoppingCart },
    { to: '/about', label: isAr ? 'عن الطبيب' : 'About', icon: User },
    { to: '/booking', label: isAr ? 'حجز موعد' : 'Book', icon: Calendar, highlight: true },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_25px_rgba(0,0,0,0.1)] px-3 py-1.5 safe-area-pb transition-colors duration-300">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200
                ${item.highlight
                  ? 'bg-gradient-to-r from-primary-700 to-secondary-500 text-white shadow-md shadow-primary-700/20 -translate-y-2 px-3 py-1.5'
                  : isActive
                    ? 'text-primary-700 dark:text-secondary-400 font-bold scale-105'
                    : 'text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-secondary-300'
                }
              `}
            >
              <Icon className={`${item.highlight ? 'w-5 h-5 mb-0.5' : 'w-5 h-5 mb-1'} transition-transform`} />
              <span className={`text-[10px] sm:text-[11px] leading-tight ${item.highlight ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
