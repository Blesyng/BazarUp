const { DataTypes } = require('sequelize');
const sequelize = require('../config/db').sequelize;
const usuario = require('./usuario'); // Importe o modelo Usuario

const Product = sequelize.define('Product', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    foto: {
        type: DataTypes.STRING, // Assuming URL or file path
        allowNull: true,
    },
    qrcode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
   /* usuario_id: { 
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: usuario, // Relaciona com o modelo Cliente
            key: 'id'
        },
        onDelete: 'SET NULL', // O que acontece quando o cliente é deletado
    },*/
    usuario_id: { 
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: usuario, // Relaciona com o modelo Usuario
            key: 'id'
        },
        onDelete: 'CASCADE', // O que acontece quando o usuário é deletado
    },
});

// Definir os relacionamentos (Associações)
Product.belongsTo(usuario, { foreignKey: 'usuario_id' });
//Product.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = Product;
