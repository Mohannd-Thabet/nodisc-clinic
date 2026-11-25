import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { storeProducts } from '../../data/storeProducts';

export default function StoreMarquee() {
  const { lang, isRtl } = useLanguage();
  const isAr = lang === 'ar';

  const offersCount = storeProducts.filter((p) => p.discountPercent && p.discountPercent > 0).length;

  const items = [
    {
      badge: isAr ? `${offersCount} عروض نشطة` : `${offersCount} Active Offers`,
      text: isAr
        ? 'تخفيضات حصرية على الدعامات الطبية وأجهزة العلاج الطبيعي'
        : 'Exclusive discounts on medical braces and physiotherapy devices',
      to: '/store/offers',
    },
    {
      badge: isAr ? 'خدمة الوصفة الطبية' : 'Prescription Service',
      text: isAr
        ? 'ارفع صورة وصفتك الطبية ليقوم الصيدلاني بتجهيزها فوراً'
        : 'Upload your prescription image for instant pharmacist preparation',
      to: '/store/prescription',
    },
    {
      badge: isAr ? 'اعتماد طبي' : 'Certified Products',
      text: isAr
        ? 'جميع المستلزمات والمنتجات الصيدلانية مفحوصة ومعتمدة من مركز نوديسك'
        : 'All pharmaceutical supplies are tested and certified by NODISC Center',
      to: '/store/products',
    },
    {
      badge: isAr ? 'الدفع الإلكتروني' : 'E-Payment',
      text: isAr
        ? 'متاح الدفع عبر الكريمي، جوالي، جيب، ون كاش، فلوسك أو نقداً عند الاستلام'
        : 'Pay via Al-Kuraimi, Jawali, Jeeb, OneCash, Flousak, or Cash on Delivery',
      to: '/store',
    },
    {
      badge: isAr ? 'خيارات الاستلام' : 'Delivery & Pickup',
      text: isAr
        ? 'توصيل سريع إلى باب المنزل أو استلام مباشر من صيدلية المركز'
        : 'Fast home delivery or direct pickup from the clinic pharmacy',
      to: '/store',
    },
  ];

  const durationSeconds = items.length * 7;

  const renderGroup = (prefix) =>
    items.map((item, idx) => (
      <Link
        key={`${prefix}-${idx}`}
        to={item.to}
        dir={isRtl ? 'rtl' : 'ltr'}
        className="inline-flex items-center gap-2.5 px-5 py-2 shrink-0 hover:opacity-80 transition-opacity"
      >
        <Tag className="w-3.5 h-3.5 text-rose-500 shrink-0" />
        <span className="px-2.5 py-0.5 rounded-full bg-[#E11D48] text-white text-[10px] sm:text-[11px] font-black shadow-xs shrink-0">
          {item.badge}
        </span>
        <span className="text-xs font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
          {item.text}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-rose-300 dark:bg-rose-700 mx-1 shrink-0" />
      </Link>
    ));

  return (
    <div
      className="nodisc-marquee-container relative w-full overflow-hidden bg-gradient-to-r from-sky-50 via-cyan-50/70 to-rose-50 dark:from-slate-900 dark:via-slate-900 dark:to-rose-950/30 border-b border-rose-200/60 dark:border-slate-800"
      role="region"
      aria-label={isAr ? 'شريط إعلانات المتجر' : 'Store Announcements'}
    >
      {/* Soft Edge Fade Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-sky-50 dark:from-slate-900 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-rose-50 dark:from-slate-900 to-transparent z-10" />

      <div dir="ltr" className="overflow-hidden">
        <div
          className="nodisc-marquee-track"
          style={{ '--marquee-duration': `${durationSeconds}s` }}
        >
          <div className="flex items-center shrink-0">{renderGroup('a')}</div>
          <div className="flex items-center shrink-0" aria-hidden="true">{renderGroup('b')}</div>
        </div>
      </div>
    </div>
  );
}
