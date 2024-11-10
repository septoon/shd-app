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
  const { items, totalCount, totalPrice } = useSelector((state) => state.cart);
  const { orderType } = useSelector((state) => state.order);
  const { selectedDate } = useSelector((state) => state.date);
  const [modalVisible, setModalVisible] = useState(false);

  const shortDate = formatDate(selectedDate);
  const shortTime = formatTime(selectedDate);

  return (
    <SafeAreaView style={tw`w-full h-full flex items-center justify-between pb-20 bg-[${Colors.darkModeBg}]`}>
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
      <OrderDialog
        orderType={orderType}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        items={items}
        totalCount={totalCount}
        totalPrice={totalPrice}
        shortDate={shortDate}
        shortTime={shortTime}
      />
      <FooterButtons
        setModalVisible={setModalVisible}
        totalCount={totalCount}
        totalPrice={totalPrice}
      />
    </SafeAreaView>
  );
};

export default Cart;
