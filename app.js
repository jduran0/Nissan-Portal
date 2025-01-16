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

// Función para agregar extensión
async function agregarExtension(nombre, puesto, extension, sucursal) {
  try {
    const query = `
      INSERT Extensiones {
        nombre := <str>$nombre,
        puesto := <str>$puesto,
        extension := <str>$extension,
        sucursal := <str>$sucursal
      };
    `;
    await client.query(query, { nombre, puesto, extension, sucursal });
    console.log("Extensión agregada correctamente");
  } catch (err) {
    console.error("Error al agregar extensión:", err);
    throw new Error("No se pudo agregar la extensión");
  }
}

// Ruta para agregar extensión
app.post("/api/agregar", async (req, res) => {
  const { nombre, puesto, extension, sucursal } = req.body;
  try {
    await agregarExtension(nombre, puesto, extension, sucursal);
    res.status(201).send("Extensión agregada correctamente");
  } catch (err) {
    res.status(500).send("Error al agregar la extensión");
  }
});

// Puerto de la aplicación
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
