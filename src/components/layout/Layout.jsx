import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';
import MobileDrawer from './MobileDrawer';
import SmartAssistant from '../common/SmartAssistant';
import ScrollToTop from '../common/ScrollToTop';

export default function Layout({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header onToggleMobileDrawer={() => setIsDrawerOpen(true)} />
      
      {/* Mobile Sidebar Drawer */}
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Main Content with padding-bottom on mobile to prevent bottom nav collision */}
      <main className="flex-1 pb-16 md:pb-0">
        {children || <Outlet />}
      </main>

      <Footer />

      {/* Mobile-First Bottom Navigation Bar */}
      <BottomNav onOpenMenu={() => setIsDrawerOpen(true)} />

      {/* Interactive AI Medical Assistant */}
      <SmartAssistant />

      {/* Scroll To Top Button */}
      <ScrollToTop />
    </div>
  );
}
