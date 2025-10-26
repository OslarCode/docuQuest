# 🧪 Proyecto práctico: Galería Masonry Pro avanzada con Flexbox + Filtros

### 📂 Estructura recomendada del proyecto

```
/masonry-gallery/
├── index.html
├── styles.css
├── script.js

```

## 🔧 index.html

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Galería Masonry con Flexbox</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>

  <header>
    <h1>🌄 Galería Masonry Flex</h1>
    <nav class="filters">
      <button data-filter="all" class="active">Todas</button>
      <button data-filter="naturaleza">Naturaleza</button>
      <button data-filter="arquitectura">Arquitectura</button>
    </nav>
  </header>

  <section class="gallery" id="gallery">
    <div class="gallery-item naturaleza">
      <img src="https://source.unsplash.com/400x300?nature" alt="Paisaje natural">
    </div>
    <div class="gallery-item arquitectura">
      <img src="https://source.unsplash.com/400x450?building" alt="Edificio moderno">
    </div>
    <div class="gallery-item naturaleza">
      <img src="https://source.unsplash.com/400x500?forest" alt="Bosque">
    </div>
    <div class="gallery-item arquitectura">
      <img src="https://source.unsplash.com/400x350?architecture" alt="Arquitectura clásica">
    </div>
    <div class="gallery-item naturaleza">
      <img src="https://source.unsplash.com/400x600?mountain" alt="Montaña">
    </div>
    <div class="gallery-item arquitectura">
      <img src="https://source.unsplash.com/400x400?city" alt="Ciudad">
    </div>
  </section>

  <script src="script.js"></script>
</body>
</html>

```

## 🎨 styles.css

```css
/* Reset */
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(120deg, #e0eafc, #cfdef3);
  padding: 20px;
}

/* Título */
header h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #222;
}

/* Botones de filtro */
.filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}
.filters button {
  background: #444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}
.filters button:hover,
.filters button.active {
  background: #ff5722;
}

/* Galería con Flexbox */
.gallery {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  gap: 20px;
}

/* Item flexible con base fija */
.gallery-item {
  flex: 1 1 300px;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.3s ease;
}
.gallery-item:hover {
  transform: scale(1.02);
}

.gallery-item img {
  width: 100%;
  height: auto;
  display: block;
}

/* Responsive */
@media (max-width: 600px) {
  .gallery-item {
    flex: 1 1 100%;
  }
}

```

## 🧠 script.js

```jsx
// 🎯 Filtrar imágenes según la categoría
const buttons = document.querySelectorAll(".filters button");
const items = document.querySelectorAll(".gallery-item");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    // Marcar botón activo
    buttons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    items.forEach(item => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

```

## ✅ Qué estás practicando

| Concepto de Flexbox | Aplicación técnica |
| --- | --- |
| `flex-flow: row wrap` | Estructura de columnas y filas dinámicas |
| `flex: 1 1 300px` | Tamaño mínimo base + crecimiento controlado |
| `justify-content: space-between` | Distribución horizontal de los elementos |
| `gap` | Separación entre tarjetas |
| `media queries` | Comportamiento responsivo completo |
| `transition + transform` | Animación suave al hacer hover |
| Accesibilidad (`alt`, semántica) | Mejora para screen readers |
| JavaScript + dataset | Filtro de tarjetas por categoría |