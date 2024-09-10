import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addToCart: (state, action) => {
      const itemPresent = state.items.find((item) =>item.id === action.payload.id)
      if(itemPresent) {
        itemPresent.quantity++
      } else {
        state.items.push({...action.payload, quantity: 1})
      }
    },
    removeFromCart: (state, action) => {
      const removeItem = state.items.filter((item) => item.id != action.payload.id)
      state.items = removeItem
    }
  }
})

// export const { addToCart, removeFromCart } = cartSlice.actions
// export default cartSlice
