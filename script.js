
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

// Chatbot de Dulce Hogar

const chatbotBoton = document.getElementById("chatbot-boton");
const chatbotVentana = document.getElementById("chatbot-ventana");
const chatbotCerrar = document.getElementById("chatbot-cerrar");

const chatbotMensajes = document.getElementById("chatbot-mensajes");
const chatbotMenuToggle = document.getElementById("chatbot-menu-toggle");
const chatbotListaOpciones = document.getElementById("chatbot-lista-opciones");

// Elementos para escribir preguntas
const chatbotFormulario = document.getElementById("chatbot-formulario");
const chatbotPregunta = document.getElementById("chatbot-pregunta");

// Conservar la conversación

// Recuperar los mensajes guardados
if (chatbotMensajes) {
    const conversacionGuardada = sessionStorage.getItem("dulceHogarChat");

    if (conversacionGuardada) {
        chatbotMensajes.innerHTML = conversacionGuardada;
    }
}

// Recuperar si el chatbot estaba abierto
if (chatbotVentana && chatbotBoton) {
    const chatAbierto = sessionStorage.getItem("dulceHogarChatAbierto");

    if (chatAbierto === "true") {
        chatbotVentana.hidden = false;
        chatbotBoton.setAttribute("aria-expanded", "true");
    }
}

// Abrir y cerrar el chatbot
if (chatbotBoton && chatbotVentana && chatbotCerrar) {

    chatbotBoton.addEventListener("click", () => {
        const estaAbierto = !chatbotVentana.hidden;

        chatbotVentana.hidden = estaAbierto;
        chatbotBoton.setAttribute("aria-expanded", String(!estaAbierto));
        sessionStorage.setItem("dulceHogarChatAbierto", String(!estaAbierto));
    });

    chatbotCerrar.addEventListener("click", () => {
        chatbotVentana.hidden = true;
        chatbotBoton.setAttribute("aria-expanded", "false");
        sessionStorage.setItem("dulceHogarChatAbierto", "false");
    });
}

// Abrir y cerrar el menú de preguntas
if (chatbotMenuToggle && chatbotListaOpciones) {

    chatbotMenuToggle.addEventListener("click", () => {
        const estaAbierto = !chatbotListaOpciones.hidden;

        chatbotListaOpciones.hidden = estaAbierto;
        chatbotMenuToggle.setAttribute("aria-expanded", String(!estaAbierto));
    });
}

// Respuestas del chatbot
const respuestasChatbot = {

    productos: {
        mensaje: "¡Tenemos deliciosos postres preparados con mucho cariño! 💗 Puedes visitar nuestro catálogo para conocer las opciones que ofrecemos.",
        enlace: "Ver nuestros productos",
        destino: "catalogo.html"
    },

    precios: {
        mensaje: "¡Claro!, Puedes consultar los precios de nuestros postres directamente en el catálogo. Allí encontrarás la información de cada producto.",
        enlace: "Consultar precios",
        destino: "catalogo.html"
    },

    pedido: {
        mensaje: "¡Hacer un pedido es muy sencillo! 💗 Dirígete a la sección Pedidos y completa el formulario con tus datos personales. Selecciona el postre que deseas, indica la cantidad, el método de pago y la fecha que prefieres. También puedes añadir detalles especiales, como sabores o decoración. Antes de enviarlo, puedes calcular el total estimado. Una vez recibamos tu solicitud, nos comunicaremos contigo para confirmar los detalles del pedido, el pago y coordinar el punto de encuentro. 🌷 ¡Estaremos encantados de atenderte!",
        enlace: "Ir al formulario de pedidos",
        destino: "pedidos.html#pedidos"
    },

    contacto: {
        mensaje: "¡Nos encantará atenderte! 💗 Si tienes alguna consulta o necesitas más información, visita nuestra sección de contacto. Allí encontrarás nuestros medios de comunicación.",
        enlace: "Ir a contacto",
        destino: "contacto.html"
    }

};

// Detectar qué pregunta seleccionó el cliente
if (chatbotMensajes && chatbotListaOpciones) {

    chatbotListaOpciones.addEventListener("click", (event) => {

        const boton = event.target.closest(".chatbot-opcion");

        if (!boton) return;

        const pregunta = boton.dataset.pregunta;
        const respuestaChatbot = respuestasChatbot[pregunta];

        if (!respuestaChatbot) return;

        // Mostrar la pregunta del cliente
        const mensajeUsuario = document.createElement("div");
        mensajeUsuario.className = "chatbot-mensaje chatbot-mensaje-usuario";
        mensajeUsuario.textContent = boton.textContent.trim();

        chatbotMensajes.appendChild(mensajeUsuario);

        // Mostrar la respuesta de Michi
        const respuesta = document.createElement("div");
        respuesta.className = "chatbot-mensaje";
        respuesta.textContent = respuestaChatbot.mensaje;

        // Crear enlace a la sección correspondiente
        const enlace = document.createElement("a");
        enlace.href = respuestaChatbot.destino;
        enlace.className = "chatbot-enlace";
        enlace.textContent = respuestaChatbot.enlace;

        respuesta.appendChild(document.createElement("br"));
        respuesta.appendChild(enlace);

        chatbotMensajes.appendChild(respuesta);

        // Guardar toda la conversación
        sessionStorage.setItem(
            "dulceHogarChat",
            chatbotMensajes.innerHTML
        );

        // Cerrar automáticamente el menú
        chatbotListaOpciones.hidden = true;
        chatbotMenuToggle.setAttribute("aria-expanded", "false");

        // Desplazar la conversación hasta el último mensaje
        chatbotMensajes.scrollTop = chatbotMensajes.scrollHeight;

    });

}

