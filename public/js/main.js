// Recupera y muestra las extensiones en la tabla
const loadExtensions = async () => {
    const response = await fetch("/extensiones");
    const data = await response.json();
  
    const tableBody = document.querySelector("#extensionsTable tbody");
    tableBody.innerHTML = "";
    data.forEach(extension => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${extension.nombre}</td>
        <td>${extension.puesto}</td>
        <td>${extension.extension}</td>
        <td>${extension.sucursal}</td>
        <td>
          <button onclick="deleteExtension('${extension.id}')">Eliminar</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  };
  
  // Eliminar una extensión
  const deleteExtension = async (id) => {
    const response = await fetch(`/eliminar-extension/${id}`, {
      method: "DELETE"
    });
    if (response.ok) {
      loadExtensions();
    }
  };
  
  // Agregar una nueva extensión
  document.getElementById("addExtensionForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const puesto = document.getElementById("puesto").value;
    const extension = document.getElementById("extension").value;
    const sucursal = document.getElementById("sucursal").value;
  
    const response = await fetch("/agregar-extension", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre, puesto, extension, sucursal })
    });
  
    if (response.ok) {
      loadExtensions();
      document.getElementById("addExtensionForm").reset();
    }
  });
  
  window.onload = loadExtensions;
  