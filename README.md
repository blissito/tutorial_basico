# Phi-4 Landing Page - Sistema de Componentes

Una landing page moderna para Phi-4 con un sistema de componentes modular sin frameworks.

## 🚀 Características

- **Sistema de Componentes Modular**: HTML dividido en componentes reutilizables
- **Carga Dinámica**: Los componentes se cargan dinámicamente con JavaScript vanilla
- **Animaciones Suaves**: Efectos de entrada y transiciones elegantes
- **Diseño Neo-Brutalist**: Estilo visual distintivo con sombras características
- **Responsive**: Optimizado para todos los dispositivos
- **Sin Frameworks**: Solo HTML, CSS y JavaScript vanilla

## 📁 Estructura del Proyecto

```
yutu/
├── index.html              # Página principal
├── components.js           # Sistema de carga de componentes
├── main.js                 # Script principal
├── server.js               # Servidor Bun
├── components/             # Carpeta de componentes
│   ├── header.html         # Header con logo y título
│   ├── features.html       # Características principales
│   ├── why-phi.html        # Sección "¿Por qué Phi-4?"
│   ├── testimonials.html   # Testimonios de usuarios
│   ├── guarantee.html      # Garantía de satisfacción
│   ├── cta.html           # Call-to-action final
│   └── footer.html        # Footer
├── package.json
├── Dockerfile
└── fly.toml
```

## 🛠️ Sistema de Componentes

### Cómo Funciona

1. **Carga Inicial**: El archivo `index.html` contiene solo la estructura básica y contenedores
2. **Carga Dinámica**: `components.js` carga cada componente desde archivos HTML separados
3. **Animaciones**: Los componentes aparecen con animaciones de fade-in
4. **Eventos**: Sistema de eventos para manejar la carga y interacciones

### Componentes Disponibles

- **Header**: Logo, título principal y descripción
- **Features**: 4 características principales de Phi-4
- **Why Phi**: Sección explicativa sobre los beneficios
- **Testimonials**: 6 testimonios de diferentes industrias
- **Guarantee**: Garantía de satisfacción
- **CTA**: Call-to-action final con botones
- **Footer**: Información de copyright

### Agregar Nuevos Componentes

1. Crear archivo HTML en `components/nuevo-componente.html`
2. Agregar el componente a la lista en `components.js`:

```javascript
const components = [
  // ... componentes existentes
  { name: "nuevo-componente", containerId: "nuevo-componente-container" },
];
```

3. Agregar contenedor en `index.html`:

```html
<div id="nuevo-componente-container" class="component-fade-in"></div>
```

## 🎨 Diseño

### Colores

- **Primary**: `#1a1a1a` (Negro)
- **Secondary**: `#4a4a4a` (Gris)
- **Accent**: `#007acc` (Azul)
- **Light**: `#f8f9fa` (Gris claro)
- **Highlight**: `#85ddcb` (Verde agua)

### Sombras Neo-Brutalist

- **Normal**: `8px 8px 0px #1a1a1a`
- **Hover**: `12px 12px 0px #1a1a1a`

### Tipografía

- **Principal**: Inter (Google Fonts)
- **Display**: Poppins (Google Fonts)

## 🚀 Desarrollo

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd yutu

# Instalar dependencias (si las hay)
npm install

# Iniciar servidor de desarrollo
bun run server.js
```

### Comandos Disponibles

```bash
# Iniciar servidor
bun run server.js

# Desarrollo con live-server
bun run dev

# Desplegar en Fly.io
bun run deploy
```

### Estructura de Archivos

- **`index.html`**: Página principal con contenedores de componentes
- **`components.js`**: Sistema de carga dinámica de componentes
- **`main.js`**: Script principal con funcionalidades adicionales
- **`server.js`**: Servidor Bun para desarrollo y producción

## 📱 Responsive Design

La página está optimizada para:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🎯 Funcionalidades

### Animaciones

- Fade-in automático para componentes
- Hover effects en botones y tarjetas
- Transiciones suaves

### Interactividad

- Event listeners para botones CTA
- Hover effects dinámicos
- Loading states

### Performance

- Carga asíncrona de componentes
- Caché de archivos estáticos
- Optimización de imágenes

## 🔧 Personalización

### Modificar Colores

Editar la configuración de Tailwind en `index.html`:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        "fixter-primary": "#tu-color",
        // ... otros colores
      },
    },
  },
};
```

### Agregar Nuevas Secciones

1. Crear componente HTML
2. Agregar a la lista de componentes
3. Agregar contenedor en index.html

## 🚀 Despliegue

### Fly.io

```bash
fly deploy
```

### Otros Servicios

- **Vercel**: Conectar repositorio
- **Netlify**: Drag & drop de archivos
- **GitHub Pages**: Configurar en settings

## 📄 Licencia

MIT License - Desarrollado por Fixter.org

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📞 Contacto

- **Website**: [Fixter.org](https://fixter.org)
- **Email**: contacto@fixter.org
