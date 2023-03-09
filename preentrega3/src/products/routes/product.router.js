import express from "express";
const Router = express.Router();
import { getAllProductsCtr, getProductByIdCtr, addNewProductCar, updateProductCtr, deleteProductCtr, } from "../controllers/products.controlles.js";
//Mostrar todos los productos
Router.get("/", getAllProductsCtr);
//Traer un solo prodcuto por id
Router.get("/:pid", getProductByIdCtr);
//Agrego un nuevo producto que llega por req.body
Router.post("/", addNewProductCar);
//Actualizar un producto
Router.put("/:pid", updateProductCtr);
//Eliminar un producto
Router.delete("/:pid", deleteProductCtr);
export default Router;
