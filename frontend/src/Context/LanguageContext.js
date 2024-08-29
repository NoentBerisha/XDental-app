import React, { createContext, useState } from 'react';
import en from '../util/languages/english.json';
import sq from '../util/languages/Albanian.json';

export const LanguageContext = createContext();

const languageData = {
  en,
  sq
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, translations: languageData[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};
