import { View } from 'react-native';
import React from 'react';
import { SafeAreaView, ScrollView, Modal } from 'react-native';
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

const Cart = () => {
  const dispatch = useDispatch();
  const Colors = useColors()
  const { items, totalCount, totalPrice } = useSelector((state) => state.cart);
  const [modalVisible, setModalVisible] = useState(false);

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
      <Modal visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={tw`w-full h-full flex items-center justify-center`}>
          <Text style={tw`text-lg text-[${Colors.darkModeText}]`}>Ваш заказ принят!</Text>
        </View>
      </Modal>
      <FooterButtons
        setModalVisible={setModalVisible}
        totalCount={totalCount}
        totalPrice={totalPrice}
      />
    </SafeAreaView>
  );
};

export default Cart;