import express from "express";
import routerProducts from "./routes/products.router.js";
import routeCarts from "./routes/carts.router.js";
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import { productManager } from "./Managers/index.js";
import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js';
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const httpServer = app.listen(8080, () => {
    console.log(`servidor escuchando en puert: ${PORT}`);
});
const io = new Server(httpServer);
app.use((req, res, next) => {
    req.io = io;
    return next();
});
// Ruta Static
app.use(express.static(__dirname + '/public'));
// Handlebars 
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use("/api/products", routerProducts);
app.use("/api/carts", routeCarts);
// Views
app.use('/', viewsRouter);
io.on('connection', async (socket) => {
    console.log(`New client connected,  ID:`, socket.id);
    socket.on('message', data => {
        console.log(`From Client:`, data);
    });
    socket.emit('message', `app.js`);
    const products = await productManager.getProducts();
    socket.emit('getProducts', products); // Productos van hacía index.js - socket.on
    socket.on('newProduct', async (product) => {
        console.log(`From newProduct:`, product); // Productos vienen DESDE el front
    });
});
