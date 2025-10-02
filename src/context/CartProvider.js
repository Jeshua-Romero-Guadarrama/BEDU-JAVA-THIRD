// src/context/CartProvider.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Proveedor del contexto de carrito.
// Usa useReducer para controlar la logica de agregar,
// quitar y limpiar productos del carrito.
// ==============================================
import { useReducer, useMemo } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[existingCartItemIndex];
    if (!existingItem) {
      return state;
    }

    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: Math.max(updatedTotalAmount, 0),
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return state;
};

export default function CartProvider({ children }) {
  // useReducer coordina la logica de negocio del carrito.
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCart = (item) => {
    dispatchCartAction({ type: "ADD", item });
  };

  const removeItemFromCart = (id) => {
    dispatchCartAction({ type: "REMOVE", id });
  };

  const clearCart = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  // Memoiza los valores expuestos para evitar renders innecesarios.
  const contextValue = useMemo(
    () => ({
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem: addItemToCart,
      removeItem: removeItemFromCart,
      clearCart,
    }),
    [cartState.items, cartState.totalAmount]
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}