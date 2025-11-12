# Documentación de Endpoints — Frontend (Notas de un lector)

## Resumen
Este documento recoge los endpoints que el frontend usa para comunicarse con el backend y con servicios externos. Incluye: base URLs, rutas usadas, método HTTP, payload esperado, archivo donde se invoca y ejemplos de prueba (curl / PowerShell).

---

## 1) Base URL del backend
- Desarrollo:
  - http://localhost:4000/api
  - Archivo: `src/environments/environment.ts`
- Producción (placeholder):
  - https://tu-backend-en-vercel.vercel.app/api
  - Archivo: `src/environments/environment.prod.ts`

> Para cambiar la base URL apunta `environment.apiUrl` al servidor correcto o crea una estrategia de entornos en el pipeline de build.

---

## 2) Endpoints del backend usados por el frontend
Actualmente el frontend usa el módulo de Autenticación del backend. Las rutas concretas:

1) Autenticación (Auth)
- POST {apiUrl}/auth/login
  - Descripción: Inicio de sesión.
  - Método: POST
  - Payload (JSON): { "email": string, "password": string }
  - Respuesta esperada (ejemplo usado por frontend): { success: boolean, token: string, user: object }
  - Uso en frontend: guarda `token` y `user` en localStorage mediante `AuthService.saveSession()`.
  - Archivo frontend: `src/app/auth/auth.service.ts` (líneas de login)

- POST {apiUrl}/auth/register
  - Descripción: Registrar un nuevo usuario.
  - Método: POST
  - Payload (JSON): { "nombre": string, "email": string, "password": string, "rol": string }
  - Respuesta esperada: objeto con `success` (y probablemente info del usuario)
  - Archivo frontend: `src/app/auth/auth.service.ts` y el formulario en `src/app/auth/register/register.component.ts`

> Nota: `AuthService` construye `private apiUrl = `${environment.apiUrl}/auth``.

---

## 3) Endpoints externos (no parte de tu backend)
- OpenLibrary — portadas de libros
  - GET https://covers.openlibrary.org/b/isbn/{ISBN}-{SIZE}.jpg
    - Ejemplo: `https://covers.openlibrary.org/b/isbn/9788445000667-M.jpg`
  - GET https://covers.openlibrary.org/b/olid/{OLID}-{SIZE}.jpg
  - Implementación: `src/app/services/book-cover.service.ts` (métodos `getBookCover()` y `getWorkCover()`)

- Recursos estáticos (fuentes, iconos):
  - Google Fonts, Material Icons, FontAwesome (en `src/index.html` y `src/styles.css`).

---

## 4) Dónde está implementado cada endpoint en el repo
- `src/app/auth/auth.service.ts` — login y register (POST a `{environment.apiUrl}/auth/...`).
- `src/environments/environment.ts` — `apiUrl` (desarrollo).
- `src/environments/environment.prod.ts` — `apiUrl` (producción placeholder, reemplazar).
- `src/app/services/book-cover.service.ts` — URLs de OpenLibrary utilizadas para mostrar portadas.

---

## 5) Ejemplos de prueba (PowerShell / curl)
Sustituye `http://localhost:4000/api` por la `apiUrl` adecuada si usas producción.

- Probar login (curl):

```powershell
curl -X POST http://localhost:4000/api/auth/login -H "Content-Type: application/json" -d '{"email":"tu@correo.com","password":"tuPassword"}'
```

- Probar registro (curl):

```powershell
curl -X POST http://localhost:4000/api/auth/register -H "Content-Type: application/json" -d '{"nombre":"Pepito","email":"p@p.com","password":"pass1234","rol":"CLIENTE"}'
```

- Obtener portada por ISBN (navegador o curl):

```powershell
curl -I https://covers.openlibrary.org/b/isbn/9788445000667-M.jpg
```

---

## 6) Token y almacenamiento
- El frontend guarda el token y el usuario en `localStorage` con las claves `token` y `user`.
  - Archivo responsable: `src/app/auth/auth.service.ts` (método `saveSession`).
- Muchas rutas protegidas del backend suelen requerir la cabecera `Authorization: Bearer <token>`; revisa `auth.interceptor.ts` si existe un interceptor en tu proyecto para adjuntar el token (busca `Authorization` o `Bearer`).

---

## 7) Cómo ampliar/añadir nuevos endpoints
1. Definir la ruta en el backend.
2. Actualizar `environment.apiUrl` si cambia la base.
3. Crear un servicio Angular (o añadir método en servicio existente) que use `HttpClient`.
4. Añadir pruebas manuales con `curl` o Postman. Opcional: añadir tests unitarios para servicios.

---

## 8) Verificación rápida en el proyecto actual
- El build de producción contiene `environment.apiUrl` embebido (ver `dist/frontend/browser/main-*.js`), actualmente apunta a `http://localhost:4000/api` en desarrollo.
- En Android (Capacitor) la app empaquetada incluye estos archivos web en `android/app/src/main/assets/public/`.

---

## 9) Recomendaciones
- Mantén las URLs sensibles (API keys, secretos) fuera del repo. Usa variables de entorno o secret managers para CI/CD.
- Para producción reemplaza el placeholder en `environment.prod.ts` por la URL real del backend.
- Considera agregar un archivo `ENDPOINTS.md` similar en la carpeta `docs/` si quieres versionarlo/expandirlo.

---

## 10) Cambios hechos desde esta sesión
- Se creó este archivo: `ENDPOINTS.md` en la raíz del proyecto (este documento).
- Se confirmó que `AuthService` y `BookCoverService` son los consumidores de endpoints.

---

Si quieres, puedo:
- Añadir autenticación por cabecera en un `auth.interceptor.ts` si no existe (o revisar el interceptor actual),
- Crear tests unitarios mínimos para `AuthService`,
- O generar un `docs/` más extenso con ejemplos de payloads y respuestas reales (si compartes ejemplos de respuesta del backend).

Dime qué prefieres y lo preparo.