// src/context/CartContext.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Contexto global para el carrito de compras.
// Permite compartir el estado entre componentes
// sin pasar props manualmente en cada nivel.
// ==============================================
import { createContext } from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export default CartContext;
