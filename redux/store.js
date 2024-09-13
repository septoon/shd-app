import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './Features/cart/cartSlice';
import menuSlice from './Features/menu/menuSlice';
import tabBarSlice from './Features/tabBar/tabBarSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    menu: menuSlice,
    tabBar: tabBarSlice,
  },
});
