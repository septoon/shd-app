import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Animated,
  PanResponder,
  ActivityIndicator,
} from 'react-native';
import tw from 'twrnc';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColors } from '../../common/Colors';
import { Image } from 'expo-image';

const CartItem = React.memo(({ item, onPlusDish, onMinusDish, onRemoveDish }) => {
  const Colors = useColors();
  const [loading, setLoading] = useState(false);

  // Используем useRef для хранения значения translateX
  const translateX = useRef(new Animated.Value(0)).current;

  // Определяем общую стоимость
  const total = useMemo(() => item.price * item.quantity, [item.price, item.quantity]);

  // Панреспондер для отслеживания жестов
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,

        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dx < 0) {
            translateX.setValue(gestureState.dx);
          }
        },

        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx < -50) {
            Animated.spring(translateX, {
              toValue: -60,
              useNativeDriver: true,
            }).start();
          } else {
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        },
      }),
    [translateX]
  );

  // Функция обработки загрузки изображения
  const handleImageLoadStart = useCallback(() => setLoading(true), []);
  const handleImageLoadEnd = useCallback(() => setLoading(false), []);

  return (
    <View style={tw`flex flex-row relative overflow-hidden rounded-xl bg-[${Colors.darkModeBg}]`}>
      <Animated.View
        style={{ flex: 1, transform: [{ translateX }], zIndex: 9999 }}
        {...panResponder.panHandlers}
      >
        <View
          style={tw`h-20 w-full px-4 flex flex-row justify-between items-center mb-2 bg-[${Colors.darkModeElBg}] rounded-xl`}
        >
          <View>
            <View style={tw`w-14 h-12 relative`}>
              {loading && (
                <ActivityIndicator
                  size="small"
                  color={Colors.main}
                  style={tw`w-full h-full absolute`}
                />
              )}
              <Image
                source={{ uri: item.image }}
                style={tw`w-full h-full rounded-xl`}
                cachePolicy="disk"
                onLoadStart={handleImageLoadStart}
                onLoadEnd={handleImageLoadEnd}
              />
            </View>
          </View>
          <View style={tw`flex w-[30%]`}>
            <Text style={tw`text-[12px] font-bold text-[${Colors.darkModeText}]`}>
              {item.name}
            </Text>
            {item.serving && (
              <Text style={tw`text-xs opacity-40 text-[${Colors.darkModeText}]`}>
                {item.serving}
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={tw`w-4 flex items-center justify-center rounded bg-[${Colors.main}]`}
            onPress={onMinusDish}
          >
            <Text style={tw`text-white`}>-</Text>
          </TouchableOpacity>
          <View>
            <Text style={tw`text-[${Colors.darkModeText}]`}>
              {item.options
                ? `${item.serving * item.quantity} г.`
                : `${item.quantity} шт.`}
            </Text>
          </View>
          <TouchableOpacity
            style={tw`w-4 flex items-center justify-center rounded bg-[${Colors.main}]`}
            onPress={onPlusDish}
          >
            <Text style={tw`text-white`}>+</Text>
          </TouchableOpacity>
          <View>
            <Text style={tw`text-[${Colors.darkModeText}]`}>
              {Number.isFinite(total) ? total.toFixed(2) : '0.00'} ₽
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={tw`w-18 h-20 flex justify-center items-center absolute right-[-16]`}
          onPress={onRemoveDish}
        >
          <MaterialIcons name="delete" size={26} color="white" />
        </TouchableOpacity>
      </Animated.View>
      <View style={tw`h-20 z-9 absolute left-10 right-0 bg-[${Colors.octonary}] rounded-xl`} />
    </View>
  );
});

export default CartItem;