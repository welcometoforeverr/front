const express = require('express');
const app = express();
const cors = require('cors');

// Подключаем Swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(cors({ origin: "http://localhost:3001" }));
app.use(express.json());

// Массив ТОВАРОВ (10 штук)
let products = [
    { 
        id: 1, 
        title: "Наушники", 
        category: "Аудио", 
        description: "Беспроводные наушники с шумоподавлением", 
        price: 5000, 
        stock: 15,
        imageUrl: "/images/headphones.jpg"  // ← вот так
    },
    { 
        id: 2, 
        title: "Мышка", 
        category: "Периферия", 
        description: "Игровая мышь с подсветкой", 
        price: 1500, 
        stock: 30,
        imageUrl: "/images/mouse.jpg"
    },
    { 
        id: 3, 
        title: "Клавиатура", 
        category: "Периферия", 
        description: "Механическая клавиатура", 
        price: 3500, 
        stock: 20,
        imageUrl: "/images/keyboard.jpg"
    },
    { 
        id: 4, 
        title: "Монитор", 
        category: "Дисплеи", 
        description: "27 дюймов, 4K, IPS", 
        price: 25000, 
        stock: 8,
        imageUrl: "/images/monitor.jpg"
    },
    { 
        id: 5, 
        title: "Ноутбук", 
        category: "Компьютеры", 
        description: "Игровой ноутбук, RTX 3060", 
        price: 75000, 
        stock: 5,
        imageUrl: "/images/laptop.jpg"
    },
    { 
        id: 6, 
        title: "Колонки", 
        category: "Аудио", 
        description: "Портативная колонка Bluetooth", 
        price: 3000, 
        stock: 12,
        imageUrl: "/images/speakers.jpg"
    },
    { 
        id: 7, 
        title: "Веб-камера", 
        category: "Периферия", 
        description: "Full HD, автофокус", 
        price: 4000, 
        stock: 7,
        imageUrl: "/images/webcam.jpg"
    },
    { 
        id: 8, 
        title: "Микрофон", 
        category: "Аудио", 
        description: "Конденсаторный микрофон", 
        price: 6000, 
        stock: 4,
        imageUrl: "/images/microphone.jpg"
    },
    { 
        id: 9, 
        title: "SSD диск", 
        category: "Комплектующие", 
        description: "1TB NVMe", 
        price: 8000, 
        stock: 18,
        imageUrl: "/images/ssd.jpg"
    },
    { 
        id: 10, 
        title: "Оперативная память", 
        category: "Комплектующие", 
        description: "16GB DDR4", 
        price: 5500, 
        stock: 22,
        imageUrl: "/images/ram.jpg"
    }
];

// Swagger definition - ОПИСАНИЕ API
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API интернет-магазина',
            version: '1.0.0',
            description: 'API для управления товарами в интернет-магазине',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Локальный сервер',
            },
        ],
    },
    // Путь к файлам с JSDoc-комментариями (текущий файл)
    apis: ['./app.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Подключаем Swagger UI по адресу /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - category
 *         - description
 *         - stock
 *       properties:
 *         id:
 *           type: integer
 *           description: Уникальный ID товара
 *         title:
 *           type: string
 *           description: Название товара
 *         category:
 *           type: string
 *           description: Категория товара
 *         description:
 *           type: string
 *           description: Описание товара
 *         price:
 *           type: number
 *           description: Цена товара
 *         stock:
 *           type: integer
 *           description: Количество на складе
 *       example:
 *         id: 1
 *         title: "Наушники"
 *         category: "Аудио"
 *         description: "Беспроводные наушники с шумоподавлением"
 *         price: 5000
 *         stock: 15
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Возвращает список всех товаров
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Список товаров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
app.get('/products', (req, res) => res.json(products));

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Получает товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Данные товара
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 */
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    product ? res.json(product) : res.status(404).send("Товар не найден");
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Создает новый товар
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - category
 *               - description
 *               - stock
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Товар успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
app.post('/products', (req, res) => {
    const newProduct = { 
        id: Date.now(), 
        ...req.body 
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Обновляет товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID товара
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Обновленный товар
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 */
app.patch('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (product) {
        Object.assign(product, req.body);
        res.json(product);
    } else {
        res.status(404).send("Товар не найден");
    }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Удаляет товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Товар удален
 *       404:
 *         description: Товар не найден
 */
app.delete('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) {
        return res.status(404).send("Товар не найден");
    }
    products = products.filter(p => p.id != req.params.id);
    res.send("Товар удален");
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
console.log('Swagger UI available at http://localhost:3000/api-docs');