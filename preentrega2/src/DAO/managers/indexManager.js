import { ProductManager } from "./productManager.js";
import { CartManager } from "./cartManager.js";
export const productsManager = new ProductManager();
export const cartsManager = new CartManager();
export default {
    productsManager,
    cartsManager,
};
