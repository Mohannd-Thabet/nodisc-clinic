import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext(null);

const WISHLIST_STORAGE_KEY = 'nodisc_store_wishlist_v1';
const CURRENCY_STORAGE_KEY = 'nodisc_store_currency_v1';
const CURRENCIES = ['YER', 'SAR', 'USD'];

export function StoreProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    try {
      const saved = localStorage.getItem(CURRENCY_STORAGE_KEY);
      return CURRENCIES.includes(saved) ? saved : 'YER';
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
    setCurrency((prev) => {
      const idx = CURRENCIES.indexOf(prev);
      return CURRENCIES[(idx + 1) % CURRENCIES.length];
    });
  };

  const formatPrice = (priceYER, priceUSD) => {
    const yer = priceYER || 0;
    if (currency === 'USD') {
      const usd = priceUSD ?? Math.round(yer / 535);
      return `$${usd.toLocaleString()}`;
    }
    if (currency === 'SAR') {
      const sar = Math.round(yer / 142);
      return `${sar.toLocaleString()} ر.س`;
    }
    return `${yer.toLocaleString()} ر.ي`;
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
        currencies: CURRENCIES,
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
