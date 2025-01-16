import * as edgedb from "edgedb";

// Crear el cliente de EdgeDB
const client = edgedb.createClient({
  instanceName: "vercel-rlyXL34RVAZWwkWRjRviDVgB/edgedb-green-tree",
  secretKey: "nbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZGIuZC5hbGwiOnRydWUsImVkYi5pIjpbInZlcmNlbC1ybHlYTDM0UlZBWld3a1dSalJ2aURWZ0IvZWRnZWRiLWdyZWVuLXRyZWUiXSwiZWRiLnIuYWxsIjp0cnVlLCJpYXQiOjE3MzY5OTExMjAsImlzcyI6ImF3cy5lZGdlZGIuY2xvdWQiLCJqdGkiOiJyb3p4UnRPcEVlLXdla181Q0J2aEpnIiwic3ViIjoicmtMU0FOT3BFZS1kRUVQaTRpMnQ0ZyJ9.Hp9iyOkrNtvuRxK4GvucJW7FIGWDY4cCaxqR-khwgpgLjh74MJyCZlE1N3KEbARjLQxFgEVTN-QIb2CrT0v0_g"
});

async function createExtension() {
  try {
    // Insertar un nuevo registro en la tabla Extensiones
    await client.query(`
      INSERT Extensiones {
        nombre := <str>'Carlos López',
        puesto := <str>'Analista',
        sucursal := <str>'Sucursal B',
        extension := <str>'5678'
      };
    `);

    console.log('Nuevo usuario agregado.');
  } catch (err) {
    console.error('Error al agregar el usuario:', err);
  }
}

createExtension();
