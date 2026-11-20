
const postre = document.getElementById("producto");
const opcionesGalletas = document.getElementById("opciones-galletas");
const saborGalletas = document.getElementById("sabor-galletas");
const cantidad = document.getElementById("cantidad");
const botonCalcular = document.getElementById("calcular-total");
const resultado = document.getElementById("resultado-total");

// Precios de los productos
const precios = {
    "pie-fresa": 16,
    "pie-manzana": 16,
    "cupcakes": 12,
    "pastel": 30,
    "galletas": 10
};

// Mostrar los sabores de las galletas
if (postre && opcionesGalletas && saborGalletas) {
    postre.addEventListener("change", function () {
        if (postre.value === "galletas") {
            opcionesGalletas.style.display = "block";
            saborGalletas.required = true;
        } else {
            opcionesGalletas.style.display = "none";
            saborGalletas.required = false;
            saborGalletas.value = "";
        }
    });
}

// Calcular el total
if (botonCalcular) {
    botonCalcular.addEventListener("click", function () {
        const productoSeleccionado = postre.value;
        const cantidadSeleccionada = Number(cantidad.value);

        if (productoSeleccionado === "" || cantidadSeleccionada <= 0) {
            resultado.textContent =
                "Selecciona un producto e ingresa una cantidad válida.";
            return;
        }

        if (productoSeleccionado === "galletas" && saborGalletas.value === "") {
            resultado.textContent = "Selecciona un sabor para las galletas.";
            return;
        }

        const total = precios[productoSeleccionado] * cantidadSeleccionada;

        resultado.textContent = `Total estimado: $${total}`;
    });
}

// Enviar pedido al backend
const formularioPedido = document.getElementById("formulario-pedido");
const mensajePedido = document.querySelector(".mensaje-pedido");

if (formularioPedido) {
    formularioPedido.addEventListener("submit", async function (event) {
        event.preventDefault();

        const datosPedido = {
            nombre: document.getElementById("nombre").value,
            correo: document.getElementById("correo").value,
            telefono: document.getElementById("telefono").value,
            pago: document.getElementById("pago").value,
            producto: postre.value,
            saborGalletas: saborGalletas.value,
            cantidad: Number(cantidad.value),
            fecha: document.getElementById("fecha").value,
            detalles: document.getElementById("detalles").value
        };

        try {
            const respuesta = await fetch("http://localhost:3000/pedidos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datosPedido)
            });

            const resultadoServidor = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(resultadoServidor.mensaje || "No se pudo registrar el pedido.");
            }

            mensajePedido.textContent =
                "¡Gracias por tu pedido! Se ha registrado correctamente. Pronto nos comunicaremos contigo.";

            formularioPedido.reset();

            if (opcionesGalletas) {
                opcionesGalletas.style.display = "none";
            }

            resultado.textContent = "Total estimado: $0";

        } catch (error) {
            mensajePedido.textContent =
                "No se pudo enviar el pedido. Verifica que el servidor esté funcionando e inténtalo nuevamente.";

            console.error("Error al enviar el pedido:", error);
        }
    });
}

// Menú hamburguesa
const botonMenu = document.getElementById("menu-hamburguesa");
const menuNavegacion = document.getElementById("menu-navegacion");

if (botonMenu && menuNavegacion) {
    botonMenu.addEventListener("click", function () {
        menuNavegacion.classList.toggle("menu-abierto");
    });
}


/* Corazones y destellos decorativos */

const capaDecorativa = document.createElement("div");
capaDecorativa.classList.add("capa-decorativa");
capaDecorativa.setAttribute("aria-hidden", "true");

document.body.appendChild(capaDecorativa);

// Símbolos decorativos
const corazones = ["♡", "♥", "❤", "♡"];
const destellos = ["✦", "✧", "✦", "✧"];

