import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Component that scrolls to the top of the page when the route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 'instant' overrides the global smooth scrolling so new pages open at the top.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
