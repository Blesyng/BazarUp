const express = require("express");
const sequelize = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());

// Sincronizando o banco de dados com o Sequelize
sequelize
  .sync()
  .then(() => {
    console.log("Database synced!");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

// Rotas
app.use("api/users", userRoutes);
app.use("api/products", productRoutes);

module.exports = app; // Correção aqui
