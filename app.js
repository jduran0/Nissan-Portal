import express from "express";
import * as edgedb from "edgedb";

// Crear cliente de EdgeDB
const client = edgedb.createClient({
  instanceName: "vercel-rlyXL34RVAZWwkWRjRviDVgB/edgedb-green-tree",
  secretKey: "nbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZGIuZC5hbGwiOnRydWUsImVkYi5pIjpbInZlcmNlbC1ybHlYTDM0UlZBWld3a1dSalJ2aURWZ0IvZWRnZWRiLWdyZWVuLXRyZWUiXSwiZWRiLnIuYWxsIjp0cnVlLCJpYXQiOjE3MzY5OTExMjAsImlzcyI6ImF3cy5lZGdlZGIuY2xvdWQiLCJqdGkiOiJyb3p4UnRPcEVlLXdla181Q0J2aEpnIiwic3ViIjoicmtMU0FOT3BFZS1kRUVQaTRpMnQ0ZyJ9.Hp9iyOkrNtvuRxK4GvucJW7FIGWDY4cCaxqR-khwgpgLjh74MJyCZlE1N3KEbARjLQxFgEVTN-QIb2CrT0v0_g"
});

// Configurar express
const app = express();
app.use(express.json());

// Funciones de EdgeDB para CRUD
async function cargarExtensiones(sucursal) {
  const query = `
    SELECT Extensiones {
      nombre,
      puesto,
      extension
    }
    FILTER .sucursal = <str>$sucursal;
  `;
  const extensiones = await client.query(query, { sucursal });
  return extensiones;
}

async function agregarExtension(nombre, puesto, extension, sucursal) {
  const query = `
    INSERT Extensiones {
      nombre := <str>$nombre,
      puesto := <str>$puesto,
      extension := <str>$extension,
      sucursal := <str>$sucursal
    };
  `;
  await client.query(query, { nombre, puesto, extension, sucursal });
}

async function editarExtension(extension, nombre, puesto, nuevaExtension, sucursal) {
  const query = `
    UPDATE Extensiones
    FILTER .extension = <str>$extension AND .sucursal = <str>$sucursal
    SET {
      nombre := <str>$nombre,
      puesto := <str>$puesto,
      extension := <str>$nuevaExtension
    };
  `;
  await client.query(query, { extension, nombre, puesto, nuevaExtension, sucursal });
}

async function eliminarExtension(extension, sucursal) {
  const query = `
    DELETE Extensiones
    FILTER .extension = <str>$extension AND .sucursal = <str>$sucursal;
  `;
  await client.query(query, { extension, sucursal });
}

// Rutas de la API
app.get("/api/extensiones", async (req, res) => {
  const sucursal = req.query.sucursal;
  const extensiones = await cargarExtensiones(sucursal);
  res.json(extensiones);
});

app.post("/api/agregar", async (req, res) => {
  const { nombre, puesto, extension, sucursal } = req.body;
  await agregarExtension(nombre, puesto, extension, sucursal);
  res.status(201).send();
});

app.put("/api/editar", async (req, res) => {
  const { sucursal, extension, nombre, puesto, nuevaExtension } = req.query;
  await editarExtension(extension, nombre, puesto, nuevaExtension, sucursal);
  res.status(200).send();
});

app.delete("/api/eliminar", async (req, res) => {
  const { sucursal, extension } = req.query;
  await eliminarExtension(extension, sucursal);
  res.status(200).send();
});

// Puerto de la aplicación
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
