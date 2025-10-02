// src/components/Layout/MainHeader.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Barra superior con navegacion principal, resalta ruta activa
// y ofrece un menu responsive con boton hamburguesa.
// ==============================================
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import CartButton from "../Cart/CartButton";
import classes from "./MainHeader.module.css";

const navigationLinks = [
  { to: "/", label: "Inicio", end: true },
  { to: "/menu", label: "Menu" },
  { to: "/fichas", label: "Fichas" },
  { to: "/blog", label: "Blog" },
  { to: "/contacto", label: "Contacto" },
  { to: "/checkout", label: "Checkout" },
];

export default function MainHeader({ onShowCart }) {
  // Controla el estado del menu hamburguesa en dispositivos pequenos.
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  useEffect(() => {
    // Cierra el menu lateral cada vez que cambia la ruta activa.
    setIsDrawerOpen(false);
  }, [location.pathname]);

  const closeDrawer = () => setIsDrawerOpen(false);

  const buildLinkClassName = (baseClass, activeClass) => ({ isActive }) =>
    [baseClass, isActive ? activeClass : ""].filter(Boolean).join(" ");

  return (
    <header className={classes.header}>
      <div className={classes.brand}>Banquete LOTR</div>
      <nav className={classes.nav}>
        {navigationLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={Boolean(link.end)}
            className={buildLinkClassName(classes.link, classes.active)}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <CartButton onClick={onShowCart} />
      <button
        type="button"
        className={classes.burger}
        onClick={toggleDrawer}
        aria-label="Boton del menu principal"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
        </svg>
      </button>
      {isDrawerOpen && (
        <div className={classes.menuDrawer} role="presentation" onClick={closeDrawer}>
          <nav className={classes.drawerNav}>
            <ul className={classes.drawerList}>
              {navigationLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={Boolean(link.end)}
                    className={buildLinkClassName(
                      classes.drawerLink,
                      classes.drawerLinkActive
                    )}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
