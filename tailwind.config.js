module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "lotr-ink": "#0b0805",
        "lotr-gold": "#d6ac5a",
        "lotr-gold-light": "#f5d58f",
        "lotr-cream": "#f6f0d0",
        "lotr-forest": "#2f3c1d",
      },
      fontFamily: {
        cinzel: ['"Cinzel"', 'serif'],
        mulish: ['"Mulish"', 'sans-serif'],
      },
      backgroundImage: {
        'lotr-hero': "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80')",
        'lotr-map': "url('https://images.unsplash.com/photo-1526146495392-4cfb5d23c83c?auto=format&fit=crop&w=1600&q=80')",
      },
    },
  },
  plugins: [],
};

