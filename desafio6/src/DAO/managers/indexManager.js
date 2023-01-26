import { ProductManager } from "./productManager.js";
import { CartManager } from "./cartManager.js";
import { UserManager } from "./userManager.js";
export const productsManager = new ProductManager();
export const cartsManager = new CartManager();
export const userManager = new UserManager();
export default {
    productsManager,
    cartsManager,
    userManager
};
