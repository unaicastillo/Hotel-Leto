# 🏨 HOTEL LETO (Anteriormente Hotel Dionisio)
### Sistema Integral de Gestión de Reservas 

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 📖 1. Descripción del proyecto

Hotel Dionisio (actualmente Hotel Leto) es una **aplicación web de gestión de reservas de hotel** que permite a los usuarios [1]:
* Consultar información de las habitaciones y servicios del hotel [1].
* Reservar y cancelar habitaciones [1].
* Gestionar su perfil de usuario [1].
* Acceder a información general del hotel (instalaciones, ubicación, contacto) [1].

El proyecto combina **React**, **Supabase** y **Tailwind CSS** para ofrecer una experiencia moderna, intuitiva y segura [1].

---

## 🚀 2. Despliegue y Entorno de Pruebas

La aplicación se encuentra completamente desplegada y funcional. Puedes acceder a través del siguiente enlace:

🔗 **[https://h-leto.vercel.app/](https://h-leto.vercel.app/)**

### 🔐 Credenciales de Acceso

Para evaluar todas las funcionalidades del sistema sin necesidad de registrarte, puedes utilizar las siguientes credenciales de prueba configuradas en la base de datos:

| Rol | Correo Electrónico | Contraseña |
| :---: | :--- | :--- |
| 🧑‍💻 **Usuario Cliente** | `clientehleto@gmail.com` | `123456` |
| 🛡️ **Usuario Administrador** | `adminhleto@gmail.com` | `123456` |

---

## 🛠️ 3. Tecnologías utilizadas

El desarrollo de esta plataforma se ha llevado a cabo empleando el siguiente stack [2]:

* **React**: Librería para construir interfaces de usuario dinámicas y reactivas [2].
* **Tailwind CSS**: Framework de utilidades para estilos rápidos y responsivos [2].
* **Supabase**: Backend como servicio [2], incluyendo:
  * Base de datos PostgreSQL [2].
  * Autenticación y autorización [2].
  * API REST para gestión de reservas [2].

*(Adicionalmente, se integran pasarelas de pago con Stripe y despliegue continuo a través de Vercel).*

---

## ✨ 4. Funcionalidades principales

Las operaciones core que soporta la aplicación incluyen [2]:

* Registro y autenticación de usuarios [2].
* Visualización de habitaciones disponibles y filtrado por fechas [2].
* Realización y cancelación de reservas [2].
* Gestión y edición del perfil de usuario [2].
* Control de acceso según sesión iniciada [2].

---

## 📂 5. Estructura del Proyecto

El código está estructurado de manera modular para separar la interfaz gráfica de la lógica de negocio [3-7]:

```text
📦 src
 ┣ 📂 components
 ┃ ┣ 📂 auth        # Componentes de validación (AuthInput.tsx, AuthLayout.tsx)
 ┃ ┣ 📂 landing     # Secciones informativas (Hero.tsx, RoomsSection.tsx...)
 ┃ ┣ 📂 layout      # Enrutamiento (Header.tsx, Footer.tsx, DesktopNav.tsx...)
 ┃ ┗ 📂 ui          # Elementos genéricos (Button.tsx, Typography.tsx...)
 ┣ 📂 hooks         # Lógica personalizada (useReservation.ts, useLogin.ts...)
 ┣ 📂 lib           # Configuración de base de datos (supabaseClient.ts)
 ┣ 📂 services      # Integraciones externas (emailService.ts)
 ┣ 📂 views         # Páginas completas (LandingPage.tsx, AdminPages...)
 ┗ 📜 App.tsx       # Archivo principal de rutas