// src/components/Cart/CartButton.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Boton que muestra la cantidad de productos en el carrito
// con animacion de feedback visual al agregar items.
// ==============================================
import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/CartContext";
import classes from "./CartButton.module.css";

export default function CartButton({ onClick }) {
  // Recupera los items del carrito para reflejar el total en la insignia.
  const cartCtx = useContext(CartContext);
  const [isHighlighted, setIsHighlighted] = useState(false);

  const numberOfItems = cartCtx.items.reduce((sum, item) => sum + item.amount, 0);

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    // Activa la animacion tipo "bump" cada vez que cambia la cantidad total de productos.
    setIsHighlighted(true);
    const timer = setTimeout(() => setIsHighlighted(false), 300);
    return () => clearTimeout(timer);
  }, [cartCtx.items]);

  const btnClasses = `${classes.button} ${isHighlighted ? classes.bump : ""}`.trim();

  return (
    <button className={btnClasses} onClick={onClick} type="button">
      <span className={classes.icon} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 4h-2l-1 2v2h2l3.6 7.59-1.35 2.44c-.22.4-.25.88-.08 1.31.17.43.52.76.96.91.15.05.3.07.45.07h11v-2h-9.42c-.04 0-.08-.03-.09-.07l.03-.05 1-1.8h6.96c.75 0 1.41-.41 1.75-1.05l3-5.45v-3.9h-16zm0 2h12v1.38l-2.66 4.83h-6.6l-2.74-5.21z" />
        </svg>
      </span>
      <span>Carrito</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
}
