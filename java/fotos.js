// Archivo: fotos.js

const contenedorFotos = document.querySelector(".contenedor-eventos");
let eventos = [];

// Obtener eventos del JSON
async function obtenerEventos() {
    try {
        const response = await fetch('./JSON/eventosfinal.json'); // Asegúrate de que la ruta sea correcta
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de eventos');
        }
        const data = await response.json();

        // Asegúrate de que el formato coincida con la estructura del JSON
        eventos = data.eventos || []; // Accede a la clave "eventos"
        cargarFotos(eventos);
    } catch (error) {
        console.error('Error al obtener eventos:', error.message);
        alert("No se pudieron cargar las fotos de los eventos. Por favor, intenta más tarde.");
    }
}

// Cargar fotos dinámicamente
function cargarFotos(eventos) {
    contenedorFotos.innerHTML = ""; // Limpia el contenedor antes de cargar nuevos eventos
    eventos.forEach(evento => {
        let div = document.createElement("div");
        div.classList.add("evento");
        div.innerHTML = `
            <div class="card shadow-sm">
                <img src="${evento.imagenPrincipal}" class="card-img-top" alt="${evento.titulo}">
                <div class="card-body">
                    <h5 class="card-title text-primary">${evento.titulo}</h5>
                    
                    <img src="${evento.imagenSecundaria}" class="img-fluid mt-3" alt="${evento.titulo}">
                </div>
            </div>
        `;
        contenedorFotos.append(div);
    });
}

// Llama a la función para cargar los eventos al cargar la página
//document.addEventListener('DOMContentLoaded', obtenerEventos);
obtenerEventos();