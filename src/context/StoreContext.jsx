import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext(null);

const WISHLIST_STORAGE_KEY = 'nodisc_store_wishlist_v1';
const CURRENCY_STORAGE_KEY = 'nodisc_store_currency_v1';

export function StoreProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    try {
      return localStorage.getItem(CURRENCY_STORAGE_KEY) || 'YER';
    } catch {
      return 'YER';
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isStoreSearchOpen, setIsStoreSearchOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
    } catch {
      // ignore
    }
  }, [currency]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'YER' ? 'USD' : 'YER'));
  };

  const formatPrice = (priceYER, priceUSD) => {
    if (currency === 'USD') {
      const usd = priceUSD ?? Math.round((priceYER || 0) / 535);
      return `$${usd.toLocaleString()}`;
    }
    return `${(priceYER || 0).toLocaleString()} ر.ي`;
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  return (
    <StoreContext.Provider
      value={{
        currency,
        setCurrency,
        toggleCurrency,
        formatPrice,
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        isStoreSearchOpen,
        openStoreSearch: () => setIsStoreSearchOpen(true),
        closeStoreSearch: () => setIsStoreSearchOpen(false),
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return ctx;
}
