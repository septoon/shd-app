import { useDispatch } from 'react-redux';
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../common/Colors';
import { setSetOrderType } from '../../redux/Features/cart/orderSlice';

const CategorySwitcher = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  const categories = ['Доставка', 'Самовывоз'];
  const switcherWidth = Dimensions.get('window').width * 0.6; // 60% ширины экрана
  const buttonWidth = switcherWidth / categories.length; // Ширина каждой кнопки

  // Функция переключения категорий
  const switchCategory = (index) => {
    setSelectedIndex(index);
    dispatch(setSetOrderType(index === 0 ? 'Доставка' : 'Самовывоз'))

    // Анимация
    Animated.timing(animatedValue, {
      toValue: index * buttonWidth, // Смещение индикатора
      duration: 300, // Длительность анимации
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.switcherContainer, { width: switcherWidth }]}>
        {/* Анимированный индикатор */}
        <Animated.View
          style={[
            styles.animatedIndicator,
            { width: buttonWidth, transform: [{ translateX: animatedValue }] },
          ]}
        />

        {/* Кнопки категорий */}
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => switchCategory(index)}
          >
            <Text style={[
              styles.text, 
              { color: selectedIndex === index ? '#fff' : Colors.main } // Цвет текста
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  switcherContainer: {
    flexDirection: 'row',
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  animatedIndicator: {
    position: 'absolute',
    height: '100%',
    backgroundColor: Colors.main,
    borderRadius: 8,
    zIndex: -1, // Индикатор позади текста
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CategorySwitcher;