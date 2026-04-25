const fs = require('fs');

const htmlContent = fs.readFileSync('index.html', 'utf8');
const cssContent = fs.readFileSync('css/styles.css', 'utf8');
const jsContent = fs.readFileSync('js/main.js', 'utf8');

// Strip out HTML boilerplate for the widget
let bodyMatch = htmlContent.match(/<body>([\s\S]*?)<\/body>/);
let bodyContent = bodyMatch ? bodyMatch[1] : htmlContent;

// Remove <script src="js/main.js"></script> as we will embed it directly
bodyContent = bodyContent.replace(/<script src="js\/main\.js"><\/script>/, '');

const finalWidgetHtml = `
<style>
${cssContent}
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
    "title": "Dr Omar Marar - Full Page Custom Elementor",
    "type": "page",
    "content": [
        {
            "id": "marar_sect1",
            "elType": "section",
            "settings": {
                "layout": "full_width",
                "content_width": "full"
            },
            "elements": [
                {
                    "id": "marar_col1",
                    "elType": "column",
                    "settings": {
                        "_column_size": 100
                    },
                    "elements": [
                        {
                            "id": "marar_html1",
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

fs.writeFileSync('dr-omar-marar-elementor.json', JSON.stringify(elementorJson, null, 2));
console.log('Successfully created dr-omar-marar-elementor.json');
