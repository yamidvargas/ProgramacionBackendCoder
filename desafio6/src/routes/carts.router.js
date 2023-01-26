import express from "express";
import Managers from "../DAO/managers/indexManager.js";
const Router = express.Router();
// Mostrar todos los carritos
Router.get("/", async (req, res) => {
    try {
        const carts = await Managers.cartsManager.getCarts();
        res.send({
            status: "succes",
            payload: carts,
        });
    }
    catch (error) {
        console.log(error);
        res.send({
            status: "error",
            error: error.message || "SOMTHING WENT WRONG",
        });
    }
});
//Crea un nuevo carrito
Router.post("/", async (req, res) => {
    try {
        const result = await Managers.cartsManager.createCart();
        res.send({
            status: "succes",
            payload: result,
        });
    }
    catch (error) {
        console.log(error);
        res.send({
            status: "error",
            error: error.message || "SOMETHING WENT WRONG",
        });
    }
});
//Muestra un carrito en particular y sus productos
Router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const result = await Managers.cartsManager.getCartById(cid);
        if (!result) {
            return res.send({
                status: "error",
                error: "CART NOT FOUND",
            });
        }
        res.send({
            status: "succes",
            payload: result,
        });
    }
    catch (error) {
        console.log(error);
        res.send({
            status: "error",
            error: error.message || "SOMETHING WENT WRONG",
        });
    }
});
//Agrego un producto al carrito
Router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const result = await Managers.cartsManager.addProductToCart(cid, pid);
        console.log("el resultado", result);
        res.send({
            status: "succes",
            payload: result,
        });
    }
    catch (error) {
        console.log(error);
        res.send({
            status: "error",
            error: error.message || "SOMTHING WENT WRONG",
        });
    }
});
//Eliminar del carrito el producto seleccionado
Router.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const result = await Managers.cartsManager.deleteProductFromCart(cid, pid);
        res.send({
            status: "succes",
            payload: result,
        });
    }
    catch (error) {
        console.log(error);
        res.send({
            status: "error",
            error: error.message || "SOMETHING WENT WORNG",
        });
    }
});
//Agregar al carrito un array de productos
Router.put("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const products = req.body;
        const result = await Managers.cartsManager.addArrayOfProudcts(cid, products);
        res.send({
            status: "succes",
            payload: result,
        });
    }
    catch (error) {
        console.log(error);
        res.send({
            status: "error",
            error: error.message || "SOMTHING WENT WRONG",
        });
    }
});
//Actualizar la cantidad de un producto
Router.put("/:cid/product/:pid", async (req, res) => {
    try {
        const { quantity } = req.body;
        const { cid, pid } = req.params;
        const result = await Managers.cartsManager.addQuantityToProduct(quantity, cid, pid);
        res.send({
            status: "succes",
            payload: result,
        });
    }
    catch (error) {
        console.log(error);
        res.send({
            status: "error",
            error: error.message || "SOMTHING WENT WRONG",
        });
    }
});
//Vaciar el carrito
Router.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const result = await Managers.cartsManager.emptyCart(cid);
        res.send({
            status: "succes",
            payload: result,
        });
    }
    catch (error) {
        console.log(error);
        res.send({
            status: "error",
            error: error.message || "SOMTHING WENT WRONG",
        });
    }
});
export default Router;
