import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './Features/cart/cartSlice';
import orderSlice from './Features/cart/orderSlice';
import menuSlice from './Features/menu/menuSlice';
import toggleItemsSlice from './Features/menu/toggleItemsDisplaySlice';
import tabBarSlice from './Features/tabBar/tabBarSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    menu: menuSlice,
    tabBar: tabBarSlice,
    toggleItems: toggleItemsSlice,
    order: orderSlice,
  },
});
