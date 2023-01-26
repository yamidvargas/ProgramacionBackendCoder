import express from "express"
import routerProducts from "./routes/products.router.js";
import routeCarts from "./routes/carts.router.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { productManager } from "./Managers/index.js";
import {ViewsRouter} from "./routes/views.router.js";
import __dirname from "./utils.js";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
const PORT = 8080;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);



// Handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
  })
);

app.use(express.static("/public"));

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.set("io", io);
app.use("/", ViewsRouter);
app.use("/api/products", routerProducts);
app.use("/api/carts", routeCarts);

const server = httpServer.listen(PORT, () =>
  console.log(`servidor conectado correcctamente a puerto ${PORT}`)
);

server.on("error", (error) => {
  console.log(error);
});

io.on("connection", async (socket) => {
  console.log(`nuevo cliente conectado, id: ${socket.id}`);

  io.sockets.emit("hello", "HOLA!");

  const products = await productManager.getProducts();
  
  io.sockets.emit("products", products);

  socket.on("addProduct", async (product) => {
    try {
      await productManager.addProduct(product);

      // volvemos a enviar todos los productos
      io.sockets.emit("products", await productManager.getProducts());
    } catch (error) {
      console.log(error);
    }
  });
});
