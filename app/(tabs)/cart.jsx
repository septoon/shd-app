import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { SafeAreaView, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addDishToCart, decrementDishFromCart, initializeCart, removeDishFromCart } from '../../redux/Features/cart/cartSlice';
import CartItem from '../../components/Cart/CartItem';
import EmptyCart from '../../components/Cart/EmptyCart';
import OrderDialog from '../../components/Order/OrderDialog';
import FooterButton from '../../components/Cart/FooterButtons';
import { useTheme } from '../../common/ThemeProvider';
import { createStyles } from '../../styles/Cart/CartStyles';
import { formatDate, formatTime } from '../../common/formatDate';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalCount, totalPrice } = useSelector((state) => state.cart);
  const { selectedDate } = useSelector((state) => state.date);
  const [modalVisible, setModalVisible] = useState(false);
  const colors = useTheme().colors;
  const memoizedItems = items;
  const styles = useMemo(() => createStyles(colors), [colors]);

  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  const handleAdd = useCallback((item) => dispatch(addDishToCart(item)), [dispatch]);
  const handleDecrement = useCallback((item) => dispatch(decrementDishFromCart(item)), [dispatch]);
  const handleRemove = useCallback((item) => dispatch(removeDishFromCart(item)), [dispatch]);

  const shortDate = selectedDate ? formatDate(selectedDate) : 'Дата не выбрана';
  const shortTime = selectedDate ? formatTime(selectedDate) : 'Время не выбрано';
  
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
        shortDate={shortDate}
        shortTime={shortTime}
        selectedDate={selectedDate}
      />
    </SafeAreaView>
  );
};

export default Cart;