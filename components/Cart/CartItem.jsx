import React, { useRef, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Animated,
  PanResponder,
  ActivityIndicator,
} from 'react-native';
import tw from 'twrnc';
import Delete from '../Delete';
import { useColors } from '../../common/Colors';
import { Image } from 'expo-image';

const CartItem = ({ item, onPlusDish, onMinusDish, onRemoveDish }) => {
  const Colors = useColors()
  const [loadingImage, setLoadingImage] = useState({})
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

  const { name, price, options, quantity = 1, image, serving, id } = item;

  return (
    <View style={tw`flex flex-row relative overflow-hidden rounded-xl bg-[${Colors.darkModeBg}]`}>
      <Animated.View
        style={{ flex: 1, transform: [{ translateX }], zIndex: 9999 }} // Используем translateX для плавного движения
        {...panResponder.panHandlers} // Подключаем панреспондер
      >
        <View
          style={tw`h-20 w-full px-4 flex flex-row justify-between items-center mb-2 bg-[${Colors.darkModeElBg}] rounded-xl`}>
          <View>
            <View style={tw`w-14 h-12 relative`}>
              {loadingImage[id] ? (
                <ActivityIndicator size="small" color={Colors.main} style={tw`w-full h-full absolute`} />
              ) : null}
              <Image key={id}
                onLoadStart={() => {
                  setLoadingImage(prev => ({ ...prev, [id]: true })); // Устанавливаем загрузку для конкретного id
                }}
                onLoadEnd={() => {
                  setLoadingImage(prev => ({ ...prev, [id]: false })); // Отключаем загрузку для конкретного id
                }} 
                source={image} 
                style={tw`w-full h-full rounded-xl`} 
                cachePolicy="disk"
              />
            </View>
          </View>
          <View style={tw`flex w-[30%]`}>
            <Text style={tw`text-[12px] font-bold text-[${Colors.darkModeText}]`}>{name}</Text>
            {serving && <Text style={tw`text-xs opacity-40 text-[${Colors.darkModeText}]`}>{serving}</Text>}
          </View>
          <TouchableOpacity style={tw`w-4 flex items-center justify-center rounded bg-[${Colors.main}]`} onPress={onMinusDish}>
            <Text style={tw`text-white`}>-</Text>
          </TouchableOpacity>
          <View>
            {options ? <Text style={tw`text-[${Colors.darkModeText}]`}>{serving * quantity} г.</Text> : <Text style={tw`text-[${Colors.darkModeText}]`}>{quantity} шт.</Text>}
          </View>
          <TouchableOpacity style={tw`w-4 flex items-center justify-center rounded bg-[${Colors.main}]`} onPress={onPlusDish}>
            <Text style={tw`text-white`}>+</Text>
          </TouchableOpacity>
          <View>
            <Text style={tw`text-[${Colors.darkModeText}]`}>{(price * quantity).toFixed(2)} ₽</Text>
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
