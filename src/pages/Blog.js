// src/pages/Blog.js
// ==============================================
// Cronica extendida con relatos y articulos de la saga.
// Autor: Jeshua Romero Guadarrama (expansion solicitada).
// ==============================================
import LoreBlog from "../components/Blog/LoreBlog";
import classes from "./Blog.module.css";

export default function Blog() {
  return (
    <div className={classes.page}>
      <section className={classes.hero}>
        <div className={classes.heroContent}>
          <h1 className={classes.heroTitle}>Cronicas de la Tierra Media</h1>
          <p className={classes.heroText}>
            Viaja desde la forja del Anillo Unico hasta la coronacion del Rey Elessar. Cada cronica revive a los heroes, reinos y batallas que alimentan este banquete tematico.
          </p>
        </div>
      </section>
      <LoreBlog />
    </div>
  );
}
