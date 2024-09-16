import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;
const selectMenu = (state) => state.menu;
const toggleItemsDisplay = (state) => state.menu;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.items
);

export const selectTotalCount = createSelector(
  [selectCart],
  (cart) => cart.totalCount
);

export const selectTotalPrice = createSelector(
  [selectCart],
  (cart) => cart.totalPrice
);

export const selectCategory = createSelector(
  [selectMenu],
  (menu) => menu.selectedCategory
);
export const selectItemsDisplay = createSelector(
  [toggleItemsDisplay],
  (toggleItems) => toggleItems.itemsDisplay
);

