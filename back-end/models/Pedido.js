
const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema({
    // Cliente (con cuenta) que hizo el pedido
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
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
    },
    // Estado que el administrador va actualizando
    estado: {
        type: String,
        enum: ["pendiente", "confirmado", "entregado", "cancelado"],
        default: "pendiente"
    }
}, { timestamps: true });

const Pedido = mongoose.model("Pedido", pedidoSchema);

module.exports = Pedido;
