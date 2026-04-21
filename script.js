// 1. Datos de tu empresa (Imagina que esto viene de una base de datos)
const empresaInfo = {
  nombre: "EdisonPrise Tecnologias",
  servicios: [
    { title: "Desarrollo Web", desc: "Sitios rápidos y optimizados." },
    { title: "Análisis de Datos", desc: "Convertimos números en decisiones." },
  ],
  proyectos: [
    { nombre: "Dashboard Financiero", link: "#" },
    { nombre: "E-commerce Optimizado", link: "#" },
  ],
};

// 2. Función para renderizar la página
function cargarPagina() {
  // Cambiar el título
  document.getElementById("titulo-principal").innerText = empresaInfo.nombre;

  // Insertar servicios
  const contenedor = document.getElementById("contenedor-servicios");
  empresaInfo.servicios.forEach((servicio) => {
    const div = document.createElement("div");
    div.className = "tarjeta-servicio";
    div.innerHTML = `<h3>${servicio.title}</h3><p>${servicio.desc}</p>`;
    contenedor.appendChild(div);
  });
}

// Ejecutar al cargar
window.onload = cargarPagina;
