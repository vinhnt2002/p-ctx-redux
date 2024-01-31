"use client";
import { createContext, useContext, useState, useEffect } from "react";
type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  thumbnail: string;
};

type ProductItem = {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
};

interface ShoppingContextType {
  cartQty: number;
  totalPrice: number;
  cartItem: CartItem[];
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  addCartItem: (item: ProductItem) => void;
  removeCartItem: (id: number) => void;
  clearCart: () => void;
}

// create
const ShoppingContext = createContext<ShoppingContextType>(
  {} as ShoppingContextType
);

//custom hook to do outside the layout
export const useShoppingContext = () => {
  return useContext(ShoppingContext);
};

// provider for context
export const ShoppingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // TO DO FUNCTION HOOK
  const [cartItem, setCartItem] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const jsonCartData = localStorage.getItem("cartItem");
      return jsonCartData ? JSON.parse(jsonCartData) : [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  const cartQty = cartItem?.reduce((qty, item) => qty + item.qty, 0);
  const totalPrice = cartItem?.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const increaseQty = (id: number) => {
    console.log("Increase => ", id);
    const currentCartItem = cartItem.find((item) => id === item.id);

    if (currentCartItem) {
      const newItem = cartItem.map((item) => {
        if (item.id === id) {
          return { ...item, qty: item.qty + 1 };
        } else {
          return item;
        }
      });
      setCartItem(newItem);
    }
  };

  const decreaseQty = (id: number) => {
    const currentCartItem = cartItem.find((item) => item.id === id);

    if (currentCartItem) {
      if (currentCartItem.qty == 1) {
        removeCartItem(id);
      }

      const newItem = cartItem.map((item) => {
        if (item.id === id) {
          return { ...item, qty: item.qty - 1 };
        } else {
          return item;
        }
      });
      setCartItem(newItem);
    }
  };

  const addCartItem = (product: ProductItem) => {
    console.log("Products => ", product);
    if (product) {
      const currentCartItem = cartItem.find((item) => item.id === product.id);

      if (currentCartItem) {
        const newItems = cartItem.map((item) => {
          if (product.id === item.id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });

        setCartItem(newItems);
      } else {
        const newItem = { ...product, qty: 1 };
        setCartItem([...cartItem, newItem]);
      }
    }
  };

  const removeCartItem = (id: number) => {
    const currentCartItem = cartItem.findIndex((item) => id === item.id);
    const newItems = [...cartItem];
    newItems.splice(currentCartItem, 1);

    setCartItem(newItems);
  };

  const clearCart = () => {
    setCartItem([]);
  };

  return (
    <ShoppingContext.Provider
      value={{
        cartQty,
        totalPrice,
        cartItem,
        increaseQty,
        decreaseQty,
        addCartItem,
        removeCartItem,
        clearCart,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};
