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
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <View
          style={tw`w-full h-full flex items-center justify-start pb-14 pt-5 relative px-2`}
        >
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
          <FooterButtons
            navigation={navigation}
            setModalVisible={setModalVisible}
            totalCount={totalCount}
            totalPrice={totalPrice}
          />
        </View>
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
        actionSheetRef={actionSheetRef}
      />
    </SafeAreaView>
  );
};

export default Cart;