const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

exports.createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  const product = await Product.create({ name, price, description, updatedBy: req.user.id });
  res.json(product);
};

