/**
 * EdisonPrise Tecnologias - Script Principal
 * Combina Gestión de Marca, Carga de Datos y Visualización
 */

// 1. Datos estáticos de la empresa
const empresaInfo = {
  nombre: "EdisonPrise Tecnologias",
  servicios: [
    {
      title: "Desarrollo Web",
      desc: "Sitios rápidos y optimizados con tecnología moderna.",
    },
    {
      title: "Análisis de Datos",
      desc: "Convertimos números en decisiones estratégicas.",
    },
  ],
};

// 2. Función para renderizar la información básica de la empresa
function cargarInfoEmpresa() {
  const titulo = document.getElementById("titulo-principal");
  if (titulo) titulo.innerText = empresaInfo.nombre;

  const contenedor = document.getElementById("contenedor-servicios");
  if (contenedor) {
    contenedor.innerHTML = ""; // Limpieza inicial
    empresaInfo.servicios.forEach((servicio) => {
      const div = document.createElement("div");
      div.className = "tarjeta-servicio";
      div.innerHTML = `<h3>${servicio.title}</h3><p>${servicio.desc}</p>`;
      contenedor.appendChild(div);
    });
  }
}

// 3. Función asíncrona para obtener proyectos desde el JSON (Nuestro "Servidor")
async function cargarDatosDinamicos() {
  try {
    const respuesta = await fetch("proyectos.json");
    if (!respuesta.ok)
      throw new Error("No se pudo cargar el archivo de datos JSON");

    const datos = await respuesta.json();

    // Ejecutamos las funciones que dependen de los datos recibidos
    renderizarProyectos(datos);
    crearGrafica(datos);
  } catch (error) {
    console.error("Error en el pipeline de datos:", error);
    const lista = document.getElementById("lista-proyectos");
    if (lista)
      lista.innerHTML =
        "<p>Error al cargar proyectos. Verifica el archivo JSON.</p>";
  }
}

// 4. Renderiza las tarjetas de proyectos en el HTML
function renderizarProyectos(proyectos) {
  const lista = document.getElementById("lista-proyectos");
  if (lista) {
    lista.innerHTML = proyectos
      .map(
        (p) => `
            <div class="proyecto-card" style="cursor:pointer" onclick="alert('Detalles de: ${p.nombre}')">
                <h3>${p.nombre}</h3>
                <p><strong>Tech:</strong> ${p.tecnologia}</p>
                <p>${p.descripcion}</p>
                <small>Métrica de éxito: ${p.metrica}%</small>
            </div>
        `,
      )
      .join("");
  }
}

// 5. Motor de visualización de datos (Chart.js)
function crearGrafica(proyectos) {
  const canvas = document.getElementById("graficaDesempeno");
  if (!canvas) return;

  // Limpieza: Si ya existe una gráfica, la destruimos antes de crear la nueva
  let chartStatus = Chart.getChart("graficaDesempeno");
  if (chartStatus !== undefined) {
    chartStatus.destroy();
  }

  const ctx = canvas.getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: proyectos.map((p) => p.nombre),
      datasets: [
        {
          label: "% de Optimización Lograda",
          data: proyectos.map((p) => p.metrica),
          // Colores corporativos de EdisonPrise
          backgroundColor: ["#1a2a6c", "#b21f1f", "#fdbb2d", "#2ecc71"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Permite que el contenedor CSS controle la altura
      scales: {
        y: {
          beginAtZero: true,
          max: 100, // Escala de 0 a 100 para porcentajes
          title: {
            display: true,
            text: "Porcentaje (%)",
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "bottom",
        },
      },
    },
  });
}

// 6. Inicialización al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  cargarInfoEmpresa();
  cargarDatosDinamicos();
});
