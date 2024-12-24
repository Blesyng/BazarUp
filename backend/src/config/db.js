const { Sequelize } = require('sequelize');

// Inicializa a conexão com o banco de dados MySQL
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT || 3307, // Define a porta padrão 3306
    dialect: 'mysql',
    logging: console.log, // Configuração de logging mais robusta para desenvolvimento
  },
);

// Função para testar a conexão com o banco de dados
async function testConnection() {
  try {
    await sequelize.authenticate();  // Tenta autenticar a conexão
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1);  // Sai da aplicação em caso de erro
  }
}

// Função para iniciar o servidor
async function startServer() {
  try {
    await testConnection(); // Verifica a conexão com o banco de dados
    await sequelize.sync();  // Sincroniza os modelos com o banco de dados

    // Outras configurações do servidor...
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);  // Sai da aplicação em caso de erro
  }
}

startServer();  // Inicia o servidor

// Exporta as funções e a instância do sequelize para uso em outras partes do código
module.exports = { sequelize, testConnection };
