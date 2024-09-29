import { useDispatch } from 'react-redux';
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import tw from 'twrnc';
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
    <View style={tw`flex justify-center items-center`}>
      <View style={[tw`flex flex-row relative rounded-md overflow-hidden bg-[${Colors.slideBg}]`, { width: switcherWidth }]}>
        {/* Анимированный индикатор */}
        <Animated.View
          style={[
            tw`absolute h-full bg-[${Colors.main}] rounded-md z-0`,
            { width: buttonWidth, transform: [{ translateX: animatedValue }] },
          ]}
        />

        {/* Кнопки категорий */}
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={tw`grow shrink justify-center items-center py-2`}
            onPress={() => switchCategory(index)}
          >
            <Text style={[
              tw`text-sm font-bold`,
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

export default CategorySwitcher;
