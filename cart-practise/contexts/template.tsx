import { createContext, useContext } from "react";

// create
const ShoppingContext = createContext({});


//custom hook to do outside the layout
export const useShoppingContext = () => {
    return useContext(ShoppingContext)
}


// provider for context
export const ShoppingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ShoppingContext.Provider value={{}}>{children}</ShoppingContext.Provider>
  );
};
