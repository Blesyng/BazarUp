const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).json({ message: "Erro ao buscar produtos" });
    }
};

exports.createProduct = async (req, res) => {
    try {
        // Assuming your request body has these fields. Adjust if needed.
        const { nome, descricao, preco, quantidade, foto, qrcode, cliente_id, usuario_id } = req.body;
        const product = await Product.create({
            nome, descricao, preco, quantidade, foto, qrcode, cliente_id, usuario_id
        });
        res.status(201).json(product);
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        res.status(500).json({ message: "Erro ao criar produto" });
    }
};

// Add other controller methods (getById, update, delete) using Sequelize methods here...

