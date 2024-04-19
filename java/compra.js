const detalle_Evento = JSON.parse(localStorage.getItem("ver-mas-evento"));

const evento_mostrado = [detalle_Evento];

const seccion_Evento = document.querySelector("#evento_Compra");
const botones_Compra = document.querySelector("#botones_Compra");

function cargar_Evento(){
    if(evento_mostrado && evento_mostrado.length > 0){
    seccion_Evento.innerHTML = '';
    
        evento_mostrado.forEach(evento => {
            const div = document.createElement("div");
            div.classList.add("Detalles");
            div.innerHTML = `
             
    <h1 class="Nombre_evento">${evento.titulo}</h1>
        
    <div class="fechas_Evento_Compra">
        <h4 class="Fecha_desde">Desde el ${evento.fecha}</h4>
    <h4 class="Fecha_hasta">Hasta el ${evento.fecha}</h4>
    </div>
    

    <div>
        <img class="imagen_primaria_evento Imagen_Evento" src="${evento.imagen}" alt="${evento.titulo}">
        <div>
            <h2 class="Subtitulo_paginaCompra">Información del Evento</h2>
            <p class="info_evento">${evento.descripción}</p>
        </div>
        
        <img class="imagen_secundaria_evento Imagen_Evento" src="${evento.imagen}" alt="${evento.titulo}">

        <div class="Precios">
            <h2 class="Subtitulo_paginaCompra">Precio</h2>
            <h4 class="precio1 precio">Por entrada: $${evento.precio},00</h4>
        </div>

    </div>
            `
        seccion_Evento.append(div);
            
        });
    }
}

cargar_Evento();