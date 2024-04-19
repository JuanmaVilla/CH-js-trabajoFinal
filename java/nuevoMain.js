const contenedorEventos = document.querySelector("#contenedor-eventos");
let boton_agregarFavoritos = document.querySelectorAll(".boton_AgregarFavoritos");
let boton_verEvento = document.querySelectorAll(".boton_Evento");
let eventos=[];

async function obtenerEventos() {
    try {
      const response = await fetch('./JSON/eventos.json'); 
      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de eventos');
      }
      let data = await response.json();
      eventos = data.eventos;
      cargarEventos(eventos);
    
    } catch (error) {
      console.error('Error al obtener los eventos:', error.message);
      return []; // En caso de error, devuelve una lista vacía.
    }
  }
  



function cargarEventos(eventos) {
    eventos.forEach(evento => {
        let div = document.createElement("div");
        div.classList.add("evento");
        div.innerHTML = `
        <img class="Imagen_Evento" src="${evento.imagenPrincipal}" alt="${evento.titulo}">

        <div class="Detalles_Evento">

            <h2 class="Titulo_Evento">${evento.titulo}</h2>
            <h3 class="Fecha_Evento">${evento.fechaInicio}</h3>
            <h4 class="Descripcion_Evento">${evento.descripcion}</h4>
            <button type="button" class="btn btn-outline-dark boton_Evento" id="${evento.id}">Ver mas</button>
            <button type="button" class="btn btn-outline-dark boton_AgregarFavoritos" id="${evento.id}">Agregar a favoritos <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
          </svg></button>
     
        `;
        contenedorEventos.append(div);
    })

    acutualizarBotonFavoritos();
    acutualizarBotonEvento();

}

obtenerEventos();


function vaciar_verEvento(){
    verEvento.length = 0;
    localStorage.setItem("eventos-mas-evento", JSON.stringify(verEvento));
    console.log(verEvento);
}

function acutualizarBotonFavoritos(){
    boton_agregarFavoritos = document.querySelectorAll(".boton_AgregarFavoritos");

    boton_agregarFavoritos.forEach(boton => {
        boton.addEventListener("click", agregar_aFavoritos);
    })

}

let eventosFavoritos;
const eventos_FavoritosLS = localStorage.getItem("eventos-en-favoritos");

if(eventos_FavoritosLS){
    eventosFavoritos = JSON.parse(eventos_FavoritosLS);
}else{
    eventosFavoritos=[];
}


function agregar_aFavoritos(evento){
    const idBoton = evento.currentTarget.id; 
    const eventoFavorito = eventos.find(evento => evento.id === idBoton);

    if(eventosFavoritos.some(evento => evento.id === idBoton)){
        alert("Ya tienes ese evento en tu lista de Favoritos :)");  //Modificar luego para que el color del corazón cambie, no logre hacerlo ahora, por eso puse el alert (se que no habia que poner alert, pero es para guiar un poco al usuario)
    }else{
        eventosFavoritos.push(eventoFavorito);
    }
    console.log(eventosFavoritos);
    localStorage.setItem("eventos-en-favoritos", JSON.stringify(eventosFavoritos));
    
}

function acutualizarBotonEvento(){
    boton_verEvento = document.querySelectorAll(".boton_Evento");

    boton_verEvento.forEach(boton => {
        boton.addEventListener("click", agregar_aVerEvento);
    })

}

let verEvento;
const ver_EventoLS = localStorage.getItem("ver-mas-evento"); //

if(ver_EventoLS){
    verEvento = [];
}

console.log(verEvento);

function agregar_aVerEvento(evento){
    const idBoton = evento.currentTarget.id; 
    const verEvento = eventos.find(evento => evento.id === idBoton);

        eventosFavoritos.push(verEvento);

    localStorage.setItem("ver-mas-evento", JSON.stringify(verEvento));
    
    setTimeout(()=>{
        window.location.href = "./detalle_evento.html";
    },500);
    
}



