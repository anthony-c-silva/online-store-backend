const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Inicializa o banco de dados SQLite
const db = new sqlite3.Database('online-store.db');

// Cria a tabela de produtos
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT
    )`);
  
    // Insere alguns dados de exemplo na tabela de produtos
    const insertProducts = db.prepare(`
      INSERT INTO products (name, price, description) VALUES (?, ?, ?)
    `);
  
    for (let i = 0; i < 1000; i++) {
      insertProducts.run(`Produto ${i}`, Math.random() * 100, `Descrição do produto ${i}`);
    }
    
    insertProducts.finalize();
});

// Rota para listar todos os produtos
app.get('/products', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro interno do servidor');
      return;
    }
    res.json(rows);
  });
});

// Rota para adicionar um produto
app.post('/products', (req, res) => {
  const { name, price, description } = req.body;
  db.run('INSERT INTO products (name, price, description) VALUES (?, ?, ?)', [name, price, description], function(err) {
    if (err) {
      console.error(err);
      res.status(500).send('Erro interno do servidor');
      return;
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
