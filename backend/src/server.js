const express = require('express');
const { sequelize, testConnection } = require('./config/db');
const cors = require('cors');
const app = express();
const { seed } = require('./seed'); // Certifique-se de que o caminho esteja correto

// Middlewares
app.use(express.json());
app.use(cors());

// Função para testar a conexão com o banco e realizar o seeding
async function initializeDatabase() {
  try {
    console.log('Testando conexão com o banco de dados...');
    await testConnection();
    console.log('Conexão com o banco de dados bem-sucedida!');

    // Realiza o seeding de dados fictícios
    await seed();

    // Sincroniza os modelos com o banco de dados
    await sequelize.sync();
    console.log('Modelos sincronizados com o banco de dados.');

  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    throw new Error('Erro ao conectar e inicializar o banco de dados');
  }
}

// Função para iniciar o servidor
async function startServer() {
  try {
    // Inicializa o banco de dados
    await initializeDatabase();

    // Importação de rotas
    const userRoutes = require('./routes/userRoutes');
    const productRoutes = require('./routes/productRoutes');
    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);

    const PORT = process.env.PORT || 3000;  // Usando variável de ambiente para flexibilidade
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
    
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1); // Encerra o servidor se houver erro
  }
}

startServer(); // Chama a função assíncrona para iniciar o servidor
