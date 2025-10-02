// src/components/UI/Input.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Input reutilizable con soporte para refs y estados
// de validacion (feedback visual dinamico).
// ==============================================
import { forwardRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef(function Input({ label, input, invalid, helperText }, ref) {
  return (
    <div className={`${classes.input} ${invalid ? classes.invalid : ""}`.trim()}>
      <label htmlFor={input?.id}>{label}</label>
      <input ref={ref} {...input} />
      {invalid && helperText && <span className={classes["invalid-message"]}>{helperText}</span>}
    </div>
  );
});

export default Input;
