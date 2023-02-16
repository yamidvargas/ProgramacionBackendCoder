import { Router } from "express";
import { userManager } from "../DAO/managers/indexManager.js";
const router = Router();
router.get("/", (req, res) => {
    res.render("user", {
        style: "styles.css",
    });
});
router.get("/register", (req, res) => {
    res.render("register", {
        style: "styles.css",
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
        res.redirect("/products");
    }
    catch (error) {
        console.log(error);
        res.redirect("/register");
    }
});
router.get("/login", async (req, res) => {
    try {
        res.render("login");
    }
    catch (error) { }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password, "mis datos");
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            req.session.user = {
                first_name: "admin",
            };
            req.session.user.role = "admin";
            const users = await userManager.getAllUser();
            console.log(users);
            return res.render("admin", { users });
            // return res.redirect("/products");
        }
        const user = await userManager.userLogin(email, password);
        console.log(user);
        if (!user) {
            res.status(401);
        }
        req.session.user = user;
        res.redirect("/products");
    }
    catch (error) {
        console.log(error);
    }
});
router.get("/logout", (req, res) => {
    req.session.destroy((err) => res.send(err));
});
export default router;
