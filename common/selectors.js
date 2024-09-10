import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

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