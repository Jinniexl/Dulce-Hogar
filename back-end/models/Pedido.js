
const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    pago: {
        type: String,
        required: true
    },
    producto: {
        type: String,
        required: true
    },
    saborGalletas: {
        type: String
    },
    cantidad: {
        type: Number,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    detalles: {
        type: String
    }
});

const Pedido = mongoose.model("Pedido", pedidoSchema);

module.exports = Pedido;
