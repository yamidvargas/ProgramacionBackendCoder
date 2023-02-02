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
        console.log(user);
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
export default router;
