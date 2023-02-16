import { Router } from "express";
import { cartManager, productManager } from "../DAO/Managers/index.js";
const router = Router();
router.get("/:cid", async (req, resp) => {
    const { cid } = req.params;
    const id = Number(cid);
    const myCart = await cartManager.getCartByID(id);
    if (myCart === undefined) {
        resp.json({ status: "el id del carrito no existe, intenta con otro" });
    }
    else {
        resp.json(myCart);
    }
});
router.post("/", (req, res) => {
    const createCart = cartManager.addCart();
    return res.json({ status: "carrito creado correctamente" });
});
router.post("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const idCart = Number(cid);
    const idProduct = Number(pid);
    const addProduct = await cartManager.addItem(idCart, idProduct);
    const ProductoBD = await productManager.getProductById(idProduct);
    if (ProductoBD === "Not Found") {
        res.json({ status: "id de producto no encontrado intenta con otro" });
    }
    else {
        if (addProduct === "no hay stock") {
            res.send({ status: "no hay stock para este producto" });
        }
        else {
            console.log("en el carrito ", addProduct);
            return res.json({ status: "producto agregado a carrito correctamente" });
        }
    }
});
export default router;
