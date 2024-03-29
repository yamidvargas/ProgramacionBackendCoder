import express from "express";
import routerProducts from "./routes/products.router.js";
import routeCarts from "./routes/carts.router.js";
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", routerProducts);
app.use("/api/carts", routeCarts);
app.listen(port, () => {
    try {
        console.log(`conectado a servidor desde el puerto ${port}`);
    }
    catch (error) {
        console.log(error);
    }
});
