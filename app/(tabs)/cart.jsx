import React, { useMemo, useCallback, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addDishToCart, decrementDishFromCart, removeDishFromCart } from '../../redux/Features/cart/cartSlice';
import CartItem from '../../components/Cart/CartItem';
import EmptyCart from '../../components/Cart/EmptyCart';
import OrderDialog from '../../components/Order/OrderDialog';
import FooterButton from '../../components/Cart/FooterButtons';
import { useTheme } from '../../common/ThemeProvider';
import { createStyles } from '../../styles/Cart/CartStyles';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalCount, totalPrice } = useSelector((state) => state.cart);
  const [modalVisible, setModalVisible] = useState(false);
  const colors = useTheme().colors;
  const memoizedItems = useMemo(() => items, [items]);
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleAdd = useCallback((item) => dispatch(addDishToCart(item)), [dispatch]);
  const handleDecrement = useCallback((item) => dispatch(decrementDishFromCart(item)), [dispatch]);
  const handleRemove = useCallback((item) => dispatch(removeDishFromCart(item)), [dispatch]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
        <FlatList
          data={memoizedItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onPlusDish={() => handleAdd(item)}
              onMinusDish={() => handleDecrement(item)}
              onRemoveDish={() => handleRemove(item)}
            />
          )}
          ListEmptyComponent={<EmptyCart />}
        />
      </View>


      <View style={styles.footerContainer}>
        <FooterButton
          setModalVisible={setModalVisible}
          totalCount={totalCount}
          totalPrice={totalPrice}
          items={memoizedItems}
        />
      </View>

      <OrderDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        items={memoizedItems}
        totalCount={totalCount}
        totalPrice={totalPrice}
      />
    </SafeAreaView>
  );
};

export default Cart;