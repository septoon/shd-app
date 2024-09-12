import AsyncStorage from '@react-native-async-storage/async-storage';
import { setInitialState } from '../redux/Features/cart/cartSlice';

export const loadCartData = async (dispatch) => {
  try {
    const items = await AsyncStorage.getItem('cartItems');
    const totalCount = await AsyncStorage.getItem('totalCount');
    const totalPrice = await AsyncStorage.getItem('totalPrice');

    if (items !== null && totalCount !== null && totalPrice !== null) {
      dispatch(setInitialState({
        items: JSON.parse(items),
        totalCount: JSON.parse(totalCount),
        totalPrice: JSON.parse(totalPrice),
      }));
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных из AsyncStorage:', error);
  }
};