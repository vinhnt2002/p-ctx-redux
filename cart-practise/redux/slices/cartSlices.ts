import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  thumbnail: string;
}

type ProductItem = {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
};

interface CartState {
  items: CartItem[];
  cartQty: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  cartQty: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<ProductItem>) {
      const { id, name, price, thumbnail } = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.items.push({
          id,
          name,
          price,
          qty: 1,
          thumbnail,
        });
      }
      state.cartQty += 1;
      state.totalPrice += action.payload.price;
    },

    removeCartItem(state, action: PayloadAction<number>) {
      const idToRemove = action.payload;
      const removedItem = state.items.find((item) => item.id === idToRemove);

      if (removedItem) {
        state.items = state.items.filter((item) => item.id !== idToRemove);
        state.cartQty -= removedItem.qty;
        state.totalPrice -= removedItem.price * removedItem.qty;
      }
    },

    increaseQty(state, action: PayloadAction<number>) {
      const idToIncrease = action.payload;
      const itemToIncrease = state.items.find(
        (item) => item.id === idToIncrease
      );

      if (itemToIncrease) {
        itemToIncrease.qty += 1;
        state.cartQty += 1;
        state.totalPrice += itemToIncrease.price;
      }
    },

    decreaseQty(state, action: PayloadAction<number>) {
      const idToDecrease = action.payload;
      const itemToDecrease = state.items.find(
        (item) => item.id === idToDecrease
      );

      if (itemToDecrease) {
        if (itemToDecrease.qty === 1) {
          state.items = state.items.filter((item) => item.id !== idToDecrease);
        } else {
          itemToDecrease.qty -= 1;
        }

        state.cartQty -= 1;
        state.totalPrice -= itemToDecrease.price;
      }
    },
  },
});

export const { addCartItem, removeCartItem, increaseQty, decreaseQty } =
  cartSlice.actions;

export const selectAllProducts = (state: RootState) => state.cart.items;
export const selectCartQty = (state: RootState) => state.cart.cartQty;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;

export default cartSlice.reducer;
