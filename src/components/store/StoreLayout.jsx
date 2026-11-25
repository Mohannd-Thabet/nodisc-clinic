import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import StoreHeader from './StoreHeader';
import StoreFooter from './StoreFooter';
import StoreMobileDrawer from './StoreMobileDrawer';
import StoreSearchModal from './StoreSearchModal';
import StoreFloatingButton from './StoreFloatingButton';
import StoreCartDrawer from './StoreCartDrawer';

export default function StoreLayout() {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <StoreHeader onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)} />

      <StoreMobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />

      <StoreSearchModal />
      <StoreCartDrawer />

      <main className="flex-1">
        <Outlet />
      </main>

      <StoreFooter />
      <StoreFloatingButton />
    </div>
  );
}
