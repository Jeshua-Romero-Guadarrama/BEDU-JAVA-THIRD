// src/components/Cart/Cart.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Modal del carrito: lista los productos, permite
// ajustar cantidades y cerrar/confirmar el pedido.
// ==============================================
import { Fragment, useContext, useState } from "react";
import CartContext from "../../context/CartContext";
import useHttp from "../../hooks/use-http";
import { buildFirebaseEndpoint, isFirebaseConfigured as firebaseConfigured } from "../../config/firebase";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import CartItem from "./CartItem";
import CheckoutForm from "../Checkout/CheckoutForm";
import classes from "./Cart.module.css";

const ordersEndpoint = firebaseConfigured ? buildFirebaseEndpoint("orders") : "";

export default function Cart({ onClose }) {
  // Contexto global del carrito para compartir items y totales entre componentes.
  const cartCtx = useContext(CartContext);
  // Control local para alternar la vista de checkout dentro del modal.
  const [isCheckout, setIsCheckout] = useState(false);
  // Bandera que confirma si la orden fue enviada correctamente.
  const [requestSuccess, setRequestSuccess] = useState(false);
  // Hook personalizado encargado de peticiones HTTP y estados de carga/errores.
  const { sendRequest, status, error } = useHttp();

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  // Remueve una unidad del item indicado en el carrito global.
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  // Agrega una unidad adicional del item indicado al carrito global.
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  // Habilita el formulario de checkout incrustado en el modal.
  const orderHandler = () => {
    setIsCheckout(true);
  };

  // Registra la orden ya sea en Firebase o en localStorage cuando no hay backend.
  const submitOrderHandler = async (userData) => {
    setRequestSuccess(false);
    try {
      if (ordersEndpoint) {
        await sendRequest(
          {
            url: ordersEndpoint,
            method: "POST",
            body: {
              user: userData,
              items: cartCtx.items,
              createdAt: new Date().toISOString(),
            },
          },
          () => null
        );
      } else {
        const existingOrders = JSON.parse(localStorage.getItem("lotr-orders") || "[]");
        existingOrders.push({
          user: userData,
          items: cartCtx.items,
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem("lotr-orders", JSON.stringify(existingOrders));
      }
      setRequestSuccess(true);
      cartCtx.clearCart();
    } catch (err) {
      // El hook se encarga de registrar el error y el estado de finalizacion.
    }
  };

  // Contenido por defecto del modal (lista de items + acciones disponibles).
  let cartContent = (
    <Fragment>
      <ul className={classes["cart-items"]}>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={() => cartItemRemoveHandler(item.id)}
            onAdd={() => cartItemAddHandler(item)}
          />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <CheckoutForm onConfirm={submitOrderHandler} onCancel={onClose} />
      )}
      {!isCheckout && (
        <div className={classes.actions}>
          <Button variant="ghost" onClick={onClose}>
            Cierre del modal
          </Button>
          {hasItems && <Button onClick={orderHandler}>Acceso al checkout</Button>}
        </div>
      )}
    </Fragment>
  );

  // Mensaje de transicion mientras la orden se esta enviando.
  if (status === "pending") {
    cartContent = (
      <div className={classes.feedback}>
        <p>El sistema envia la orden hacia la campana de Hobbiton...</p>
      </div>
    );
  }

  // Mensaje de error cuando la peticion HTTP falla.
  if (error) {
    cartContent = (
      <div className={`${classes.feedback} ${classes.error}`}>
        <p>El envio enfrenta un inconveniente: {error}</p>
        <Button variant="ghost" onClick={onClose}>
          Cierre del modal
        </Button>
      </div>
    );
  }

  // Mensaje de confirmacion cuando la orden se registra con exito.
  if (requestSuccess && status !== "pending" && !error) {
    cartContent = (
      <div className={classes.feedback}>
        <p>El mensajero de la Tierra Media recoge los platillos en unos minutos.</p>
        <Button onClick={onClose}>Cerrar el mensaje</Button>
      </div>
    );
  }

  // La estructura final se renderiza dentro de un portal para sobresalir en la UI.
  return (
    <Modal onClose={onClose}>
      <div className={classes.cart}>{cartContent}</div>
    </Modal>
  );
}
