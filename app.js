import express from 'express';
import { createClient } from '@supabase/supabase-js';

// Crear cliente de Supabase con credenciales directamente en el código
const supabase = createClient(
  'https://fgeuiluxxfnwjszvjnoi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnZXVpbHV4eGZud2pzenZqbm9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5OTgwODMsImV4cCI6MjA1MjU3NDA4M30.UE8KQgGD59-VUrSFpp5kChinQJmlxQG3izUwehzPquQ'
);

// Configurar express
const app = express();
app.use(express.json());

// Funciones de Supabase para CRUD
async function cargarExtensiones(sucursal) {
  const { data, error } = await supabase
    .from('extensiones') // Nombre de la tabla
    .select('nombre, puesto, extension')
    .eq('sucursal', sucursal);

  if (error) {
    throw error;
  }
  return data;
}

async function agregarExtension(nombre, puesto, extension, sucursal) {
  const { data, error } = await supabase
    .from('extensiones')
    .insert([{ nombre, puesto, extension, sucursal }]);

  if (error) {
    throw error;
  }
  return data;
}

async function editarExtension(extension, sucursal, nuevaExtension, nombre, puesto) {
  const { data, error } = await supabase
    .from('extensiones')
    .update({ extension: nuevaExtension, nombre, puesto })
    .eq('extension', extension)
    .eq('sucursal', sucursal);

  if (error) {
    throw error;
  }
  return data;
}

async function eliminarExtension(extension, sucursal) {
  const { data, error } = await supabase
    .from('extensiones')
    .delete()
    .eq('extension', extension)
    .eq('sucursal', sucursal);

  if (error) {
    throw error;
  }
  return data;
}

// Rutas de la API
app.get("/api/extensiones", async (req, res) => {
  try {
    const sucursal = req.query.sucursal;
    const extensiones = await cargarExtensiones(sucursal);
    res.json(extensiones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/agregar", async (req, res) => {
  try {
    const { nombre, puesto, extension, sucursal } = req.body;
    await agregarExtension(nombre, puesto, extension, sucursal);
    res.status(201).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/editar", async (req, res) => {
  try {
    const { sucursal, extension, nombre, puesto, nuevaExtension } = req.body;
    await editarExtension(extension, sucursal, nuevaExtension, nombre, puesto);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/eliminar", async (req, res) => {
  try {
    const { sucursal, extension } = req.body;
    await eliminarExtension(extension, sucursal);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Puerto de la aplicación
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
