const { Sequelize } = require("sequelize");
require("dotenv").config({ path: "../.env" });
console.log("DB_PORT:", process.env.DB_PORT); 
console.log("DB_HOST:", process.env.DB_HOST);
// ... outras variáveis

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: parseInt (process.env.DB_PORT) // Caso a variável de ambiente não seja encontrada, usa a porta padrão 3306
  }
);

module.exports = sequelize;

sequelize.authenticate()
  .then(() => {
    console.log("Conexão com o banco estabelecida com sucesso!");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao banco de dados:", err);
  });
