import express from 'express';
import * as edgedb from 'edgedb'; // Importar EdgeDB
import bodyParser from 'body-parser';

// Crear el cliente de EdgeDB
const client = edgedb.createClient({
  instanceName: process.env.EDGEDB_INSTANCE_NAME, // Usamos la variable de entorno
  secretKey: process.env.EDGEDB_SECRET_KEY, // Y la clave secreta desde la variable de entorno
});

const app = express();
app.use(bodyParser.json());

// Ruta para obtener las extensiones
app.get('/extensiones', async (req, res) => {
  try {
    // Realizamos una consulta a EdgeDB para obtener las extensiones
    const extensiones = await client.query(`
      SELECT Extension {
        id,
        numero,
        nombre,
        puesto,
        sucursal
      } ORDER BY sucursal;
    `);
    res.json(extensiones);
  } catch (error) {
    console.error("Error al obtener las extensiones:", error);
    res.status(500).send("Error al obtener las extensiones");
  }
});

// Ruta para agregar una nueva extensión
app.post('/extensiones', async (req, res) => {
  try {
    const { numero, nombre, puesto, sucursal } = req.body;
    // Realizamos una consulta para agregar la extensión
    const nuevaExtension = await client.query(`
      INSERT Extension {
        numero := <str>$numero,
        nombre := <str>$nombre,
        puesto := <str>$puesto,
        sucursal := <str>$sucursal
      }`, {
      numero, nombre, puesto, sucursal,
    });

    res.status(201).json(nuevaExtension);
  } catch (error) {
    console.error("Error al agregar extensión:", error);
    res.status(500).send("Error al agregar la extensión");
  }
});

// Ruta para modificar una extensión
app.put('/extensiones/:id', async (req, res) => {
  const { id } = req.params;
  const { numero, nombre, puesto, sucursal } = req.body;
  try {
    const extensionModificada = await client.query(`
      UPDATE Extension
      FILTER .id = <uuid>$id
      SET {
        numero := <str>$numero,
        nombre := <str>$nombre,
        puesto := <str>$puesto,
        sucursal := <str>$sucursal
      }
      RETURNING Extension {
        id,
        numero,
        nombre,
        puesto,
        sucursal
      }
    `, { id, numero, nombre, puesto, sucursal });

    res.json(extensionModificada);
  } catch (error) {
    console.error("Error al modificar la extensión:", error);
    res.status(500).send("Error al modificar la extensión");
  }
});

// Ruta para eliminar una extensión
app.delete('/extensiones/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await client.query(`
      DELETE Extension
      FILTER .id = <uuid>$id
    `, { id });

    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar la extensión:", error);
    res.status(500).send("Error al eliminar la extensión");
  }
});

// Configuración del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
