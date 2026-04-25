# 🩺 Documento de Gestión Técnica y Prompt: Dr. Omar Marar Landing

## 1. Objetivo del Proyecto
Crear una landing page médica de alta gama para el Dr. Omar Marar. El sitio debe proyectar autoridad, confianza y limpieza, facilitando que los pacientes encuentren información sobre sus servicios de cirugía y gastroenterología y procedan a agendar una cita.

## 2. Requerimientos de Diseño (Basado en Mockup)
- **Interfaz:** Inspirada en el diseño de "Medically" (imágenes amplias, tarjetas de servicios con iconos, tipografía clara).
- **Paleta de Colores:** Azul hospitalario (#007bff o similar), blanco puro y gris suave para secciones de contraste.
- **Interactividad:** Navegación suave (Smooth scroll), menús desplegables en móvil y validación básica de formularios con Vanilla JS.

## 3. Master Prompt para el Agente de IA

*Instrucciones para el Agente de Desarrollo:*

> **Rol:** Actúa como un Desarrollador Senior de Frontend especializado en Web Perfomance y Sitios Estáticos.
>
> **Tarea:** Desarrollar una landing page profesional utilizando exclusivamente **HTML5, CSS3 y JavaScript puro**.
>
> **Fuente de Información:** > 1. Debes leer el archivo `dr-omar-marar-v2.html` adjunto y extraer todos los textos (Nombre, Especialidad, Acerca de, Servicios, Ubicaciones). No inventes información; usa la que está en el documento.
> 2. **Mockup:** Sigue la estructura visual de la imagen de referencia (Medically). Implementa secciones de: Hero, Estadísticas, Servicios (en cuadrícula), Portafolio de Casos/Galería y Formulario de Contacto.
>
> **Especificaciones de Código:**
> - **HTML:** Semántico y optimizado para SEO.
> - **CSS:** Estructura modular. Asegura que sea 100% responsivo (Mobile First). Usa variables CSS para los colores principales.
> - **JavaScript:** Maneja la lógica de apertura/cierre de menús, el scroll suave y la gestión del envío del formulario (puedes usar un preventDefault y simular el envío o prepararlo para un webhook).
>
> **Imágenes:** Referencia las imágenes desde la carpeta `./assets/img/`.
>
> **Entregables:**
> - Archivo `index.html`.
> - Carpeta `css/` con `styles.css`.
> - Carpeta `js/` con `main.js`.
> - Un `Dockerfile` basado en `nginx:alpine` y un `docker-compose.yml` para desplegar en Dokploy.

---

## 4. Gestión de Riesgos (PM Notes)

* **Riesgo de Contenido:** Al ser un sitio médico, la precisión del texto es vital. El agente no debe parafrasear de forma que cambie el sentido médico de los servicios del Dr. Omar.
* **Riesgo de Rendimiento:** Al usar HTML puro, el sitio será rápido, pero debemos cuidar el peso de las imágenes que se pongan en la carpeta `img`. Se recomienda formato **WebP**.
* **Despliegue:** Asegúrate de que el `Dockerfile` copie correctamente las carpetas `css`, `js` y `assets` al directorio `/usr/share/nginx/html`.