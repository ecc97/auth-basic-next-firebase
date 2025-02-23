# 🚀 Next.js Authentication with Firebase & NextAuth

Este es un proyecto de autenticación basado en **Next.js 15**, **Firebase Authentication** y **NextAuth.js**. Permite a los usuarios registrarse, iniciar sesión y acceder a una página de perfil protegida.

---

## 📌 Características

✅ **Registro de usuarios** con Firebase Authentication.
✅ **Inicio de sesión con credenciales** usando NextAuth.
✅ **Protección de rutas privadas** con `AuthGuard`.
✅ **Manejo de sesión global** con `SessionProvider`.
✅ **Diseño moderno** con **Sass**.
✅ **Validaciones** con `react-hook-form` y `zod`.

---

## 📂 Estructura del Proyecto

```
📁 src
 ├── 📁 app
 │   ├── 📁 (main)
 │   │   ├── 📁 (public)
 │   │   │   ├── 📁 login
 │   │   │   ├── 📁 register
 │   │   ├── 📁 (private)
 │   │   │   ├── 📁 profile
 │   │   │   │   ├── page.tsx  (Página de perfil protegida)
 │   │   │   ├── 📁 guard
 │   │   │   │   ├── AuthGuard.tsx (Protección de rutas privadas)
 │   ├── layout.tsx (Provee el contexto de sesión)
 │
 ├── 📁 components
 │   ├── 📁 UI
 │   │   ├── 📁 templates
 │   │   │   ├── LoginTemplate.tsx
 │   │   │   ├── RegisterTemplate.tsx
 │   ├── 📁 atoms
 │   │   ├── Button.tsx
 │   │   ├── Input.tsx
 │   ├── 📁 molecules
 │   │   ├── Form
 │   │   │   ├── LoginForm.tsx
 │   │   │   ├── RegisterForm.tsx
 │   │   ├── SocialGroup
 │   │   │   ├── SocialLoginGroup.tsx
 │   ├── 📁 organism
 │   │   ├── LeftPanel.tsx
 │   │   ├── RightPanel.tsx
 │
 ├── 📁 interfaces
 │   ├── ILogin.ts
 │   ├── IRegister.ts
 │
 ├── 📁 assets
 │   ├── 📁 sass
 │   │   ├── login.module.scss
 │   │   ├── register.module.scss
 │
 ├── 📁 api
 │   ├── 📁 auth
 │   │   ├── login.ts
 │   │   ├── register.ts
 │
 ├── 📁 lib
 │   ├── firebase.ts (Configuración de Firebase)
 │
 ├── 📁 context
 │   ├── auth-provider.tsx (Proveedor de sesión de NextAuth)
 │
 ├── 📁 styles (Estilos globales)
```

---

## ⚙️ Instalación y Configuración

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/ecc97/auth-basic-next-firebase.git
cd auth-basic-next-firebase
```

### 2️⃣ Instalar dependencias
```bash
yarn install
# o
npm install
```

### 3️⃣ Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto y añade:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4️⃣ Ejecutar el proyecto
```bash
yarn dev
# o
npm run dev
```
Accede a `http://localhost:3000`

---

## 🔑 Autenticación con NextAuth & Firebase
El proyecto usa **NextAuth.js** para la autenticación con Firebase Authentication.

- `nextauth.ts`: Configuración de NextAuth.
- `auth-provider.tsx`: Proveedor de sesión global.
- `AuthGuard.tsx`: Protege rutas privadas como `/profile`.
- `firebase.tsx`: Configuración de Firebase.

---


## 📜 Licencia
Este proyecto está bajo la **MIT License**.

