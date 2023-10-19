/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";

const initialState = {
  products:
    localStorage.getItem("cart-products") !== undefined
      ? JSON.parse(localStorage.getItem("cart-products"))
      : [],
};

export const cartContext = createContext(initialState);

const cartReducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return {
        products: [],
      };
    case "ADD_PRODUCT_TO_CART":
      if (state.products?.find((el) => el?.id === action.payload.product?.id)) {
        const products = state.products.map((el) => {
          if (el?.id === action.payload.product?.id) {
            return {
              ...el,
              amount: el?.amount + action.payload.product.amount,
            };
          } else {
            return {
              ...el,
            };
          }
        });
        return {
          products: products,
        };
      }
      return {
        products: [...state.products, action.payload.product],
      };

    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  useEffect(() => {
    localStorage.setItem("cart-products", JSON.stringify(state.products ?? []));
  }, [state]);
  return (
    <cartContext.Provider value={{ products: state.products, dispatch }}>
      {children}
    </cartContext.Provider>
  );
};
