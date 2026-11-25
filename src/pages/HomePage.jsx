import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CampaignsCarouselSection from '../components/home/CampaignsCarouselSection';
import DepartmentsCarouselSection from '../components/home/DepartmentsCarouselSection';
import FeaturedServicesCarouselSection from '../components/home/FeaturedServicesCarouselSection';
import NodiscCenterPreview from '../components/home/NodiscCenterPreview';
import NodiscStorePreview from '../components/home/NodiscStorePreview';
import SuccessStoriesPreview from '../components/home/SuccessStoriesPreview';
import WhyChooseUs from '../components/home/WhyChooseUs';
import SpecializationsPreview from '../components/home/SpecializationsPreview';
import StatsSection from '../components/home/StatsSection';
import LatestArticles from '../components/home/LatestArticles';
import NewsCarouselSection from '../components/home/NewsCarouselSection';
import CTASection from '../components/home/CTASection';

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <CampaignsCarouselSection />
      <DepartmentsCarouselSection />
      <FeaturedServicesCarouselSection />
      <NodiscCenterPreview />
      <NodiscStorePreview />
      <SuccessStoriesPreview />
      <WhyChooseUs />
      <SpecializationsPreview />
      <StatsSection />
      <LatestArticles />
      <NewsCarouselSection />
      <CTASection />
    </div>
  );
}
