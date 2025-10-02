// src/components/UI/Modal.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Modal reutilizable usando React Portals para
// sacar el contenido de la jerarquia principal.
// ==============================================
import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = ({ onClose }) => <div className={classes.backdrop} onClick={onClose} />;

const ModalOverlay = ({ children, className = "" }) => (
  <div className={`${classes.modal} ${className}`.trim()}>{children}</div>
);

export default function Modal({ children, onClose, className }) {
  const backdropRoot = document.getElementById("backdrop-root");
  const modalRoot = document.getElementById("modal-root");

  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, backdropRoot)}
      {ReactDOM.createPortal(
        <ModalOverlay className={className}>{children}</ModalOverlay>,
        modalRoot
      )}
    </Fragment>
  );
}
