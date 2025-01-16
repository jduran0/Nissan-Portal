// Función para obtener la sucursal de la URL
function getSucursalFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("sucursal");
}

// Cargar las extensiones desde el backend
async function cargarExtensiones() {
  const sucursal = getSucursalFromUrl();
  const response = await fetch(`/api/extensiones?sucursal=${sucursal}`);
  const extensiones = await response.json();
  
  const tabla = document.getElementById("tablaExtensiones").getElementsByTagName("tbody")[0];
  tabla.innerHTML = ""; // Limpiar la tabla antes de agregar filas

  extensiones.forEach((extension) => {
    const fila = tabla.insertRow();
    fila.innerHTML = `
      <td>${extension.nombre}</td>
      <td>${extension.puesto}</td>
      <td>${extension.extension}</td>
      <td>
        <button onclick="editarExtension('${extension.extension}')">Editar</button>
        <button onclick="eliminarExtension('${extension.extension}')">Eliminar</button>
      </td>
    `;
  });
}

// Agregar nueva extensión
async function agregarExtension(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const puesto = document.getElementById("puesto").value;
  const extension = document.getElementById("extension").value;
  const sucursal = getSucursalFromUrl();

  await fetch("/api/agregar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nombre, puesto, extension, sucursal })
  });

  cargarExtensiones();
  cancelarAgregar(); // Puedes definir esta función para resetear el formulario
}

// Eliminar una extensión
async function eliminarExtension(extension) {
  const sucursal = getSucursalFromUrl();

  await fetch(`/api/eliminar?sucursal=${sucursal}&extension=${extension}`, {
    method: "DELETE"
  });

  cargarExtensiones();
}

// Editar una extensión
async function editarExtension(extension) {
  const nombre = prompt("Nuevo nombre:");
  const puesto = prompt("Nuevo puesto:");
  const nuevaExtension = prompt("Nueva extensión:");
  const sucursal = getSucursalFromUrl();

  await fetch(`/api/editar?sucursal=${sucursal}&extension=${extension}&nombre=${nombre}&puesto=${puesto}&nuevaExtension=${nuevaExtension}`, {
    method: "PUT"
  });

  cargarExtensiones();
}
