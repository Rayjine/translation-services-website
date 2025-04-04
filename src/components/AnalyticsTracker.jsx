import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const TRACKING_ID = "G-RLCNPC0F0L"; // Your Google Analytics Measurement ID

// Initialize GA4 only once
ReactGA.initialize(TRACKING_ID);
console.log('GA Initialized');

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search, title: document.title });
    console.log(`GA Pageview sent: ${location.pathname + location.search}`);
  }, [location]); // Re-run effect when location changes

  return null; // This component doesn't render anything
}

export default AnalyticsTracker;
