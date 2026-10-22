import { useEffect, useRef, useState } from 'react';

// One observer per option set, shared by every element on the page.
const observers = new Map();
const callbacks = new WeakMap();

const getObserver = (rootMargin, threshold) => {
  const key = `${rootMargin}|${threshold}`;
  if (!observers.has(key)) {
    observers.set(key, new IntersectionObserver((entries) => {
      entries.forEach((entry) => callbacks.get(entry.target)?.(entry));
    }, { rootMargin, threshold }));
  }
  return observers.get(key);
};

// Reports when the element first scrolls into view (or every time, with once=false).
export const useInView = ({ once = true, rootMargin = '0px 0px -8% 0px', threshold = 0.12 } = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = getObserver(rootMargin, threshold);
    callbacks.set(node, (entry) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) {
          observer.unobserve(node);
          callbacks.delete(node);
        }
      } else if (!once) {
        setInView(false);
      }
    });
    observer.observe(node);
    return () => {
      observer.unobserve(node);
      callbacks.delete(node);
    };
  }, [once, rootMargin, threshold]);

  return [ref, inView];
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
