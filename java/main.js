const contenedorEventos = document.querySelector(".contenedor-eventos");
let eventos = [];
console.log("Contenido inicial de eventos-en-favoritos:", localStorage.getItem("eventos-en-favoritos"));

// Inicializar favoritos desde el localStorage
let eventosFavoritos = JSON.parse(localStorage.getItem("eventos-en-favoritos")) || [];

// Obtener eventos del JSON
async function obtenerEventos() {
    try {
        const response = await fetch('./JSON/eventosfinal.json');
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de eventos');
        }
        const data = await response.json();
        eventos = data.eventos || [];
        cargarEventos(eventos);
    } catch (error) {
        console.error('Error al obtener eventos:', error.message);
        alert("No se pudieron cargar los eventos. Por favor, intenta más tarde.");
    }
}

// Cargar eventos dinámicamente
function cargarEventos(eventos) {
    contenedorEventos.innerHTML = ""; // Limpia el contenedor antes de cargar nuevos eventos
    eventos.forEach(evento => {
        let div = document.createElement("div");
        div.classList.add("evento");

        // Verificar si el evento ya está en favoritos
        const estaEnFavoritos = eventosFavoritos.some(e => e.id === evento.id);

        div.innerHTML = `
            <img class="Imagen_Evento" src="${evento.imagenPrincipal}" alt="${evento.titulo}">
            <div class="Detalles_Evento">
                <div class="Titulo_Con_Favorito">
                    <h2 class="Titulo_Evento">${evento.titulo}</h2>
                    <button type="button" class="boton_AgregarFavoritos" id="${evento.id}" data-favorito="${estaEnFavoritos}">
                        <span class="icono-favorito ${estaEnFavoritos ? 'favorito' : ''}">❤</span>
                    </button>
                </div>
                <h3 class="Fecha_Evento">${evento.fechaInicio}</h3>
                <h4 class="Descripcion_Evento">${evento.descripcion}</h4>
                <button type="button" class="btn btn-outline-dark boton_Evento" id="${evento.id}">Ver más</button>
                <button type="button" class="btn btn-primary boton_Comprar" id="${evento.id}">Comprar</button>
            </div>
        `;
        contenedorEventos.append(div);
    });
    actualizarBotonFavoritos();
    actualizarBotonComprar();
    actualizarBotonEvento();
}

// Actualizar botones de favoritos
function actualizarBotonFavoritos() {
    const botonesFavoritos = document.querySelectorAll(".boton_AgregarFavoritos");

    botonesFavoritos.forEach(boton => {
        boton.addEventListener("click", (evento) => {
            const idBoton = evento.currentTarget.id;
            const estaEnFavoritos = boton.dataset.favorito === "true";

            if (estaEnFavoritos) {
                const confirmar = confirm("¿Seguro que quieres quitar este evento de tus favoritos?");
                if (confirmar) {
                    quitarDeFavoritos(idBoton);
                    boton.dataset.favorito = "false";
                    boton.querySelector(".icono-favorito").classList.remove("favorito");
                }
            } else {
                agregar_aFavoritos(idBoton);
                boton.dataset.favorito = "true";
                boton.querySelector(".icono-favorito").classList.add("favorito");
            }
        });
    });
}

// Agregar a favoritos
function agregar_aFavoritos(idEvento) {
    const eventoFavorito = eventos.find(e => e.id === idEvento);
    if (!eventoFavorito) return;

    eventosFavoritos.push(eventoFavorito);
    localStorage.setItem("eventos-en-favoritos", JSON.stringify(eventosFavoritos));
    console.log("Evento agregado a favoritos:", eventoFavorito);
}

// Quitar de favoritos
function quitarDeFavoritos(idEvento) {
    eventosFavoritos = eventosFavoritos.filter(e => e.id !== idEvento);
    localStorage.setItem("eventos-en-favoritos", JSON.stringify(eventosFavoritos));
    console.log("Evento eliminado de favoritos:", idEvento);
}

// Actualizar botón de comprar
function actualizarBotonComprar() {
    const botonesComprar = document.querySelectorAll(".boton_Comprar");

    botonesComprar.forEach(boton => {
        boton.addEventListener("click", (evento) => {
            const idBoton = evento.currentTarget.id;
            const eventoSeleccionado = eventos.find(e => e.id === idBoton);

            if (eventoSeleccionado) {
                localStorage.setItem("ver-mas-evento", JSON.stringify(eventoSeleccionado));
                window.location.href = `./detalle_evento.html#botones_Compra`; // Redirige a la sección "comprar"
            }
        });
    });
}

// Actualizar botón "Ver más"
function actualizarBotonEvento() {
    const botonesVerEvento = document.querySelectorAll(".boton_Evento");

    botonesVerEvento.forEach(boton => {
        boton.addEventListener("click", (evento) => {
            const idBoton = evento.currentTarget.id;
            const eventoSeleccionado = eventos.find(e => e.id === idBoton);

            if (eventoSeleccionado) {
                localStorage.setItem("ver-mas-evento", JSON.stringify(eventoSeleccionado));
                window.location.href = `./detalle_evento.html`;
            }
        });
    });
}

// Inicializar
obtenerEventos();