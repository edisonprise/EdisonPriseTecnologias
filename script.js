// 1. Datos estáticos de EdisonPrise Tecnologias
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

// 2. Función para renderizar la información básica
function cargarInfoEmpresa() {
  const titulo = document.getElementById("titulo-principal");
  if (titulo) titulo.innerText = empresaInfo.nombre;

  const contenedor = document.getElementById("contenedor-servicios");
  if (contenedor) {
    contenedor.innerHTML = ""; // Limpiamos por si acaso
    empresaInfo.servicios.forEach((servicio) => {
      const div = document.createElement("div");
      div.className = "tarjeta-servicio";
      div.innerHTML = `<h3>${servicio.title}</h3><p>${servicio.desc}</p>`;
      contenedor.appendChild(div);
    });
  }
}

// 3. Función asíncrona para proyectos y gráficas
async function cargarDatosDinamicos() {
  try {
    const respuesta = await fetch("proyectos.json");
    if (!respuesta.ok) throw new Error("No se pudo cargar el JSON");

    const datos = await respuesta.json();
    renderizarProyectos(datos);
    crearGrafica(datos);
  } catch (error) {
    console.error("Error en la carga dinámica:", error);
  }
}

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
            </div>
        `,
      )
      .join("");
  }
}

function crearGrafica(proyectos) {
  const canvas = document.getElementById("graficaDesempeno");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: proyectos.map((p) => p.nombre),
      datasets: [
        {
          label: "% de Optimización Lograda",
          data: proyectos.map((p) => p.metrica),
          backgroundColor: ["#1a2a6c", "#b21f1f", "#fdbb2d"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
      },
    },
  });
}

// LA SOLUCIÓN AL CONFLICTO:
// Escuchamos cuando el DOM esté listo y disparamos ambas funciones
document.addEventListener("DOMContentLoaded", () => {
  cargarInfoEmpresa();
  cargarDatosDinamicos();
});
