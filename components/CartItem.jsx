import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Image, PanResponder, Text, View, Animated } from 'react-native';
import { Trash } from '../common/img/trash.svg';
import tw from 'twrnc';

const CartItem = ({
  id,
  image,
  name,
  serving,
  price,
  options,
  countById,
  onClickMinusDish,
  onClickPlusDish,
  onClickRemoveDish,
}) => {
  const onMinusDish = () => {
    const dishObj = {
      dishId: id,
    };
    onClickMinusDish(dishObj);
  };

  const onPlusDish = () => {
    const dishObj = {
      dishId: id,
    };
    onClickPlusDish(dishObj);
  };

  const onRemoveDish = () => {
    const dishObj = {
      dishId: id,
      serving: serving,
    };
    onClickRemoveDish(dishObj);
  };

  const translateX = new Animated.Value(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dx > 0) {
        translateX.setValue(gestureState.dx)
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx < -50) {
        Animated.spring(translateX, {
          toValue: -100,
          useNativeDriver: true,
        }).start()
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start()
      }
    },
  });

  return (
    <View style={tw`flex flex-row relative`}>
      <Animated.View style={{flex: 1, transform: [{translateX: translateX}] }} >
        <View
          {...panResponder.panHandlers}
          style={tw`h-20 w-full px-4 flex flex-row justify-between items-center mb-2 bg-white font-comfortaa rounded-xl`}>
          <View>
            <Image
              style={tw`w-10 h-8 object-fill rounded-md`}
              sizes="20%"
              width={10}
              height={8}
              src={image}
            />
          </View>
          <View style={tw`flex w-[30%]`}>
            <Text style={tw`text-[10px]`}>{name}</Text>
            <Text style={tw`text-xs opacity-40`}>{serving}</Text>
          </View>
          <Button title="-" style={tw`w-4`} onPress={onMinusDish} />
          <View style="">
            {options ? <Text>{serving * countById} г.</Text> : <Text>{countById}шт.</Text>}
          </View>
          <Button title="+" style={tw`w-4`} onPress={onPlusDish} />
          <View style="">
            <Text>{price * countById}₽</Text>
          </View>
        </View>
        <TouchableOpacity
          style={tw`w-23 h-20 flex justify-center items-center absolute right-[-26]`}
          onPress={onRemoveDish}>
          {/* <Image source={require('../common/img/trash.svg')} width={20} height={20} /> */}
          <Text>Удалить</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row,',
  },
});
