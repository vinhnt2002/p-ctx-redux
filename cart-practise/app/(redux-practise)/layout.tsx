"use client";
import { store, persistor } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

//npx json-server -w data/product.json -p 3001       RUN FAKE DATA HERE
export default function ReduxPratiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </div>
  );
}
