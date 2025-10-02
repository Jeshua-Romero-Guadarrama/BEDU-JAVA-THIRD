# Banquete de la Tierra Media

Aplicacion React para demostrar de forma practica los aprendizajes del modulo. Presenta un menu inspirado en El Senor de los Anillos, carrito de compras, flujo de checkout, fichas interactivas de personajes y paginas complementarias (blog y contacto). La experiencia de usuario se refuerza con Tailwind CSS, modulos CSS y un set de imagenes locales almacenadas en `public/images` para garantizar consistencia visual sin depender de redes externas. Todo el contenido se mantiene en español con caracteres ASCII para maximizar la compatibilidad.

## Requisitos previos

- Node.js 16 o superior
- npm 8+ (incluido con Node)

## Puesta en marcha

```bash
npm install
npm start
```

La aplicacion queda disponible en `http://localhost:3000`.

Al respecto, se validós el comportamiento de los componentes:

```bash
npm test -- --watch=false
```

> Las pruebas usan Testing Library, mocks de `fetch` y cubren estados felices y de error.

## Estructura clave

```
src/
  components/
    Blog/           # Tarjetas del diario tematico
    Cart/           # Modal del carrito, botones y filas reutilizables
    Checkout/       # Formulario con validaciones y refs
    Layout/         # Header, footer y layout responsive
    Meals/          # Listado, tarjetas e inputs del menu
    UI/             # Card, Button, Input y Modal (usa Portals)
  config/           # Utilidades para construir endpoints de Firebase
  context/          # Contexto del carrito basado en useReducer
  hooks/            # Hook personalizado use-http
  pages/            # Home, Menu, MealDetail, Checkout, Fichas, Blog, Contacto, NotFound
  __tests__/        # Pruebas unitarias con mocks y escenarios de error
public/
  data/meals.json   # Fuente local con 10 platillos
  images/           # Imagenes locales de platillos y personajes
```

## Caracteristicas destacadas

- **Menu con assets locales**: Cada platillo utiliza imagenes alojadas en `public/images/meals`, evitando inconsistencias externas y manteniendo la dimension correcta en tarjetas y detalle.
- **Detalle enriquecido**: La vista `/menu/:mealId` reaprovecha la imagen recibida desde la tarjeta, permite anadir al carrito, muestra confirmacion y ofrece accesos directos al checkout o al listado de menu.
- **Fichario de personajes**: La pagina `/fichas` despliega imagenes locales de la franquicia, badges dinamicos y descripciones expandibles por personaje.
- **Blog y contacto**: `/blog` resume cronicas de la saga, mientras que `/contacto` ofrece formulario validado y datos de reservacion.
- **Carrito centralizado**: `CartProvider` agrupa los reducers (agregar, quitar, limpiar), expone totales memoizados y sincroniza modal, pagina de checkout y detalle de platillo.
- **Estilos dinamicos**: Tailwind CSS combinado con CSS Modules para hover states, layouts responsivos y animaciones suaves en tarjetas e imagenes.
- **Portal y fragmentos**: `Modal` renderiza backdrop y contenido fuera de la jerarquia principal; se emplean fragmentos para evitar nodos extra.
- **Hook HTTP reutilizable**: `useHttp` maneja estados `idle/pending/completed`, serializa cuerpos JSON y admite Firebase mediante variables de entorno.
- **Testing**: Las pruebas incluyen `App`, `CartProvider`, `useHttp` (con mocks de `fetch`) y `MealItemForm`, cubriendo flujo feliz y errores de validacion.

## Datos y Firebase opcional

Por defecto la aplicacion consume `public/data/meals.json`. Cuando el autor necesita conectar un Realtime Database de Firebase debe:

1. Crear una base de datos y agregar nodos `meals` y `orders`.
2. Copiar la URL (termina en `.json`).
3. Editar `.env.local`:

   ```bash
   REACT_APP_FIREBASE_URL=https://tu-proyecto-default-rtdb.firebaseio.com
   ```

`useHttp` detecta la variable y realiza las peticiones reales.

## Flujo recomendado para QA

1. Ejecutar `npm start` y revisar:
   - Menu con imagenes, botones y formulario funcionando.
   - Detalle del platillo agregando al carrito y navegando al checkout.
   - Paginas de blog, fichas y contacto cargando activos locales.
2. Correr `npm test -- --watch=false` para asegurar que los escenarios criticos continuen pasando.
3. Validar build de produccion con `npm run build` antes de desplegar.
