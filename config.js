// Dirección del servidor (backend).
// En tu computadora usa localhost; en la página publicada usa Render.
// Cuando Render te dé tu dirección, reemplaza la de abajo.
const API_URL =
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.protocol === "file:"
        ? "http://localhost:3000"
        : "https://TU-SERVICIO.onrender.com";