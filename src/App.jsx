import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BiographyPage from './pages/BiographyPage';
import BrainNeurologyPage from './pages/BrainNeurologyPage';
import SpineCarePage from './pages/SpineCarePage';
import NeurosurgeryPage from './pages/NeurosurgeryPage';
import PhysiotherapyPage from './pages/PhysiotherapyPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticlePage from './pages/ArticlePage';
import HealthAwarenessPage from './pages/HealthAwarenessPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import SurveyPage from './pages/SurveyPage';
import FeedbackPage from './pages/FeedbackPage';
import SpecializationsPage from './pages/SpecializationsPage';
import ServicesPage from './pages/ServicesPage';
import LocationsPage from './pages/LocationsPage';
import NodiscPainRehabPage from './pages/NodiscPainRehabPage';
import NodiscStorePage from './pages/NodiscStorePage';
import MediaCenterPage from './pages/MediaCenterPage';

// New Pages
import DepartmentsPage from './pages/DepartmentsPage';
import DepartmentDetailPage from './pages/DepartmentDetailPage';
import ServicesListPage from './pages/ServicesListPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import LibraryPage from './pages/LibraryPage';
import LibraryDetailPage from './pages/LibraryDetailPage';
import CampaignsPage from './pages/CampaignsPage';
import CampaignDetailPage from './pages/CampaignDetailPage';
import NewsDetailPage from './pages/NewsDetailPage';

// Admin Control Panel Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminHomepageEditor } from './pages/admin/AdminHomepageEditor';
import { AdminDepartmentsPage } from './pages/admin/AdminDepartmentsPage';
import { AdminContentPage } from './pages/admin/AdminContentPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminScheduleSmsPage } from './pages/admin/AdminScheduleSmsPage';
import { AdminCampaignsPage } from './pages/admin/AdminCampaignsPage';
import { AdminStoreStructurePage } from './pages/admin/AdminStoreStructurePage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminPrescriptionsPage } from './pages/admin/AdminPrescriptionsPage';
import { AdminInboxPage } from './pages/admin/AdminInboxPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// 6 New Comprehensive Enterprise Modules
import { AdminPainRehabPage } from './pages/admin/AdminPainRehabPage';
import { AdminPatientsEmrPage } from './pages/admin/AdminPatientsEmrPage';
import { AdminSurgicalCasesPage } from './pages/admin/AdminSurgicalCasesPage';
import { AdminFinanceBillingPage } from './pages/admin/AdminFinanceBillingPage';
import { AdminCouponsPage } from './pages/admin/AdminCouponsPage';
import { AdminAnnouncementsPage } from './pages/admin/AdminAnnouncementsPage';

export default function App() {
  return (
    <Routes>
      {/* ===== لوحة التحكم الإدارية المتكاملة ===== */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminOverviewPage />} />
      <Route path="/admin/pain-rehab" element={<AdminPainRehabPage />} />
      <Route path="/admin/patients-emr" element={<AdminPatientsEmrPage />} />
      <Route path="/admin/surgical-cases" element={<AdminSurgicalCasesPage />} />
      <Route path="/admin/finance-billing" element={<AdminFinanceBillingPage />} />
      <Route path="/admin/coupons" element={<AdminCouponsPage />} />
      <Route path="/admin/announcements" element={<AdminAnnouncementsPage />} />
      <Route path="/admin/homepage" element={<AdminHomepageEditor />} />
      <Route path="/admin/departments" element={<AdminDepartmentsPage />} />
      <Route path="/admin/content" element={<AdminContentPage />} />
      <Route path="/admin/bookings" element={<AdminBookingsPage />} />
      <Route path="/admin/schedule-sms" element={<AdminScheduleSmsPage />} />
      <Route path="/admin/campaigns" element={<AdminCampaignsPage />} />
      <Route path="/admin/store-structure" element={<AdminStoreStructurePage />} />
      <Route path="/admin/products" element={<AdminProductsPage />} />
      <Route path="/admin/orders" element={<AdminOrdersPage />} />
      <Route path="/admin/prescriptions" element={<AdminPrescriptionsPage />} />
      <Route path="/admin/inbox" element={<AdminInboxPage />} />
      <Route path="/admin/reports" element={<AdminReportsPage />} />
      <Route path="/admin/users" element={<AdminUsersPage />} />
      <Route path="/admin/settings" element={<AdminSettingsPage />} />

      {/* ===== الموقع العام ===== */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        
        {/* Doctor & Bio */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/biography" element={<Navigate to="/about" replace />} />
        
        {/* Core Medical Sections */}
        <Route path="/brain-neurology" element={<BrainNeurologyPage />} />
        <Route path="/spine-care" element={<SpineCarePage />} />
        <Route path="/neurosurgery" element={<NeurosurgeryPage />} />
        <Route path="/physiotherapy" element={<PhysiotherapyPage />} />
        <Route path="/nodisc-physiotherapy" element={<PhysiotherapyPage />} />
        <Route path="/nodisc-pain-rehab" element={<NodiscPainRehabPage />} />
        <Route path="/nodisc" element={<Navigate to="/nodisc-pain-rehab" replace />} />
        <Route path="/nodisc-store" element={<NodiscStorePage />} />
        <Route path="/store" element={<Navigate to="/nodisc-store" replace />} />
        <Route path="/specializations" element={<SpecializationsPage />} />
        <Route path="/services" element={<Navigate to="/services-list" replace />} />
        <Route path="/services-list" element={<ServicesListPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/locations" element={<LocationsPage />} />

        {/* Departments */}
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/departments/:slug" element={<DepartmentDetailPage />} />

        {/* Medical Library */}
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/library/:slug" element={<LibraryDetailPage />} />

        {/* Campaigns */}
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/campaigns/:slug" element={<CampaignDetailPage />} />

        {/* Media Center, News & Success Stories */}
        <Route path="/media-center" element={<MediaCenterPage />} />
        <Route path="/news/:slug" element={<NewsDetailPage />} />
        <Route path="/news" element={<Navigate to="/media-center" replace />} />
        <Route path="/success-stories" element={<Navigate to="/media-center" replace />} />

        {/* Education & Awareness */}
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
        <Route path="/health-awareness" element={<HealthAwarenessPage />} />
        <Route path="/awareness" element={<Navigate to="/health-awareness" replace />} />

        {/* Booking & Interaction */}
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/book" element={<Navigate to="/booking" replace />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Institutional & Community */}
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
