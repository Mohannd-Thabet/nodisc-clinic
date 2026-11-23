import React from 'react';
import SectionTitle from '../common/SectionTitle';
import StatCard from '../cards/StatCard';
import { doctorInfo } from '../../data/doctorInfo';
import { useLanguage } from '../../context/LanguageContext';

export default function StatsSection() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          subtitle={isAr ? 'مسيرة مليئة بالثقة والنجاح' : 'A Journey of Trust and Excellence'}
          title={isAr ? 'أرقام وإحصائيات تعكس التفاني' : 'Numbers That Reflect Dedication'}
          description={isAr
            ? 'نسعى دوماً لتحقيق أعلى نسب النجاح في العمليات الدقيقة وتقديم رعاية تزرع الأمل وتخفف آلام المرضى.'
            : 'We consistently strive for the highest success rates in precision surgeries, delivering care that inspires hope and relieves patient pain.'}
          light={true}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctorInfo.stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-300 bg-white dark:bg-slate-900 transition-colors/10 inline-block px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            {isAr
              ? '* الإحصائيات والأرقام المذكورة هي تقديرات استرشادية بحاجة إلى تأكيد نهائي ومراجعة دقيقة من قبل الطبيب'
              : '* Statistics and figures mentioned are indicative estimates requiring final confirmation and careful review by the physician.'}
          </p>
        </div>
      </div>
    </section>
  );
}
