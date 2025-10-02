// src/components/Layout/Layout.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Estructura general de la aplicacion: cabecera y
// zona principal para las paginas.
// ==============================================
import { Fragment } from "react";
import MainHeader from "./MainHeader";
import Footer from "./Footer";
import classes from "./Layout.module.css";

export default function Layout({ children, onShowCart }) {
  // Se envuelve cada vista con el encabezado y el pie reutilizables.
  return (
    <Fragment>
      <MainHeader onShowCart={onShowCart} />
      <main className={classes.main}>{children}</main>
      <Footer />
    </Fragment>
  );
}
