import React, { createContext, useContext, useState } from 'react';
import { createTheme } from '../theme/theme';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentTheme, setCurrentTheme] = useState(createTheme('en'));

  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
    setCurrentTheme(createTheme(languageCode));
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      changeLanguage, 
      currentTheme 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};