const jwt = require("jsonwebtoken");

// Lee el token que la página envía en la cabecera Authorization
function leerToken(req) {
    const cabecera = req.headers.authorization || "";
    return cabecera.startsWith("Bearer ") ? cabecera.slice(7) : null;
}

// Permite el paso a cualquier usuario con la sesión iniciada
function verificarToken(req, res, next) {
    const token = leerToken(req);

    if (!token) {
        return res.status(401).json({
            mensaje: "Debes iniciar sesión para continuar"
        });
    }

    try {
        const datos = jwt.verify(token, process.env.JWT_SECRET);
        req.usuarioId = datos.id;
        req.rol = datos.rol;
        next();
    } catch (error) {
        return res.status(401).json({
            mensaje: "Tu sesión expiró. Inicia sesión de nuevo"
        });
    }
}

// Permite el paso solo a los administradores
function soloAdmin(req, res, next) {
    verificarToken(req, res, () => {
        if (req.rol !== "admin") {
            return res.status(403).json({
                mensaje: "No tienes permiso para realizar esta acción"
            });
        }
        next();
    });
}

module.exports = { verificarToken, soloAdmin };