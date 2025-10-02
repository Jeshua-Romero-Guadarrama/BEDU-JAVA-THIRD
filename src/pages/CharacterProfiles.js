// src/pages/CharacterProfiles.js
// ==============================================
// Fichas interactivas de personajes de la Tierra Media.
// Autor: Jeshua Romero Guadarrama (expansion solicitada).
// ==============================================
import { useState } from "react";
import Button from "../components/UI/Button";
import classes from "./CharacterProfiles.module.css";

const fallbackImage = "/images/characters/fallback.jpg";

const characterProfiles = [
  {
    id: "frodo",
    name: "Frodo Bolson",
    role: "Portador del Anillo Unico",
    faction: "La Comunidad del Anillo",
    race: "Hobbit",
    origin: "La Comarca",
    image: "/images/characters/frodo.png",
    description:
      "Heredero de Bilbo y elegido para portar el Anillo Unico. Su valentia discreta demuestra que la esperanza puede surgir de los rincones mas humildes de la Tierra Media.",
  },
  {
    id: "aragorn",
    name: "Aragorn Elessar",
    role: "Montaraz de los Dunedain",
    faction: "Personajes principales",
    race: "Humano",
    origin: "Arnor, Rivendel y Gondor",
    image: "/images/characters/aragorn.jpg",
    description:
      "Lider silencioso que transita de montaraz a rey. Representa la restauracion de Gondor y la union de los pueblos libres en la Tercera Edad.",
  },
  {
    id: "gandalf",
    name: "Gandalf el Gris",
    role: "Maiar y guia de la Comunidad",
    faction: "Consejo de los Sabios",
    race: "Ainur (Istari)",
    origin: "Valinor y la Tierra Media",
    image: "/images/characters/gandalf.jpg",
    description:
      "Combina sabiduria, magia y estrategia. Inspirador de alianzas, encabeza las estructuras que permiten a cada raza cumplir su papel en la derrota de Sauron.",
  },
  {
    id: "legolas",
    name: "Legolas Thranduilion",
    role: "Arquero del Bosque Negro",
    faction: "La Comunidad del Anillo",
    race: "Elfo sinda",
    origin: "Erebor y Bosque Negro",
    image: "/images/characters/legolas.jpg",
    description:
      "Su punteria y agilidad demuestran la precision con la que los elfos se alinean en batalla. Su amistad con Gimli simboliza la reconciliacion entre reinos ancestrales.",
  },
  {
    id: "eowyn",
    name: "Eowyn de Rohan",
    role: "Escudo de la Marca",
    faction: "Defensores de Rohan",
    race: "Humana",
    origin: "Edoras, Reino de Rohan",
    image: "/images/characters/eowyn.jpg",
    description:
      "Rompe expectativas y cabalga hacia Minas Tirith para enfrentar al Rey Brujo. Simboliza el coraje civil que sostiene a los ejercitos libres.",
  },
  {
    id: "urukhai",
    name: "Capitan Uruk-hai",
    role: "Infanteria de asalto de Isengard",
    faction: "Huestes Uruk-hai",
    race: "Uruk-hai",
    origin: "Isengard",
    image: "/images/characters/uruk-hai.png",
    description:
      "Criado por Saruman para resistir la luz del sol y cargar sin descanso. Representa la amenaza industrial que desafia a las fuerzas libres en el Abismo de Helm.",
  },
];

export default function CharacterProfiles() {
  const [activeId, setActiveId] = useState(null);

  const toggleProfile = (id) => {
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <div className={classes.page}>
      <section className={classes.hero}>
        <div className={classes.heroContent}>
          <h1 className={classes.heroTitle}>Fichario de la Tierra Media</h1>
          <p className={classes.heroText}>
            Explora personajes esenciales y antagonistas clave. Cada tarjeta combina imagenes representativas con una descripcion detallada al hacer clic.
          </p>
        </div>
      </section>

      <section className={classes.section}>
        <header className={classes.sectionHeader}>
          <h2 className={classes.sectionTitle}>Historias en primera linea</h2>
          <p className={classes.sectionSubtitle}>
            Seleccion pensada para comprender motivaciones, alianzas y riesgos durante la Guerra del Anillo.
          </p>
        </header>

        <div className={classes.grid}>
          {characterProfiles.map((profile) => {
            const isActive = activeId === profile.id;
            const cardClassName = [classes.card, isActive ? classes.cardActive : ""].filter(Boolean).join(" ");
            const descriptionId = `profile-${profile.id}`;

            return (
              <article key={profile.id} className={cardClassName}>
                <div className={classes.imageWrapper}>
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className={classes.cardImage}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = fallbackImage;
                    }}
                  />
                  <span className={classes.badge}>{profile.faction}</span>
                </div>
                <div className={classes.cardBody}>
                  <h3 className={classes.cardTitle}>{profile.name}</h3>
                  <p className={classes.cardMeta}>{profile.role}</p>
                  <ul className={classes.metaList}>
                    <li>
                      <span className={classes.metaLabel}>Raza</span>
                      <span className={classes.metaValue}>{profile.race}</span>
                    </li>
                    <li>
                      <span className={classes.metaLabel}>Origen</span>
                      <span className={classes.metaValue}>{profile.origin}</span>
                    </li>
                  </ul>
                  <Button
                    size="small"
                    variant={isActive ? "ghost" : "primary"}
                    onClick={() => toggleProfile(profile.id)}
                    aria-expanded={isActive}
                    aria-controls={descriptionId}
                  >
                    {isActive ? "Ocultar descripcion" : "Ver descripcion"}
                  </Button>
                  <p
                    id={descriptionId}
                    className={`${classes.cardDescription} ${
                      isActive ? classes.cardDescriptionVisible : ""
                    }`}
                  >
                    {profile.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
