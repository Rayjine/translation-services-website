import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// List of RTL languages
const RTL_LANGUAGES = ['ar']; // Arabic

// Create the context
const DirectionContext = createContext({
  direction: 'ltr',
  isRtl: false,
});

// Provider component
export const DirectionProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [direction, setDirection] = useState('ltr');
  const [isRtl, setIsRtl] = useState(false);

  // Update direction whenever language changes
  useEffect(() => {
    const isRtlLanguage = RTL_LANGUAGES.includes(i18n.language);
    setIsRtl(isRtlLanguage);
    setDirection(isRtlLanguage ? 'rtl' : 'ltr');
    
    // Set direction attribute on html element
    document.documentElement.dir = isRtlLanguage ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    
  }, [i18n.language]);

  return (
    <DirectionContext.Provider value={{ direction, isRtl }}>
      {children}
    </DirectionContext.Provider>
  );
};

// Custom hook for consuming the context
export const useDirection = () => useContext(DirectionContext);

export default DirectionContext;
