
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const router = express.Router();

// REGISTRO DE CLIENTES
router.post("/registro", async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;

        if (!nombre || !correo || !password) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                mensaje: "La contraseña debe tener al menos 8 caracteres"
            });
        }

        const usuarioExistente = await Usuario.findOne({
            correo: correo.trim().toLowerCase()
        });

        if (usuarioExistente) {
            return res.status(409).json({
                mensaje: "Este correo ya está registrado"
            });
        }

        const passwordCifrada = await bcrypt.hash(password, 10);

        const nuevoUsuario = new Usuario({
            nombre,
            correo,
            password: passwordCifrada
        });

        await nuevoUsuario.save();

        res.status(201).json({
            mensaje: "Cuenta creada correctamente"
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear la cuenta"
        });
    }
});

// INICIO DE SESIÓN
router.post("/login", async (req, res) => {
    try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).json({
                mensaje: "Ingresa tu correo y contraseña"
            });
        }

        const usuario = await Usuario.findOne({
            correo: correo.trim().toLowerCase()
        });

        if (!usuario) {
            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordCorrecta) {
            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        const token = jwt.sign(
            { id: usuario._id, rol: "cliente" },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({
            mensaje: "Inicio de sesión exitoso",
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                correo: usuario.correo
            }
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al iniciar sesión"
        });
    }
});

module.exports = router;
