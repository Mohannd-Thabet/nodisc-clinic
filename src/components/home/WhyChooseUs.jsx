import React from 'react';
import SectionTitle from '../common/SectionTitle';
import { Activity, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function WhyChooseUs() {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  const pillars = [
    {
      id: 'p1',
      title: t('home.pillars.p1Title'),
      desc: t('home.pillars.p1Desc'),
      icon: Activity,
    },
    {
      id: 'p2',
      title: t('home.pillars.p2Title'),
      desc: t('home.pillars.p2Desc'),
      icon: ShieldCheck,
    },
    {
      id: 'p3',
      title: t('home.pillars.p3Title'),
      desc: t('home.pillars.p3Desc'),
      icon: Award,
    },
    {
      id: 'p4',
      title: t('home.pillars.p4Title'),
      desc: t('home.pillars.p4Desc'),
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle={isAr ? 'معايير الرعاية والتميز الطبي' : 'Standards of Clinical Excellence'}
          title={t('home.whyChooseUs')}
          description={t('home.whyDesc')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300 rounded-2xl p-7 border border-slate-200 dark:border-slate-800/80 hover:border-primary-400 hover:shadow-card-hover transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-slate-800 text-primary-700 dark:text-secondary-400 flex items-center justify-center mb-6 group-hover:bg-primary-700 group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>

                  <span className="text-xs font-bold text-gold-600 block mb-1 font-mono">
                    0{index + 1}
                  </span>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-700 dark:group-hover:text-secondary-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span>{isAr ? 'معيار جودة معتمد' : 'Certified Standard'}</span>
                  <div className="w-2 h-2 rounded-full bg-primary-400 group-hover:scale-125 transition-transform"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
