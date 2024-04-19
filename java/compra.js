const detalle_Evento = JSON.parse(localStorage.getItem("ver-mas-evento"));

const evento_mostrado = [detalle_Evento];

const seccion_Evento = document.querySelector("#evento_Compra");
const botones_Compra = document.querySelector("#botones_Compra");
const botones_Compra_abajo = document.querySelector("#boton_Comprar_abajo");
const contenedor = document.querySelector("#contenedor");
const boton_Compra_Final = document.querySelector("#Compra_Final");
const mensaje = document.querySelector("#mensaje_Compra");
const pagina = document.querySelector("#pagina_Detalle_Evento");

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
    } else if(evento_mostrado.length == 0){
        seccion_Evento.innerHTML = '';
    
        evento_mostrado.forEach(evento => {
            const div = document.createElement("div");
            div.classList.add("Detalles");
            div.innerHTML = `
             
    <h1 class="Nombre_evento">Vuelve a la página de Eventos</h1>

            `
        seccion_Evento.append(div);
            
        });
    }

    cargar_Compra_Evento();
    setTimeout(()=>{
        acutualizarBotonComprar();
    },1000)

}



let boton_desplegar = document.querySelectorAll(".boton_Comprar");

function acutualizarBotonComprar(){
    boton_desplegar= document.querySelectorAll(".boton_Comprar");

    boton_desplegar.forEach(boton => {
        boton.addEventListener("click", desplegar_Compra);
    })

}

function desplegar_Compra(){
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
           </div>
           <div class="Fecha_Evento_Favoritos">
               <small>hasta el</small>
               <h3>${evento.fecha}</h3>
           </div>
           
           <div class="Precio_Evento_Favoritos">
               <small>Precio</small>
               <h3>$${evento.precio}</h3>
            </div>

        </div>  

            `
        contenedor.append(div);
            
        });
    }
}

boton_Compra_Final.addEventListener("click", compraFinal);



function compraFinal(){
    evento_mostrado.length = 0;
    localStorage.setItem("ver-mas-evento", JSON.stringify(evento_mostrado));
    pagina.classList.add("disabled");
    mensaje.classList.remove("disabled");
}

cargar_Evento();