import express from "express";
import { ProductManager } from "./ProductManager2.js";
const app = express();
const port = 8080;
const misproductos = new ProductManager("productos.txt");
let allProducts = misproductos.getProducts();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/products", async (req, res) => {
    const { limit } = req.query;
    console.log(typeof limit);
    const allProducts = await misproductos.getProducts();
    if (!limit) {
        const prueba = 1;
        return res.send(allProducts);
    }
    //const productsQuery =await allProducts.
    const productsQuery = allProducts.slice(0, limit);
    res.send(productsQuery);
});
app.get("/products/:pid", async (req, res) => {
    const pid = parseInt(req.params.pid);
    const searchProduct = await misproductos.getProductById(pid);
    if (!searchProduct) {
        return res.send({ error: "producto no encontrado" });
    }
    console.log(searchProduct);
    return res.send(searchProduct);
});
app.listen(port, () => {
    console.log(`Conectado correctamente a puerto ${port}`);
});
