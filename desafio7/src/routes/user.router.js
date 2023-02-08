import { Router } from "express";
import passport from "passport";
import { userManager } from "../DAO/managers/indexManager.js";
import { isValidPassword } from "../utils/bcrypt.js";
import userModel from "../DAO/models/user.models.js";
import { getRegister, userLogout, createUserPassport } from "../controllers/user.controllers.js";
const router = Router();
router.get("/", (req, res) => {
    res.render("user", {
        style: "styles.css",
    });
});
router.get("/register", getRegister);
//creacion de nuevo Usuario
router.post("/create", passport.authenticate("register", { failureRedirect: "/register" }), createUserPassport);
router.get("/login", async (req, res) => {
    try {
        res.render("login");
    }
    catch (error) { }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userDB = await userModel.findOne({ email }).lean().exec();
        if (!userDB) {
            return res.status(401).send({ login: "failed" });
        }
        if (!isValidPassword(userDB, password)) {
            res.status(403).send({ status: "Incorrect password" });
        }
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
        delete userDB.password;
        req.session.user = userDB;
        res.redirect("/products");
    }
    catch (error) {
        console.log(error);
    }
});
//login with GitHub
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/logout", userLogout);
export default router;
