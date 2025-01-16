document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sucursal = urlParams.get('sucursal');
  document.getElementById('sucursal-title').textContent = `Gestión de Usuarios - ${sucursal}`;

  document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const queryParams = new URLSearchParams(formData).toString();
    
    try {
      const response = await fetch(`/api/usuarios?${queryParams}`);
      const result = await response.json();
      const resultList = document.getElementById('resultList');
      resultList.innerHTML = '';
      result.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.nombre} - ${user.puesto} - ${user.extension}`;
        resultList.appendChild(li);
      });
    } catch (error) {
      console.error('Error al buscar usuarios:', error);
    }
  });

  document.getElementById('addForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      alert('Usuario registrado con éxito.');
      event.target.reset();
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  });
});

function goBack() {
  window.location.href = 'index.html';
}
