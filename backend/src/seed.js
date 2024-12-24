const usuario = require('./models/usuario');  // Importa o modelo de usuário
const Product = require('./models/Product');
const sequelize = require('./config/db'); 
  // Importa o modelo de produto
// Certifique-se de que os modelos e sequelize estão sendo importados corretamente
const bcrypt = require('bcryptjs');

async function seed() {
    try {
        // Sincronizando o banco de dados antes de adicionar dados
        await sequelize.sync();

        // Adicionando usuários fictícios
        const [user1, createdUser1] = await usuario.findOrCreate({
            where: { email: 'joao.silva@example.com' },
            defaults: {
                nome: 'João Silva',
                senha: await bcrypt.hash('senha123', 10), // Criptografando a senha
                telefone: '999999999',
            },
        });

        const [user2, createdUser2] = await usuario.findOrCreate({
            where: { email: 'maria.oliveira@example.com' },
            defaults: {
                nome: 'Maria Oliveira',
                senha: await bcrypt.hash('senha123', 10), // Criptografando a senha
                telefone: '888888888',
            },
        });

        console.log('Usuários criados com sucesso!');

        // Adicionando produtos fictícios
        const product1 = await Product.create({
            nome: 'Camiseta Básica',
            descricao: 'Camiseta simples e confortável',
            preco: 29.90,
            quantidade: 10,
            qrcode: 'qrcode1',
            usuario_id: user1.id, // Associando ao usuário
        });

        const product2 = await Product.create({
            nome: 'Calça Jeans',
            descricao: 'Calça jeans estilosa e resistente',
            preco: 89.90,
            quantidade: 5,
            qrcode: 'qrcode2',
            usuario_id: user2.id, // Associando ao usuário
        });

        console.log('Produtos criados com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar dados fictícios:', error);
    }
}

module.exports = { seed };

