# Manual de uso — Empleos y Proyectos

Este manual explica las dos secciones de la página de Hakamo: **Empleos** (para quien busca trabajo) y **Proyectos** (para las empresas que quieren ver el trabajo realizado). Cada una tiene dos partes: lo que hace el **visitante** y lo que hace **el equipo de Hakamo** desde el panel de administración (Strapi).

---

## 1. Empleos

### 1.1 Para el visitante

**Dónde está:** menú *Empleos* (`/empleos`). Desde ahí se llega a todo lo demás.

| Quiero… | Qué hago |
|---|---|
| Ver las vacantes | `Empleos` → **Ver vacantes**, o entrar directo a `/empleos/vacantes`. |
| Buscar una vacante | Escribir en el buscador de la parte superior. Si no hay coincidencias, la página lo indica y se puede limpiar la búsqueda para volver al listado. |
| Filtrar | Usar los filtros del listado (categoría, tipo, modalidad, disponibilidad). Se pueden combinar con la búsqueda. |
| Cambiar de página | El listado muestra 10 vacantes por página; abajo se puede elegir 10, 20 o 30. Al cambiar un filtro o buscar, vuelve a la página 1. |
| Ver el detalle de una vacante | Pulsar la tarjeta. La ficha muestra descripción, requisitos, ubicación, modalidad, tipo y salario (si se cargó). |
| Postularme a una vacante | En la ficha, pulsar **Postularme** (baja al formulario) y completar los datos. |
| No hay una vacante para mí | Enviar el CV igualmente (ver 1.2). |

**Las vacantes cerradas** siguen visibles, pero con la marca *Cerrada*, más atenuadas y al final del listado. Se pueden ocultar con el filtro de disponibilidad.

### 1.2 Enviar mi CV sin vacante concreta

En `/empleos`, sección **Tu CV**, hay dos caminos:

**A) Crear mi CV en la página** (asistente de 5 pasos, con barra de avance):
1. *Tus datos* — quién eres.
2. *Experiencia* — dónde has trabajado.
3. *Estudios* — tu formación.
4. *Habilidades* — qué sabes hacer.
5. *Enviar* — revisar y mandar a Hakamo.

Se puede volver atrás sin perder lo escrito. Al enviar, el CV llega a Hakamo y aparece el botón **Descargar PDF** para guardar una copia.

**B) Subir un CV que ya tengo.** Se piden: nombre, apellido, teléfono, correo, área de interés y el archivo.
- Formatos: **PDF o Word** (`.pdf`, `.doc`, `.docx`).
- Tamaño máximo: **5 MB**.
- Si falta algún dato, el formulario no envía y lo avisa. El correo se valida.

### 1.3 Mensajes que verá el visitante

| Mensaje | Qué significa |
|---|---|
| "Completa tus datos para continuar." | Falta algún campo obligatorio. |
| "Revisa el correo electrónico." | El correo no tiene formato válido. |
| "Adjunta tu CV." | No se eligió archivo. |
| "Solo PDF o Word (.pdf, .doc, .docx)." | El archivo no es de un formato aceptado. |
| "El archivo no puede superar 5 MB." | El archivo es muy pesado. |
| "No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp." | Fallo temporal; reintentar o usar WhatsApp. |

El servidor también revisa el **contenido real** del archivo: un archivo renombrado a `.pdf` que no es un PDF se rechaza. Además hay un límite de envíos por persona (10 postulaciones cada 10 minutos); si alguien lo supera, debe esperar unos minutos.

### 1.4 Para el equipo de Hakamo (panel Strapi)

**Publicar una vacante**
1. En Strapi: *Content Manager* → **Vacante** → *Create new entry*.
2. Completar: **Título** (obligatorio), descripción, requisitos, ubicación, modalidad (`presencial` / `remoto` / `híbrido`), tipo (`tiempo completo` / `medio tiempo` / `contrato`), salario, **estado** (`activa` / `cerrada`), fecha de publicación, fecha de cierre, imagen y **división**.
3. El *slug* se genera solo a partir del título.
4. Pulsar **Publish**. Mientras esté en borrador (*Draft*) **no se ve en el sitio**.

**Cerrar una vacante:** abrirla, cambiar **estado** a `cerrada` y publicar de nuevo. Sigue visible, marcada como cerrada, pero ya no se indexa en buscadores. Para quitarla por completo, usar *Unpublish*.

