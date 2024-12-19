const express = require("express");
const app = express();
const { sequelize, Usuario, Produto } = require("./config/db"); // Import sequelize *and* models
const produtoRoute = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes"); // Assuming you have user routes

app.use(express.json());

// Define your routes before syncing
app.use("/api/users", userRoutes); // Use '/api/users'
app.use("/api/products", produtoRoute); // Use '/api/products'

sequelize
  .sync()
  .then(() => {
    // Call sync *after* models are defined
    console.log("Banco de dados sincronizado com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco de dados:", err);
  });

const port = 3001;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
