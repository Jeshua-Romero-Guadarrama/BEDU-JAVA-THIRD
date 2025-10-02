// src/pages/NotFound.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Pagina mostrada cuando la ruta no existe.
// ==============================================
import Button from "../components/UI/Button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto mt-20 max-w-xl rounded-[2rem] border border-lotr-gold/40 bg-lotr-ink/85 p-12 text-center shadow-2xl shadow-black/50">
      <h2 className="font-cinzel text-2xl uppercase tracking-[0.4em] text-lotr-gold">Ruta no encontrada</h2>
      <p className="mt-6 text-xs uppercase tracking-[0.25em] text-lotr-cream/70">
        Este sendero aun no ha sido mapeado por los cronistas de la Tierra Media. Puedes regresar a la Comarca mediante el siguiente enlace.
      </p>
      <div className="mt-8 flex justify-center">
        <Button as={Link} to="/">
          Regreso al inicio
        </Button>
      </div>
    </div>
  );
}
