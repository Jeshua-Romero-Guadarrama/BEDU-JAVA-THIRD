// src/config/firebase.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Utilidades para construir endpoints de Firebase
// a partir de la URL proporcionada en el .env.
// ==============================================
const rawUrl = (process.env.REACT_APP_FIREBASE_URL || "").trim();

export const isFirebaseConfigured = Boolean(rawUrl);

export const buildFirebaseEndpoint = (resource) => {
  if (!rawUrl) return "";
  if (rawUrl.endsWith(".json")) {
    return rawUrl;
  }
  const sanitized = rawUrl.replace(/\/$/, "");
  return `${sanitized}/${resource}.json`;
};
