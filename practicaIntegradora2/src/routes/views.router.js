import Router from "express";
const router = Router();
import { getAllProducts, getErrorPage, getOneProduct, } from "../controllers/views.controlles.js";
import { passportCall } from "../utils/jwt.js";
//Mostrar todos los productos
router.get("/products", passportCall("jwt"), getAllProducts);
router.get("/products/:pid", passportCall("jwt"), getOneProduct);
router.get("/error", getErrorPage);
router.get("/carts/:cid");
router.get("/admin");
export default router;
