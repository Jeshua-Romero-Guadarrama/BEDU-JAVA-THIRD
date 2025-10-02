// src/App.js
// ==============================================
// Punto de entrada de la SPA: gestiona las rutas y
// la visibilidad del modal del carrito.
// Autor: Jeshua Romero Guadarrama
// ==============================================
import { Fragment, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Cart from "./components/Cart/Cart";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import MealDetail from "./pages/MealDetail";
import Checkout from "./pages/Checkout";
import CharacterProfiles from "./pages/CharacterProfiles";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  // Controla la visibilidad del modal de carrito en toda la aplicacion.
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => setCartIsShown(true);
  const hideCartHandler = () => setCartIsShown(false);

  return (
    <Fragment>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Layout onShowCart={showCartHandler}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:mealId" element={<MealDetail />} />
          <Route path="/fichas" element={<CharacterProfiles />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Layout>
    </Fragment>
  );
}

export default App;
