import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCookieConsentValue } from 'react-cookie-consent';
import ReactGA from 'react-ga4';

const TRACKING_ID = 'G-RLCNPC0F0L';
let initialized = false;
const hasConsent = () => getCookieConsentValue('oghamTranslationsConsent') === 'true';

function AnalyticsTracker() {
  const location = useLocation();
  const [consent, setConsent] = useState(hasConsent);
  useEffect(() => {
    const update = () => setConsent(hasConsent());
    window.addEventListener('ogham-consent-change', update);
    return () => window.removeEventListener('ogham-consent-change', update);
  }, []);
  useEffect(() => {
    if (!consent) return;
    if (!initialized) {
      ReactGA.initialize(TRACKING_ID, { gtagOptions: { send_page_view: false } });
      initialized = true;
    }
    // Query parameters can contain personal information; do not send them.
    ReactGA.send({ hitType: 'pageview', page: location.pathname, title: document.title });
  }, [location.pathname, consent]);
  return null;
}

export default AnalyticsTracker;
