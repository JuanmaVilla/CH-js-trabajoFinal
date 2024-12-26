const eventos_Favoritos = JSON.parse(localStorage.getItem("eventos-en-favoritos"));
console.log(eventos_Favoritos);

const favoritosVacio = document.querySelector("#favoritosVacio");
const contenedorFavotitos = document.querySelector("#contenedorFavoritos");
const accionesFavoritos = document.querySelector("#accionesFavoritos");
let botonesFavoritos_Eliminar = document.querySelectorAll(".Eliminar_Evento_Favoritos");
const vaciarFavoritos = document.querySelector("#vaciarFavoritos");

function cargar_EventosFavoritos(){
    if(eventos_Favoritos && eventos_Favoritos.length > 0){
        favoritosVacio.classList.add("disabled");
        contenedorFavotitos.classList.remove("disabled");
        accionesFavoritos.classList.remove("disabled");

        contenedorFavotitos.innerHTML = ``;
    
        eventos_Favoritos.forEach(evento => {
            const div = document.createElement("div");
            div.classList.add("Evento_Fav");
            div.innerHTML = `
            <img class="Imagen_Evento_Favoritos" src="${evento.imagenPrincipal}" alt="${evento.titulo}">
            <div class="Titulo_Evento_Favoritos">
               <small>Titulo</small>
               <h3>${evento.titulo}</h3>
           </div>
           <div class="Fecha_Evento_Favoritos">
               <small>Desde</small>
               <h3>${evento.fechaInicio}</h3>
           </div>
           <div class="Fecha_Evento_Favoritos">
               <small>Hasta</small>
               <h3>${evento.fechaFin}</h3>
           </div>
           <div class="Precio_Evento_Favoritos">
               <small>Precio</small>
               <h3>$${evento.precios}</h3>
            </div>
            
           <button id="${evento.id}" class="Eliminar_Evento_Favoritos"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
               <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
               </svg>
           </button>
            `
            contenedorFavotitos.append(div);
            
        });
        
    }else{
        favoritosVacio.classList.remove("disabled");
        contenedorFavotitos.classList.add("disabled");
        accionesFavoritos.classList.add("disabled");
    
    }

    acutualizarBoton_EliminardeFavoritos();
}

cargar_EventosFavoritos();

function acutualizarBoton_EliminardeFavoritos(){
    botonesFavoritos_Eliminar = document.querySelectorAll(".Eliminar_Evento_Favoritos");

    botonesFavoritos_Eliminar.forEach(boton => {
        boton.addEventListener("click", eliminar_deFavoritos);
    })

}

function eliminar_deFavoritos(evento){
    const boton_id = evento.currentTarget.id;
    const index = eventos_Favoritos.findIndex(evento => evento.id === boton_id);
    eventos_Favoritos.splice(index,1);

    cargar_EventosFavoritos();

    localStorage.setItem("eventos-en-favoritos", JSON.stringify(eventos_Favoritos));
    
}

vaciarFavoritos.addEventListener("click", vaciar_Favoritos);

function vaciar_Favoritos(){
    eventos_Favoritos.length = 0;
    localStorage.setItem("eventos-en-favoritos", JSON.stringify(eventos_Favoritos));

    cargar_EventosFavoritos();
}