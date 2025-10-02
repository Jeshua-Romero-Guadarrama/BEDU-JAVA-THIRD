// src/components/Blog/LoreBlog.js
// ==============================================
// Blog de entradas rapidas sobre El Senor de los Anillos.
// Autor: Jeshua Romero Guadarrama
// ==============================================
import Button from "../UI/Button";

const blogEntries = [
  {
    id: "blog-fellowship",
    title: "Nacimiento de la Comunidad",
    excerpt:
      "El viaje comienza en Rivendel: conoce a los nueve caminantes, sus promesas y las tradiciones que comparten antes de partir.",
    link: "https://www.imdb.com/title/tt0120737/",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "blog-two-towers",
    title: "Defensa del Abismo de Helm",
    excerpt:
      "Cronica del asedio nocturno donde Rohan enfrenta a los uruk-hai entre lluvia, antorchas y murallas antiguas.",
    link: "https://www.imdb.com/title/tt0167261/",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "blog-return-king",
    title: "Coronacion en Minas Tirith",
    excerpt:
      "Celebracion final con cantos, rituales y mesas abundantes que honran el regreso del rey y la paz recien obtenida.",
    link: "https://www.imdb.com/title/tt0167260/",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function LoreBlog() {
  // La seccion ofrece articulos tematicos ambientados en los eventos clave de la trilogia.
  return (
    <section className="space-y-10">
      <header className="text-center">
        <h2 className="font-cinzel text-2xl uppercase tracking-[0.5em] text-lotr-gold">
          Diario de la Tierra Media
        </h2>
        <p className="mt-4 text-xs uppercase tracking-[0.25em] text-lotr-cream/70">
          Relatos breves para revivir los momentos mas intensos de la saga mientras preparas tu banquete.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {blogEntries.map((entry) => (
          <article
            key={entry.id}
            className="flex h-full flex-col overflow-hidden rounded-3xl border border-lotr-gold/25 bg-lotr-ink/80 shadow-xl shadow-black/50"
          >
            <img src={entry.image} alt={entry.title} className="h-44 w-full object-cover" />
            <div className="flex flex-1 flex-col gap-4 p-6">
              <h3 className="font-cinzel text-sm uppercase tracking-[0.3em] text-lotr-gold">{entry.title}</h3>
              <p className="text-xs uppercase tracking-[0.2em] text-lotr-cream/75">{entry.excerpt}</p>
              <div className="mt-auto">
                <Button as="a" href={entry.link} target="_blank" rel="noreferrer" size="small" variant="ghost">
                  Leer mas
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
