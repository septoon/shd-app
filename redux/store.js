import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './Features/cart/cartSlice';
import orderSlice from './Features/cart/orderSlice';
import dateSlice from './Features/cart/dateSlice';
import menuSlice from './Features/menu/menuSlice';
import contactsSlice from './Features/contacts/contactsSlice';
import deliverySlice from './Features/delivery/deliverySlice';
import toggleItemsSlice from './Features/menu/toggleItemsDisplaySlice';
import tabBarSlice from './Features/tabBar/tabBarSlice';
import orderHistorySlice from './Features/cart/orderHistorySlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    menu: menuSlice,
    tabBar: tabBarSlice,
    toggleItems: toggleItemsSlice,
    order: orderSlice,
    date: dateSlice,
    contacts: contactsSlice,
    delivery: deliverySlice,
    orderHistory: orderHistorySlice
  },
});
