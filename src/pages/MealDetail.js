// src/pages/MealDetail.js
// ==============================================
// Vista de detalle para un platillo especifico.
// Autor: Jeshua Romero Guadarrama
// ==============================================
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CartContext from "../context/CartContext";
import useHttp from "../hooks/use-http";
import { buildFirebaseEndpoint, isFirebaseConfigured as firebaseConfigured } from "../config/firebase";
import MealItemForm from "../components/Meals/MealItemForm";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import classes from "./MealDetail.module.css";

const mealsEndpoint = firebaseConfigured ? buildFirebaseEndpoint("meals") : "";

const priceFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
});

const transformSingleMeal = (data, id) => {
  if (!data) return null;
  if (Array.isArray(data)) {
    return data.find((meal) => meal.id === id) || null;
  }
  if (data.meals) {
    return data.meals.find((meal) => meal.id === id) || null;
  }
  if (data[id]) {
    return { id, ...data[id] };
  }
  return Object.keys(data)
    .map((key) => ({ id: key, ...data[key] }))
    .find((meal) => meal.id === id) || null;
};

const fallbackImage = "/images/meals/m1.jpg";

export default function MealDetail() {
  const { mealId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);
  const { status, error, sendRequest } = useHttp();
  const initialMeal = location.state?.meal && location.state.meal.id === mealId ? location.state.meal : null;
  const [meal, setMeal] = useState(initialMeal);
  const [notFound, setNotFound] = useState(false);
  const [addedMessage, setAddedMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    const requestConfig = mealsEndpoint
      ? { url: mealsEndpoint }
      : { url: "/data/meals.json" };

    sendRequest(requestConfig, (incoming) => transformSingleMeal(incoming, mealId))
      .then((mealData) => {
        if (!isMounted) return;
        if (mealData) {
          setMeal(mealData);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        // El hook controla el estado de error.
      });

    return () => {
      isMounted = false;
    };
  }, [mealId, sendRequest]);

  const addToCartHandler = (amount) => {
    if (!meal) return;
    cartCtx.addItem({
      id: meal.id,
      name: meal.name,
      amount,
      price: meal.price,
      image: meal.image,
    });
    setAddedMessage(`${meal.name} (${amount}) agregado al carrito.`);
  };

  const goBack = () => navigate("/menu");

  if ((status === "pending" && !meal) || (!meal && !error && !notFound)) {
    return (
      <div className={classes.feedback}>
        <p>El sistema carga la informacion del platillo seleccionado.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.feedback}>
        <p>Se detecta un problema al obtener el platillo: {error}</p>
        <Button onClick={goBack}>Regreso al menu</Button>
      </div>
    );
  }

  if (notFound || !meal) {
    return (
      <div className={classes.feedback}>
        <p>El platillo no se encuentra registrado en las cocinas de la Tierra Media.</p>
        <Button onClick={goBack}>Regreso al menu</Button>
      </div>
    );
  }

  const imageSrc = meal.image || fallbackImage;
  const formattedPrice = priceFormatter.format(Number(meal.price || 0));

  return (
    <div className={classes.wrapper}>
      <Card>
        <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-lotr-gold/30 shadow-lg shadow-black/40">
            <img src={imageSrc} alt={meal.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col gap-6">
            <div className={classes.header}>
              <h2 className="font-cinzel text-2xl uppercase tracking-[0.4em] text-lotr-gold">{meal.name}</h2>
              <div className={classes.tags}>
                <span>Precio: {formattedPrice}</span>
                <span>ID: {meal.id}</span>
              </div>
            </div>
            <p className={classes.summary}>{meal.description}</p>
            <div className={classes.cta}>
              <MealItemForm id={meal.id} onAddToCart={addToCartHandler} />
              <div className="flex flex-col gap-3 md:flex-row">
                <Button variant="ghost" onClick={goBack}>
                  Regreso al menu
                </Button>
                <Button onClick={() => navigate("/checkout")}>Acceso al checkout</Button>
              </div>
            </div>
            {addedMessage && (
              <p className="text-xs uppercase tracking-[0.25em] text-lotr-gold/80">
                {addedMessage}
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
