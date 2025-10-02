// src/components/Meals/Meals.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Composicion principal del apartado de platillos.
// ==============================================
import { Fragment } from "react";
import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import classes from "./Meals.module.css";

export default function Meals() {
  // Combina el resumen tematico con la lista interactiva de platillos.
  return (
    <Fragment>
      <MealsSummary />
      <section className={classes.section}>
        <AvailableMeals />
      </section>
    </Fragment>
  );
}