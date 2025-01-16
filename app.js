import express from 'express';
import { createClient } from '@supabase/supabase-js';

// Crear cliente de Supabase
const supabase = createClient(
  'https://fgeuiluxxfnwjszvjnoi.supabase.co', // URL de tu proyecto Supabase
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnZXVpbHV4eGZud2pzenZqbm9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5OTgwODMsImV4cCI6MjA1MjU3NDA4M30.UE8KQgGD59-VUrSFpp5kChinQJmlxQG3izUwehzPquQ' // Tu clave API
);

// Configurar express
const app = express();
app.use(express.json());

// Funciones de Supabase para CRUD

// Cargar extensiones por sucursal
async function cargarExtensiones(sucursal) {
  const { data, error } = await supabase
    .from('extensiones') // Nombre de la tabla
    .select('id, nombre, puesto, extension, sucursal')
    .eq('sucursal', sucursal); // Filtrar por sucursal

  if (error) {
    throw error;
  }
  return data;
}

// Agregar una nueva extensión
async function agregarExtension(nombre, puesto, extension, sucursal) {
  const { data, error } = await supabase
    .from('extensiones')  // Nombre de la tabla
    .insert([{ nombre, puesto, extension, sucursal }]);

  if (error) {
    throw error;
  }
  return data;
}

// Editar una extensión existente
async function editarExtension(extension, sucursal, nuevaExtension, nombre, puesto) {
  const { data, error } = await supabase
    .from('extensiones')  // Nombre de la tabla
    .update({ 
      extension: nuevaExtension, 
      nombre, 
      puesto
    })
    .eq('extension', extension)
    .eq('sucursal', sucursal);

  if (error) {
    throw error;
  }
  return data;
}

// Eliminar una extensión por su extensión y sucursal
async function eliminarExtension(extension, sucursal) {
  const { data, error } = await supabase
    .from('extensiones')  // Nombre de la tabla
    .delete()
    .eq('extension', extension)
    .eq('sucursal', sucursal);

  if (error) {
    throw error;
  }
  return data;
}

// Rutas de la API

// Leer todas las extensiones de una sucursal
app.get('/api/extensiones', async (req, res) => {
  try {
    const sucursal = req.query.sucursal;  // Obtener la sucursal del query
    if (!sucursal) {
      return res.status(400).json({ error: "La sucursal es obligatoria." });
    }
    const extensiones = await cargarExtensiones(sucursal);
    res.json(extensiones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agregar una nueva extensión
app.post('/api/extensiones', async (req, res) => {
  try {
    const { nombre, puesto, extension, sucursal } = req.body;
    if (!nombre || !puesto || !extension || !sucursal) {
      return res.status(400).json({ error: "Faltan campos obligatorios." });
    }
    const newExtension = await agregarExtension(nombre, puesto, extension, sucursal);
    res.status(201).json(newExtension);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una extensión
app.put('/api/extensiones', async (req, res) => {
  try {
    const { sucursal, extension, nombre, puesto, nuevaExtension } = req.body;
    if (!sucursal || !extension || !nombre || !puesto || !nuevaExtension) {
      return res.status(400).json({ error: "Faltan campos obligatorios." });
    }
    const updatedExtension = await editarExtension(extension, sucursal, nuevaExtension, nombre, puesto);
    res.status(200).json(updatedExtension);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar una extensión
app.delete('/api/extensiones', async (req, res) => {
  try {
    const { sucursal, extension } = req.body;
    if (!sucursal || !extension) {
      return res.status(400).json({ error: "Faltan campos obligatorios." });
    }
    const deletedExtension = await eliminarExtension(extension, sucursal);
    res.status(200).json(deletedExtension);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Puerto de la aplicación
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
