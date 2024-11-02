import { useDispatch, useSelector } from 'react-redux';
import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import tw from 'twrnc';
import { setSelectedIndex, setSetOrderType } from '../../redux/Features/cart/orderSlice';
import { useColors } from '../../common/Colors';

const CategorySwitcher = () => {
  const {selectedIndex} = useSelector((state) => state.order);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const Colors = useColors()

  const categories = ['Доставка', 'Самовывоз'];
  const switcherWidth = Dimensions.get('window').width * 0.6; // 60% ширины экрана
  const buttonWidth = switcherWidth / categories.length - 3; // Ширина каждой кнопки

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: selectedIndex * buttonWidth, // Смещение индикатора
      duration: 300, // Длительность анимации
      useNativeDriver: true,
    }).start();
  }, []);

  // Функция переключения категорий
  const switchCategory = (index) => {
    dispatch(setSelectedIndex(index))
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
      <View style={[tw`flex items-center flex-row relative rounded-md overflow-hidden bg-[${Colors.darkModeElBg}]`, { width: switcherWidth }]}>
        {/* Анимированный индикатор */}
        <Animated.View
          style={[
            tw`absolute h-[85%] ml-[3px] bg-[${Colors.main}] rounded-md z-0`,
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
