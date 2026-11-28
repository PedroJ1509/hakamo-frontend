# Informe de auditoría QA — Hakamo (frontend + backend)

Estado: **completa en lo verificable desde la sesión de desarrollo; con 3 puntos pendientes** (ver sección 4).

## 1. Qué se probó y resultado

| Área | Entorno | Resultado |
|---|---|---|
| Navegación (clic en cada enlace interno de 17 páginas) | Edge, local y producción | 349 clics, 0 problemas, 0 recargas completas por enlaces `<a>` |
| Navegación | Safari/WebKit, local | 16 páginas, 326 clics, 0 problemas |
| Rutas directas, recarga, atrás/adelante, un solo `h1` | Edge, local | 87 de 87 |
| Consola, red e imágenes (17 rutas) | Edge, local y producción | Sin avisos; solo el 404 esperado de `demo-vac-1` en producción (las vacantes demo existen solo en desarrollo) |
| Formularios, filtros, FAQ, historial, menú | Edge, local (modo desarrollo) | 36 de 36 |
| Paginación de vacantes | Edge, local (tamaño de página temporal de 2) | 6 de 6 |
| Solicitud de empresa (WhatsApp, correo y guardado del lead) | Edge y WebKit | Pasa: lead guardado (201), WhatsApp abierto, correo entregado a `mailto:` |
| CV (crear, subir, descargar PDF) | Edge y WebKit | Pasa |
| Móvil emulado (iPhone 13, Pixel 7): 15 rutas y menú móvil | Edge, producción | Sin desborde horizontal, un solo `h1`, menú abre y navega |
| Hidratación de React (errores #418, #423, #425) | Edge escritorio y móvil, producción, 17 rutas | 0 avisos |
| Accesibilidad básica, 404, desbordes en 5 anchos | Edge, local | Pasa |

## 2. Problemas encontrados y corregidos

- **Frontend**
  - Los logos llevaban a la raíz; ahora llevan a la portada de cada audiencia.
  - Los desplegables del menú se cerraban en cada clic; ahora se fijan al pulsar.
  - Descarga de PDF reforzada, imagen principal con prioridad y arreglos de lint en `scroll-expand` y `talent-board`.
  - 41 errores de lint reducidos a 0 (hooks del navegador, `Lanyard` tipado sin `any`, efectos sin `setState`).
  - Regresión propia detectada y corregida durante la verificación: el material de la cinta del `Lanyard` se recreaba en cada render y hacía caer la pestaña.
- **Backend**
  - Registro público de usuarios cerrado (verificado en producción: registro, login local, recuperar contraseña y listar usuarios responden 403).
  - Validación del contenido real de los CV (firma del archivo), límite de tamaño y límite de envíos por IP.
  - Formulario de mensajes con lista blanca de campos y validación.
  - CORS configurable por entorno y `.env.example` documentado.

## 3. Despliegue

Backend y frontend desplegados en el servidor; ambos procesos de pm2 en línea. `/_health` responde 204 y las 14 rutas públicas responden 200 (la inexistente, 404).

## 4. Pendiente (no verificable desde esta sesión)

1. **`IS_PROXIED=true` en el `.env` del servidor.** Afecta a que el límite por IP use la IP real del visitante. Comando: `grep -E "^(IS_PROXIED|CORS_ORIGINS|SITIO_URL)=" /var/www/hakamo/backend/.env`.
2. **Firefox.** Windows bloquea el ejecutable que descarga Playwright (`Permission denied`); revisar el Historial de protección de Seguridad de Windows. No se probó nada en Firefox.
3. **Teléfono real.** Solo se probó en móvil emulado.

## 5. Recomendaciones sin aplicar

- Actualizar Strapi (5.41.1 a 5.63): `npm audit` reporta 82 vulnerabilidades, 3 críticas en dependencias de la herramienta de línea de comandos.
- Servir el panel de administración por HTTPS (hoy se accede por `http://IP:1337/admin`) y cerrar el puerto 1337 al exterior.
- Definir `CORS_ORIGINS` en el servidor.
- Cambiar la contraseña del servidor que se pegó en un chat.
