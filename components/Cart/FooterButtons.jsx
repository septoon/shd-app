import React, { useMemo } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '../../common/ThemeProvider';
import { createStyles } from '../../styles/Cart/FooterButtonStyles';

const FooterButton = React.memo(({ setModalVisible, totalCount, totalPrice, items }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (items.length === 0) return <View />;

  return (
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={styles.buttonContainer}
    >
      <Text style={styles.text}>Оформить</Text>
      <Text style={styles.text}>{totalCount} шт.</Text>
      <Text style={styles.text}>{totalPrice} ₽</Text>
    </TouchableOpacity>
  );
});

export default FooterButton;