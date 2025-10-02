// src/components/Cart/CartItem.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Representa una fila del carrito con controles
// para sumar o restar unidades.
// ==============================================
import classes from "./CartItem.module.css";

export default function CartItem({ name, amount, price, onRemove, onAdd }) {
  // Precio formateado en dolares para mantener consistencia visual.
  const formattedPrice = `$${price.toFixed(2)}`;

  return (
    <li className={classes.item}>
      <div className={classes.summary}>
        <h3>{name}</h3>
        <div>
          <span className={classes.price}>{formattedPrice}</span>
          <span className={classes.amount}>x {amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onRemove}>
          -
        </button>
        <button type="button" onClick={onAdd}>
          +
        </button>
      </div>
    </li>
  );
}
