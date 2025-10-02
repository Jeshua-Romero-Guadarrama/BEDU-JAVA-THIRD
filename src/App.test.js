// Autor: Jeshua Romero Guadarrama
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import CartProvider from "./context/CartProvider";

const renderApp = (initialEntries = ["/"]) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <CartProvider>
        <App />
      </CartProvider>
    </MemoryRouter>
  );

test("muestra el mensaje de bienvenida a la Tierra Media", () => {
  renderApp();
  expect(screen.getByText(/Banquete en la Comarca/i)).toBeInTheDocument();
});

test("renderiza el menu completo en la ruta correspondiente", () => {
  renderApp(["/menu"]);
  expect(screen.getByText(/Sabores de la Tierra Media/i)).toBeInTheDocument();
});
