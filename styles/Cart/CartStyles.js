import { Platform, StyleSheet } from 'react-native';

export const createStyles = (colors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      justifyContent: 'space-between', 
      backgroundColor: colors.background,
    },
    contentContainer: {
      flex: 1,
      paddingTop: 8,
      paddingHorizontal: 8,
    },
    footerContainer: {
      paddingBottom: Platform.OS === 'ios' ? 30 : 52 
    },
  });