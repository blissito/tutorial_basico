// Sistema de componentes para cargar dinámicamente HTML
class ComponentLoader {
  constructor() {
    this.components = {};
  }

  // Cargar un componente desde un archivo HTML
  async loadComponent(name, containerId) {
    try {
      const response = await fetch(`/components/${name}.html`);
      if (!response.ok) {
        throw new Error(
          `Error cargando componente ${name}: ${response.status}`
        );
      }

      const html = await response.text();
      const container = document.getElementById(containerId);

      if (container) {
        container.innerHTML = html;
        // Disparar evento personalizado cuando se carga el componente
        container.dispatchEvent(
          new CustomEvent("componentLoaded", {
            detail: { componentName: name },
          })
        );
      } else {
        console.error(`Contenedor ${containerId} no encontrado`);
      }

      return html;
    } catch (error) {
      console.error(`Error cargando componente ${name}:`, error);
      return null;
    }
  }

  // Cargar múltiples componentes
  async loadComponents(componentList) {
    const promises = componentList.map(({ name, containerId }) =>
      this.loadComponent(name, containerId)
    );

    return Promise.all(promises);
  }

  // Cargar todos los componentes de la página
  async loadAllComponents() {
    const components = [
      { name: "header", containerId: "header-container" },
      { name: "features", containerId: "features-container" },
      { name: "why-phi", containerId: "why-phi-container" },
      { name: "roi-calculator", containerId: "roi-calculator-container" },
      { name: "testimonials", containerId: "testimonials-container" },
      { name: "guarantee", containerId: "guarantee-container" },
      { name: "faq", containerId: "faq-container" },
      { name: "cta", containerId: "cta-container" },
      { name: "footer", containerId: "footer-container" },
    ];

    try {
      await this.loadComponents(components);
      console.log("✅ Todos los componentes cargados exitosamente");

      // Disparar evento cuando todos los componentes están cargados
      document.dispatchEvent(new CustomEvent("allComponentsLoaded"));
    } catch (error) {
      console.error("❌ Error cargando componentes:", error);
    }
  }

  // Método para recargar un componente específico
  async reloadComponent(name, containerId) {
    console.log(`🔄 Recargando componente: ${name}`);
    return this.loadComponent(name, containerId);
  }
}

// Inicializar el cargador de componentes
const componentLoader = new ComponentLoader();

// Cargar componentes cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Iniciando carga de componentes...");
  componentLoader.loadAllComponents();
});

// Evento cuando todos los componentes están cargados
document.addEventListener("allComponentsLoaded", () => {
  console.log("🎉 Página completamente cargada");

  // Aquí puedes agregar cualquier lógica adicional que necesite ejecutarse
  // después de que todos los componentes estén cargados

  // Por ejemplo, inicializar animaciones, eventos, etc.
  initializeAnimations();
  initializeEventListeners();
});

// Función para inicializar animaciones
function initializeAnimations() {
  // Animaciones de entrada para los componentes
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observar todos los contenedores de componentes
  document.querySelectorAll('[id$="-container"]').forEach((container) => {
    container.style.opacity = "0";
    container.style.transform = "translateY(20px)";
    container.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(container);
  });
}

// Función para inicializar event listeners
function initializeEventListeners() {
  // Event listeners para botones CTA
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("cta-button")) {
      console.log("🎯 Botón CTA clickeado:", e.target.textContent);
      // Aquí puedes agregar lógica para manejar los clicks de los botones
    }
  });

  // Event listeners para hover effects
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(".shadow-neo")) {
      e.target.closest(".shadow-neo").classList.add("hover:shadow-neo-hover");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(".shadow-neo")) {
      e.target
        .closest(".shadow-neo")
        .classList.remove("hover:shadow-neo-hover");
    }
  });
}

// Exportar para uso global
window.ComponentLoader = ComponentLoader;
window.componentLoader = componentLoader;
