document.addEventListener("DOMContentLoaded", () => {
    cargarExtensiones();
  
    document.getElementById("formNuevoUsuario").addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const nuevoUsuario = {
        nombre: document.getElementById("nombre").value,
        puesto: document.getElementById("puesto").value,
        extension: document.getElementById("extension").value,
        sucursal: document.getElementById("sucursal").value
      };
  
      await fetch('/extensiones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoUsuario)
      });
  
      cancelarAgregar();
      cargarExtensiones();
    });
  });
  
  // Función para cargar las extensiones desde el servidor
  async function cargarExtensiones() {
    const response = await fetch('/extensiones');
    const data = await response.json();
    const tabla = document.getElementById("tablaExtensiones").getElementsByTagName('tbody')[0];
  
    // Limpiamos la tabla antes de agregar nuevos datos
    tabla.innerHTML = '';
  
    data.forEach(extension => {
      const fila = tabla.insertRow();
      fila.innerHTML = `
        <td>${extension.nombre}</td>
        <td>${extension.puesto}</td>
        <td>${extension.numero}</td>
        <td>
          <button onclick="editarExtension('${extension.id}')">Editar</button>
          <button onclick="eliminarExtension('${extension.id}')">Eliminar</button>
        </td>
      `;
    });
  }
  
  // Función para eliminar una extensión
  async function eliminarExtension(id) {
    await fetch(`/extensiones/${id}`, {
      method: 'DELETE'
    });
  
    cargarExtensiones();
  }
  
  // Función para mostrar formulario de agregar nueva extensión
  function mostrarFormularioAgregar() {
    document.getElementById('formularioAgregar').style.display = 'block';
  }
  
  // Función para cancelar agregar extensión
  function cancelarAgregar() {
    document.getElementById('formularioAgregar').style.display = 'none';
    document.getElementById('formNuevoUsuario').reset();
  }
  
  // Función de filtrado
  function filtrarUsuarios() {
    const nombre = document.getElementById("filtroNombre").value.toLowerCase();
    const puesto = document.getElementById("filtroPuesto").value.toLowerCase();
    const extension = document.getElementById("filtroExtension").value.toLowerCase();
  
    const filas = document.querySelectorAll("#tablaExtensiones tbody tr");
  
    filas.forEach(fila => {
      const cols = fila.querySelectorAll("td");
      const nombreCol = cols[0].textContent.toLowerCase();
      const puestoCol = cols[1].textContent.toLowerCase();
      const extensionCol = cols[2].textContent.toLowerCase();
  
      if (nombreCol.includes(nombre) && puestoCol.includes(puesto) && extensionCol.includes(extension)) {
        fila.style.display = "";
      } else {
        fila.style.display = "none";
      }
    });
  }