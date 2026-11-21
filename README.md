
# Dulce Hogar 🍰

**Dulce Hogar** es un sitio web desarrollado para una pastelería, orientado a presentar sus productos, facilitar la comunicación con los clientes y gestionar pedidos de manera organizada.

El proyecto combina una interfaz visual inspirada en la repostería tradicional con herramientas de desarrollo web y servicios de almacenamiento de información.

## 📌 Características principales

- **Página de inicio:** presentación de la pastelería y sus principales productos.
- **Historia:** información sobre la identidad y el origen de Dulce Hogar.
- **Catálogo:** visualización de los productos disponibles.
- **Pedidos:** formulario para realizar pedidos mediante una cuenta de usuario.
- **Registro e inicio de sesión:** autenticación de usuarios.
- **Contacto:** información de contacto y formulario para enviar consultas, comentarios y sugerencias.
- **Chatbot con inteligencia artificial:** asistente virtual para responder preguntas de los clientes.
- **Panel de administración:** gestión de pedidos, actualización de estados y consulta de mensajes recibidos.

## 🛠️ Tecnologías utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Base de datos
- MongoDB Atlas
- Mongoose

### Servicios y herramientas
- Google Gemini API
- Git y GitHub
- GitHub Pages
- Render

## 📁 Estructura del proyecto

```text
Proyecto página web/
│
├── index.html
├── historia.html
├── catalogo.html
├── pedidos.html
├── contacto.html
├── admin.html
│
├── style.css
├── script.js
├── auth.js
├── config.js
├── admin.css
├── admin.js
│
├── assets/
│
├── back-end/
│   ├── server.js
│   ├── package.json
│   ├── models/
│   ├── routes/
│   └── middleware/
│
└── README.md
```

## ⚙️ Instalación y ejecución

Para ejecutar el proyecto localmente:

1. Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

2. Ingresar a la carpeta del backend:

```bash
cd "Proyecto página web/back-end"
```

3. Instalar las dependencias:

```bash
npm install
```

4. Crear un archivo `.env` dentro de la carpeta `back-end` y configurar las siguientes variables:

```env
PORT=3000
MONGODB_URI=tu_uri_de_mongodb
GEMINI_API_KEY=tu_clave_de_gemini
JWT_SECRET=tu_clave_secreta
```

5. Iniciar el servidor:

```bash
node server.js
```

6. Abrir el frontend mediante Live Server o un servidor local.

**Importante:** No compartir ni subir el archivo `.env`, ya que contiene credenciales privadas.

## 🗄️ Base de datos

El proyecto utiliza MongoDB Atlas para almacenar la información necesaria para su funcionamiento, incluyendo:

- Usuarios registrados.
- Pedidos realizados por los clientes.
- Mensajes enviados desde el formulario de contacto.

## 🔐 Seguridad

El sistema incorpora mecanismos de autenticación mediante JSON Web Tokens (JWT), cifrado de contraseñas y control de permisos para restringir las funciones administrativas.

## 🌐 Publicación

- **Frontend:** GitHub Pages.
- **Backend:** Render.
- **Base de datos:** MongoDB Atlas.

## 👩‍💻 Autora

Proyecto desarrollado como parte del proceso de formación en desarrollo de software.

**Dulce Hogar — Un dulce recuerdo en cada bocado. ♡**
