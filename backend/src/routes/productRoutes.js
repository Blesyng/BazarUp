const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);

// Add other routes for product operations (getById, update, delete)

module.exports = router;

