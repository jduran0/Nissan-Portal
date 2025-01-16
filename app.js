document.addEventListener('DOMContentLoaded', function() {
    const supabaseUrl = 'https://fgeuiluxxfnwjszvjnoi.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnZXVpbHV4eGZud2pzenZqbm9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5OTgwODMsImV4cCI6MjA1MjU3NDA4M30.UE8KQgGD59-VUrSFpp5kChinQJmlxQG3izUwehzPquQ' // Tu clave API
    const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

    // Obtener sucursal de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const sucursal = urlParams.get('sucursal');
    document.getElementById('sucursalTitle').textContent = sucursal;

    // Cargar extensiones
    async function cargarExtensiones() {
        try {
            const { data, error } = await supabaseClient
                .from('extensiones')
                .select('*')
                .eq('sucursal', sucursal);

            if (error) throw error;

            const tbody = document.getElementById('extensionesTable');
            tbody.innerHTML = '';

            data.forEach(ext => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="px-6 py-4">${ext.nombre}</td>
                    <td class="px-6 py-4">${ext.puesto}</td>
                    <td class="px-6 py-4">${ext.extension}</td>
                    <td class="px-6 py-4">
                        <button onclick="editarExtension('${ext.id}')" class="text-blue-600 hover:text-blue-900">Editar</button>
                        <button onclick="eliminarExtension('${ext.id}')" class="text-red-600 hover:text-red-900">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            console.error('Error al cargar las extensiones:', error);
            alert('Error al cargar las extensiones: ' + error.message);
        }
    }

    // Función de editar extensión
    window.editarExtension = function(id) {
        // Cargar la extensión para editarla
        const extension = document.getElementById('extensionesTable').querySelector(`button[onclick="editarExtension('${id}')"]`).parentElement.parentElement;

        const nombre = extension.children[0].textContent;
        const puesto = extension.children[1].textContent;
        const ext = extension.children[2].textContent;

        // Rellenar los campos con los datos actuales
        document.getElementById('nombre').value = nombre;
        document.getElementById('puesto').value = puesto;
        document.getElementById('extension').value = ext;

        // Cambiar el botón para guardar
        const btnGuardar = document.querySelector('#extensionForm button');
        btnGuardar.textContent = 'Actualizar';

        // Manejar la acción de actualizar
        document.getElementById('extensionForm').onsubmit = async function(e) {
            e.preventDefault(); // Evita que el formulario recargue la página
            const nombreNuevo = document.getElementById('nombre').value;
            const puestoNuevo = document.getElementById('puesto').value;
            const extensionNueva = document.getElementById('extension').value;

            if (!nombreNuevo || !puestoNuevo || !extensionNueva) {
                alert('Por favor, complete todos los campos');
                return;
            }
            if (!/^\d{4}$/.test(extensionNueva)) {
                alert('La extensión debe tener 4 dígitos');
                return;
            }

            try {
                const { error } = await supabaseClient
                    .from('extensiones')
                    .update({ nombre: nombreNuevo, puesto: puestoNuevo, extension: extensionNueva })
                    .eq('id', id);

                if (error) throw error;

                alert('Extensión actualizada correctamente');
                // Recargar lista de extensiones
                await cargarExtensiones();

                // Limpiar formulario y cambiar botón a guardar nuevamente
                e.target.reset();
                btnGuardar.textContent = 'Guardar';
                document.getElementById('extensionForm').onsubmit = guardarExtension;
            } catch (error) {
                console.error('Error al actualizar extensión:', error);
                alert('Error al actualizar extensión: ' + error.message);
            }
        };
    };

    // Función de guardar nueva extensión
    async function guardarExtension(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const puesto = document.getElementById('puesto').value;
        const extension = document.getElementById('extension').value;

        if (!nombre || !puesto || !extension) {
            alert('Por favor, complete todos los campos');
            return;
        }
        if (!/^\d{4}$/.test(extension)) {
            alert('La extensión debe tener 4 dígitos');
            return;
        }

        try {
            // Inserta la nueva extensión
            const { error } = await supabaseClient
                .from('extensiones')
                .insert([{ nombre, puesto, extension, sucursal }]);

            if (error) throw error;

            alert('Extensión añadida correctamente');
            e.target.reset();
            await cargarExtensiones();
        } catch (error) {
            console.error('Error al agregar extensión:', error);
            alert('Error al agregar extensión: ' + error.message);
        }
    }

    // Eliminar extensión
    window.eliminarExtension = async function(id) {
        if (!confirm('¿Estás seguro de eliminar esta extensión?')) return;

        try {
            const { error } = await supabaseClient
                .from('extensiones')
                .delete()
                .eq('id', id);

            if (error) throw error;

            await cargarExtensiones();
        } catch (error) {
            console.error('Error al eliminar extensión:', error);
            alert('Error al eliminar extensión: ' + error.message);
        }
    };

    // Inicializar el cargado de extensiones
    cargarExtensiones();

    // Manejo del formulario para crear nueva extensión
    document.getElementById('extensionForm').onsubmit = guardarExtension;
});
