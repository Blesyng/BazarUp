const express = require("express");
const produtoModel = require("../models/produtos"); // Importando o modelo Produto

const router = express.Router();

// Rota para criar um produto
router.post("../models/produtos", (req, res) => {
  const {
    nome,
    descricao,
    preco,
    quantidade,
    foto,
    qrcode,
    cliente_id,
    usuario_id,
  } = req.body;

  const novoProduto = {
    nome,
    descricao,
    preco,
    quantidade,
    foto,
    qrcode,
    cliente_id,
    usuario_id,
  };

  produtoModel.criarProduto(novoProduto, (err, resultado) => {
    if (err) return res.status(500).send("Erro ao criar produto");
    res.status(201).send("Produto criado com sucesso");
  });
});

// Rota para listar todos os produtos
router.get("../models/produtos", (req, res) => {
  produtoModel.listarProdutos((err, produtos) => {
    if (err) return res.status(500).send("Erro ao listar produtos");
    res.json(produtos);
  });
});

// Rota para buscar um produto por ID
router.get("../models/produtos:id", (req, res) => {
  const { id } = req.params;
  produtoModel.buscarProdutoPorId(id, (err, produto) => {
    if (err) return res.status(500).send("Erro ao buscar produto");
    if (!produto.length) return res.status(404).send("Produto não encontrado");
    res.json(produto[0]);
  });
});

// Rota para atualizar um produto
router.put("../models/produtos", (req, res) => {
  const { id } = req.params;
  const {
    nome,
    descricao,
    preco,
    quantidade,
    foto,
    qrcode,
    cliente_id,
    usuario_id,
  } = req.body;

  const produtoAtualizado = {
    nome,
    descricao,
    preco,
    quantidade,
    foto,
    qrcode,
    cliente_id,
    usuario_id,
  };

  produtoModel.atualizarProduto(id, produtoAtualizado, (err, resultado) => {
    if (err) return res.status(500).send("Erro ao atualizar produto");
    res.status(200).send("Produto atualizado com sucesso");
  });
});

// Rota para deletar um produto
router.delete("../models/produtos:id", (req, res) => {
  const { id } = req.params;
  produtoModel.deletarProduto(id, (err, resultado) => {
    if (err) return res.status(500).send("Erro ao deletar produto");
    res.status(200).send("Produto deletado com sucesso");
  });
});

module.exports = router;
