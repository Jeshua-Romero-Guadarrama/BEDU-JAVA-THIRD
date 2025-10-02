// src/components/Meals/AvailableMeals.js
// ==============================================
// Obtiene los platillos desde Firebase (si se configuro)
// o desde un JSON local. Muestra estados de carga/error.
// Autor: Jeshua Romero Guadarrama
// ==============================================
import { useEffect } from "react";
import Card from "../UI/Card";
import useHttp from "../../hooks/use-http";
import { buildFirebaseEndpoint, isFirebaseConfigured as firebaseConfigured } from "../../config/firebase";
import MealItem from "./MealItem";
import classes from "./AvailableMeals.module.css";

const mealsEndpoint = firebaseConfigured ? buildFirebaseEndpoint("meals") : "";

const transformMeals = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) {
    return data;
  }
  if (data.meals) {
    return data.meals;
  }
  return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
};

export default function AvailableMeals() {
  // Se delega el manejo de peticiones HTTP al hook personalizado.
  const { data: loadedMeals, status, error, sendRequest } = useHttp();

  useEffect(() => {
    const requestConfig = mealsEndpoint
      ? { url: mealsEndpoint }
      : { url: "/data/meals.json" };

    sendRequest(requestConfig, transformMeals).catch(() => {
      // El hook registra el error internamente para mostrarlo en pantalla.
    });
  }, [sendRequest]);

  let content;

  if (status === "pending") {
    content = <p className={classes.fallback}>El sistema carga las delicias de la Comarca...</p>;
  }

  if (status === "completed" && error) {
    content = (
      <p className={classes.fallback}>La carga de platillos presenta un inconveniente: {error}</p>
    );
  }

  const meals = loadedMeals || [];

  if ((status === "completed" || status === "idle") && meals.length === 0 && !error) {
    content = <p className={classes.fallback}>El catalogo agregara mas platillos proximamente.</p>;
  }

  if (meals.length > 0) {
    content = (
      <ul className={classes.list}>
        {meals.map((meal) => (
          <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
            image={meal.image}
          />
        ))}
      </ul>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
}
