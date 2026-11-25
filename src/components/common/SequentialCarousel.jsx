import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function SequentialCarousel({
  items = [],
  renderItem,
  autoPlayInterval = 4000,
  slidesPerView = { mobile: 1, tablet: 2, desktop: 3 },
  className = '',
  dotActiveClass = 'bg-primary-600 w-6',
  dotInactiveClass = 'bg-slate-300 dark:bg-slate-600 w-2',
  arrowClass = 'bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-white border-slate-200 dark:border-slate-700 hover:bg-primary-600 hover:text-white hover:border-primary-600',
}) {
  const { isRtl } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [perView, setPerView] = useState(slidesPerView.desktop || 3);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const dragStartX = useRef(null);
  const isDragging = useRef(false);

  // Detect reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  // Responsive slides per view
  useEffect(() => {
    const updatePerView = () => {
      if (window.innerWidth >= 1024) {
        setPerView(slidesPerView.desktop || 3);
      } else if (window.innerWidth >= 640) {
        setPerView(slidesPerView.tablet || 2);
      } else {
        setPerView(slidesPerView.mobile || 1);
      }
    };
    updatePerView();
    window.addEventListener('resize', updatePerView);
    return () => window.removeEventListener('resize', updatePerView);
  }, [slidesPerView.desktop, slidesPerView.tablet, slidesPerView.mobile]);

  const totalItems = items.length;
  const maxIndex = Math.max(0, totalItems - perView);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const goNext = useCallback(() => {
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play sequential sliding (pauses on hover/focus, respects reduced motion)
  useEffect(() => {
    if (!autoPlayInterval || maxIndex === 0 || isHovered || isFocused || prefersReducedMotion) {
      return;
    }
    const timer = setInterval(goNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, maxIndex, isHovered, isFocused, prefersReducedMotion, goNext]);

  // Touch & mouse drag handlers
  const handlePointerDown = (e) => {
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? null;
    isDragging.current = true;
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current || dragStartX.current === null) return;
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? dragStartX.current;
    const diff = endX - dragStartX.current;
    isDragging.current = false;
    dragStartX.current = null;

    if (Math.abs(diff) > 40) {
      if (isRtl) {
        if (diff > 0) goNext();
        else goPrev();
      } else {
        if (diff < 0) goNext();
        else goPrev();
      }
    }
  };

  if (!items || items.length === 0) return null;

  const totalDots = maxIndex + 1;
  const translatePercent = (currentIndex * 100) / totalItems;

  return (
    <div
      className={`relative group/carousel select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        isDragging.current = false;
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseDown={handlePointerDown}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchEnd={handlePointerUp}
    >
      {/* Overflow viewport */}
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            width: `${(totalItems * 100) / perView}%`,
            transform: `translateX(${isRtl ? translatePercent : -translatePercent}%)`,
          }}
        >
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="px-2.5 box-border shrink-0"
              style={{ width: `${100 / totalItems}%` }}
            >
              {renderItem(item, idx)}
            </div>
          ))}
        </div>
      </div>

      {/* Prominent Circular Navigation Arrows on sides over the carousel */}
      {maxIndex > 0 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              isRtl ? goPrev() : goPrev();
            }}
            aria-label={isRtl ? 'السابق' : 'Previous'}
            className={`absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full border shadow-xl flex items-center justify-center transition-all duration-200 active:scale-90 ${arrowClass} ${
              isRtl ? 'right-1 sm:-right-4' : 'left-1 sm:-left-4'
            }`}
          >
            {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label={isRtl ? 'التالي' : 'Next'}
            className={`absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full border shadow-xl flex items-center justify-center transition-all duration-200 active:scale-90 ${arrowClass} ${
              isRtl ? 'left-1 sm:-left-4' : 'right-1 sm:-right-4'
            }`}
          >
            {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </>
      )}

      {/* Bottom Pagination Dots (No manual pause button) */}
      {totalDots > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-6">
          {Array.from({ length: totalDots }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? dotActiveClass : dotInactiveClass
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
