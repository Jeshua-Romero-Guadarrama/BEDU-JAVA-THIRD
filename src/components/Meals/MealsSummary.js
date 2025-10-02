// src/components/Meals/MealsSummary.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Texto introductorio para el menu de platillos.
// ==============================================
import classes from "./MealsSummary.module.css";

export default function MealsSummary() {
  return (
    <section className={classes.summary}>
      <h2>Sabores de la Tierra Media</h2>
      <p>
        Descubre entradas hobbit, banquetes de Rohan y postres elficos elaborados con ingredientes frescos. Todo esta listo para que armes tu menu perfecto antes de iniciar la aventura.
      </p>
    </section>
  );
}
