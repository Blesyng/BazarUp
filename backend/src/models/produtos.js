const mysql = require("mysql2"); // Dependência para conectar com MySQL

// Criar uma conexão com o banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "andersonUser", // Substitua com seu usuário MySQL
  password: "Anderson8232", // Substitua com sua senha
  database: "brecho", // Nome do banco de dados
});

// Função para criar um produto
const criarProduto = (produto, callback) => {
  const {
    nome,
    descricao,
    preco,
    quantidade,
    foto,
    qrcode,
    cliente_id,
    usuario_id,
  } = produto;

  const sql = `
    INSERT INTO produtos (nome, descricao, preco, quantidade, foto, qrcode, cliente_id, usuario_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.execute(
    sql,
    [nome, descricao, preco, quantidade, foto, qrcode, cliente_id, usuario_id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    },
  );
};

// Função para listar todos os produtos
const listarProdutos = (callback) => {
  const sql = "SELECT * FROM produtos";

  db.execute(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Função para buscar um produto por ID
const buscarProdutoPorId = (id, callback) => {
  const sql = "SELECT * FROM produtos WHERE id = ?";

  db.execute(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Função para atualizar um produto
const atualizarProduto = (id, produto, callback) => {
  const {
    nome,
    descricao,
    preco,
    quantidade,
    foto,
    qrcode,
    cliente_id,
    usuario_id,
  } = produto;

  const sql = `
    UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidade = ?, foto = ?, qrcode = ?, cliente_id = ?, usuario_id = ?
    WHERE id = ?
  `;

  db.execute(
    sql,
    [
      nome,
      descricao,
      preco,
      quantidade,
      foto,
      qrcode,
      cliente_id,
      usuario_id,
      id,
    ],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    },
  );
};

// Função para deletar um produto
const deletarProduto = (id, callback) => {
  const sql = "DELETE FROM produtos WHERE id = ?";

  db.execute(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  deletarProduto,
};
