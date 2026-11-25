import React, { useState } from 'react';
import {
  Building2,
  Sparkles,
  Activity,
  Award,
  BookOpen,
  Newspaper,
} from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import CampaignsCarouselSection from '../components/home/CampaignsCarouselSection';
import DepartmentsCarouselSection from '../components/home/DepartmentsCarouselSection';
import FeaturedServicesCarouselSection from '../components/home/FeaturedServicesCarouselSection';
import SuccessStoriesPreview from '../components/home/SuccessStoriesPreview';
import LatestArticles from '../components/home/LatestArticles';
import NewsCarouselSection from '../components/home/NewsCarouselSection';
import CTASection from '../components/home/CTASection';
import { useLanguage } from '../context/LanguageContext';

export default function HomePage() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState('departments');

  const sectionTabs = [
    { id: 'departments', label: isAr ? 'الأقسام الطبية' : 'Departments', icon: Building2 },
    { id: 'campaigns', label: isAr ? 'الحملات الطبية' : 'Campaigns', icon: Sparkles },
    { id: 'services', label: isAr ? 'الخدمات المختارة' : 'Services', icon: Activity },
    { id: 'stories', label: isAr ? 'قصص النجاح' : 'Success Stories', icon: Award },
    { id: 'library', label: isAr ? 'المكتبة والفيديو' : 'Library & Video', icon: BookOpen },
    { id: 'news', label: isAr ? 'أخبار المركز' : 'Center News', icon: Newspaper },
  ];

  return (
    <div className="space-y-0">
      <HeroSection />

      {/* Focused Section Switcher so Home shows only the selected showcase instead of stacking all pages */}
      <section className="bg-white dark:bg-slate-900 border-t border-b border-slate-200 dark:border-slate-800 py-5 px-4 sm:px-6 sticky top-[64px] lg:top-[104px] z-20 backdrop-blur-md bg-white/95 dark:bg-slate-900/95">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
          {sectionTabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all border ${
                  active
                    ? 'bg-primary-700 text-white border-primary-700 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-primary-400'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-gold-300' : 'text-primary-600 dark:text-secondary-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Sequential Carousel View */}
      <div>
        {activeTab === 'departments' && <DepartmentsCarouselSection />}
        {activeTab === 'campaigns' && <CampaignsCarouselSection />}
        {activeTab === 'services' && <FeaturedServicesCarouselSection />}
        {activeTab === 'stories' && <SuccessStoriesPreview />}
        {activeTab === 'library' && <LatestArticles />}
        {activeTab === 'news' && <NewsCarouselSection />}
      </div>

      <CTASection />
    </div>
  );
}
