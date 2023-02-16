import express from "express";
import Managers from "../DAO/managers/indexManager.js";
const Router = express.Router();
//Mostrar todos los productos
Router.get("/", async (req, res) => {
    try {
        const { limit, page, sort, query } = req.query;
        const options = {
            limit: limit || 5,
            page: page || 1,
            sort: { price: sort } || { price: 1 },
            lean: true,
        };
        const result = await Managers.productsManager.getProducts(query, options);
        const response = {
            status: "succes",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}` : null,
            nextLink: result.hasNextPage ? `/products?page=${result.nextPage}` : null,
        };
        res.render("home", {
            style: "styles.css",
            response,
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
//Mostrar un producto detallado
Router.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await Managers.productsManager.getProductById(pid);
        res.render("productDetail", {
            style: "styles.css",
            product,
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
//Muestra un carrito
Router.get("/carts/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const result = await Managers.cartsManager.getCartById(cid);
        const cart = result.car;
        res.render("cart", {
            style: "styles.css",
            cart,
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
export default Router;
