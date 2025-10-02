// src/pages/Checkout.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Pagina de checkout: muestra el resumen del carrito
// y permite confirmar el pedido fuera del modal.
// ==============================================
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import useHttp from "../hooks/use-http";
import { buildFirebaseEndpoint, isFirebaseConfigured as firebaseConfigured } from "../config/firebase";
import CartItem from "../components/Cart/CartItem";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import Button from "../components/UI/Button";
import classes from "./Checkout.module.css";

const ordersEndpoint = firebaseConfigured ? buildFirebaseEndpoint("orders") : "";

export default function CheckoutPage() {
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();
  const [requestSuccess, setRequestSuccess] = useState(false);
  const { sendRequest, status, error } = useHttp();

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  // Gestiona el envio de la orden a Firebase o al almacenamiento local.
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
      // El hook registra el error, por lo que solo se actualiza la bandera.
    }
  };

  const goToMenu = () => navigate("/menu");
  const goHome = () => navigate("/");

  if (!hasItems && status === "idle" && !requestSuccess) {
    return (
      <div className={`${classes.wrapper} ${classes.feedback}`}>
        <p>El carrito no contiene platillos en este momento.</p>
        <Button onClick={goToMenu}>Acceso al menu</Button>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className={`${classes.wrapper} ${classes.feedback}`}>
        <p>El sistema prepara la orden con ayuda de los hobbits.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${classes.wrapper} ${classes.feedback} ${classes.error}`}>
        <p>La orden presenta el siguiente inconveniente: {error}</p>
        <div className={classes.actions}>
          <Button variant="ghost" onClick={goHome}>
            Regreso al inicio
          </Button>
          <Button onClick={goToMenu}>Nueva seleccion</Button>
        </div>
      </div>
    );
  }

  if (requestSuccess) {
    return (
      <div className={`${classes.wrapper} ${classes.feedback}`}>
        <p>
          La orden se envio con exito. Un mensajero de la Tierra Media avisara cuando todo este listo para servir.
        </p>
        <div className={classes.actions}>
          <Button onClick={goHome}>Regreso al inicio</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="rounded-[2rem] border border-lotr-gold/25 bg-lotr-ink/85 p-10 text-center shadow-2xl shadow-black/40">
        <h1 className="font-cinzel text-2xl uppercase tracking-[0.4em] text-lotr-gold">Resumen y entrega</h1>
        <p className="mt-4 text-xs uppercase tracking-[0.25em] text-lotr-cream/70">
          Revisa los platillos elegidos, comparte los datos de entrega y confirma el banquete para tus companeros de viaje.
        </p>
      </header>

      <div className={classes.wrapper}>
        <section className={classes.summary}>
          <h2>Resumen del pedido</h2>
          <ul>
            {cartCtx.items.map((item) => (
              <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={() => cartCtx.removeItem(item.id)}
                onAdd={() => cartCtx.addItem({ ...item, amount: 1 })}
              />
            ))}
          </ul>
          <div className={classes.total}>
            <span>Total</span>
            <span>{totalAmount}</span>
          </div>
        </section>
        <section className={classes.formCard}>
          <h2>Datos de entrega</h2>
          <CheckoutForm onConfirm={submitOrderHandler} onCancel={goHome} />
        </section>
      </div>
    </div>
  );
}