// Chat híbrido: preguntas escritas (respuestas fijas + Gemini)

const URL_CHAT_IA = "http://localhost:3000/chat";

function guardarConversacion() {
    sessionStorage.setItem("dulceHogarChat", chatbotMensajes.innerHTML);
}

function bajarConversacion() {
    chatbotMensajes.scrollTop = chatbotMensajes.scrollHeight;
}

// Crea una burbuja de mensaje (siempre con textContent, nunca innerHTML)
function crearBurbuja(texto, esUsuario) {
    const burbuja = document.createElement("div");
    burbuja.className = esUsuario
        ? "chatbot-mensaje chatbot-mensaje-usuario"
        : "chatbot-mensaje";
    burbuja.textContent = texto;
    chatbotMensajes.appendChild(burbuja);
    bajarConversacion();
    return burbuja;
}

// Muestra una de las respuestas predeterminadas con su enlace
function mostrarRespuestaFija(clave) {
    const datos = respuestasChatbot[clave];
    const burbuja = crearBurbuja(datos.mensaje, false);

    const enlace = document.createElement("a");
    enlace.href = datos.destino;
    enlace.className = "chatbot-enlace";
    enlace.textContent = datos.enlace;

    burbuja.appendChild(document.createElement("br"));
    burbuja.appendChild(enlace);
    bajarConversacion();
}

// Quita tildes y mayúsculas para comparar palabras
function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "");
}

// Palabras que activan cada respuesta predeterminada
const palabrasClave = {
    productos: ["producto", "postre", "catalogo", "menu", "que venden", "que tienen"],
    precios: ["precio", "cuesta", "cuanto", "valor", "costo"],
    pedido: ["pedido", "pedir", "ordenar", "encargar", "comprar"],
    contacto: ["contacto", "contactar", "whatsapp", "telefono", "correo", "escribirles"]
};

// Solo usa la respuesta fija si la pregunta es corta y clara.
// Las preguntas largas o específicas se las deja a la IA.
const MAX_PALABRAS_FIJAS = 5;

function buscarRespuestaFija(texto) {
    const limpio = normalizarTexto(texto);
    const cantidadPalabras = limpio.split(/\s+/).filter(Boolean).length;

    if (cantidadPalabras > MAX_PALABRAS_FIJAS) return null;

    for (const clave in palabrasClave) {
        if (palabrasClave[clave].some((palabra) => limpio.includes(palabra))) {
            return clave;
        }
    }

    return null;
}

// Pregunta a Gemini a través de tu backend
async function preguntarALaIA(texto) {
    const control = new AbortController();
    const limite = setTimeout(() => control.abort(), 20000);

    try {
        const respuesta = await fetch(URL_CHAT_IA, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mensaje: texto }),
            signal: control.signal
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(datos.mensaje || "Error del asistente");
        }

        return datos.respuesta;
    } finally {
        clearTimeout(limite);
    }
}

if (chatbotFormulario && chatbotPregunta && chatbotMensajes) {

    chatbotFormulario.addEventListener("submit", async (event) => {
        event.preventDefault();

        const texto = chatbotPregunta.value.trim();
        if (!texto) return;

        chatbotPregunta.value = "";
        crearBurbuja(texto, true);

        // 1) Respuesta predeterminada si la pregunta es clara
        const clave = buscarRespuestaFija(texto);

        if (clave) {
            mostrarRespuestaFija(clave);
            guardarConversacion();
            return;
        }

        // 2) Si no, responde Gemini
        const botonEnviar = chatbotFormulario.querySelector("button[type='submit']");
        if (botonEnviar) botonEnviar.disabled = true;

        const pensando = crearBurbuja("Michi está escribiendo... 💭", false);

        try {
            const textoIA = await preguntarALaIA(texto);
            pensando.textContent = textoIA;
        } catch (error) {
            console.error("Error con el asistente:", error);
            pensando.textContent =
                "Ay, ahora mismo no puedo responder eso 🥺 Puedes elegir una de las preguntas del menú o escribirnos desde la sección de contacto.";
        }

        if (botonEnviar) botonEnviar.disabled = false;
        guardarConversacion();
        bajarConversacion();
        chatbotPregunta.focus();
    });
}