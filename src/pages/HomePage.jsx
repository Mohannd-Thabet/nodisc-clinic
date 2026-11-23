import React from 'react';
import HeroSection from '../components/home/HeroSection';
import NodiscCenterPreview from '../components/home/NodiscCenterPreview';
import NodiscStorePreview from '../components/home/NodiscStorePreview';
import SuccessStoriesPreview from '../components/home/SuccessStoriesPreview';
import WhyChooseUs from '../components/home/WhyChooseUs';
import SpecializationsPreview from '../components/home/SpecializationsPreview';
import StatsSection from '../components/home/StatsSection';
import LatestArticles from '../components/home/LatestArticles';
import CTASection from '../components/home/CTASection';

export default function HomePage() {
  return (
    <div className="space-y-2">
      <HeroSection />
      <NodiscCenterPreview />
      <NodiscStorePreview />
      <SuccessStoriesPreview />
      <WhyChooseUs />
      <SpecializationsPreview />
      <StatsSection />
      <LatestArticles />
      <CTASection />
    </div>
  );
}
