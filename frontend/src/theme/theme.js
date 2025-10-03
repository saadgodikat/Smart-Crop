import { DefaultTheme } from 'react-native-paper';
import { getLanguageSpecificFonts } from '../utils/fontUtils';

const createTheme = (language = 'en') => ({
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4CAF50',
    accent: '#8BC34A',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#212121',
    placeholder: '#757575',
    error: '#F44336',
    success: '#4CAF50',
    warning: '#FF9800',
    info: '#2196F3',
  },
  fonts: {
    ...DefaultTheme.fonts,
    ...getLanguageSpecificFonts(language),
  },
});

const theme = createTheme();

export default theme;
export { createTheme };
