// Convierte una cuenta existente en administrador.
// Uso (desde la carpeta back-end):  node hacer-admin.js correo@ejemplo.com

require("dotenv").config();
const mongoose = require("mongoose");
const Usuario = require("./models/Usuario");

const correo = (process.argv[2] || "").trim().toLowerCase();

if (!correo) {
    console.log("Uso: node hacer-admin.js correo@ejemplo.com");
    process.exit(1);
}

async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const usuario = await Usuario.findOneAndUpdate(
            { correo },
            { rol: "admin" },
            { new: true }
        );

        if (usuario) {
            console.log(`Listo: ${usuario.nombre} (${usuario.correo}) ahora es administrador.`);
        } else {
            console.log("No existe una cuenta con ese correo. Primero créala desde la página.");
        }
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

main();