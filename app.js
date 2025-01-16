import express from "express";
import * as edgedb from "edgedb";

const client = edgedb.createClient({
  instanceName: "vercel-rlyXL34RVAZWwkWRjRviDVgB/edgedb-green-tree",
  secretKey: "nbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZGIuZC5hbGwiOnRydWUsImVkYi5pIjpbInZlcmNlbC1ybHlYTDM0UlZBWld3a1dSalJ2aURWZ0IvZWRnZWRiLWdyZWVuLXRyZWUiXSwiZWRiLnIuYWxsIjp0cnVlLCJpYXQiOjE3MzY5OTExMjAsImlzcyI6ImF3cy5lZGdlZGIuY2xvdWQiLCJqdGkiOiJyb3p4UnRPcEVlLXdla181Q0J2aEpnIiwic3ViIjoicmtMU0FOT3BFZS1kRUVQaTRpMnQ0ZyJ9.Hp9iyOkrNtvuRxK4GvucJW7FIGWDY4cCaxqR-khwgpgLjh74MJyCZlE1N3KEbARjLQxFgEVTN-QIb2CrT0v0_g"
});

const app = express();
app.use(express.json());

// Ruta para agregar un usuario
app.post("/add-user", async (req, res) => {
  const { nombre, puesto, extension } = req.body;

  if (!nombre || !puesto || !extension || extension.length > 4) {
    return res.status(400).send({ message: "Datos inválidos. Verifica la información." });
  }

  try {
    const query = `
      insert User {
        name := <str>$nombre,
        role := <str>$puesto,
        extension := <str>$extension
      }
    `;
    await client.query(query, { nombre, puesto, extension });
    res.status(201).send({ message: "Usuario agregado correctamente." });
  } catch (err) {
    console.error("Error al agregar usuario:", err);
    res.status(500).send({ message: "Error interno del servidor." });
  }
});

// Ruta para obtener usuarios
app.get("/users", async (req, res) => {
  try {
    const result = await client.query(`
      select User {
        name,
        role,
        extension
      }
    `);
    res.status(200).send(result);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).send({ message: "Error interno del servidor." });
  }
});

// Servidor en escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
