// Función para redirigir al usuario al portal de una sucursal seleccionada
function redirectToSucursal(sucursal) {
    window.location.href = `sucursal.html?sucursal=${encodeURIComponent(sucursal)}`;
  }
  