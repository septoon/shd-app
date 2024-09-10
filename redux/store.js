import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './Features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});
