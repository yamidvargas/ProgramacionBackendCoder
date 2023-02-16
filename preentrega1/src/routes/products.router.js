import { Router } from "express";
import { productManager } from "../Managers/index.js";
const router = Router();
//listar todos los productos
router.get("/", async (req, res) => {
    const { limit } = req.query;
    const allProducts = await productManager.getProducts();
    if (!limit) {
        return res.send(allProducts);
    }
    //const productsQuery =await allProducts.
    const productsQuery = allProducts.slice(0, limit);
    res.send(productsQuery);
});
//listar productos por id proporcionado
router.get("/:pid", async (req, resp) => {
    try {
        const { pid } = req.params;
        const id = Number(pid);
        const productFound = await productManager.getProductById(id);
        if (!productFound) {
            resp.json({ error: "id de articulo no encontrado " });
        }
        resp.json(productFound);
    }
    catch (error) {
        console.log(error);
    }
});
//ruta post para agregar productos
router.post("/", async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnail, } = req.body;
        const addProduct = await productManager.addProduct(title, description, code, price, status, stock, category, thumbnail);
        if (!addProduct) {
            return res.send("faltan datos");
        }
        return res.send({
            status: "OK",
            message: "Producto agregado correctamente",
        });
    }
    catch (error) {
        console.log(error);
    }
});
router.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const id = Number(pid);
        const { title, description, code, price, status, stock, category, thumbnail, } = req.body;
        const productEdited = {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail,
        };
        await productManager.updateProduct(id, productEdited);
        res.json("articulo editado correctamente");
    }
    catch (error) {
        console.log(error);
    }
});
router.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const id = Number(pid);
        productManager.deleteProduct(id);
        res.json({ status: "producto eliminado correctamente" });
    }
    catch (error) {
        console.log(error);
    }
});
export default router;
