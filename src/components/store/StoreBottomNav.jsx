import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, Tag, ShoppingCart, Menu } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';

export default function StoreBottomNav({ onOpenMenu }) {
  const { lang } = useLanguage();
  const { cartCount, openCart } = useCart();
  const isAr = lang === 'ar';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_25px_rgba(0,0,0,0.12)] px-3 py-1.5 transition-colors duration-300">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <NavLink
          to="/store"
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
              isActive
                ? 'text-primary-700 dark:text-secondary-400 font-bold scale-105'
                : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">{isAr ? 'المتجر' : 'Store'}</span>
        </NavLink>

        <NavLink
          to="/store/products"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
              isActive
                ? 'text-primary-700 dark:text-secondary-400 font-bold scale-105'
                : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">{isAr ? 'المنتجات' : 'Products'}</span>
        </NavLink>

        <button
          type="button"
          onClick={openCart}
          className="relative flex flex-col items-center justify-center py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-primary-700 text-white shadow-md -translate-y-2"
        >
          <ShoppingCart className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">{isAr ? 'السلة' : 'Cart'}</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-400 text-slate-950 text-[10px] font-black flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        <NavLink
          to="/store/offers"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
              isActive
                ? 'text-rose-600 dark:text-rose-400 font-bold scale-105'
                : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <Tag className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">{isAr ? 'العروض' : 'Offers'}</span>
        </NavLink>

        <button
          type="button"
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-primary-600"
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">{isAr ? 'القائمة' : 'Menu'}</span>
        </button>
      </div>
    </div>
  );
}
