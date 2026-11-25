import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CampaignsCarouselSection from '../components/home/CampaignsCarouselSection';
import DepartmentsCarouselSection from '../components/home/DepartmentsCarouselSection';
import FeaturedServicesCarouselSection from '../components/home/FeaturedServicesCarouselSection';
import SuccessStoriesPreview from '../components/home/SuccessStoriesPreview';
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
      <SuccessStoriesPreview />
      <LatestArticles />
      <NewsCarouselSection />
      <CTASection />
    </div>
  );
}
