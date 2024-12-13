const express = require("express");
const mysql = require("mysql2");
const qrcode = require("qrcode");
const app = express();

app.use(express.json());

// Configuração do banco de dados
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados!");
});

// Rota para cadastrar produto
app.post("/produtos", (req, res) => {
  const { nome, preco, categoria } = req.body;
  const query = "INSERT INTO produtos (nome, preco, categoria) VALUES (?, ?, ?)";
  db.query(query, [nome, preco, categoria], (err, result) => {
    if (err) return res.status(500).send(err);
    const produtoId = result.insertId;

    // Gerar QR Code
    const qrCodeData = { id: produtoId, nome, preco, categoria };
    qrcode.toDataURL(JSON.stringify(qrCodeData), (err, qrCode) => {
      if (err) return res.status(500).send(err);
      res.json({ produtoId, qrCode });
    });
  });
});

// Rota para listar produtos
app.get("/produtos", (req, res) => {
  db.query("SELECT * FROM produtos", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(3001, () => {
  console.log("Backend rodando na porta 3001!");
});
