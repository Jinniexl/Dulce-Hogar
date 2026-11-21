// Dirección del servidor (backend).
// En local usa localhost; en la página publicada usa Render.
const API_URL =
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.protocol === "file:"
        ? "http://localhost:3000"
        : "https://dulce-hogar-41bo.onrender.com";
