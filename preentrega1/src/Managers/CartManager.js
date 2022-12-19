import fs from "fs";
import { productManager } from "./index.js";
export class CartManager {
    constructor(path) {
        this.path = path;
        if (fs.existsSync(this.path)) {
            this.cart = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        }
        else {
            fs.writeFileSync(this.path, JSON.stringify([]));
            this.cart = [];
        }
    }
    GenIDCart() {
        if (this.cart.length > 0) {
            this.cart.id = this.cart.length + 1;
        }
        else {
            this.cart.id = 1;
        }
        return this.cart.id;
    }
    addCart() {
        const NewCart = {
            idCart: this.GenIDCart(),
            products: [],
        };
        this.cart.push(NewCart);
        fs.writeFileSync(this.path, JSON.stringify(this.cart, null, 3));
        return true;
    }
    async addItem(idCartFind, idProduct) {
        const NewProduct = {
            product: idProduct,
            quantity: 1,
        };
        //tomamos todos los carts con sus ids
        const allCarts = await this.getAllCarts();
        //verificar si el id del carro existe
        const idCarts = await allCarts.find((idC) => {
            return idC.idCart === idCartFind;
        });
        if (idCarts === undefined) {
            console.log("el id no existe");
            return undefined;
        }
        //tomamos todos los productos guardados en base de datos
        const allProductos = await productManager.getProducts();
        //verificamos el id del producto a agregar con sus datos correspondientes
        const productFind = allProductos.find((pid) => {
            return pid.id === idProduct;
        });
        //verificamos si el id corresponde a algun producto guardado en base de datos
        if (productFind === undefined) {
            console.log("el id de producto no existe ");
            return undefined;
        }
        //verificamos si el producto ya esta agregado en el carrito
        const productDuplicate = await idCarts.products.find((id) => {
            return id.id === idProduct;
        });
        // console.log(productDuplicate)
        if (productDuplicate == undefined) {
            idCarts.products.push({
                id: productFind.id,
                quantity: 1
            });
        }
        else {
            if (productFind.stock > 0) {
                productDuplicate.quantity++;
                productFind.stock--;
            }
            else {
                return "no hay stock";
            }
            //modificamos el stock disponible en base de datos
            productManager.updateProduct(idProduct, productFind);
        }
        fs.writeFileSync(this.path, JSON.stringify(allCarts));
        return allCarts;
    }
    async getAllCarts() {
        const allCarts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        return allCarts;
    }
    async getCartByID(idB) {
        const allCarts = await this.getAllCarts();
        const myCart = await allCarts.find((idC) => { return idC.idCart == idB; });
        console.log(myCart);
        if (myCart === undefined) {
            return undefined;
        }
        else {
            return myCart;
        }
    }
}
