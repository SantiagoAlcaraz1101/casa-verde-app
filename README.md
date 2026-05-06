# 🌱 Casa Verde+

Aplicación web ecológica orientada a comunidades residenciales para incentivar hábitos de reciclaje mediante un sistema de gamificación, puntos ecológicos y ranking comunitario.

---

# 📚 Contenido

- Objetivo del proyecto
- Tecnologías utilizadas
- Roles del sistema
- Funcionalidades principales
- Autenticación
- Base de datos
- Instalación del proyecto
- Credenciales de prueba
- Diseño UI/UX
- Futuras mejoras
- Autor

---

# 📌 Objetivo del proyecto

Casa Verde+ busca promover la separación correcta de residuos y la participación ecológica dentro de comunidades residenciales mediante:

- Registro de acciones ecológicas.
- Sistema de puntos.
- Ranking de usuarios.
- Guía interactiva de residuos.
- Panel administrativo.
- Recomendaciones ecológicas.

---

# 🚀 Tecnologías utilizadas

## Frontend

- React
- TypeScript
- Vite
- CSS personalizado
- Axios

## Backend

- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Role Guards

## Base de datos

- PostgreSQL

---

# 🏗 Arquitectura del proyecto

````txt
casa-verde-app/
│
├── frontend/   → Aplicación React
│
└── backend/    → API NestJS
´´´txt

# 🔐 Roles del sistema

## 👤 USER

Usuarios normales de la comunidad.

### Funciones

- Registrar acciones ecológicas.
- Ganar puntos.
- Ver ranking.
- Consultar guía de residuos.
- Ver historial de acciones.

---

## 🛠 ADMIN

Administrador de la comunidad.

### Funciones

- Gestionar guía de residuos.
- Visualizar usuarios.
- Ver estadísticas ecológicas.
- Consultar ranking.

### Restricciones

⚠️ Los administradores:

- No participan en ranking.
- No acumulan puntos.
- No pueden registrar acciones ecológicas.

---

# 🎮 Funcionalidades principales

## ♻ Sistema de acciones ecológicas

Los usuarios pueden registrar acciones como:

- Reciclaje plástico
- Separación de orgánicos
- Reciclaje de vidrio

Cada acción suma puntos automáticamente.

---

## 🏆 Ranking ecológico

Los usuarios compiten según sus puntos ecológicos acumulados.

---

## 📘 Guía de residuos

Los administradores pueden:

- Crear residuos
- Eliminar residuos
- Organizar residuos por categorías

Los usuarios pueden consultar la guía desde su dashboard.

---

## 📋 Historial de acciones

Cada usuario puede visualizar todas sus acciones ecológicas registradas.

---

## 💡 Recomendaciones ecológicas

Carrusel interactivo con consejos y recomendaciones de reciclaje.

---

# 🔐 Autenticación

El sistema utiliza:

- JWT
- Guards
- Roles
- Protección de rutas

---

# 🗄 Base de datos

## Modelos principales

- User
- EcoAction
- WasteItem

Gestionado mediante Prisma ORM.

---

# ⚙ Instalación del proyecto

## 1. Clonar repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
````

---

## 2. Backend

```bash
cd backend
npm install
```

### Variables de entorno

Crear archivo `.env`

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/casa_verde"
JWT_SECRET="CASA_VERDE_SECRET_KEY"
```

### Ejecutar migraciones

```bash
npx prisma migrate dev
```

### Ejecutar backend

```bash
npm run start:dev
```

---

## 3. Frontend

```bash
cd frontend
npm install
```

### Ejecutar frontend

```bash
npm run dev
```

---

# 🧪 Credenciales de prueba

## Admin

```txt
Correo: admin@casaverde.com
Contraseña: 123456
```

## Usuario

```txt
Correo: santiago@gmail.com
Contraseña: 123456
```

---

# 🎨 Diseño UI/UX

La interfaz fue diseñada utilizando:

- Paleta ecológica verde
- Diseño responsive
- Feedback visual animado
- Toast notifications
- Modales personalizados
- Acordeones interactivos

---

# 📈 Futuras mejoras

- Notificaciones en tiempo real
- Dashboard avanzado
- Estadísticas ecológicas
- Sistema de insignias
- Retos semanales
- Aplicación móvil
- Panel super admin
- Gestión avanzada de usuarios

---

# 👨‍💻 Autor

Proyecto desarrollado como MVP académico y de innovación tecnológica orientado a sostenibilidad y gamificación ecológica.

Desarrollado con ❤️ usando React + NestJS.
