const detalle_Evento = JSON.parse(localStorage.getItem("ver-mas-evento"));

const evento_mostrado = [detalle_Evento];

const seccion_Evento = document.querySelector("#evento_Compra");
const contenedor = document.querySelector("#contenedor");
const mensaje = document.querySelector("#mensaje_Compra");
const pagina = document.querySelector("#pagina_Detalle_Evento");

function cargar_Evento() {
    if (evento_mostrado && evento_mostrado.length > 0) {
        seccion_Evento.innerHTML = '';

        evento_mostrado.forEach(evento => {
            const div = document.createElement("div");
            div.classList.add("Detalles");
            div.innerHTML = `
                <h1 class="Nombre_evento">${evento.titulo}</h1>
                
                <div class="fechas_Evento_Compra">
                    <h4 class="Fecha_desde">Desde el ${evento.fechaInicio}</h4>
                    <h4 class="Fecha_hasta">Hasta el ${evento.fechaFin}</h4>
                </div>
                
                <div class="contenido_Evento">
                    <img class="imagen_primaria_evento Imagen_Evento" src="${evento.imagenPrincipal}" alt="${evento.titulo}">
                    
                    <div>
                        <h2 class="Subtitulo_paginaCompra">Información del Evento</h2>
                        <p class="info_evento">${evento.descripcion}</p>
                    </div>
                    
                    <img class="imagen_secundaria_evento Imagen_Evento" src="${evento.imagenSecundaria}" alt="${evento.titulo}">
                </div>

                 </div>
                    <p class="info_evento">${evento.informacion}</p>
                <div>
                
                <div class="Precios">
                    <h2 class="Subtitulo_paginaCompra">Precio</h2>
                    <h4 class="precio1 precio">Por entrada: $${evento.precios},00</h4>
                </div>
            `;
            seccion_Evento.append(div);
        });
    } else {
        seccion_Evento.innerHTML = `
            <div class="evento_vacio">
                <h1 class="Nombre_evento">Vuelve a la página de Eventos</h1>
            </div>
        `;
    }

    cargar_Compra_Evento();
    setTimeout(() => {
        acutualizarBotonComprar();
    }, 1000);
}

let boton_desplegar = document.querySelectorAll(".boton_Comprar");

function acutualizarBotonComprar(){
    boton_desplegar= document.querySelectorAll(".boton_Comprar");

    boton_desplegar.forEach(boton => {
        boton.addEventListener("click", desplegar_Compra);
    })
}


function desplegar_Compra() {
    botones_Compra.classList.add("disabled");
    contenedor.classList.remove("disabled");
    cargar_Compra_Evento();
}

function cargar_Compra_Evento() {
    if (evento_mostrado && evento_mostrado.length > 0) {
        contenedor.innerHTML = '';

        evento_mostrado.forEach(evento => {
            const div = document.createElement("div");
            div.classList.add("Evento_Fav");
            div.innerHTML = `
                <img class="Imagen_Evento_Favoritos" src="${evento.imagenPrincipal}" alt="${evento.titulo}">
                <div class="Titulo_Evento_Favoritos">
                    <small>Título</small>
                    <h3>${evento.titulo}</h3>
                </div>
                <div class="Fecha_Evento_Favoritos">
                    <small>Desde el</small>
                    <h3>${evento.fechaInicio}</h3>
                </div>
                <div class="Fecha_Evento_Favoritos">
                    <small>Hasta el</small>
                    <h3>${evento.fechaFin}</h3>
                </div>
                <div class="Precio_Evento_Favoritos">
                    <small>Precio por entrada</small>
                    <h3>$${evento.precios}</h3>
                </div>
                <div class="Cantidad_Boletos">
                    <label for="cantidad_boletos">Cantidad de boletos:</label>
                    <input type="number" id="cantidad_boletos" class="input-boletos" min="1" value="1">
                </div>
                <button class="btn btn-primary btn-comprar" data-precio="${evento.precios}">Comprar</button>
            `;
            contenedor.append(div);
        });

        const botonesComprar = document.querySelectorAll(".btn-comprar");
        botonesComprar.forEach(boton => {
            boton.addEventListener("click", mostrarDetalleCompra);
        });
    }
}

function mostrarDetalleCompra(evento) {
    const boton = evento.currentTarget;
    const precioPorEntrada = parseFloat(boton.dataset.precio);
    const inputCantidad = boton.parentElement.querySelector(".input-boletos");
    const cantidad = parseInt(inputCantidad.value);

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, selecciona una cantidad válida de boletos.");
        return;
    }

    const precioTotal = precioPorEntrada * cantidad;

    // Mostrar el detalle de la compra
    contenedor.innerHTML = `
        <div class="detalle-compra">
            <h2>Detalle de tu compra</h2>
            <p><strong>Evento:</strong> ${evento_mostrado[0].titulo}</p>
            <p><strong>Cantidad de boletos:</strong> ${cantidad}</p>
            <p><strong>Precio total:</strong> $${precioTotal}</p>
            <button class="btn btn-primary" id="confirmar-compra">Confirmar compra</button>
            <button class="btn btn-secondary" id="cancelar-compra">Cancelar</button>
        </div>`;
    
    // Botón para confirmar la compra
    document.querySelector("#confirmar-compra").addEventListener("click", () => {
        Swal.fire({
            title: '¡Compra Confirmada! 🎉',
            html: `
                <p>¡Gracias por tu compra!</p>
                <p>Pronto recibirás tus entradas en tu correo.</p>
            `,
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido! 😊',
            timer: 5000,
            timerProgressBar: true,
            background: '#fefefe',
            color: '#333',
            backdrop: `
                rgba(0,0,123,0.4)
                url("https://media.giphy.com/media/3o7aD4pj9y1Nkebq8k/giphy.gif")
                left top
                no-repeat
            `
        }).then(() => {
            // Redirigir o actualizar la página después de la alerta
            pagina.innerHTML = `
                <div class="mensaje-compra">
                    <h1>¡Gracias por su compra! 😊</h1>
                    <p>Le llegará próximamente su entrada.</p>
                </div>
            `;
        });
    });

    // Botón para cancelar la compra
    document.querySelector("#cancelar-compra").addEventListener("click", cargar_Evento);
}

// Obtener el botón "Añadir a favoritos"
const botonFavoritos = document.querySelector(".boton_AgregarFavoritos");

// Función para cargar o inicializar favoritos en localStorage
function obtenerFavoritos() {
    const favoritos = localStorage.getItem("eventos-en-favoritos");
    return favoritos ? JSON.parse(favoritos) : []; // Si no existe, devolvemos un array vacío
}

// Función para guardar los favoritos en localStorage
function guardarFavoritos(favoritos) {
    localStorage.setItem("eventos-en-favoritos", JSON.stringify(favoritos));
}

// Función para añadir a favoritos
function añadirAFavoritos() {
    const favoritos = obtenerFavoritos();

    // Verificar si el evento ya está en favoritos
    const existe = favoritos.some(fav => fav.titulo === detalle_Evento.titulo);

    if (existe) {
        // Mostrar mensaje de que ya está en favoritos
        alert("Este evento ya está en tus favoritos.");
    } else {
        // Añadir evento a favoritos y guardar
        favoritos.push(detalle_Evento);
        guardarFavoritos(favoritos);
        alert("Evento añadido a tus favoritos.");
    }
}

// Asignar evento click al botón de "Añadir a favoritos"
if (botonFavoritos) {
    botonFavoritos.addEventListener("click", añadirAFavoritos);
}

cargar_Evento();