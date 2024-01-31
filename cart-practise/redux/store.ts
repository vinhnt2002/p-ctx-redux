import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlices";

import storage from "redux-persist/lib/storage"; // Import local storage
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

// setup to store in localStorage
const persistConfig = {
  key: "redux_cart", // The key for local storage
  storage, // The storage method (localStorage)
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
});

export const persistor = persistStore(store); // Create a persistor for the store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
