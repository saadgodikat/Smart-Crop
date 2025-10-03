// Font utility for multi-language support
export const getFontFamily = (language = 'en') => {
  const fontMap = {
    en: 'System', // Default system font for English
    hi: 'NotoSansDevanagari', // Hindi (Devanagari script)
    pa: 'NotoSansGurmukhi', // Punjabi (Gurmukhi script)
    ta: 'NotoSansTamil', // Tamil
    te: 'NotoSansTelugu', // Telugu
    bn: 'NotoSansBengali', // Bengali
    gu: 'NotoSansGujarati', // Gujarati
    kn: 'NotoSansKannada', // Kannada
    ml: 'NotoSansMalayalam', // Malayalam
    or: 'NotoSansOriya', // Oriya
    ur: 'NotoSansUrdu', // Urdu
  };
  
  return fontMap[language] || fontMap.en;
};

export const getLanguageSpecificFonts = (language = 'en') => {
  const baseFontFamily = getFontFamily(language);
  
  return {
    regular: {
      fontFamily: baseFontFamily,
      fontWeight: '400',
    },
    medium: {
      fontFamily: baseFontFamily,
      fontWeight: '500',
    },
    light: {
      fontFamily: baseFontFamily,
      fontWeight: '300',
    },
    thin: {
      fontFamily: baseFontFamily,
      fontWeight: '100',
    },
    bold: {
      fontFamily: baseFontFamily,
      fontWeight: '700',
    },
  };
};