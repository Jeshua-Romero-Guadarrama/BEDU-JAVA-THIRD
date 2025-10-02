// src/components/Layout/Footer.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Pie de pagina con enlaces rapidos y redes ficticias.
// ==============================================
import { Link } from "react-router-dom";
import classes from "./Footer.module.css";

export default function Footer() {
  // Seccion inferior con enlaces clave y una cita centrada en la franquicia.
  return (
    <footer className={classes.footer}>
      <div className={classes.brand}>Banquete de la Tierra Media</div>
      <p className={classes.tagline}>
        Una experiencia culinaria inspirada en los festines de la Comarca, las salas de Rohan y los jardines de Lothlorien.
      </p>
      <div className={classes.links}>
        <Link to="/menu">Menu</Link>
        <Link to="/fichas">Fichas</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/checkout">Checkout</Link>
      </div>
      <p className={classes.copy}>Copyright {new Date().getFullYear()} Jeshua Romero Guadarrama - Sitio tematico sin fines de lucro inspirado en la obra de J.R.R. Tolkien.</p>
    </footer>
  );
}
