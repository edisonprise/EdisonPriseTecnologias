/**
 * EdisonPrise Tecnologias - Script Principal
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
    contenedor.innerHTML = "";
    empresaInfo.servicios.forEach((servicio) => {
      const div = document.createElement("div");
      div.className = "tarjeta-servicio";
      div.innerHTML = `<h3>${servicio.title}</h3><p>${servicio.desc}</p>`;
      contenedor.appendChild(div);
    });
  }
}

// 3. Función asíncrona para obtener proyectos desde el JSON
async function cargarDatosDinamicos() {
  try {
    const respuesta = await fetch("proyectos.json");
    if (!respuesta.ok) throw new Error("No se pudo cargar el archivo JSON");

    const datos = await respuesta.json();
    renderizarProyectos(datos);
    crearGrafica(datos);
  } catch (error) {
    console.error("Error en el pipeline de datos:", error);
    const lista = document.getElementById("lista-proyectos");
    if (lista) lista.innerHTML = "<p>Error al cargar proyectos.</p>";
  }
}

// 4. Renderiza las tarjetas de proyectos
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

// 5. Motor de visualización (Chart.js)
function crearGrafica(proyectos) {
  const canvas = document.getElementById("graficaDesempeno");
  if (!canvas) return;

  let chartStatus = Chart.getChart("graficaDesempeno");
  if (chartStatus) chartStatus.destroy();

  const ctx = canvas.getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: proyectos.map((p) => p.nombre),
      datasets: [
        {
          label: "% de Optimización Lograda",
          data: proyectos.map((p) => p.metrica),
          backgroundColor: ["#1a2a6c", "#b21f1f", "#fdbb2d", "#2ecc71"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, max: 100 } },
    },
  });
}

// 6. Inicialización unificada
document.addEventListener("DOMContentLoaded", () => {
  cargarInfoEmpresa();
  cargarDatosDinamicos();

  // Gestión del Formulario
  // Dentro de document.addEventListener("DOMContentLoaded", () => { ...

  const formulario = document.getElementById("survey-form");
  if (formulario) {
    formulario.addEventListener("submit", async (evento) => {
      evento.preventDefault(); // Detenemos la recarga automática

      const data = new FormData(formulario);

      // Enviamos los datos de forma asíncrona a Formspree
      const response = await fetch(formulario.action, {
        method: formulario.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        alert("¡Gracias! Tus datos se han grabado en Formspree.");
        formulario.reset(); // Ahora sí se limpia la información tras el éxito
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert("Hubo un error al enviar el formulario. Intenta de nuevo.");
      }
    });
  }
});
