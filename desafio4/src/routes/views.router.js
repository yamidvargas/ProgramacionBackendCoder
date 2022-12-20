import { Router } from "express";
import { productManager } from "../Managers/index.js";
const router = Router();
// GET 
router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const user = {
            name: 'Yamid',
            lastname: 'Vargas',
            status: true
        };
        res.render('home', {
            user: user,
            style: 'style.css',
            isLogged: user.status === true,
            products,
        });
    }
    catch (error) {
        console.log(error);
        res.send({ Succes: false, error: "se produjo un error, porfavot  intenta mas tarde" });
    }
});
// Ruta para uso de Socket - 
router.get("/realtimeproducts", async (req, res) => {
    try {
        const user = {
            name: 'yamid ',
            lastname: 'vargas',
            status: true
        };
        return res.render("realTimeProducts", {
            style: "style.css",
            user: user,
            isLogged: user.status === true
        });
    }
    catch (error) {
        console.log(error);
        res.send({ Succes: false, error: "se produjo un error intenta mas tarde" });
    }
});
// POST
// Crear nuevo producto
router.post("/realtimeproducts", async (req, res) => {
    try {
        const user = {
            name: 'yamid ',
            lastname: 'vargas ',
            status: true
        };
         // Enviar peticion dentro del POST
        return res.render("realTimeProducts", {
            style: "style.css",
            user: user,
            isLogged: user.status === true
        });
    }
    catch (error) {
        console.log(error);
        if (error.name === ERRORS.VALIDATION_ERROR) {
            return res.send({ Succes: false, error: `${error.name}: ${error.message}` });
        }
        res.send({ Succes: false, error: "se produjo un error, intenta mas tarde" });
    }
});
router.delete("/realtimeproducts/:pid", async (req, res) => {
    try {
    }
    catch (error) {
    }
});
export default router;
