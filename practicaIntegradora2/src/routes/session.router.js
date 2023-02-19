import express from "express";
import { getCurrentUser } from "../controllers/user.controllers.js";
import { authToken } from "../utils/jwt.js";
const Router = express.Router();
Router.get("/current", authToken, getCurrentUser);
export default Router;
