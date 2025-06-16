const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let menuItems = [
  { id: 1, name: 'Margherita Pizza', price: 12.99, category: 'Main' },
  { id: 2, name: 'Caesar Salad', price: 8.99, category: 'Starter' }
];

app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

app.post('/api/menu', (req, res) => {
  const item = {
    id: menuItems.length + 1,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  };
  menuItems.push(item);
  res.status(201).json(item);
});

app.put('/api/menu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = menuItems.findIndex(item => item.id === id);
  if (itemIndex === -1) return res.status(404).json({ error: 'Item not found' });
  menuItems[itemIndex] = { id, ...req.body };
  res.json(menuItems[itemIndex]);
});

app.delete('/api/menu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  menuItems = menuItems.filter(item => item.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});