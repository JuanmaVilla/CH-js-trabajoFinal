const eventos = [
    {
        id:"Festival_01",
        titulo:"LollaPalooza 2024",
        imagen:"./Imagenes/Evento1.jpeg",
        categoria: {
            nombre: "Recitales",
            id: "Festival"
        },
        fecha: "15/03/2024",
        descripción: "Lollapalooza, la máxima fiesta musical que te hace vibrar con cada nota. Sumérgete en un ambiente de energía pura y conéctate con personas de todo el mundo en una experiencia inolvidable.",
        precio: 150000
    },

    {
        id:"Festival_02",
        titulo:"Afterlife",
        imagen:"./Imagenes/Evento4.webp",
        categoria: {
            nombre: "Recitales",
            id: "Festival"
        },
        fecha: "08/03/2024",
        descripción: "Es una experiencia electrónica única que te lleva a un mundo de éxtasis a través de la música. Sumérgete en sus beats hipnóticos y atmósferas envolventes para crear recuerdos inolvidables en la pista de baile.",
        precio: 135000
    },

    {
        id:"Concierto_01",
        titulo:"Maria Becerra",
        imagen:"./Imagenes/Evento2.webp",
        categoria: {
            nombre: "Recitales",
            id: "Conciero"
        },
        fecha: "15/04/2024",
        descripción: "Maria Becerra, la reina del trap argentino, te invita a un viaje emocional con sus letras honestas y poderosas. Sumérgete en su música única y cautivadora, y déjate llevar por su autenticidad y pasión.",
        precio: 150000
    },

    {
        id:"Concierto_02",
        titulo:"WOS",
        imagen:"./Imagenes/Evento5.jpeg",
        categoria: {
            nombre: "Recitales",
            id: "Concierto"
        },
        fecha: "15/04/2024",
        descripción: "Wos es el ícono del rap argentino, con letras afiladas y un estilo inconfundible. Sumérgete en su energía arrolladora y déjate llevar por el poder de su música.",
        precio: 150000
    },
    {
        id:"Obra_01",
        titulo:"La Caja Mágica",
        imagen:"./Imagenes/Evento6.webp",
        categoria: {
            nombre: "Musicales",
            id: "Obras"
        },
        fecha: "01/03/2024",
        descripción: "Es la oportunidad de sentirte niño otra vez y hacen un viaje a las canciones que marcaron tu vida hasta hoy. Embarcate a un viaje teatral mágico a traves de las melodías más iconicas de Disney.",
        precio: 53000
    },
    {
        id:"Exposicion_01",
        titulo:"Blowup Experience",
        imagen:"./Imagenes/Evento7.jpeg",
        categoria: {
            nombre: "Exposiciones",
            id: "Exposiciones"
        },
        fecha: "01/01/2024",
        descripción: "Blow Up Experience transforma el Pabellón Frers de La Rural en un asombroso espectáculo de arte inflable, fusionando creatividad y tecnología para una experiencia colorida e inmersiva.",
        precio: 12000
    },

]

const contenedorEventos = document.querySelector("#contenedor-eventos");
let boton_agregarFavoritos = document.querySelectorAll(".boton_AgregarFavoritos");
let boton_verEvento = document.querySelectorAll(".boton_Evento");


function cargarEventos() {
    eventos.forEach(evento => {
        let div = document.createElement("div");
        div.classList.add("evento");
        div.innerHTML = `
        <img class="Imagen_Evento" src="${evento.imagen}" alt="${evento.titulo}">

        <div class="Detalles_Evento">

            <h2 class="Titulo_Evento">${evento.titulo}</h2>
            <h3 class="Fecha_Evento">${evento.fecha}</h3>
            <h4 class="Descripcion_Evento">${evento.descripción}</h4>
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

cargarEventos();

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

    console.log(verEvento);
    localStorage.setItem("ver-mas-evento", JSON.stringify(verEvento));
    
    setTimeout(()=>{
        window.location.href = "./detalle_evento.html";
    },500);
    
}