// Crear corazones flotantes
for (let i = 0; i < 22; i++) {
    const corazon = document.createElement("span");

    corazon.classList.add("decoracion-flotante", "corazon");

    corazon.textContent =
        corazones[Math.floor(Math.random() * corazones.length)];

    corazon.style.left = Math.random() * 100 + "%";
    corazon.style.animationDuration = (12 + Math.random() * 13) + "s";
    corazon.style.animationDelay = (-Math.random() * 25) + "s";
    corazon.style.fontSize = (13 + Math.random() * 15) + "px";
    corazon.style.setProperty(
        "--desplazamiento",
        (Math.random() * 100 - 50) + "px"
    );

    capaDecorativa.appendChild(corazon);
}

// Crear destellos dorados
for (let i = 0; i < 12; i++) {
    const destello = document.createElement("span");

    destello.classList.add("decoracion-flotante", "destello");

    destello.textContent =
        destellos[Math.floor(Math.random() * destellos.length)];

    destello.style.left = Math.random() * 100 + "%";
    destello.style.top = Math.random() * 100 + "%";
    destello.style.animationDelay = (Math.random() * 5) + "s";
    destello.style.animationDuration = (2 + Math.random() * 3) + "s";
    destello.style.fontSize = (10 + Math.random() * 12) + "px";

    capaDecorativa.appendChild(destello);
}


/* Ventana de Cuenta */

(() => {
    const botonCuenta = document.getElementById("boton-cuenta");
    const ventanaCuenta = document.getElementById("ventana-cuenta");
    const cerrarCuenta = document.getElementById("cerrar-cuenta");
    const fondoVentana = document.getElementById("fondo-ventana");

    // Evitar errores en páginas que todavía no tienen la ventana
    if (!botonCuenta || !ventanaCuenta) return;

    let temporizadorCierre;

    // Abrir ventana
    function abrirCuenta() {
        clearTimeout(temporizadorCierre);

        ventanaCuenta.classList.remove("cerrando");
        ventanaCuenta.hidden = false;

        botonCuenta.setAttribute("aria-expanded", "true");

        document.body.style.overflow = "hidden";

        cerrarCuenta?.focus();
    }

    // Cerrar ventana
    function cerrarVentanaCuenta() {
        if (ventanaCuenta.hidden) return;

        ventanaCuenta.classList.add("cerrando");
        botonCuenta.setAttribute("aria-expanded", "false");

        temporizadorCierre = setTimeout(() => {
            ventanaCuenta.hidden = true;
            ventanaCuenta.classList.remove("cerrando");
            document.body.style.overflow = "";

            botonCuenta.focus();
        }, 250);
    }

    // Eventos
    botonCuenta.addEventListener("click", abrirCuenta);

    cerrarCuenta?.addEventListener("click", cerrarVentanaCuenta);

    fondoVentana?.addEventListener("click", cerrarVentanaCuenta);

    // Cerrar con Escape
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && !ventanaCuenta.hidden) {
            cerrarVentanaCuenta();
        }
    });

    // Elementos de los formularios
    const opcionesCuenta = document.getElementById("opciones-cuenta");
    const panelLogin = document.getElementById("panel-login");
    const panelRegistro = document.getElementById("panel-registro");

    const mostrarLogin = document.getElementById("mostrar-login");
    const mostrarRegistro = document.getElementById("mostrar-registro");

    const volverLogin = document.getElementById("volver-opciones-login");
    const volverRegistro = document.getElementById("volver-opciones-registro");

    // Mostrar login
    mostrarLogin?.addEventListener("click", () => {
        opcionesCuenta.hidden = true;
        panelRegistro.hidden = true;
        panelLogin.hidden = false;
    });

    // Mostrar registro
    mostrarRegistro?.addEventListener("click", () => {
        opcionesCuenta.hidden = true;
        panelLogin.hidden = true;
        panelRegistro.hidden = false;
    });

    // Volver a las opciones de cuenta
    volverLogin?.addEventListener("click", () => {
        panelLogin.hidden = true;
        opcionesCuenta.hidden = false;
    });

    volverRegistro?.addEventListener("click", () => {
        panelRegistro.hidden = true;
        opcionesCuenta.hidden = false;
    });

})();
