import React, { useMemo } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '../../common/ThemeProvider';
import { createStyles } from '../../styles/Cart/FooterButtonStyles';

const FooterButton = React.memo(({ setModalVisible, totalCount, totalPrice, items }) => {
  if (!items || items.length === 0) return <View />;

  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const displayCount = useMemo(() => `${totalCount} шт.`, [totalCount]);
  const displayPrice = useMemo(() => `${totalPrice} ₽`, [totalPrice]);

  return (
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={styles.buttonContainer}
    >
      <Text style={styles.text}>Оформить</Text>
      <Text style={styles.text}>{displayCount}</Text>
      <Text style={styles.text}>{displayPrice}</Text>
    </TouchableOpacity>
  );
});

export default FooterButton;