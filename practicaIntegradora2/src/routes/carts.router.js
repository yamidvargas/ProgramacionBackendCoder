import Router from "express";
import cartServices from "../services/cart.services.js";
const router = Router();
// Mostrar todos los carritos
router.get("/", async (req, res) => {
    try {
        const carts = await cartServices.getCarts();
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
router.post("/", async (req, res) => {
    try {
        const result = await cartServices.createCart();
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
router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const result = await cartServices.getCartById(cid);
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
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const result = await cartServices.addProductToCart(cid, pid);
        //console.log("78 cartRouter el resultado",result)
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
router.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const result = await cartServices.deleteProductFromCart(cid, pid);
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
router.put("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const products = req.body;
        const result = await cartServices.addArrayOfProudcts(cid, products);
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
router.put("/:cid/product/:pid", async (req, res) => {
    try {
        const { quantity } = req.body;
        const { cid, pid } = req.params;
        const result = await cartServices.addQuantityToProduct(quantity, cid, pid);
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
router.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const result = await cartServices.emptyCart(cid);
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
export default router;
