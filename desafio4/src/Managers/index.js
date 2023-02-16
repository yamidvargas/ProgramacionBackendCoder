import { ProductManager } from "./ProductManager.js";
import { CartManager } from "./CartManager.js";

export const productManager = new ProductManager("./db/productos.json");
export const cartManager = new CartManager("./db/carritos.json");

