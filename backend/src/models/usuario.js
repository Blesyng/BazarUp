const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Corrigido para pegar a instância

const usuario = sequelize.define('usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = usuario;
