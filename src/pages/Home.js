// src/pages/Home.js
// ==============================================
// Pantalla inicial con llamado a la accion y secciones destacadas.
// Autor: Jeshua Romero Guadarrama
// ==============================================
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import Meals from "../components/Meals/Meals";
import LoreBlog from "../components/Blog/LoreBlog";
import classes from "./Home.module.css";

// Tarjetas tematicas que presentan los principales banquetes del proyecto.
const legendHighlights = [
  {
    title: "Sabores de la Comarca",
    description: "Panes, quesos y guisos hobbit servidos en porciones generosas para compartir en la mesa redonda.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3 7h7l-5.5 4.3L18.5 21 12 16.9 5.5 21l1.5-7.7L1.5 9H8z" />
      </svg>
    ),
  },
  {
    title: "Banquetes de Rohan",
    description: "Carnes asadas lentamente, hidromiel dorada y vegetales al fuego listos para las horas previas a la cabalgata.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4a4 4 0 00-4 4v3H6l6 7 6-7h-2V8a4 4 0 00-4-4z" />
      </svg>
    ),
  },
  {
    title: "Dulces de Lothlorien",
    description: "Pasteles, frutas confitadas y bebidas fragantes que iluminan las noches bajo los mallorn dorados.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4h2l3 9 3-9h2l3 9 3-9h2l-4 16h-2l-3-9-3 9h-2z" />
      </svg>
    ),
  },
];

// Imagenes y descripciones que enlazan experiencias gastronomicas con lugares iconicos.
const galleryItems = [
  {
    title: "Fiesta en Bolson Cerrado",
    description: "Una mesa interminable de tartas y ensaladas frescas para celebrar los cumpleanos hobbit.",
    image:
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Comedor de Edoras",
    description: "Cordero especiado y pan recien horneado acompanados con hidromiel de la marca.",
    image:
      "https://images.unsplash.com/photo-1548946526-f69e2424cf45?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Bodega de Erebor",
    description: "Quesos curados, charcuteria enana y bebidas con notas ahumadas guardadas en barriles antiguos.",
    image:
      "https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Home() {
  return (
    <div className={classes.page}>
      <section className={classes.hero}>
        <div className={classes.heroContent}>
          <h1 className={classes.heroTitle}>Banquete en la Comarca</h1>
          <p className={classes.heroText}>
            Es el punto de encuentro para viajeros, elfos y jinetes de Rohan. Descubre menus completos, historias legendarias y reservaciones para celebraciones privadas.
          </p>
          <div className={classes.actions}>
            <Button as={Link} to="/menu">
              Ver menu completo
            </Button>
            <Button as={Link} to="/contacto" variant="ghost">
              Reservar un evento
            </Button>
          </div>
        </div>
      </section>

      <section className={classes.legendSection}>
        {legendHighlights.map((item) => (
          <article key={item.title} className={classes.legendCard}>
            <span className={classes.legendIcon}>{item.icon}</span>
            <h3 className={classes.legendTitle}>{item.title}</h3>
            <p className={classes.legendText}>{item.description}</p>
          </article>
        ))}
      </section>

      <section className={classes.gallery}>
        <div className={classes.galleryInner}>
          <div className={classes.galleryGrid}>
            {galleryItems.map((item) => (
              <article key={item.title} className={classes.galleryCard}>
                <img src={item.image} alt={item.title} className={classes.galleryImage} />
                <div className={classes.galleryBody}>
                  <h3 className="font-cinzel text-sm uppercase tracking-[0.3em] text-lotr-gold">
                    {item.title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-lotr-cream/80">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={classes.cta}>
        <h2 className={classes.ctaTitle}>Prepara tu pedido</h2>
        <p className={classes.ctaText}>
          Elige tus platillos favoritos, ajusta las porciones y agregalos al carrito para revivir las celebraciones de la Comunidad.
        </p>
        <div className="flex flex-col gap-4 md:flex-row">
          <Button as={Link} to="/menu">
            Explorar platillos
          </Button>
          <Button as={Link} to="/checkout" variant="ghost">
            Revisar el pedido
          </Button>
          <Button as={Link} to="/fichas" variant="ghost">
            Conocer a los personajes
          </Button>
        </div>
      </section>

      <LoreBlog />
      <Meals />
    </div>
  );
}
