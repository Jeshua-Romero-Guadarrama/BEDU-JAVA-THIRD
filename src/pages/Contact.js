// src/pages/Contact.js
// ==============================================
// Pagina de contacto para reservas y mensajes.
// Autor: Jeshua Romero Guadarrama (expansion solicitada).
// ==============================================
import { useState } from "react";
import Button from "../components/UI/Button";
import classes from "./Contact.module.css";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function Contact() {
  const [formValues, setFormValues] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: false }));
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    if (!formValues.name.trim()) {
      errors.name = "El nombre es obligatorio";
    }
    if (!formValues.email.trim()) {
      errors.email = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email.trim())) {
      errors.email = "El correo no tiene un formato valido";
    }
    if (!formValues.message.trim()) {
      errors.message = "Describe tu solicitud";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmitted(true);
    setFormValues(initialFormState);
  };

  return (
    <div className={classes.page}>
      <section className={classes.hero}>
        <div className={classes.heroContent}>
          <h1 className={classes.heroTitle}>Contacto y reservaciones</h1>
          <p className={classes.heroText}>
            Escribenos para organizar banquetes tematicos, catas de hidromiel o experiencias privadas inspiradas en la Tierra Media.
          </p>
        </div>
      </section>

      <section className={classes.section}>
        <div className={classes.infoCard}>
          <h2 className={classes.infoTitle}>Salones abiertos</h2>
          <p className={classes.infoText}>
            Atendemos en la Comarca de lunes a sabado, con eventos especiales los fines de semana. Las reservas anticipadas garantizan los asientos junto al hogar y acceso a los repertorios musicales de los elfos.
          </p>
          <ul className={classes.contactList}>
            <li>
              <span className={classes.contactLabel}>Direccion</span>
              <span className={classes.contactValue}>Camino a Bolson Cerrado 142, La Comarca</span>
            </li>
            <li>
              <span className={classes.contactLabel}>Telefono</span>
              <span className={classes.contactValue}>+52 55 1234 5678</span>
            </li>
            <li>
              <span className={classes.contactLabel}>Correo</span>
              <span className={classes.contactValue}>reservas@banquetelotr.com</span>
            </li>
          </ul>
        </div>

        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <h2 className={classes.formTitle}>Solicita informacion</h2>
          <div className={classes.fieldGroup}>
            <label htmlFor="contact-name">Nombre completo</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={formValues.name}
              onChange={handleChange}
              aria-invalid={Boolean(formErrors.name)}
            />
            {formErrors.name && <p className={classes.errorText}>{formErrors.name}</p>}
          </div>
          <div className={classes.fieldGroup}>
            <label htmlFor="contact-email">Correo electronico</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleChange}
              aria-invalid={Boolean(formErrors.email)}
            />
            {formErrors.email && <p className={classes.errorText}>{formErrors.email}</p>}
          </div>
          <div className={classes.fieldGroup}>
            <label htmlFor="contact-phone">Telefono</label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              value={formValues.phone}
              onChange={handleChange}
            />
          </div>
          <div className={classes.fieldGroup}>
            <label htmlFor="contact-message">Mensaje</label>
            <textarea
              id="contact-message"
              name="message"
              rows="5"
              value={formValues.message}
              onChange={handleChange}
              aria-invalid={Boolean(formErrors.message)}
            />
            {formErrors.message && <p className={classes.errorText}>{formErrors.message}</p>}
          </div>
          <div className={classes.actions}>
            <Button type="submit">Enviar solicitud</Button>
          </div>
          {submitted && (
            <p className={classes.successMessage}>
              Gracias por tu mensaje. Un miembro de nuestra compania respondera en breve para coordinar los detalles.
            </p>
          )}
        </form>
      </section>
    </div>
  );
}



