async function obtenerEventos() {
    try {
      const response = await fetch('www.localhost:3000/JSON/eventos.json'); 
      debugger
      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de eventos');
      }
      const data = await response.json();
      console.log(data);
    
    } catch (error) {
      console.error('Error al obtener los eventos:', error.message);
      return []; // En caso de error, devuelve una lista vacía.
    }
  }
  
 obtenerEventos();
  
