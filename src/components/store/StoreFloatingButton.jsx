import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, UploadCloud, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function StoreFloatingButton() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="fixed bottom-5 left-5 z-30 flex flex-col items-start gap-2">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-3 flex flex-col gap-2 max-w-[240px]">
        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 dark:text-white">
          <span className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Headphones className="w-4 h-4" />
          </span>
          <span className="leading-tight">
            {isAr ? 'خدمة عملاء المتجر والصيدلية' : 'Store & Pharmacy Support'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            to="/store/prescription"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-primary-700 hover:from-emerald-700 hover:to-primary-800 text-white font-bold text-[11px] shadow-sm transition-all"
          >
            <UploadCloud className="w-3.5 h-3.5 text-gold-300" />
            <span>{isAr ? 'طلب بصورة وصفة' : 'Upload Rx'}</span>
          </Link>

          <a
            href="https://wa.me/967772070207"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-200 dark:border-emerald-800 transition-colors"
            title={isAr ? 'تواصل واتساب الصيدلية' : 'Pharmacy WhatsApp'}
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
