import { Router } from "express";
import { productModel } from "../DAO/models/products.models.js";
const router = Router();
router.get("/", async (req, res) => {
    try {
        const product = await productModel.find();
        res.status(201).send({ status: "correcto", products: product });
    }
    catch (error) {
        console.error(error);
    }
});
router.get("/:pid", async (req, resp) => {
    try {
        const { pid } = req.params;
        const productFind = await productModel.findById({ _id: pid });
        if (!productFind) {
            resp.send({ error: "id de articulo no encontrado " });
        }
        else {
            resp.send(productFind);
        }
    }
    catch (error) {
        resp.send({ status: "error en el formato ingresado del Id" });
        console.log(error);
    }
});
//ruta post para agregar productos
router.post("/", async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnail, } = req.body;
        productModel.create({ title, description, code, price, status, stock, category, thumbnail }, function (err) {
            if (err)
                return console.error(err);
        });
        res.send({ status: "producto agregado correcamente" });
    }
    catch (error) {
        console.log(error);
    }
});
router.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
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
        await productModel.updateOne({ pid }, productEdited);
        res.send({ status: "producto editado correctamente" });
    }
    catch (error) {
        console.log(error);
    }
});
router.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productModel.deleteOne({ _id: pid });
        // console.log(product)
        if (!product) {
            res.send({ status: "id de producto no encontrado" });
        }
        res.json({ status: "producto eliminado correctamente" });
    }
    catch (error) {
        console.log(error);
    }
});
export default router;
