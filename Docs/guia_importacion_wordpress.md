# Guía de Importación a WordPress con Elementor

He convertido exitosamente tu sitio HTML a plantillas de Elementor que mantienen la estructura de **bloques editables** (Encabezados, Texto, Imágenes, Botones).

## Archivos Generados
1.  **`dr-omar-marar-home-v2.json`**: Plantilla de la página de inicio (Index).
2.  **`dr-omar-marar-about-v2.json`**: Plantilla de la página "About Me".

## Pasos para la Importación

### 1. Preparación en WordPress
*   Asegúrate de tener instalado **WordPress** y el plugin **Elementor**.
*   (Recomendado) Instala el tema **Hello Elementor** para evitar conflictos de estilo.

### 2. Importar las Plantillas
*   En tu panel de WordPress, ve a **Plantillas > Plantillas guardadas**.
*   Haz clic en el botón **Importar plantillas** en la parte superior.
*   Selecciona los archivos `.json` (v2) que generé y cárgalos.

### 3. Crear las Páginas
*   Ve a **Páginas > Añadir nueva**.
*   Ponle nombre (ej. "Inicio") y haz clic en **Editar con Elementor**.
*   En el editor de Elementor, haz clic en el icono de la **carpeta gris** (Añadir plantilla).
*   Ve a la pestaña **Mis plantillas**.
*   Busca la plantilla importada y haz clic en **Insertar**.

### 4. Ajustes Importantes
*   **Imágenes**: Las imágenes aparecerán como rotas inicialmente porque apuntan a rutas locales. Debes subirlas a la **Biblioteca de Medios** de WordPress y actualizar los widgets de imagen.
*   **CSS Personalizado**: He incluido los estilos en los ajustes de la página. Si no usas Elementor Pro, es posible que el CSS no se aplique automáticamente. En ese caso, copia el contenido de la carpeta `css/styles.css` y pégalo en **Apariencia > Personalizar > CSS adicional**.

## ¿Qué puedes editar ahora?
*   **Textos**: Haz clic en cualquier título o párrafo y verás el contenido en la barra lateral de Elementor.
*   **Botones**: Puedes cambiar los enlaces y el texto directamente.
*   **Diseño**: La estructura de secciones y columnas ya está configurada para respetar el diseño original.
