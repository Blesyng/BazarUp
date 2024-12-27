-- Criar o usuário com senha (se aplicável ao seu ambiente)
CREATE USER IF NOT EXISTS '@MYSQL_USER'@'%' IDENTIFIED WITH caching_sha2_password BY '@MYSQL_PASSWORD';
GRANT ALL PRIVILEGES ON `@MYSQL_DATABASE`.* TO '@MYSQL_USER'@'%';
FLUSH PRIVILEGES;

-- Rest of your SQL...


-- Tabela de Usuários (Vendedores)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(15),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Clientes (Consignadores)
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    telefone VARCHAR(15),
    endereco TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Produtos
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
    foto LONGBLOB,
    qrcode VARCHAR(255) NOT NULL UNIQUE,
    cliente_id INT,
    usuario_id INT NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela de Vendas
CREATE TABLE vendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL,
    cliente_id INT,
    usuario_id INT NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
    valor_total DECIMAL(10, 2) NOT NULL,
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela de Consignações (Corrigida)
CREATE TABLE consignacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    produto_id INT NOT NULL,
    valor_venda DECIMAL(10, 2) NOT NULL,
    data_consignacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Nova coluna para data de consignação
    data_venda TIMESTAMP NULL, --  Permitir nulo, pois a venda pode não ter ocorrido ainda
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
);

-- Tabela de Configurações (para armazenar a comissão do brechó)
CREATE TABLE configuracoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chave VARCHAR(255) UNIQUE,
    valor VARCHAR(255)
);

-- Inserir a comissão do brechó (ajuste conforme necessário)
INSERT INTO configuracoes (chave, valor) VALUES ('comissao_brecho', '0.60');


