const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const generateId = () => Math.random().toString(36).substr(2, 7);

function convertHtmlToElementor(htmlPath, title) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Load CSS to include in page settings
    let css = '';
    const cssDir = path.join(path.dirname(htmlPath), 'css');
    if (fs.existsSync(cssDir)) {
        fs.readdirSync(cssDir).forEach(file => {
            if (file.endsWith('.css')) {
                css += fs.readFileSync(path.join(cssDir, file), 'utf8') + '\n';
            }
        });
    }

    const sections = [];
    
    // We iterate over main sections or body children
    const mainContent = document.body;
    
    // Helper to map elements to widgets
    const mapElementToWidget = (el) => {
        const tagName = el.tagName.toLowerCase();
        
        if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'h4' || tagName === 'h5' || tagName === 'h6') {
            return {
                id: generateId(),
                elType: 'widget',
                widgetType: 'heading',
                settings: {
                    title: el.textContent.trim(),
                    header_size: tagName
                }
            };
        }
        
        if (tagName === 'p') {
            return {
                id: generateId(),
                elType: 'widget',
                widgetType: 'text-editor',
                settings: {
                    editor: el.innerHTML.trim()
                }
            };
        }
        
        if (tagName === 'img') {
            return {
                id: generateId(),
                elType: 'widget',
                widgetType: 'image',
                settings: {
                    image: {
                        url: el.getAttribute('src') || ''
                    },
                    alt: el.getAttribute('alt') || ''
                }
            };
        }
        
        if (tagName === 'a' && (el.classList.contains('btn') || el.textContent.trim().length < 30)) {
            return {
                id: generateId(),
                elType: 'widget',
                widgetType: 'button',
                settings: {
                    text: el.textContent.trim(),
                    link: {
                        url: el.getAttribute('href') || '#'
                    }
                }
            };
        }

        if (tagName === 'span' && el.textContent.trim().length > 0) {
            return {
                id: generateId(),
                elType: 'widget',
                widgetType: 'heading',
                settings: {
                    title: el.textContent.trim(),
                    header_size: 'div',
                    _title: 'Subtitle'
                }
            };
        }

        // If it's a complex div or something we don't recognize, keep it as HTML to preserve design
        // but try to keep it granular.
        return {
            id: generateId(),
            elType: 'widget',
            widgetType: 'html',
            settings: {
                html: el.outerHTML
            }
        };
    };

    // Process top-level sections
    const bodyChildren = Array.from(document.body.children).filter(el => 
        ['section', 'header', 'footer', 'div'].includes(el.tagName.toLowerCase()) || el.classList.contains('container')
    );

    bodyChildren.forEach(child => {
        const section = {
            id: generateId(),
            elType: 'section',
            settings: {
                layout: 'full_width',
                content_width: 'full',
                _title: child.className || child.tagName
            },
            elements: []
        };

        // Check for columns (e.g., hero-grid, about-grid, etc.)
        const grid = child.querySelector('.hero-grid, .about-grid, .footer-grid, .services-grid, .process-grid, .testi-grid, .blog-grid');
        
        if (grid) {
            const gridChildren = Array.from(grid.children);
            const colSize = Math.floor(100 / Math.min(gridChildren.length, 4)); // Cap at 4 columns for Elementor standard
            
            gridChildren.forEach(gridChild => {
                const column = {
                    id: generateId(),
                    elType: 'column',
                    settings: {
                        _column_size: colSize,
                        _title: gridChild.className || 'Column'
                    },
                    elements: []
                };
                
                // Map elements inside this column
                // We map Headings and Text, but if it's too complex, we might keep it as HTML
                const innerHeading = gridChild.querySelector('h1, h2, h3, h4');
                const innerP = gridChild.querySelector('p');
                const innerImg = gridChild.querySelector('img');
                const innerBtn = gridChild.querySelector('a.btn, .btn');

                if (innerHeading) column.elements.push(mapElementToWidget(innerHeading));
                if (innerImg) column.elements.push(mapElementToWidget(innerImg));
                if (innerP) column.elements.push(mapElementToWidget(innerP));
                if (innerBtn) column.elements.push(mapElementToWidget(innerBtn));
                
                // If column is empty after mapping specific types, use HTML
                if (column.elements.length === 0) {
                    column.elements.push({
                        id: generateId(),
                        elType: 'widget',
                        widgetType: 'html',
                        settings: { html: gridChild.innerHTML }
                    });
                }
                
                section.elements.push(column);
            });
        } else {
            // Standard single column
            const column = {
                id: generateId(),
                elType: 'column',
                settings: { _column_size: 100 },
                elements: []
            };
            
            // Map common elements in order
            const innerElements = Array.from(child.querySelectorAll('h1, h2, h3, h4, p, img, a.btn, .btn'));
            if (innerElements.length > 0) {
                innerElements.forEach(innerEl => {
                    // Only map if it's "close enough" to the top level (not nested in another mapped element)
                    column.elements.push(mapElementToWidget(innerEl));
                });
            } else {
                column.elements.push({
                    id: generateId(),
                    elType: 'widget',
                    widgetType: 'html',
                    settings: { html: child.outerHTML }
                });
            }
            section.elements.push(column);
        }

        sections.push(section);
    });

    // Prepend CSS as an HTML widget in the first section or a new one
    const cssSection = {
        id: generateId(),
        elType: 'section',
        settings: { _title: 'Global Styles' },
        elements: [
            {
                id: generateId(),
                elType: 'column',
                settings: { _column_size: 100 },
                elements: [
                    {
                        id: generateId(),
                        elType: 'widget',
                        widgetType: 'html',
                        settings: {
                            html: `<style>${css}</style>`
                        }
                    }
                ]
            }
        ]
    };
    
    sections.unshift(cssSection);

    const elementorJson = {
        version: "0.4",
        title: title,
        type: "page",
        content: sections,
        page_settings: {
            custom_css: css
        }
    };

    return elementorJson;
}

// Generate for index.html
const indexJson = convertHtmlToElementor('index.html', 'Dr Omar Marar - Home (Editable)');
fs.writeFileSync('dr-omar-marar-home-v2.json', JSON.stringify(indexJson, null, 2));

// Generate for about.html
if (fs.existsSync('about.html')) {
    const aboutJson = convertHtmlToElementor('about.html', 'Dr Omar Marar - About (Editable)');
    fs.writeFileSync('dr-omar-marar-about-v2.json', JSON.stringify(aboutJson, null, 2));
}

console.log('Successfully created v2 editable JSON files.');
