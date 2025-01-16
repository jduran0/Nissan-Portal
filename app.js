const express = require("express");
const { createClient } = require("@edgedb/client");

const app = express();
app.use(express.json());  // Para leer cuerpos JSON en peticiones

// Crear cliente de EdgeDB con la URI proporcionada
const client = createClient({
  dsn: "postgresql://edgedb@mydb--jduran0.c-80.i.aws.edgedb.cloud:5656/main?sslmode=require",
});

// Conexión exitosa
client
  .query("SELECT 1;") // Prueba simple para verificar la conexión
  .then(() => {
    console.log("Conexión a EdgeDB exitosa!");
  })
  .catch((error) => {
    console.error("Error de conexión a EdgeDB:", error);
  });

// Ruta de inicio
app.get("/", (req, res) => {
  res.send("Bienvenido al portal de gestión de extensiones telefónicas de Nissan Rancagua");
});

// Ruta para obtener todas las extensiones
app.get("/extensiones", async (req, res) => {
  try {
    const query = `
      SELECT Extension {
        id,
        nombre,
        puesto,
        extension
      } LIMIT 10;`;

    const result = await client.query(query);
    res.json(result);
  } catch (error) {
    console.error("Error al obtener las extensiones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para agregar una nueva extensión
app.post("/agregar-extension", async (req, res) => {
  const { nombre, puesto, extension, sucursal } = req.body;

  try {
    const insertQuery = `
      INSERT Extension {
        nombre := <str>'${nombre}',
        puesto := <str>'${puesto}',
        extension := <str>'${extension}',
        sucursal := <str>'${sucursal}'
      }`;

    const result = await client.query(insertQuery);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error al agregar extensión:", error);
    res.status(500).json({ error: "Error al agregar la extensión" });
  }
});

// Puerto del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
