import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Globe, 
  Sun, 
  Moon, 
  Phone, 
  MapPin, 
  Clock, 
  Calendar, 
  ChevronDown,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';

export default function Header({ onToggleMobileDrawer }) {
  const { lang, setLang, toggleLanguage, t, isRtl } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const { cartCount, openCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeDropdown, setActiveDropdown] = useState(null);

  const isAr = lang === 'ar';

  const mainLinks = [
    { to: '/', label: isAr ? 'الرئيسية' : 'Home' },
    { 
      label: isAr ? 'الأقسام الطبية' : 'Departments', 
      dropdown: [
        { to: '/departments', label: isAr ? 'استعراض الأقسام الطبية التخصصية' : 'Explore All Departments' },
        { to: '/departments/neurosurgery', label: isAr ? 'جراحة المخ والأعصاب والعمود الفقري' : 'Neurosurgery & Spine Suite' },
        { to: '/departments/pain', label: isAr ? 'مركز نوديسك لعلاج الألم والتأهيل' : 'NODISC Pain Rehabilitation' },
        { to: '/departments/rehabilitation', label: isAr ? 'نوديسك للتأهيل والعلاج الطبيعي' : 'Physical Therapy & Rehab' },
        { to: '/departments/pharmacy', label: isAr ? 'صيدلية ومتجر نوديسك الطبي' : 'Medical Pharmacy & Store' },
      ]
    },
    { to: '/services-list', label: isAr ? 'الخدمات والإجراءات' : 'Services & Procedures' },
    { 
      to: '/store', 
      label: isAr ? 'المتجر' : 'Store', 
      highlightBadge: isAr ? 'جديد' : 'New',
    },
    { to: '/library', label: isAr ? 'المكتبة الطبية' : 'Medical Library' },
    { to: '/media-center', label: isAr ? 'المركز الإعلامي وقصص النجاح' : 'Media Center & Stories' },
    { to: '/campaigns', label: isAr ? 'الحملات المجانية' : 'Free Campaigns', highlightBadge: isAr ? 'مجاني' : 'Free' },
    { to: '/about', label: isAr ? 'عن الطبيب' : 'About Doctor' },
    { 
      label: isAr ? 'تواصل معنا' : 'Contact Us', 
      dropdown: [
        { to: '/contact', label: isAr ? 'مواقع العيادة وأرقام الاتصال' : 'Locations & Contact Info' },
        { to: '/survey', label: isAr ? 'استبيان تقييم الخدمة' : 'Patient Experience Survey' },
        { to: '/feedback', label: isAr ? 'صندوق الشكاوى والمقترحات' : 'Complaints & Suggestions' },
      ]
    },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {/* Top Banner (Desktop only) */}
      <div className="hidden lg:block bg-gradient-to-r from-primary-950 via-primary-900 to-primary-800 text-slate-200 text-xs py-2 px-6 border-b border-primary-800/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              {t('common.locationAddress')}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-secondary-400" />
              {t('common.morningShift')} | {t('common.eveningShift')}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a 
              href="tel:+967784545908" 
              className="flex items-center gap-1.5 font-bold hover:text-gold-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span dir="ltr">784545908</span>
            </a>
            <span className="text-primary-700">|</span>
            <a 
              href="https://wa.me/967772070207" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-emerald-400 transition-colors font-medium flex items-center gap-1"
            >
              <span>{isAr ? 'واتساب:' : 'WhatsApp:'}</span>
              <span dir="ltr">772070207</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-700 to-secondary-500 p-0.5 shadow-md shadow-primary-900/10 group-hover:scale-105 transition-transform duration-300 shrink-0">
            <img 
              src="/assets/full_logo.jpg" 
              alt="Logo" 
              className="w-full h-full object-cover rounded-[14px]"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden w-full h-full bg-primary-800 text-white items-center justify-center font-bold text-xl rounded-[14px]">
              {isAr ? 'ن' : 'N'}
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-black text-slate-900 dark:text-white text-sm sm:text-base md:text-lg leading-tight truncate group-hover:text-primary-700 dark:group-hover:text-secondary-400 transition-colors">
                {isAr ? 'نوديسك كلينك' : 'NODISC Clinic'}
              </span>
              <span className="hidden lg:inline-block text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-secondary-300 border border-primary-200 dark:border-primary-800" dir="ltr">
                {isAr ? 'NODISC Clinic' : 'د. محمد الجرباني'}
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
              {isAr
                ? 'د. محمد عبدالله الجرباني — استشاري جراحة المخ والأعصاب'
                : 'Dr. Mohammed Al-Jarbani — Consultant Neurosurgeon'}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
          {mainLinks.map((link, idx) => {
            if (link.dropdown) {
              const isOpen = activeDropdown === idx;
              return (
                <div 
                  key={idx} 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(idx)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button 
                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-primary-700 dark:hover:text-secondary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180 text-primary-600' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="absolute top-full right-0 rtl:right-0 ltr:left-0 mt-1 w-52 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      {link.dropdown.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          to={sub.to}
                          className="block px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-primary-50 dark:hover:bg-slate-700 hover:text-primary-700 dark:hover:text-secondary-400 transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = location.pathname === link.to;
            return (
              <Link
                key={idx}
                to={link.to}
                className={`relative px-3 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-primary-700 dark:text-secondary-400 bg-primary-50 dark:bg-slate-800/80 shadow-sm'
                    : 'text-slate-700 dark:text-slate-200 hover:text-primary-700 dark:hover:text-secondary-400 hover:bg-slate-100/70 dark:hover:bg-slate-800'
                }`}
              >
                <span>{link.label}</span>
                {link.highlightBadge && (
                  <span className="px-1.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-black animate-pulse">
                    {link.highlightBadge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls (Theme, Language, Booking) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark / Light Mode Switch */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none"
            title={isDark ? (isAr ? 'الوضع النهاري' : 'Light Mode') : (isAr ? 'الوضع الليلي' : 'Dark Mode')}
            aria-label="Toggle Dark Mode"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Language Switch: Compact EG */}
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold font-mono transition-colors flex items-center gap-1 focus:outline-none shrink-0"
            title={isAr ? 'Switch Language to English' : 'تحويل اللغة إلى العربية'}
          >
            <Globe className="w-3.5 h-3.5 text-secondary-500" />
            <span>{isAr ? 'EG' : 'AR'}</span>
          </button>

          {/* Direct WhatsApp Callout in Header (ultra-wide only) */}
          <a
            href="https://wa.me/967772070207"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-[#25D366] text-xs font-bold border border-emerald-200 dark:border-emerald-800 shrink-0"
          >
            <div className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            <span dir="ltr">{isAr ? 'واتساب: 772070207' : 'WhatsApp: 772070207'}</span>
          </a>

          {/* Shopping Cart Button with Live Counter Badge */}
          <button
            type="button"
            onClick={() => {
              openCart();
              if (location.pathname !== '/nodisc-store') {
                navigate('/nodisc-store');
              }
            }}
            className="relative p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center cursor-pointer active:scale-95"
            title={isAr ? 'سلة المشتريات الطبية' : 'Medical Cart'}
          >
            <ShoppingBag className="w-4 h-4 text-primary-600 dark:text-secondary-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center tabular-nums shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Booking CTA (Desktop) */}
          <Link
            to="/booking"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-500 hover:from-primary-800 hover:to-secondary-600 text-white text-xs md:text-sm font-bold shadow-md shadow-primary-700/20 hover:shadow-lg active:scale-95 transition-all duration-200"
          >
            <Calendar className="w-4 h-4 text-gold-300" />
            <span>{t('nav.booking')}</span>
          </Link>

          {/* Mobile Drawer Hamburger */}
          <button
            onClick={onToggleMobileDrawer}
            className="xl:hidden p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
