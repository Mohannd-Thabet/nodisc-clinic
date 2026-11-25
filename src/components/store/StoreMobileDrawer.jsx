import React from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Home,
  Grid,
  Tag,
  UploadCloud,
  Heart,
  ArrowRight,
  ArrowLeft,
  Pill,
  Phone,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useStore } from '../../context/StoreContext';
import { storeCategories, storeProducts } from '../../data/storeProducts';

export default function StoreMobileDrawer({ isOpen, onClose }) {
  const { lang, isRtl } = useLanguage();
  const { wishlistCount } = useStore();
  const isAr = lang === 'ar';

  if (!isOpen) return null;

  const offersCount = storeProducts.filter((p) => p.discountPercent > 0).length;

  const links = [
    { to: '/store', label: isAr ? 'رئيسية المتجر' : 'Store Home', icon: Home },
    { to: '/store/products', label: isAr ? 'كل المنتجات' : 'All Products', icon: Grid },
    { to: '/store/offers', label: isAr ? `العروض والتخفيضات (${offersCount})` : `Offers (${offersCount})`, icon: Tag },
    { to: '/store/prescription', label: isAr ? 'طلب بصورة وصفة طبية' : 'Upload Prescription', icon: UploadCloud },
    { to: '/store/wishlist', label: isAr ? `المفضلة (${wishlistCount})` : `Wishlist (${wishlistCount})`, icon: Heart },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-80 max-w-[85vw] bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-950 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-emerald-500/40 bg-white shrink-0 p-0.5">
              <img
                src="/assets/nodisc_photo.jpg"
                alt={isAr ? 'شعار متجر نوديسك' : 'NODISC Store Logo'}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div>
              <div className="font-black text-sm">{isAr ? 'متجر نوديسك' : 'NODISC Store'}</div>
              <div className="text-[10px] text-emerald-300">{isAr ? 'الصيدلية والمستلزمات' : 'Pharmacy & Supplies'}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Store Links */}
        <div className="p-4 space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase px-2 mb-2">
            {isAr ? 'تصفح المتجر' : 'Store Navigation'}
          </div>
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-primary-50 dark:hover:bg-primary-950/50 hover:text-primary-700 dark:hover:text-secondary-400 transition-colors"
              >
                <Icon className="w-4 h-4 text-primary-600 dark:text-secondary-400" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Main Sections with Images */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase px-2">
            {isAr ? 'المجموعات الرئيسية للمتجر' : 'Main Store Sections'}
          </div>
          {storeCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/store/categories?section=${cat.id}`}
              onClick={onClose}
              className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary-400 transition-all"
            >
              <img
                src={cat.image}
                alt={isAr ? cat.name : cat.nameEn}
                className="w-12 h-12 rounded-xl object-cover shrink-0"
                onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
              />
              <div className="min-w-0">
                <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                  {isAr ? cat.name : cat.nameEn}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {isAr ? cat.description : cat.descriptionEn}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Back to Clinic & Phone */}
        <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-800 space-y-2 bg-slate-50 dark:bg-slate-950">
          <Link
            to="/"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-700 text-white font-bold text-xs"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{isAr ? 'العودة إلى المركز الطبي' : 'Back to Medical Center'}</span>
          </Link>
          <a
            href="tel:784545908"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span dir="ltr">784545908</span>
          </a>
        </div>
      </div>
    </div>
  );
}
