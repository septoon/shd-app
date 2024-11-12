import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  addDishToCart,
  decrementDishFromCart,
  removeDishFromCart,
} from '../../redux/Features/cart/cartSlice';
import CartItem from '../../components/Cart/CartItem';
import tw from 'twrnc';
import EmptyCart from '../../components/Cart/EmptyCart';
import OrderDialog from '../../components/Order/OrderDialog';
import { formatDate, formatTime } from '../../common/formatDate';
import FooterButtons from '../../components/Cart/FooterButtons';
import { useColors } from '../../common/Colors';

const Cart = () => {
  const dispatch = useDispatch();
  const Colors = useColors()

  return (
    <SafeAreaView style={tw`w-full h-full flex items-center justify-between pb-20 bg-[${Colors.darkModeBg}]`}>
      <EmptyCart />
      
    </SafeAreaView>
  );
};

export default Cart;
