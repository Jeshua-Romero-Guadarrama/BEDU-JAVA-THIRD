// src/components/UI/Card.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Contenedor reutilizable con estilo visual coherente.
// ==============================================
import classes from "./Card.module.css";

export default function Card({ children, className = "" }) {
  return <div className={`${classes.card} ${className}`.trim()}>{children}</div>;
}
