import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  Phone,
  ShieldCheck,
  Coins,
  Settings,
  Globe,
  Search,
  Heart,
  ShoppingCart,
  Menu,
  Tag,
  UploadCloud,
  Grid,
  Home,
  Sun,
  Moon,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { storeProducts } from '../../data/storeProducts';

export default function StoreHeader({ onOpenMobileDrawer }) {
  const { lang, toggleLanguage, isRtl } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const { cartCount, cartSubtotalYER, openCart } = useCart();
  const { currency, setCurrency, formatPrice, wishlistCount, openStoreSearch } = useStore();
  const location = useLocation();
  const isAr = lang === 'ar';

  const offersCount = storeProducts.filter((p) => p.discountPercent && p.discountPercent > 0).length;

  const storeLinks = [
    { to: '/store', label: isAr ? 'رئيسية المتجر' : 'Store Home', icon: Home, exact: true },
    { to: '/store/products', label: isAr ? 'كل المنتجات' : 'All Products', icon: Grid },
    { to: '/store/offers', label: isAr ? 'العروض والتخفيضات' : 'Offers & Deals', icon: Tag, badge: offersCount },
    { to: '/store/prescription', label: isAr ? 'طلب بصورة وصفة' : 'Rx Upload', icon: UploadCloud },
    { to: '/store/wishlist', label: isAr ? 'المفضلة' : 'Wishlist', icon: Heart, badge: wishlistCount > 0 ? wishlistCount : null },
  ];

  const isLinkActive = (to, exact) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* Dark Store Top Bar */}
      <div className="bg-slate-950 text-slate-200 text-xs py-2 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gold-300 font-bold transition-colors"
            >
              {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{isAr ? 'العودة إلى المركز الطبي' : 'Back to Medical Center'}</span>
            </Link>

            <a
              href="tel:784545908"
              className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span dir="ltr">784545908</span>
            </a>

            <span className="hidden md:inline-flex items-center gap-1.5 text-emerald-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isAr ? 'توصيل واستلام صيدلاني موثوق' : 'Trusted Pharmaceutical Delivery & Pickup'}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* 3-Currency Switcher: YER | SAR | USD */}
            <div className="inline-flex items-center rounded-lg bg-slate-900 border border-slate-700 p-0.5">
              <Coins className="w-3.5 h-3.5 text-gold-400 mx-1.5 hidden sm:block" />
              {[
                { code: 'YER', label: isAr ? 'ر.ي' : 'YER' },
                { code: 'SAR', label: isAr ? 'ر.س' : 'SAR' },
                { code: 'USD', label: '$' },
              ].map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setCurrency(c.code)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-black transition-colors ${
                    currency === c.code
                      ? 'bg-gold-400 text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Store Admin Link */}
            <Link
              to="/admin/products"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              <Settings className="w-3.5 h-3.5 text-secondary-400" />
              <span>{isAr ? 'إدارة المتجر' : 'Store Admin'}</span>
            </Link>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-800 hover:bg-primary-700 text-white font-bold transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isAr ? 'EN' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Main Store Header */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* Store Brand with Official Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenMobileDrawer}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-primary-50"
              aria-label={isAr ? 'قائمة المتجر' : 'Store Menu'}
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/store" className="flex items-center gap-3 group">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-md group-hover:scale-105 transition-transform bg-white shrink-0">
                <img
                  src="/assets/full_logo.jpg"
                  alt={isAr ? 'شعار متجر نوديسك' : 'NODISC Store Logo'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-black text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                  {isAr ? 'متجر نوديسك' : 'NODISC Store'}
                </div>
                <div className="text-[10px] sm:text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                  {isAr ? 'الصيدلية والمستلزمات الطبية' : 'Pharmacy & Medical Supplies'}
                </div>
              </div>
            </Link>
          </div>

          {/* Store Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {storeLinks.map((item) => {
              const Icon = item.icon;
              const active = isLinkActive(item.to, item.exact);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-primary-700 text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary-700 dark:hover:text-secondary-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge !== null && item.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                        active ? 'bg-gold-400 text-slate-950' : 'bg-rose-500 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Store Actions: Search, Dark/Light Theme, Wishlist, Cart */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openStoreSearch}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-950 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-colors"
              aria-label={isAr ? 'بحث في المتجر' : 'Search Store'}
            >
              <Search className="w-4 h-4 text-primary-600 dark:text-secondary-400" />
              <span className="hidden xl:inline">{isAr ? 'بحث في الصيدلية...' : 'Search Store...'}</span>
            </button>

            {/* Dark/Light Mode Switch (Always Visible) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
              aria-label={isAr ? 'الوضع الليلي والنهاري' : 'Toggle Dark/Light Mode'}
              title={isDark ? (isAr ? 'الوضع النهاري' : 'Light Mode') : (isAr ? 'الوضع الليلي' : 'Dark Mode')}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <Link
              to="/store/wishlist"
              className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-rose-500 transition-colors"
              aria-label={isAr ? 'المفضلة' : 'Wishlist'}
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={openCart}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-primary-700 hover:from-emerald-700 hover:to-primary-800 text-white font-bold text-xs shadow-md active:scale-95 transition-all"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold-400 text-slate-950 text-[10px] font-black flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-mono">
                {formatPrice(cartSubtotalYER)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
