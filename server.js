const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();
const port = process.env.PORT || 3000;

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
  
    insertProducts.run('Camiseta', 29.99, 'Camiseta de algodão');
    insertProducts.run('Calça Jeans', 59.99, 'Calça jeans azul');
    insertProducts.run('Tênis', 79.99, 'Tênis esportivo');
    insertProducts.run('Mochila', 39.99, 'Mochila escolar');
    
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

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
