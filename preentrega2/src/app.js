import express from "express";
import handlebars from 'express-handlebars';
import mongoose from "mongoose";
import { Server } from 'socket.io';
import __dirname from "./dirname.js";
import indexRouter from "./routes/index.routes.js";
const app = express();
const PORT = 8080;
// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// BodyParser configuration
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
// Static route configuration
app.use(express.static(__dirname + '/public'));
// Handlebars configuration 
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
// Routes configuration 
// PRODUCTS 
app.use("/", indexRouter);
// VIEWS 
//app.use('/', viewsRouter)
// Mongoose configuration
// DBaaS
// username: mchristello
// contraseña: matinho87
const MONGO_URL = 'mongodb+srv://yamid:admin@cluster0.7oqy0jz.mongodb.net/ecommerce';
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL, { dbName: 'ecommerce' }, error => {
    if (error) {
        console.log(`We have a problem trying to access the DB, ${error}`);
        process.exit();
    }
    console.log(`DB Connected...`);
    const httpServer = app.listen(PORT, () => {
        console.log(`Server up and running in port ${PORT}`);
    });
    // Socket.io logic.
    const io = new Server(httpServer); // Se crea el servidor Socket
    let messages = [];
    io.on('connection', async (socket) => {
        console.log(`New client connected, ID:`, socket.id);
        socket.on('message', data => {
            console.log(`From index.js:`, data);
        });
        socket.emit('message', `Esto viene desde app.js`);
        const products = await dbManager.getProducts();
        socket.emit('getProducts', products);
        // Escucha los mensajes de un user
        socket.on('message', data => {
            messages.push(data); // Guardamos el mensaje
            const saveMessage = messageModel(data);
            saveMessage.save();
            // Emitimos el mensaje para los demas
            io.emit('messageLogs', messages);
        });
    });
});
