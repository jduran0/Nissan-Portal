<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Directorio de Extensiones</title>
    <!-- Importar Supabase desde CDN -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <h1 id="sucursalTitle" class="text-3xl font-bold mb-8"></h1>
        
        <!-- Formulario de nueva extensión -->
        <div class="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 class="text-xl font-semibold mb-4">Agregar Nueva Extensión</h2>
            <form id="extensionForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Nombre</label>
                    <input type="text" id="nombre" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Puesto</label>
                    <input type="text" id="puesto" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Extensión (4 dígitos)</label>
                    <input type="text" id="extension" required pattern="\d{4}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                </div>
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Agregar</button>
            </form>
        </div>

        <!-- Tabla de extensiones -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Puesto</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Extensión</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                    </tr>
                </thead>
                <tbody id="extensionesTable" class="bg-white divide-y divide-gray-200"></tbody>
            </table>
        </div>
    </div>

    <script>
        // Esperar a que el documento esté completamente cargado
        document.addEventListener('DOMContentLoaded', function() {
            // Inicializar cliente de Supabase
            const supabaseUrl = 'https://fgeuiluxxfnwjszvjnoi.supabase.co';
            const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnZXVpbHV4eGZud2pzenZqbm9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5OTgwODMsImV4cCI6MjA1MjU3NDA4M30.UE8KQgGD59-VUrSFpp5kChinQJmlxQG3izUwehzPquQ';
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
                            <td class="px-6 py-4 whitespace-nowrap">${ext.nombre}</td>
                            <td class="px-6 py-4 whitespace-nowrap">${ext.puesto}</td>
                            <td class="px-6 py-4 whitespace-nowrap">${ext.extension}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <button onclick="editarExtension('${ext.id}')" class="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
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

            // Agregar extensión
            document.getElementById('extensionForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const nombre = document.getElementById('nombre').value;
                const puesto = document.getElementById('puesto').value;
                const extension = document.getElementById('extension').value;

                try {
                    const { error } = await supabaseClient
                        .from('extensiones')
                        .insert([{ 
                            nombre, 
                            puesto, 
                            extension,
                            sucursal 
                        }]);

                    if (error) throw error;

                    // Limpiar formulario y recargar tabla
                    e.target.reset();
                    await cargarExtensiones();
                } catch (error) {
                    console.error('Error al agregar extensión:', error);
                    alert('Error al agregar extensión: ' + error.message);
                }
            });

            // Función global para eliminar extensión
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

            // Función global para editar extensión
            window.editarExtension = async function(id) {
                const nombre = prompt('Nuevo nombre:');
                const puesto = prompt('Nuevo puesto:');
                const extension = prompt('Nueva extensión (4 dígitos):');

                if (!nombre || !puesto || !extension) return;
                if (!/^\d{4}$/.test(extension)) {
                    alert('La extensión debe tener 4 dígitos');
                    return;
                }

                try {
                    const { error } = await supabaseClient
                        .from('extensiones')
                        .update({ nombre, puesto, extension })
                        .eq('id', id);

                    if (error) throw error;
                    await cargarExtensiones();
                } catch (error) {
                    console.error('Error al editar extensión:', error);
                    alert('Error al editar extensión: ' + error.message);
                }
            };

            // Cargar extensiones al iniciar
            cargarExtensiones();
        });
    </script>
</body>
</html>
