import React, { useRef, useState } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  addDishToCart,
  decrementDishFromCart,
  removeDishFromCart,
} from '../../redux/Features/cart/cartSlice';
import CartItem from '../../components/Cart/CartItem';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import EmptyCart from '../../components/Cart/EmptyCart';
import OrderDialog from '../../components/Order/OrderDialog';
import { formatDate, formatTime } from '../../common/formatDate';
import FooterButtons from '../../components/Cart/FooterButtons';
import { useColors } from '../../common/Colors';

const Cart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Colors = useColors()
  const { items, totalCount, totalPrice } = useSelector((state) => state.cart);
  const { orderType } = useSelector((state) => state.order);
  const { selectedDate } = useSelector((state) => state.date);
  const [modalVisible, setModalVisible] = useState(false);

  const actionSheetRef = useRef(null);

  const shortDate = formatDate(selectedDate);
  const shortTime = formatTime(selectedDate);

  return (
    <SafeAreaView style={tw`w-full h-full bg-[${Colors.darkModeBg}]`}>
      <Text>Корзина</Text>
    </SafeAreaView>
  );
};

export default Cart;