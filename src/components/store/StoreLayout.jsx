import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import StoreHeader from './StoreHeader';
import StoreFooter from './StoreFooter';
import StoreMobileDrawer from './StoreMobileDrawer';
import StoreSearchModal from './StoreSearchModal';
import StoreFloatingButton from './StoreFloatingButton';
import StoreCartDrawer from './StoreCartDrawer';
import StoreBottomNav from './StoreBottomNav';
import StoreMarquee from './StoreMarquee';

export default function StoreLayout() {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <StoreHeader onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)} />
      <StoreMarquee />

      <StoreMobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />

      <StoreSearchModal />
      <StoreCartDrawer />

      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      <StoreFooter />
      <StoreBottomNav onOpenMenu={() => setIsMobileDrawerOpen(true)} />
      <StoreFloatingButton />
    </div>
  );
}
