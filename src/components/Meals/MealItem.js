// src/components/Meals/MealItem.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Platillo individual: muestra descripcion y precio
// y permite agregar unidades al carrito.
// ==============================================
import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";
import MealItemForm from "./MealItemForm";
import Button from "../UI/Button";
import classes from "./MealItem.module.css";

const priceFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
});

const fallbackImage = "/images/meals/m1.jpg";

export default function MealItem({ id, name, description, price, image }) {
  const cartCtx = useContext(CartContext);

  const formattedPrice = useMemo(() => {
    const numericPrice = Number(price);
    if (Number.isFinite(numericPrice)) {
      return priceFormatter.format(numericPrice);
    }
    return "--";
  }, [price]);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id,
      name,
      amount,
      price: Number(price),
      image,
      description,
    });
  };

  const detailState = {
    meal: {
      id,
      name,
      description,
      price,
      image,
    },
  };

  const imageSrc = image || fallbackImage;

  return (
    <li className={classes.meal}>
      <div className={classes.media}>
        <img src={imageSrc} alt={name} className={classes.image} loading="lazy" />
      </div>
      <div className={classes.body}>
        <header className={classes.header}>
          <h3 className="font-cinzel text-lg uppercase tracking-[0.35em] text-lotr-gold">{name}</h3>
          <p className={classes.description}>{description}</p>
        </header>
        <div className={classes.meta}>
          <span className={classes.price}>{formattedPrice}</span>
          <Button as={Link} to={`/menu/${id}`} state={detailState} size="small" variant="ghost">
            Detalle del platillo
          </Button>
        </div>
        <div className={classes.formWrapper}>
          <MealItemForm id={id} onAddToCart={addToCartHandler} />
        </div>
      </div>
    </li>
  );
}
