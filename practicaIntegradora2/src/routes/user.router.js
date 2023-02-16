import { Router } from "express";
import passport from "passport";
import { getRegister, userLogout, createUserPassport, loginUserGithub, loginUserPassport } from "../controllers/user.controllers.js";
const router = Router();
//home
router.get("/", (req, res) => {
    res.render("user", {
        style: "styles.css",
    });
});
// ver formulario de registro
router.get("/register", getRegister);
//creacion de nuevo Usuario
router.post("/create", passport.authenticate("register", { failureRedirect: "/register" }), createUserPassport);
//ver formulario de login
router.get("/login", async (req, res) => {
    try {
        res.render("login");
    }
    catch (error) { }
});
//formulario de login para iniciar sesion 
router.post("/login", passport.authenticate("login", { failureRedirect: "/login" }), loginUserPassport);
//login with GitHub
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), loginUserGithub);
router.get("/logout", userLogout);
export default router;
