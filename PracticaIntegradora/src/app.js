import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import __dirname from "./dirname.js";
import myRoutes from "./routes/myRoutes.js";
import { Server } from "socket.io";
// variables de entorno y servidor
const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`servidor corriendo en puerto: ${PORT}`);
});
const io = new Server(httpServer);
//mongodb
mongoose.connect("mongodb+srv://yamid:admin@cluster0.7oqy0jz.mongodb.net/ecommerce", err => {
    if (err) {
        console.error(err);
        process.exit();
    }
});
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    req.io = io;
    return next();
});
app.use(express.static(__dirname+"/public") )
//configurar el motor de plantilla
app.engine("hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
}));
// handlebars
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
//rutas
myRoutes(app);
// socket
//socket(io);
