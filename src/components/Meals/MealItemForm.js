// src/components/Meals/MealItemForm.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Formulario para seleccionar unidades de un platillo
// y agregarlo al carrito.
// ==============================================
import { useRef, useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import classes from "./MealItemForm.module.css";

export default function MealItemForm({ id, onAddToCart }) {
  // Referencia directa para leer y enfocar el input.
  const amountInputRef = useRef(null);
  const [amountIsValid, setAmountIsValid] = useState(true);

  // Valida el rango permitido y notifica al componente padre.
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      setAmountIsValid(false);
      amountInputRef.current.focus();
      return;
    }

    setAmountIsValid(true);
    onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Cantidad"
        invalid={!amountIsValid}
        helperText="El rango permitido es de 1 a 5 unidades"
        input={{
          id: `amount_${id}`,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <div className={classes.actions}>
        <Button size="small" type="submit">
          Registro en el carrito
        </Button>
      </div>
    </form>
  );
}
