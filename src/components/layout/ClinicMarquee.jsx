import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { campaignsData } from '../../data/campaignsData';

export default function ClinicMarquee() {
  const { lang, isRtl } = useLanguage();
  const isAr = lang === 'ar';

  const activeCampaign = campaignsData.find((c) => c.status === 'open') || campaignsData[0];
  const remainingSeats = activeCampaign
    ? Math.max(0, (activeCampaign.totalCapacity || 0) - (activeCampaign.bookedCount || 0))
    : 0;

  const items = [
    {
      badge: isAr ? 'تخصص العيادة' : 'Clinic Specialty',
      text: isAr
        ? 'استشاري جراحة المخ والأعصاب والعمود الفقري وعلاج الألم بدون جراحة'
        : 'Consultant Neurosurgery, Spine Surgery & Non-Surgical Pain Rehab',
      to: '/departments/neurosurgery',
    },
    {
      badge: isAr ? 'حملة طبية نشطة' : 'Active Campaign',
      text: activeCampaign
        ? isAr
          ? `${activeCampaign.title} (متبقي ${remainingSeats} مقعد)`
          : `${activeCampaign.title} (${remainingSeats} seats left)`
        : isAr ? 'حملات الفحص المجاني' : 'Free Medical Campaigns',
      to: activeCampaign ? `/campaigns/${activeCampaign.slug}` : '/campaigns',
    },
    {
      badge: isAr ? 'الإشراف الطبي' : 'Medical Supervision',
      text: isAr
        ? 'تحت إشراف الدكتور محمد عبدالله الجرباني وفريق نوديسك الاستشاري'
        : 'Supervised by Dr. Mohammed Abdullah Al-Jarbani & NODISC Medical Team',
      to: '/about',
    },
    {
      badge: isAr ? 'الحجز الإلكتروني' : 'Online Booking',
      text: isAr
        ? 'احجز موعد استشارتك الطبية أو جلسة التأهيل إلكترونياً خلال ثوانٍ'
        : 'Book your medical consultation or rehab session online in seconds',
      to: '/booking',
    },
    {
      badge: isAr ? 'المتجر الطبي' : 'Medical Store',
      text: isAr
        ? 'تسوق الدعامات الطبية وأجهزة التأهيل من متجر نوديسك الصيدلاني'
        : 'Shop certified spinal braces & rehab devices at NODISC Pharmacy Store',
      to: '/store',
    },
  ];

  const durationSeconds = items.length * 7;

  const renderGroup = (prefix) =>
    items.map((item, idx) => (
      <React.Fragment key={`${prefix}-${idx}`}>
        <Link
          to={item.to}
          dir={isRtl ? 'rtl' : 'ltr'}
          className="inline-flex items-center gap-2.5 px-5 py-2 shrink-0 hover:opacity-80 transition-opacity"
        >
          <Stethoscope className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <span className="px-2.5 py-0.5 rounded-full bg-[#0F4C5C] text-white text-[10px] sm:text-[11px] font-black shadow-xs shrink-0">
            {item.badge}
          </span>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
            {item.text}
          </span>
        </Link>
        <span className="w-px h-4 bg-cyan-300/70 dark:bg-slate-700 shrink-0" />
      </React.Fragment>
    ));

  return (
    <div
      className="nodisc-marquee-container relative w-full overflow-hidden bg-gradient-to-r from-cyan-50 via-sky-50 to-teal-50 dark:from-slate-900 dark:via-cyan-950/30 dark:to-slate-900 border-b border-cyan-200/70 dark:border-slate-800"
      role="region"
      aria-label={isAr ? 'شريط إعلانات العيادة' : 'Clinic Announcements'}
    >
      {/* Soft Edge Fade Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-cyan-50 dark:from-slate-900 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-teal-50 dark:from-slate-900 to-transparent z-10" />

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
