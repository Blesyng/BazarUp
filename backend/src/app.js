const { DataTypes } = require('sequelize');
const sequelize = require('../config/db').sequelize; // Importa a instância do Sequelize

const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2), // Tipo para valores monetários
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // ... outros campos
});

module.exports = Produto;
