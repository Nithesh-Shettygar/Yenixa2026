/**
 * Component Loader Utility
 * Usage: <div data-component="footer"></div>
 */

class ComponentLoader {
    constructor() {
        this.components = {};
        this.init();
    }

    init() {
        // Load all components marked with data-component attribute
        this.loadComponents();
        
        // Observe DOM changes for dynamically added components
        this.observeDOM();
    }

    async loadComponents() {
        const componentElements = document.querySelectorAll('[data-component]');
        
        for (const element of componentElements) {
            const componentName = element.getAttribute('data-component');
            await this.loadComponent(componentName, element);
        }
    }

    async loadComponent(componentName, targetElement) {
        try {
            // Check if component is already loaded
            if (this.components[componentName]) {
                this.renderComponent(componentName, targetElement);
                return;
            }

            // Load component HTML
            const response = await fetch(`../components/${componentName}.html`);
            if (!response.ok) {
                throw new Error(`Component ${componentName} not found`);
            }

            const html = await response.text();
            
            // Parse HTML to separate styles and content
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const content = doc.body.innerHTML;
            const styles = doc.querySelector('style')?.innerHTML || '';
            
            // Store component data
            this.components[componentName] = {
                content,
                styles,
                loaded: true
            };

            // Inject styles if not already present
            this.injectStyles(componentName, styles);
            
            // Render component
            this.renderComponent(componentName, targetElement);

        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
            targetElement.innerHTML = `
                <div class="component-error" style="
                    padding: 20px;
                    background: rgba(255,0,0,0.1);
                    border: 1px solid red;
                    color: white;
                    border-radius: 5px;
                    text-align: center;
                ">
                    <p>Error loading ${componentName} component</p>
                </div>
            `;
        }
    }

    injectStyles(componentName, styles) {
        // Check if styles are already injected
        const styleId = `component-style-${componentName}`;
        if (document.getElementById(styleId)) return;

        // Create and inject style tag
        const styleTag = document.createElement('style');
        styleTag.id = styleId;
        styleTag.textContent = styles;
        document.head.appendChild(styleTag);
    }

    renderComponent(componentName, targetElement) {
        const component = this.components[componentName];
        if (!component) return;

        // Set the component content
        targetElement.innerHTML = component.content;
        
        // Dispatch event for component loaded
        targetElement.dispatchEvent(new CustomEvent('component-loaded', {
            detail: { componentName }
        }));
    }

    observeDOM() {
        // Create a MutationObserver to watch for new components
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        if (node.hasAttribute?.('data-component')) {
                            this.loadComponent(
                                node.getAttribute('data-component'),
                                node
                            );
                        }
                        
                        // Check children
                        const components = node.querySelectorAll?.('[data-component]') || [];
                        components.forEach((element) => {
                            this.loadComponent(
                                element.getAttribute('data-component'),
                                element
                            );
                        });
                    }
                });
            });
        });

        // Start observing the document body
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Public method to manually load a component
    async load(componentName, targetElement) {
        await this.loadComponent(componentName, targetElement);
    }
}

// Initialize component loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.componentLoader = new ComponentLoader();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentLoader;
}

// /js/navbar-loader.js
document.addEventListener("DOMContentLoaded", () => {
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    
    if (navbarPlaceholder) {
        fetch("/components/navbar.html")
            .then(response => {
                if (!response.ok) throw new Error("Navbar file not found");
                return response.text();
            })
            .then(data => {
                navbarPlaceholder.innerHTML = data;
            })
            .catch(err => console.error("Error loading navigation:", err));
    }
});