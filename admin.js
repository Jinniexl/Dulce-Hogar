/* Panel de administración de Dulce Hogar */

(() => {
    // Nombres legibles de los productos
    const NOMBRES_PRODUCTOS = {
        "pie-fresa": "Pie de fresa",
        "pie-manzana": "Pie de manzana",
        "cupcakes": "Cupcakes",
        "pastel": "Pastel personalizado",
        "galletas": "Galletas"
    };

    const ESTADOS = ["pendiente", "confirmado", "entregado", "cancelado"];

    const NOMBRES_SABORES = {
        "chips": "Chips de chocolate",
        "vainilla": "Vainilla"
    };

    const panel = document.getElementById("admin-panel");
    const aviso = document.getElementById("admin-aviso");
    const textoAviso = document.getElementById("admin-aviso-texto");
    const listaPedidos = document.getElementById("lista-pedidos");
    const resumen = document.getElementById("admin-resumen");
    const estadoCarga = document.getElementById("admin-estado");
    const filtroEstado = document.getElementById("filtro-estado");
    const botonRecargar = document.getElementById("admin-recargar");
    const botonSalir = document.getElementById("admin-salir");

    // Elementos de los mensajes de contacto
const listaMensajes = document.getElementById("lista-mensajes");
const estadoMensajes = document.getElementById("admin-mensajes-estado");
const botonRecargarMensajes = document.getElementById("admin-recargar-mensajes");

let mensajes = [];

    // Si esta página no es el panel, no hacer nada
    if (!panel || !aviso) return;

    let pedidos = [];

    // ---------- Sesión ----------

    function leerUsuario() {
        try {
            return JSON.parse(localStorage.getItem("usuario") || "null");
        } catch (error) {
            return null;
        }
    }

    function limpiarSesion() {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
    }

    function mostrarAviso(texto) {
        textoAviso.textContent = texto;
        aviso.hidden = false;
        panel.hidden = true;
    }

    // ---------- Comunicación con el servidor ----------

    async function pedirAlServidor(ruta, opciones = {}) {
        const respuesta = await fetch(API_URL + ruta, {
            ...opciones,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        let datos = {};

        try {
            datos = await respuesta.json();
        } catch (error) {
            // Respuesta sin contenido
        }

        if (respuesta.status === 401) {
            limpiarSesion();
            mostrarAviso("Tu sesión expiró. Inicia sesión de nuevo.");
            const error = new Error("sesion");
            error.manejado = true;
            throw error;
        }

        if (respuesta.status === 403) {
            mostrarAviso("Tu cuenta no tiene permisos de administrador.");
            const error = new Error("permiso");
            error.manejado = true;
            throw error;
        }

        if (!respuesta.ok) {
            throw new Error(datos.mensaje || "Ocurrió un error en el servidor.");
        }

        return datos;
    }

    function mostrarEstado(texto, esError = false) {
        estadoCarga.textContent = texto;
        estadoCarga.classList.toggle("error", esError);
    }

    function manejarError(error, textoBase) {
        if (error.manejado) return;

        console.error(textoBase, error);
        mostrarEstado(
            error instanceof TypeError
                ? "No se pudo conectar con el servidor. Inténtalo de nuevo en un momento."
                : error.message,
            true
        );
    }

    // ---------- Dibujar la pantalla ----------

    function crearLinea(etiqueta, valor) {
        const linea = document.createElement("p");
        const negrita = document.createElement("strong");

        negrita.textContent = etiqueta + ": ";
        linea.append(negrita, document.createTextNode(valor));

        return linea;
    }

    function dibujarResumen() {
        const conteo = { total: pedidos.length };
        ESTADOS.forEach((estado) => {
            conteo[estado] = pedidos.filter((p) => p.estado === estado).length;
        });

        const cajas = [
            ["Total", conteo.total],
            ["Pendientes", conteo.pendiente],
            ["Confirmados", conteo.confirmado],
            ["Entregados", conteo.entregado],
            ["Cancelados", conteo.cancelado]
        ];

        resumen.replaceChildren();

        cajas.forEach(([nombre, cantidad]) => {
            const caja = document.createElement("div");
            caja.className = "resumen-caja";

            const numero = document.createElement("strong");
            numero.textContent = cantidad;

            const texto = document.createElement("span");
            texto.textContent = nombre;

            caja.append(numero, texto);
            resumen.appendChild(caja);
        });
    }

    function crearTarjeta(pedido) {
        const estado = pedido.estado || "pendiente";

        const tarjeta = document.createElement("article");
        tarjeta.className = "pedido-tarjeta estado-" + estado;

                // Pedidos nuevos traen una lista de productos; los antiguos, un solo producto
        const productos = Array.isArray(pedido.items) && pedido.items.length > 0
            ? pedido.items
            : [{
                producto: pedido.producto,
                saborGalletas: pedido.saborGalletas,
                cantidad: pedido.cantidad
            }];

        const titulo = document.createElement("h3");
        titulo.textContent = productos.length === 1
            ? (NOMBRES_PRODUCTOS[productos[0].producto] || productos[0].producto) +
              " × " + productos[0].cantidad
            : "Pedido de " + productos.length + " productos";
        tarjeta.appendChild(titulo);

        // Usuario que hizo el pedido (los pedidos antiguos no tienen cuenta)
        if (pedido.usuario) {
            tarjeta.appendChild(
                crearLinea("Cliente", pedido.usuario.nombre + " (" + pedido.usuario.correo + ")")
            );
        } else {
            tarjeta.appendChild(crearLinea("Cliente", pedido.nombre + " (sin cuenta)"));
        }

        tarjeta.appendChild(crearLinea("Teléfono", pedido.telefono));

        if (pedido.correo) {
            tarjeta.appendChild(crearLinea("Correo del pedido", pedido.correo));
        }

        // Lista de productos (con sabor y subtotal cuando existen)
        if (productos.length > 1 || productos[0].saborGalletas) {
            productos.forEach((item) => {
                let texto =
                    (NOMBRES_PRODUCTOS[item.producto] || item.producto) + " × " + item.cantidad;

                if (item.saborGalletas) {
                    texto += " (" + (NOMBRES_SABORES[item.saborGalletas] || item.saborGalletas) + ")";
                }

                if (item.precio) {
                    texto += " — $" + item.precio * item.cantidad;
                }

                const linea = document.createElement("p");
                linea.textContent = "• " + texto;
                tarjeta.appendChild(linea);
            });
        }

        if (typeof pedido.total === "number") {
            tarjeta.appendChild(crearLinea("Total", "$" + pedido.total));
        }

        tarjeta.appendChild(crearLinea("Pago", pedido.pago));
        tarjeta.appendChild(crearLinea("Fecha de entrega", pedido.fecha));

        if (pedido.detalles) {
            tarjeta.appendChild(crearLinea("Detalles", pedido.detalles));
        }

        if (pedido.createdAt) {
            tarjeta.appendChild(
                crearLinea("Recibido", new Date(pedido.createdAt).toLocaleString("es-EC"))
            );
        }

        // Acciones: cambiar estado y eliminar
        const acciones = document.createElement("div");
        acciones.className = "pedido-acciones";

        const selector = document.createElement("select");
        selector.setAttribute("aria-label", "Estado del pedido");

        ESTADOS.forEach((valor) => {
            const opcion = document.createElement("option");
            opcion.value = valor;
            opcion.textContent = valor.charAt(0).toUpperCase() + valor.slice(1);
            opcion.selected = valor === estado;
            selector.appendChild(opcion);
        });

        selector.addEventListener("change", () => cambiarEstado(pedido, selector));

        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.className = "admin-boton admin-boton-peligro";
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", () => eliminarPedido(pedido, botonEliminar));

        acciones.append(selector, botonEliminar);
        tarjeta.appendChild(acciones);

        return tarjeta;
    }

    function dibujarLista() {
        const filtro = filtroEstado.value;
        const visibles = filtro === "todos"
            ? pedidos
            : pedidos.filter((p) => (p.estado || "pendiente") === filtro);

        listaPedidos.replaceChildren();

        if (visibles.length === 0) {
            const vacio = document.createElement("p");
            vacio.className = "sin-pedidos";
            vacio.textContent = "No hay pedidos para mostrar.";
            listaPedidos.appendChild(vacio);
            return;
        }

        visibles.forEach((pedido) => listaPedidos.appendChild(crearTarjeta(pedido)));
    }

    function dibujarTodo() {
        dibujarResumen();
        dibujarLista();
    }

    // ---------- Acciones ----------

// ---------- Mensajes de contacto ----------

function mostrarEstadoMensajes(texto, esError = false) {
    estadoMensajes.textContent = texto;
    estadoMensajes.classList.toggle("error", esError);
}

function crearTarjetaMensaje(mensaje) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "mensaje-tarjeta";

    const titulo = document.createElement("h3");
    titulo.textContent = mensaje.nombre || "Cliente";
    tarjeta.appendChild(titulo);

    const correo = document.createElement("p");
    const enlaceCorreo = document.createElement("a");
    enlaceCorreo.href = "mailto:" + mensaje.correo;
    enlaceCorreo.textContent = mensaje.correo;
    correo.append("Correo: ", enlaceCorreo);
    tarjeta.appendChild(correo);

    const telefono = document.createElement("p");
    const enlaceTelefono = document.createElement("a");
    enlaceTelefono.href = "tel:" + mensaje.telefono;
    enlaceTelefono.textContent = mensaje.telefono;
    telefono.append("Teléfono: ", enlaceTelefono);
    tarjeta.appendChild(telefono);

    const textoMensaje = document.createElement("p");
    const etiqueta = document.createElement("strong");
    etiqueta.textContent = "Mensaje: ";
    textoMensaje.append(etiqueta, document.createTextNode(mensaje.mensaje || ""));
    tarjeta.appendChild(textoMensaje);

    if (mensaje.fecha) {
        const fecha = document.createElement("small");
        fecha.textContent = "Recibido: " +
            new Date(mensaje.fecha).toLocaleString("es-EC");
        tarjeta.appendChild(fecha);
    }

    return tarjeta;
}

async function cargarMensajes() {
    botonRecargarMensajes.disabled = true;
    mostrarEstadoMensajes("Cargando mensajes...");

    try {
        mensajes = await pedirAlServidor("/contacto");

        listaMensajes.replaceChildren();

        if (mensajes.length === 0) {
            const vacio = document.createElement("p");
            vacio.className = "sin-mensajes";
            vacio.textContent = "Todavía no hay mensajes de contacto.";
            listaMensajes.appendChild(vacio);
        } else {
            mensajes.forEach((mensaje) => {
                listaMensajes.appendChild(crearTarjetaMensaje(mensaje));
            });
        }

        mostrarEstadoMensajes(
            mensajes.length + (mensajes.length === 1
                ? " mensaje recibido."
                : " mensajes recibidos.")
        );

    } catch (error) {
        if (!error.manejado) {
            console.error("Error al cargar los mensajes:", error);
            mostrarEstadoMensajes(
                error instanceof TypeError
                    ? "No se pudo conectar con el servidor."
                    : error.message,
                true
            );
        }
    } finally {
        botonRecargarMensajes.disabled = false;
    }
}


    async function cargarPedidos() {
        botonRecargar.disabled = true;
        mostrarEstado("Cargando pedidos... (si el servidor estaba dormido puede tardar hasta 1 minuto)");

        try {
            pedidos = await pedirAlServidor("/pedidos");
            mostrarEstado("");
            dibujarTodo();
        } catch (error) {
            manejarError(error, "Error al cargar los pedidos:");
        } finally {
            botonRecargar.disabled = false;
        }
    }

    async function cambiarEstado(pedido, selector) {
        const estadoAnterior = pedido.estado || "pendiente";
        const estadoNuevo = selector.value;

        selector.disabled = true;

        try {
            await pedirAlServidor("/pedidos/" + pedido._id + "/estado", {
                method: "PUT",
                body: JSON.stringify({ estado: estadoNuevo })
            });

            pedido.estado = estadoNuevo;
            mostrarEstado("Estado actualizado a «" + estadoNuevo + "».");
            dibujarTodo();
        } catch (error) {
            selector.value = estadoAnterior;
            selector.disabled = false;
            manejarError(error, "Error al cambiar el estado:");
        }
    }

    async function eliminarPedido(pedido, boton) {
        const confirmado = window.confirm(
            "¿Eliminar este pedido? Esta acción no se puede deshacer."
        );

        if (!confirmado) return;

        boton.disabled = true;

        try {
            await pedirAlServidor("/pedidos/" + pedido._id, { method: "DELETE" });

            pedidos = pedidos.filter((p) => p._id !== pedido._id);
            mostrarEstado("Pedido eliminado.");
            dibujarTodo();
        } catch (error) {
            boton.disabled = false;
            manejarError(error, "Error al eliminar el pedido:");
        }
    }

    // ---------- Inicio ----------

    const usuario = leerUsuario();

    if (!localStorage.getItem("token") || !usuario) {
        mostrarAviso("Inicia sesión con tu cuenta de administrador para ver el panel.");
        return;
    }

    if (usuario.rol !== "admin") {
        mostrarAviso("Tu cuenta no tiene permisos de administrador.");
        return;
    }

    document.getElementById("admin-nombre").textContent = usuario.nombre;
    panel.hidden = false;

    filtroEstado.addEventListener("change", dibujarLista);
    botonRecargar.addEventListener("click", cargarPedidos);
    botonRecargarMensajes.addEventListener("click", cargarMensajes);

    botonSalir.addEventListener("click", () => {
        limpiarSesion();
        window.location.href = "index.html";
    });

    cargarPedidos();
    cargarMensajes();
})();