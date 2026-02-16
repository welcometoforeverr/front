const express = require('express');
const app = express();
app.use(express.json());

// 1. Массив ТОВАРОВ (id, название, стоимость)
let products = [
    { id: 1, title: "Наушники", price: 5000 },
    { id: 2, title: "Мышка", price: 1500 }
];

// Просмотр всех товаров
app.get('/products', (req, res) => res.json(products));

// Просмотр товара по id
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    product ? res.json(product) : res.status(404).send("Товар не найден");
});

// Добавление товара
app.post('/products', (req, res) => {
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Редактирование товара (PATCH)
app.patch('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (product) {
        Object.assign(product, req.body);
        res.json(product);
    } else {
        res.status(404).send("Товар не найден");
    }
});

// Удаление товара
app.delete('/products/:id', (req, res) => {
    products = products.filter(p => p.id != req.params.id);
    res.send("Товар удален");
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
