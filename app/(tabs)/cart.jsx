import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addDishToCart, decrementDishFromCart, removeDishFromCart, clearCart } from '../../redux/Features/cart/cartSlice';
import CartItem from '../../components/CartItem';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { MaterialIcons } from '@expo/vector-icons';
import EmptyCart from '../../components/EmptyCart';
import { Colors } from '../../common/Colors';
import OrderDialog from '../../components/OrderDialog';

const Cart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { items, totalCount, totalPrice } = useSelector(state => state.cart);
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <SafeAreaView style={tw`w-full h-full`}>
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <View style={tw`w-full h-full flex items-center justify-start pb-14 pt-5 relative px-2`}>
          
          <ScrollView style={tw`w-full overflow-hidden rounded-xl`}>
          {items.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              onPlusDish={() => dispatch(addDishToCart(item))}
              onMinusDish={() => dispatch(decrementDishFromCart(item))}
              onRemoveDish={() => dispatch(removeDishFromCart(item))}
            />
          ))}
          </ScrollView>
          <View style={tw`absolute bottom-[-2] left-4 right-4 h-14 flex flex-row justify-between`}>
            <TouchableOpacity style={[styles.button, tw` w-14 h-14 rounded-full bg-[${Colors.denary}]`]} onPress={() => navigation.navigate('index')}>
              <MaterialIcons name="arrow-back-ios" style={tw`w-4`} size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={tw`flex flex-row justify-around items-center rounded-xl py-4 w-70 bg-[${Colors.main}]`} >
              <Text style={styles.buttonText}>Оформить:</Text>
              <Text style={styles.buttonText}>{totalCount} шт.,</Text>
              <Text style={styles.buttonText}>{totalPrice} ₽</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <OrderDialog modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  clearCart: {
    justifySelf: 'flex-end'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});