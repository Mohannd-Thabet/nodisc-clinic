import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useDataStore } from '../context/DataStoreContext';

export const ClinicLogoMark: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  let nameAr = 'نوديسك كلينك';
  let nameEn = 'NODISC Clinic';
  let logo = '/assets/full_logo.jpg';

  try {
    const dataStore = useDataStore();
    if (dataStore?.siteConfigState?.brand) {
      nameAr = dataStore.siteConfigState.brand.nameAr || nameAr;
      nameEn = dataStore.siteConfigState.brand.nameEn || nameEn;
      logo = dataStore.siteConfigState.brand.logoUrl || logo;
    }
  } catch {
    // fallback
  }

  return (
    <span className="inline-flex items-center gap-3 shrink-0">
      <span className="relative w-11 h-11 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1B4965] via-[#2787be] to-[#4DA6D1] p-0.5 shadow-md shadow-slate-900/10 shrink-0">
        <img
          src={logo}
          alt={nameAr}
          className="w-full h-full object-cover rounded-[14px]"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display font-extrabold text-base sm:text-lg text-slate-900 whitespace-nowrap">
          {nameAr}
        </span>
        {!compact && (
          <span
            className="text-[11px] font-bold text-[#1B4965] tracking-tight whitespace-nowrap"
            dir="ltr"
          >
            {nameEn}
          </span>
        )}
      </span>
    </span>
  );
};

interface DoctorPortraitFrameProps {
  imageUrl: string | null;
  name: string;
  placeholderNote: string;
  size?: 'md' | 'lg';
}

export const DoctorPortraitFrame: React.FC<DoctorPortraitFrameProps> = ({
  imageUrl,
  name,
  placeholderNote,
  size = 'md',
}) => {
  const dimensions = size === 'lg' ? 'w-full aspect-[4/4] max-w-sm' : 'w-full aspect-[4/3]';
  const finalImage = imageUrl || '/assets/doctor_photo.webp';

  return (
    <div className={`${dimensions} relative rounded-3xl overflow-hidden border-2 border-slate-200/80 bg-gradient-to-b from-slate-100 to-slate-200/50 shadow-md group`}>
      <img
        src={finalImage}
        alt={name}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/assets/doctor_real.jpg';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
      <div className="absolute bottom-3 right-3 left-3 text-white">
        <p className="font-display font-bold text-sm sm:text-base leading-tight drop-shadow-md">{name}</p>
        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#1B4965]/90 backdrop-blur-xs text-[10px] font-bold text-amber-300 border border-white/20">
          استشاري جراحة المخ والأعصاب والعمود الفقري
        </span>
      </div>
    </div>
  );
};
