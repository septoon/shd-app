import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';

const CategorySwitcher = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const categories = ['Доставка', 'Самовывоз'];
  const switcherWidth = Dimensions.get('window').width * 0.6; // 60% ширины экрана
  const buttonWidth = switcherWidth / categories.length; // Ширина каждой кнопки

  // Функция переключения категорий
  const switchCategory = (index) => {
    setSelectedIndex(index);

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
              { color: selectedIndex === index ? '#fff' : '#FB5a3c' } // Цвет текста
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
    backgroundColor: '#FB5a3c',
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