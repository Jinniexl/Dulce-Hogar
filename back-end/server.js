const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

require("dotenv").config();

const Producto = require("./models/Producto");
const Pedido = require("./models/Pedido");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);


const PORT = 3000;
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB conectado correctamente");
    })
    .catch((error) => {
        console.error("Error al conectar con MongoDB:", error);
    });


app.get("/productos", async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener los productos"
        });
    }
});

app.post("/productos", async (req, res) => {
    try {
        const nuevoProducto = new Producto({
            nombre: req.body.nombre,
            precio: req.body.precio
        });

        await nuevoProducto.save();

        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear el producto"
        });
    }
});



app.put("/productos/:id", async (req, res) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            {
                nombre: req.body.nombre,
                precio: req.body.precio
            },
            { new: true }
        );

        if (!productoActualizado) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.json(productoActualizado);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar el producto"
        });
    }
});

app.delete("/productos/:id", async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(
            req.params.id
        );

        if (!productoEliminado) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.json({
            mensaje: "Producto eliminado correctamente",
            producto: productoEliminado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar el producto"
        });
    }
});


app.post("/pedidos", async (req, res) => {
    try {
        const nuevoPedido = new Pedido({
            nombre: req.body.nombre,
            correo: req.body.correo,
            telefono: req.body.telefono,
            pago: req.body.pago,
            producto: req.body.producto,
            saborGalletas: req.body.saborGalletas,
            cantidad: req.body.cantidad,
            fecha: req.body.fecha,
            detalles: req.body.detalles
        });

        await nuevoPedido.save();

        res.status(201).json({
            mensaje: "Pedido registrado correctamente",
            pedido: nuevoPedido
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al registrar el pedido",
            error: error.message
        });
    }
});


app.get("/pedidos", async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener los pedidos"
        });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
