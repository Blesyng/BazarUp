const { Sequelize, DataTypes } = require("sequelize");
// Remove dotenv entirely:
//require('dotenv').config(); // No dotenv needed with Docker Compose

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE, // Use environment variables directly
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST, // Use the service name from docker-compose.yml
    dialect: "mysql",
    port: parseInt(process.env.MYSQL_PORT, 10) || 3306
  }
);

// Import and define models *after* initializing Sequelize and *before* authenticating.
const Usuario = require('../models/usuario')(sequelize, DataTypes);
// ... other models

console.log("DB_PORT:", process.env.MYSQL_PORT);
console.log("DB_HOST:", process.env.MYSQL_HOST);

module.exports = { sequelize, Usuario }; // Export both Sequelize instance and models

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco estabelecida com sucesso!");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao banco de dados:", err);
  });


