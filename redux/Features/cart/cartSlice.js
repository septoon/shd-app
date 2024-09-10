import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setItemFunc = async (items, totalCount, totalPrice) => {
  try {
    await AsyncStorage.setItem('items', JSON.stringify(items));
    await AsyncStorage.setItem('totalCount', JSON.stringify(totalCount));
    await AsyncStorage.setItem('totalPrice', JSON.stringify(totalPrice));
  } catch (e) {
    console.error('Failed to save data to AsyncStorage', e);
  }
};

const getItemFunc = async (key, defaultValue) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (e) {
    console.error(`Failed to load ${key} from AsyncStorage`, e);
    return defaultValue;
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalCount: 0,
    totalPrice: 0,
  },
  reducers: {
    setInitialState: (state, action) => {
      state.items = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.totalPrice = action.payload.totalPrice;
    },
    addDishToCart: (state, action) => {
      state.items.push({ ...action.payload, quantity: 1 });
      state.totalCount += 1;
      state.totalPrice += parseInt(action.payload.price);

      setItemFunc(state.items, state.totalCount, state.totalPrice);
    },
    clearDishCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
      setItemFunc(state.items, state.totalCount, state.totalPrice);
    },
    removeDish: (state, action) => {
      const { dishId } = action.payload;
      const removedItem = state.items.find((item) => item.id === dishId);

      if (removedItem) {
        state.totalCount -= removedItem.quantity;
        state.totalPrice -= parseInt(removedItem.price) * removedItem.quantity;
        state.items = state.items.filter((item) => item.id !== dishId);
      }
      setItemFunc(state.items, state.totalCount, state.totalPrice);
    },
    incrementDish: (state, action) => {
      const { dishId } = action.payload;
      const existingItem = state.items.find((item) => item.id === dishId);

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalCount += 1;
        state.totalPrice += parseInt(existingItem.price);
      }
      setItemFunc(state.items, state.totalCount, state.totalPrice);
    },
    decrementDish: (state, action) => {
      const { dishId } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === dishId);

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalCount -= 1;
          state.totalPrice -= parseInt(existingItem.price);
        } else {
          state.items.splice(existingItemIndex, 1);
          state.totalCount -= 1;
          state.totalPrice -= parseInt(existingItem.price);
        }
      }
      setItemFunc(state.items, state.totalCount, state.totalPrice);
    },
  },
});

export const initializeCart = () => async (dispatch) => {
  const items = await getItemFunc('items', []);
  const totalCount = await getItemFunc('totalCount', 0);
  const totalPrice = await getItemFunc('totalPrice', 0);

  dispatch(cartSlice.actions.setInitialState({ items, totalCount, totalPrice }));
};

export const {
  addDishToCart,
  clearDishCart,
  removeDish,
  incrementDish,
  decrementDish,
} = cartSlice.actions;

export default cartSlice.reducer;
