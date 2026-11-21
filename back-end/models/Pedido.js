const mongoose = require("mongoose");

// Cada producto del pedido (un pedido puede tener varios)
const itemSchema = new mongoose.Schema({
    producto: {
        type: String,
        required: true
    },
    saborGalletas: {
        type: String
    },
    cantidad: {
        type: Number,
        required: true,
        min: 1
    },
    // Precio de una unidad al momento de hacer el pedido
    precio: {
        type: Number,
        required: true
    }
}, { _id: false });

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
    // Lista de productos del pedido
    items: [itemSchema],
    total: {
        type: Number
    },
    // Campos antiguos (pedidos hechos antes de poder agregar varios productos)
    producto: {
        type: String
    },
    saborGalletas: {
        type: String
    },
    cantidad: {
        type: Number
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