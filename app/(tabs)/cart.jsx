import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  addDishToCart,
  decrementDishFromCart,
  removeDishFromCart,
} from '../../redux/Features/cart/cartSlice';
import CartItem from '../../components/Cart/CartItem';
import tw from 'twrnc';
import EmptyCart from '../../components/Cart/EmptyCart';
import FooterButtons from '../../components/Cart/FooterButtons';
import { useColors } from '../../common/Colors';
import Modal from 'react-native-modal';

const Cart = () => {
  const dispatch = useDispatch();
  const Colors = useColors();
  const { items, totalCount, totalPrice } = useSelector((state) => state.cart);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={[tw`w-full h-full flex items-center justify-between pb-20`, { backgroundColor: Colors.darkModeBg }]}>
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <ScrollView style={tw`w-full max-h-[100%] overflow-hidden rounded-xl`}>
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
      )}
      <FooterButtons
        setModalVisible={setModalVisible}
        totalCount={totalCount}
        totalPrice={totalPrice}
      />
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        useNativeDriver={true}
        style={tw`m-0`}
      >
        <View style={[tw`w-full h-full flex items-center justify-center`, { backgroundColor: Colors.darkModeBg }]}>
          <Button
            title="Закрыть"
            onPress={() => setModalVisible(false)}
            color={Colors.darkModeText}
          />
          <Text style={[tw`text-lg`, { color: Colors.darkModeText }]}>Ваш заказ принят!</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Cart;
