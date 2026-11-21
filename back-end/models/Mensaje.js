
const mongoose = require("mongoose");

const mensajeSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    correo: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 150
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    mensaje: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Mensaje", mensajeSchema);
