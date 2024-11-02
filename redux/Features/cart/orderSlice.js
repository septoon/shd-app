import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Thunk to load initial state from AsyncStorage
export const loadInitialOrderState = createAsyncThunk(
  'order/loadInitialOrderState',
  async (_, { dispatch }) => {
    try {
      const orderType = await AsyncStorage.getItem('orderType');
      const selectedIndex = await AsyncStorage.getItem('selectedIndex');
      const address = await AsyncStorage.getItem('address');
      const phoneNumber = await AsyncStorage.getItem('phoneNumber');
      const comment = await AsyncStorage.getItem('comment');

      dispatch(setInitialOrderState({
        orderType: orderType ? JSON.parse(orderType) : "Доставка",
        selectedIndex: selectedIndex ? JSON.parse(selectedIndex) : 0,
        address: address ? JSON.parse(address) : '',
        phoneNumber: phoneNumber ? JSON.parse(phoneNumber) : '',
        comment: comment ? JSON.parse(comment) : '',
      }));
    } catch (error) {
      console.error('Failed to load initial state:', error);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderType: "Доставка",
    selectedIndex: 0,
    address: '',
    phoneNumber: '',
    comment: '',
  },
  reducers: {
    setInitialOrderState: (state, action) => {
      state.orderType = action.payload.orderType;
      state.selectedIndex = action.payload.selectedIndex;
      state.address = action.payload.address;
      state.phoneNumber = action.payload.phoneNumber;
      state.comment = action.payload.comment;
    },
    setSetOrderType: (state, action) => {
      state.orderType = action.payload;
      AsyncStorage.setItem('orderType', JSON.stringify(state.orderType)).catch(error =>
        console.error('Failed to save order type:', error)
      );
    },
    setSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload;
      AsyncStorage.setItem('selectedIndex', JSON.stringify(state.selectedIndex)).catch(error =>
        console.error('Failed to save selected index:', error)
      );
    },
    setAddress: (state, action) => {
      state.address = action.payload;
      AsyncStorage.setItem('address', JSON.stringify(state.address)).catch(error =>
        console.error('Failed to save address:', error)
      );
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
      AsyncStorage.setItem('phoneNumber', JSON.stringify(state.phoneNumber)).catch(error =>
        console.error('Failed to save phone number:', error)
      );
    },
    setComment: (state, action) => {
      state.comment = action.payload;
      AsyncStorage.setItem('comment', JSON.stringify(state.comment)).catch(error =>
        console.error('Failed to save comment:', error)
      );
    },
  },
});

export const {
  setSetOrderType,
  setSelectedIndex,
  setInitialOrderState,
  setAddress,
  setPhoneNumber,
  setComment,
} = orderSlice.actions;

export default orderSlice.reducer;