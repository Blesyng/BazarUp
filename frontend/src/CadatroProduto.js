import React, { useState } from "react";
import axios from "axios";

function CadastroProduto() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [qrCode, setQrCode] = useState("");

  const cadastrarProduto = async () => {
    try {
      const response = await axios.post("http://localhost:3001/produtos", {
        nome,
        preco,
        categoria,
      });
      setQrCode(response.data.qrCode);
      alert("Produto cadastrado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar produto.");
    }
  };

  return (
    <div>
      <h1>Cadastro de Produto</h1>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
      />
      <input
        type="text"
        placeholder="Categoria"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />
      <button onClick={cadastrarProduto}>Cadastrar</button>
      {qrCode && (
        <div>
          <h2>QR Code do Produto:</h2>
          <img src={qrCode} alt="QR Code" />
        </div>
      )}
    </div>
  );
}

export default CadastroProduto;
