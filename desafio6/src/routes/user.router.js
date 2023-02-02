import { Router } from "express";
import { userManager } from "../DAO/managers/indexManager.js";
const router = Router();
router.get("/", (req, res) => {
    res.render("user", {
        style: "styles.css"
    });
});
router.get("/register", (req, res) => {
    res.render("register", {
        style: "styles.css"
    });
});
//creacion de nuevo Usuario
router.post("/create", async (req, res) => {
    try {
        const newUser = req.body;
        const user = await userManager.userCreate(newUser);
        if (!user) {
            return res.redirect("/user/register");
        }
        res.redirect("/user");
    }
    catch (error) {
        console.log(error);
        res.redirect("/register");
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            req.session.user = {
                first_name: "admin",
            };
            req.session.user.role = "admin";
            return res.redirect("/home/products");
        }
        const user = await Manager.UsersManager.userLogin(email, password);
        if (!user) {
            res.status(401, { error: "Usuario o contrasena incorrecta" });
            return res.render("login", {});
        }
        req.session.user = user;
        res.redirect("/home/products");
    }
    catch (error) {
        console.log(error);
    }
});
export default router;
