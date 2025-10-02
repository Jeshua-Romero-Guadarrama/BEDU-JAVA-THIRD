// src/components/UI/Button.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Boton reutilizable con variantes y soporte para
// estilos dinamicos. Permite renderizar otros
// componentes (Link) mediante la prop "as".
// ==============================================
import classes from "./Button.module.css";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size,
  fullWidth = false,
  className = "",
  as: Component = "button",
  ...props
}) {
  const classNames = [classes.button, classes[variant], className];
  if (size && classes[size]) {
    classNames.push(classes[size]);
  }
  if (fullWidth) {
    classNames.push(classes.fullWidth);
  }
  if (props.disabled) {
    classNames.push(classes.disabled);
  }

  const componentProps = { className: classNames.filter(Boolean).join(" "), ...props };
  if (Component === "button") {
    componentProps.type = type;
  }

  return <Component {...componentProps}>{children}</Component>;
}
