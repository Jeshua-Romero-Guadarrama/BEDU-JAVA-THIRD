// src/pages/Menu.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Pagina dedicada al menu completo de platillos.
// ==============================================
import Meals from "../components/Meals/Meals";
import classes from "./Menu.module.css";

export default function Menu() {
  // Renderiza un hero tematico seguido de la lista reutilizable de platillos.
  return (
    <div className={classes.wrapper}>
      <section className={classes.hero}>
        <div className={classes.heroContent}>
          <h1 className={classes.heroTitle}>Menu de El Senor de los Anillos</h1>
          <p className={classes.heroText}>
            Coleccion inspirada en posadas hobbit, salones de Rohan y banquetes elficos. Selecciona tus favoritos y agrega porciones extra para toda la comunidad.
          </p>
        </div>
      </section>
      <Meals />
    </div>
  );
}
