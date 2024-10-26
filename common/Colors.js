import { useColorScheme } from 'react-native';

export const useColors = () => {
  const colorScheme = useColorScheme();
  
  return {
      transparent: 'transparent',
      main: '#007da0',
      primary: '#1E90FF',
      secondary: '#6fd9e5',
      back: '#21A599',
      bgOrder: '#EFEFF4',
      bgInput: '#EBEBEE',
      darkModeText: colorScheme === 'dark' ? '#fff' : '#000',
      darkModeBg: colorScheme === 'dark' ? '#131922' : '#fff',
      darkModeElBg: colorScheme === 'dark' ? '#05070a' : '#fff',
      darkModeIcon: colorScheme === 'dark' ? '#778899' : '#737373',
      darkModeInput: colorScheme === 'dark' ? '#2b2b2f' : '#E0E0E0',
      slideBg: '#f0f0f0',
      quinary: '#8A2BE2',
      senary: '#00FF7F',
      septenary: '#FF69B4',
      octonary: '#FF4500',
      nonary: '#9370DB',
      denary: '#20B2AA',
      darkAdmin: "#131922",
      light: 'F7F9FA',
      white: '#ffffff',
      black: '#000000',
      darkSwitch: '#2b2b2f',
      purple: '#3f3cbb',
      blue: '#316ff4',
      midnight: '#121063',
      metal: '#565584',
      tahiti: '#3ab7bf',
      silverAdmin: '#f0eef6',
      bubblegum: '#ff77e9',
      bermuda: '#78dcca',
      gray: '#808080',
      gray300: '#E0E0E0',
      gray500: '#9E9E9E',
      lightGray: '#D3D3D3',
      lightSlateGray: '#778899',
      darkGray: '#141616',
      veryDarkGray: '#272822',
      darkSwitch: '#2b2b2f',
      DimGray: '#696969',
      red: '#FF0000',
      orange: '#FFA500',
      orange600: '#FB8C00',
      dark: "#1d1d1d",
      silver: '#ecebff',
  }
}