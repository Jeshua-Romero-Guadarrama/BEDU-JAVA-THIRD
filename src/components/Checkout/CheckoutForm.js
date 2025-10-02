// src/components/Checkout/CheckoutForm.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Formulario de checkout que valida los campos y
// entrega los datos al componente padre.
// ==============================================
import { useRef, useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import classes from "./CheckoutForm.module.css";

const isEmpty = (value) => value.trim() === "";
const isPostalValid = (value) => value.trim().length >= 3;

export default function CheckoutForm({ onConfirm, onCancel }) {
  // Referencias directas a los inputs para manejar foco y valores.
  const nameInputRef = useRef(null);
  const streetInputRef = useRef(null);
  const cityInputRef = useRef(null);
  const postalInputRef = useRef(null);

  // Estado local que representa la validez de cada campo.
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  // Controla la validacion y el envio del formulario de checkout.
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const cityIsValid = !isEmpty(enteredCity);
    const postalIsValid = isPostalValid(enteredPostal);

    const newValidity = {
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postal: postalIsValid,
    };
    setFormInputsValidity(newValidity);

    const formIsValid = nameIsValid && streetIsValid && cityIsValid && postalIsValid;

    if (!formIsValid) {
      // Identifica el primer campo invalido para devolverle el foco al usuario.
      const firstInvalidField = [
        { isValid: nameIsValid, ref: nameInputRef },
        { isValid: streetIsValid, ref: streetInputRef },
        { isValid: cityIsValid, ref: cityInputRef },
        { isValid: postalIsValid, ref: postalInputRef },
      ].find((control) => !control.isValid);

      if (firstInvalidField?.ref?.current) {
        firstInvalidField.ref.current.focus();
      }
      return;
    }

    onConfirm({
      name: enteredName.trim(),
      street: enteredStreet.trim(),
      city: enteredCity.trim(),
      postal: enteredPostal.trim(),
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <Input
          ref={nameInputRef}
          label="Nombre"
          invalid={!formInputsValidity.name}
          helperText="El nombre debe registrarse"
          input={{ id: "name", type: "text" }}
        />
        <Input
          ref={streetInputRef}
          label="Direccion"
          invalid={!formInputsValidity.street}
          helperText="La direccion debe estar completa"
          input={{ id: "street", type: "text" }}
        />
        <Input
          ref={cityInputRef}
          label="Ciudad"
          invalid={!formInputsValidity.city}
          helperText="La ciudad no puede quedar vacia"
          input={{ id: "city", type: "text" }}
        />
        <Input
          ref={postalInputRef}
          label="Codigo postal"
          invalid={!formInputsValidity.postal}
          helperText="El codigo requiere al menos 3 caracteres"
          input={{ id: "postal", type: "text" }}
        />
      </div>
      <div className={classes.actions}>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar formulario
        </Button>
        <Button type="submit">Confirmacion del pedido</Button>
      </div>
    </form>
  );
}
