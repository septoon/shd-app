import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { Colors as StaticColors } from './ColorList';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();

  const dynamicColors = {
    text: colorScheme === 'dark' ? StaticColors.white : StaticColors.black,
    background: colorScheme === 'dark' ? StaticColors.darkAdmin : StaticColors.silverAdmin,
    elementBackground: colorScheme === 'dark' ? StaticColors.darkGray : StaticColors.white,
    icon: colorScheme === 'dark' ? StaticColors.lightSlateGray : StaticColors.gray500,
    input: colorScheme === 'dark' ? StaticColors.darkSwitch : StaticColors.gray300,
    ordersList: colorScheme === 'dark' ? StaticColors.darkSwitch : StaticColors.silverAdmin,
  };

  const theme = {
    colors: {
      ...StaticColors,
      ...dynamicColors,
    },
    isDark: colorScheme === 'dark',
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);