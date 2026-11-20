
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