**Editar los textos de la sección:** *Content Manager* → **Página · Vacantes** (títulos, textos del buscador, fondo) y **Página · Empleos** / **Cultura** (portal de empleo). Se guardan con *Publish*.

**Revisar las postulaciones**
1. *Content Manager* → **Postulación**. Cada envío (de una vacante, CV creado o CV subido) aparece aquí **en borrador (Draft)**; no hace falta publicarlo.
2. Datos que verás: nombre, apellido, correo, teléfono, área de interés, carta, **origen** (`vacante` / `cv_creado` / `cv_subido`), la vacante (si aplica) y el **CV** adjunto.
3. Para llevar el seguimiento, cambiar el **estado**: `recibida` → `en revisión` → `aceptada` / `rechazada`.

> Las postulaciones contienen datos personales. No compartas el acceso al panel y descarga los CV solo desde ahí.

---

## 2. Proyectos

### 2.1 Para el visitante

**Dónde está:** menú *Proyectos* (`/proyectos`).

- **Página de Proyectos:** portada, galería y las obras seleccionadas (primero las **destacadas**, luego las **en proceso** y al final las **completadas**).
- **Historial** (`/proyectos/historial`): todas las obras en orden.
  - Filtrar por **estado**: Todos · En proceso · Completados · Destacados (cada uno con su contador).
  - Filtrar por **sector**: Construcción · Plantas industriales · Infraestructura · Energía y proyectos técnicos · Empresas comerciales · Mantenimiento y HSE. Solo aparecen los sectores que tienen obras.
  - Estado y sector se combinan, y el filtro queda en la dirección de la página, de modo que se puede **copiar el enlace** ya filtrado. Quitar el sector limpia la dirección.
  - Desde *Servicios*, el enlace de cada sector abre el historial ya filtrado.
- **Ficha de una obra:** pulsar cualquier obra para ver su descripción, datos, alcance e imágenes.

### 2.2 Para el equipo de Hakamo (panel Strapi)

**Agregar una obra**
1. *Content Manager* → **Proyecto** → *Create new entry*.
2. Completar: **Título** (obligatorio), sector, rol de Hakamo, cliente, ubicación, descripción corta, contenido (texto con formato), **datos** (pares etiqueta/valor), **alcance** (lista de elementos), **imágenes**, **estado** (`en proceso` / `completado` / `destacado`), fecha, **orden** y **división**.
3. Dejar **activo** en `true`.
4. Pulsar **Publish**.

**Reglas que conviene recordar**
- Una obra solo se ve si está **publicada** y con **activo = true**. Para ocultarla sin borrarla, poner `activo` en `false` o hacer *Unpublish*.
- El campo **orden** (número menor = primero) define el orden en las listas.
- El **estado** decide el color de la etiqueta y la prioridad en la portada (destacado → en proceso → completado).
- El filtro por **sector** se calcula a partir del texto del campo *sector*; usa nombres parecidos a los de la lista (por ejemplo "Construcción", "Energía", "Mantenimiento y HSE") para que la obra aparezca bajo el filtro correcto.

**Editar los textos de la sección:** *Content Manager* → **Página · Proyectos** (portada, galería, obras, clip, cierre y ficha). Se guarda con *Publish*.

### 2.3 Cuándo se ven los cambios

Después de publicar en Strapi, el sitio se actualiza solo en unos instantes. Si no cambia, recarga con `Ctrl + F5`; si sigue igual tras unos minutos, avisa a quien administra el servidor.

---

## 3. Problemas frecuentes

| Problema | Causa probable | Qué hacer |
|---|---|---|
| Publiqué una vacante u obra y no aparece | Quedó en borrador, o la obra tiene `activo = false` | Revisar que diga *Published* y que `activo` esté en `true`. |
| La obra no sale en el filtro de un sector | El campo *sector* no coincide con ninguno de los sectores | Ajustar el texto del sector. |
| Un visitante dice que no puede subir su CV | Archivo mayor de 5 MB o formato distinto de PDF/Word | Pedirle que lo reduzca o lo exporte a PDF. |
| No llegan postulaciones | Se buscan entre las publicadas | Revisar en **Postulación** la vista *Draft*. |
| El panel no abre | Servidor caído o sin conexión | Avisar a quien administra el servidor. |
