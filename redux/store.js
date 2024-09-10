import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './Features/cart/cartSlice';
import menuSlice from './Features/menu/menuSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    menu: menuSlice,
  },
});
