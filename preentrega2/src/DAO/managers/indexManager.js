import { ProductManager } from "./productManager.js";
import { CartManager } from "./cartManager.js";
export const productManager = new ProductManager("./db/productos.json");
export const cartManager = new CartManager("./db/carritos.json");
