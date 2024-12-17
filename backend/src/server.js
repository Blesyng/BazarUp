const express = require('express');
const produtoRoute = require('./routes/productRoutes'); // Importando as rotas de produto
const sequelize = require('./config/db'); // Importando a configuração do banco de dados

const app = express();
app.use(express.json()); // Para analisar corpo das requisições como JSON

// Usando as rotas no caminho '/api'
app.use('/api', produtoRoute);

// Sincronizando o banco de dados
sequelize.sync().then(() => {
  console.log("Banco de dados sincronizado com sucesso!");
}).catch((err) => {
  console.error("Erro ao sincronizar o banco de dados:", err);
});

// Definindo a porta do servidor
const port = 3001;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
