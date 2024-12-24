-- Criar o usuário com senha
CREATE USER '${MYSQL_USER}'@'%' IDENTIFIED WITH caching_sha2_password BY '${MYSQL_PASSWORD}';
GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO '${MYSQL_USER}'@'%';
FLUSH PRIVILEGES;

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
    foto LONGBLOB, -- Suporte para armazenar a imagem do produto
    qrcode VARCHAR(255) NOT NULL UNIQUE, -- QR Code único gerado para o produto
    cliente_id INT, -- Referência ao cliente que consignou a roupa
    usuario_id INT NOT NULL, -- Referência ao vendedor que cadastrou o produto
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela de Vendas
CREATE TABLE vendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL, -- Referência ao produto vendido
    cliente_id INT, -- Referência ao cliente consignador (se aplicável)
    usuario_id INT NOT NULL, -- Referência ao vendedor que realizou a venda
    quantidade INT NOT NULL DEFAULT 1,
    valor_total DECIMAL(10, 2) NOT NULL, -- Valor total da venda
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela de Relatórios de Consignação
CREATE TABLE consignacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL, -- Referência ao cliente consignador
    produto_id INT NOT NULL, -- Referência ao produto consignado
    valor_venda DECIMAL(10, 2) NOT NULL, -- Valor da venda
    valor_brecho DECIMAL(10, 2) NOT NULL, -- Valor que fica com o brechó
    valor_cliente DECIMAL(10, 2) NOT NULL, -- Valor que vai para o cliente consignador
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
);
