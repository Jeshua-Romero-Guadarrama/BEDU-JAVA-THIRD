// src/hooks/use-http.js
// ==============================================
// Autor: Jeshua Romero Guadarrama
// Hook personalizado para centralizar peticiones HTTP.
// Maneja estado de carga, exito y error. Puede reutilizarse
// con cualquier endpoint (Firebase u otros servicios).
// ==============================================
import { useCallback, useState } from "react";

const defaultTransform = (data) => data;

export default function useHttp(initialConfig = {}) {
  // Estados genericos para almacenar la respuesta, el estatus y el error.
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (requestConfig = {}, transformData = defaultTransform) => {
      setStatus("pending");
      setError(null);

      // Mezcla configuracion inicial con la proporcionada al invocar el hook.
      const config = {
        method: "GET",
        headers: {},
        body: null,
        ...initialConfig,
        ...requestConfig,
      };

      // Serializa el cuerpo cuando se trata de un objeto.
      if (config.body && typeof config.body !== "string") {
        config.body = JSON.stringify(config.body);
        config.headers = {
          "Content-Type": "application/json",
          ...config.headers,
        };
      }

      try {
        const response = await fetch(config.url, {
          method: config.method,
          headers: config.headers,
          body: config.body,
        });

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        // Transforma la respuesta antes de exponerla al componente.
        const responseData = await response.json();
        const transformed = transformData(responseData);
        setData(transformed);
        setStatus("completed");
        return transformed;
      } catch (err) {
        setError(err.message || "Ocurrio un problema al conectar con el servidor.");
        setStatus("completed");
        throw err;
      }
    },
    [initialConfig]
  );

  return {
    data,
    status,
    error,
    sendRequest,
  };
}
