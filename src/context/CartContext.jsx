/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

const initialState = {
  products: [],
};

export const cartContext = createContext(initialState);

const cartReducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return {
        products: [],
      };
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <cartContext.Provider value={{ products: state.products, dispatch }}>
      {children}
    </cartContext.Provider>
  );
};
