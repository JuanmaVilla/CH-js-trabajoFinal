const detalle_Evento = JSON.parse(localStorage.getItem("ver-mas-evento"));

const evento_mostrado = [detalle_Evento];

const seccion_Evento = document.querySelector("#evento_Compra");
const botones_Compra = document.querySelector("#botones_Compra");
const botones_Compra_abajo = document.querySelector("#boton_Comprar_abajo");
const contenedor = document.querySelector("#contenedor");

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

    cargar_Compra_Evento();
    setTimeout(()=>{
        acutualizarBotonComprar();
    },1000)

}

cargar_Evento();

let boton_desplegar = document.querySelectorAll(".boton_Comprar");

function acutualizarBotonComprar(){
    boton_desplegar= document.querySelectorAll(".boton_Comprar");

    boton_desplegar.forEach(boton => {
        boton.addEventListener("click", desplegar_Compra);
    })

}

function desplegar_Compra(){
    console.log("ESTOYYYY")
        botones_Compra.classList.add("disabled");
        contenedor.classList.remove("disabled");
        botones_Compra_abajo.classList.remove("disabled");
}

function cargar_Compra_Evento(){
    if(evento_mostrado && evento_mostrado.length > 0){
        contenedor.innerHTML = '';
    
        evento_mostrado.forEach(evento => {
            const div = document.createElement("div");
            div.classList.add("Detalles_Compra");
            div.innerHTML = `
            <div class="Evento_Fav">
            <img class="Imagen_Evento_Favoritos" src="${evento.imagen}" alt="${evento.titulo}">
            <div class="Titulo_Evento_Favoritos">
               <small>Titulo</small>
               <h3>${evento.titulo}</h3>
           </div>
           <div class="Fecha_Evento_Favoritos">
               <small>Desde el</small>
               <h3>${evento.fecha}</h3>
               <small>hasta el</small>
               <h3>${evento.fecha}</h3>
           </div>
           <div class="Precio_Evento_Favoritos">
               <small>Precio</small>
               <h3>$${evento.precio}</h3>
            </div>
            <div class="Cantidad_Evento">
                <small>Cantidad</small>
                <h3>1</h3>
            </div>
           <button id="${evento.id}" class="Comprar_Mas_Evento"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
          </svg>
          <button id="${evento.id}" class="Comprar_Mas_Evento"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
          </svg>
           </button>
        </div>  

            `
        contenedor.append(div);
            
        });
    }
}