const fs = require('fs');

const htmlContent = fs.readFileSync('about.html', 'utf8');
const cssContent = fs.readFileSync('css/styles.css', 'utf8');
const jsContent = fs.readFileSync('js/main.js', 'utf8');

// Extract the specific page's inline <style> block too
let styleMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/);
let pageSpecificCss = styleMatch ? styleMatch[1] : '';

// Strip out HTML boilerplate for the widget
let bodyMatch = htmlContent.match(/<body>([\s\S]*?)<\/body>/);
let bodyContent = bodyMatch ? bodyMatch[1] : htmlContent;

// Remove <script src="js/main.js"></script>
bodyContent = bodyContent.replace(/<script src="js\/main\.js"><\/script>/, '');

const finalWidgetHtml = `
<style>
${cssContent}
${pageSpecificCss}
</style>
<div class="dr-marar-custom-wrapper">
${bodyContent}
</div>
<script>
${jsContent}
</script>
`;

// Elementor JSON structure
const elementorJson = {
    "version": "0.4",
    "title": "Dr Omar Marar - About Page Custom Elementor",
    "type": "page",
    "content": [
        {
            "id": "marar_about_sect1",
            "elType": "section",
            "settings": {
                "layout": "full_width",
                "content_width": "full"
            },
            "elements": [
                {
                    "id": "marar_about_col1",
                    "elType": "column",
                    "settings": {
                        "_column_size": 100
                    },
                    "elements": [
                        {
                            "id": "marar_about_html1",
                            "elType": "widget",
                            "widgetType": "html",
                            "settings": {
                                "html": finalWidgetHtml
                            }
                        }
                    ]
                }
            ]
        }
    ]
};

fs.writeFileSync('dr-omar-marar-about-elementor.json', JSON.stringify(elementorJson, null, 2));
console.log('Successfully created dr-omar-marar-about-elementor.json');
