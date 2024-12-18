import { StyleSheet } from 'react-native';

export const createStyles = (colors) =>
  StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.main,
      padding: 16,
      borderRadius: 10,
      margin: 16,
    },
    text: {
      color: colors.white,
      fontWeight: 'bold',
      fontSize: 16,
    },
  });