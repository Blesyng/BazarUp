const express = require("express");
const sequelize = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());

app.use("/routes/users", userRoutes);
app.use("/routes/products", productRoutes);

// Sincronizando o banco de dados com o Sequelize
sequelize.sync().then(() => {
  console.log("Database synced!");
}).catch((err) => {
  console.error("Error syncing database:", err);
});

module.exports = app;  // Correção aqui
