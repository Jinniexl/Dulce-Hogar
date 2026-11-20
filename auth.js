
/* Autenticación de clientes */

// Registro de clientes
const formularioRegistro = document.getElementById("formulario-registro");

if (formularioRegistro) {
    formularioRegistro.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        const nombre = document.getElementById("nombre-registro").value.trim();
        const correo = document.getElementById("correo-registro").value.trim();
        const password = document.getElementById("password-registro").value;

        const mensaje = document.getElementById("mensaje-registro");

        try {
            const respuesta = await fetch("http://localhost:3000/auth/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre,
                    correo,
                    password
                })
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                mensaje.textContent = "¡Tu cuenta se ha creado correctamente!";
                mensaje.style.color = "#4B8B55";

                formularioRegistro.reset();

                // Después del registro, mostrar el inicio de sesión
                setTimeout(() => {
                    document.getElementById("panel-registro").hidden = true;
                    document.getElementById("panel-login").hidden = false;

                    document.getElementById("correo-login").value = correo;

                    mensaje.textContent = "";
                    document.getElementById("mensaje-login").textContent =
                        "¡Cuenta creada! Ahora puedes iniciar sesión.";

                    document.getElementById("mensaje-login").style.color = "#4B8B55";
                }, 1500);

            } else {
                mensaje.textContent = datos.mensaje || "No se pudo crear la cuenta.";
                mensaje.style.color = "#A85D76";
            }

        } catch (error) {
            mensaje.textContent = "No se pudo conectar con el servidor.";
            mensaje.style.color = "#A85D76";
        }
    });
}


// Inicio de sesión
const formularioLogin = document.getElementById("formulario-login");

if (formularioLogin) {
    formularioLogin.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        const correo = document.getElementById("correo-login").value.trim();
        const password = document.getElementById("password-login").value;

        const mensaje = document.getElementById("mensaje-login");

        try {
            const respuesta = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    correo,
                    password
                })
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                localStorage.setItem("token", datos.token);
                localStorage.setItem("usuario", JSON.stringify(datos.usuario));

                mensaje.textContent = "¡Bienvenido/a a Dulce Hogar!";
                mensaje.style.color = "#4B8B55";

                // Cerrar la ventana después de iniciar sesión
                setTimeout(() => {
                    document.getElementById("cerrar-cuenta")?.click();
                }, 1200);

            } else {
                mensaje.textContent = datos.mensaje || "Correo o contraseña incorrectos.";
                mensaje.style.color = "#A85D76";
            }

        } catch (error) {
            mensaje.textContent = "No se pudo conectar con el servidor.";
            mensaje.style.color = "#A85D76";
        }
    });
}
