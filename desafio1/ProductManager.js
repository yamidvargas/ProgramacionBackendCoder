"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductManager = void 0;
class ProductManager {
    constructor() {
        ProductManager.products = [];
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return console.log('Todos los campos son obligatorios');
        }
        const product = {
            id: this.generateId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.verificarCodigo(product.code, product);
    }
    verificarCodigo(IdCode, product) {
        let nuevoArray = ProductManager.products;
        let arrayVerificado = nuevoArray.some((elemento) => {
            return elemento.code === IdCode;
        });
        if (arrayVerificado === true) {
            return console.error("error al agregar articulo, CODE duplicado");
        }
        else {
            console.log("agregado correctamente");
            ProductManager.products.push(product);
        }
    }
    generateId() {
        const count = ProductManager.products.length;
        const id = count > 0 ? ProductManager.products[count - 1].id + 1 : 1;
        return id;
    }
    getProducts() {
        return console.log(ProductManager.products);
    }
    getProductById(productId) {
        let arrayProductos = ProductManager.products;
        let arrayConIde = arrayProductos.filter((elemento) => {
            return elemento.id === productId;
        });
        if (arrayConIde.length >= 1) {
            console.log(arrayConIde);
        }
        else {
            console.log("Not Found");
        }
    }
}
exports.ProductManager = ProductManager;
const nuevo = new ProductManager();
nuevo.addProduct("sdf", "sdgsd", 123, "sdfsd", "sdffd", 23);
