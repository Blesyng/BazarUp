const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize/types");

const Usuario = sequelize.define("Usuario",{
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  email: {
    type: DataTypes.STRING,
    allowNull:false,
    unique:true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  data_criacao: {
    type: DataTypes.TIMESTAMP,
    defaultValue: DataTypes.NOW,
  },
});
module.exports = Usuario;
