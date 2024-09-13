import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View, Animated, Button, PanResponder } from 'react-native';
import tw from 'twrnc';

const CartItem = ({ item, onPlusDish, onMinusDish, onRemoveDish }) => {
  const translateX = new Animated.Value(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dx > 0) {
        translateX.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx < -50) {
        Animated.spring(translateX, {
          toValue: -100,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
    
  });

  const { name, price, quantity = 1, image, serving } = item;
  return (
    <View className="flex flex-row relative">
      <Animated.View style={{ flex: 1, transform: [{ translateX: translateX }] }}>
        <View
          {...panResponder.panHandlers}
          style={tw`h-20 w-full px-4 flex flex-row justify-between items-center mb-2 bg-white font-comfortaa rounded-xl`}
        >
          <View>
            <Image
              className='w-10 h-8 object-fill rounded-md'
              src={image}
            />
          </View>
          <View style={tw`flex w-[30%]`}>
            <Text style={tw`text-[10px]`}>{name}</Text>
            {serving && <Text style={tw`text-xs opacity-40`}>{serving}</Text>}
          </View>
          <Button title="-" style={tw`w-4`} onPress={onMinusDish} />
          <View>
            <Text>{quantity} шт.</Text>
          </View>
          <Button title="+" style={tw`w-4`} onPress={onPlusDish} />
          <View>
            <Text>{(price * quantity).toFixed(2)} ₽</Text>
          </View>
        </View>
        <TouchableOpacity
          style={tw`w-23 h-20 flex justify-center items-center absolute right-[-26]`}
          onPress={onRemoveDish}
        >
          <Text>Удалить</Text>
          {/* <Image source={require('../common/img/trash.svg')} width={20} height={20} /> */}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default CartItem;