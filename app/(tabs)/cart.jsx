import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import tw from 'twrnc';
import EmptyCart from '../../components/Cart/EmptyCart';
import { useColors } from '../../common/Colors';

const Cart = () => {
  const Colors = useColors()

  return (
    <SafeAreaView style={tw`w-full h-full flex items-center justify-between pb-20 bg-[${Colors.darkModeBg}]`}>
      <EmptyCart />
      
    </SafeAreaView>
  );
};

export default Cart;
