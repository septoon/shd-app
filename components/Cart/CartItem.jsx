import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  Animated,
  Button,
  PanResponder,
} from 'react-native';
import tw from 'twrnc';
import Delete from '../Delete';
import { Colors } from '../../common/Colors';

const CartItem = ({ item, onPlusDish, onMinusDish, onRemoveDish }) => {
  // Используем useRef для хранения значения translateX между рендерами
  const translateX = useRef(new Animated.Value(0)).current;

  // Панреспондер для отслеживания жестов
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderMove: (_, gestureState) => {
      // Обновляем значение translateX на основе движения пальца
      if (gestureState.dx < 0) {
        // Только если свайп влево
        translateX.setValue(gestureState.dx);
      }
    },

    onPanResponderRelease: (_, gestureState) => {
      // Если сдвиг больше чем на 50 пикселей влево, показываем кнопку удаления
      if (gestureState.dx < -50) {
        Animated.spring(translateX, {
          toValue: -60, // Сдвигаем на 80 пикселей для отображения кнопки удаления
          useNativeDriver: true,
        }).start();
      } else {
        // Если сдвиг меньше 50 пикселей, возвращаем элемент на место
        Animated.spring(translateX, {
          toValue: 0, // Возвращаем на исходную позицию
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const { name, price, options, quantity = 1, image, serving } = item;

  return (
    <View style={tw`flex flex-row relative overflow-hidden rounded-xl`}>
      <Animated.View
        style={{ flex: 1, transform: [{ translateX }], zIndex: 9999 }} // Используем translateX для плавного движения
        {...panResponder.panHandlers} // Подключаем панреспондер
      >
        <View
          style={tw`h-20 w-full px-4 flex flex-row justify-between items-center mb-2 bg-white rounded-xl`}>
          <View>
            <Image style={tw`w-14 h-12 rounded-xl`} src={image} />
          </View>
          <View style={tw`flex w-[30%]`}>
            <Text style={tw`text-[10px] font-bold`}>{name}</Text>
            {serving && <Text style={tw`text-xs opacity-40`}>{serving}</Text>}
          </View>
          <Button title="-" style={tw`w-4`} onPress={onMinusDish} />
          <View>
            {options ? <Text>{serving * quantity} г.</Text> : <Text>{quantity} шт.</Text>}
          </View>
          <Button title="+" style={tw`w-4`} onPress={onPlusDish} />
          <View>
            <Text>{(price * quantity).toFixed(2)} ₽</Text>
          </View>
        </View>
        {/* Кнопка удаления, которая отображается при свайпе */}
        <TouchableOpacity
          style={tw`w-18 h-20 flex justify-center items-center absolute right-[-16]`}
          onPress={onRemoveDish}>
          <Delete />
        </TouchableOpacity>
      </Animated.View>
      <View style={tw` h-20 z-9 absolute left-10 right-0 bg-[${Colors.octonary}] rounded-xl`}></View>
    </View>
  );
};

export default CartItem;
