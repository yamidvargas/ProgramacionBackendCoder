import cartModel from "../models/carts.model.js";
import { NotFoundError } from "../../utils/error.js";
export class CartManager {
    constructor() {
        //▼ Al iniciar la instancia se crea un cart
        this.createCart = async () => {
            try {
                const newCart = {
                    cart: [],
                };
                const result = await cartModel.create(newCart);
                return result;
            }
            catch (error) {
                console.log(error);
            }
        };
        //▼ Muestra los carritos
        this.getCarts = async () => {
            try {
                const carts = await cartModel.find();
                if (!carts) {
                    throw new NotFoundError("NO CARTS IN DATABASE");
                }
                return carts;
            }
            catch (error) {
                console.log(error);
            }
        };
        //▼ Muestra el carrito
        this.getCartById = async (cid) => {
            try {
                const cart = await cartModel
                    .findById({ _id: cid })
                    .populate("cart.product")
                    .lean();
                if (!cart) {
                    throw new NotFoundError("CART NOT FOUND");
                }
                return cart;
            }
            catch (error) {
                console.log(error);
            }
        };
        //▼Agrega un prodcuto al carrito
        this.addProductToCart = async (cid, pid) => {
            try {
                const findCart = await cartModel.findOne({ _id: cid }).lean();
                const findProductInCart = await cartModel.findOne({
                    "products.product": pid,
                });
                if (findProductInCart) {
                    const upgradeQuantity = await cartModel.updateOne({
                        "products.product": pid
                    }, {
                        $inc: {
                            "product.$.quantity": 1,
                        },
                    });
                    return upgradeQuantity;
                }
                findCart.products.push({ product: pid, quantity: 1 });
                const result = await cartModel.updateOne({ _id: cid }, findCart);
                console.log("el find", findCart);
                return result;
            }
            catch (error) {
                console.log(error);
            }
        };
        //▼Actualiza cantidad de un producto
        this.addQuantityToProduct = async (quantity, cid, pid) => {
            try {
                const findCart = await cartModel.findById({
                    _id: cid,
                });
                if (!findCart) {
                    throw new NotFoundError("CART NOT FOUND");
                }
                const upgradeQuantity = await cartModel.updateOne({
                    "cart.product": pid,
                }, {
                    $inc: {
                        "cart.$.quantity": quantity,
                    },
                });
                if (!upgradeQuantity) {
                    throw new NotFoundError("PRODUCT NOT FOUND IN CART");
                }
                return upgradeQuantity;
            }
            catch (error) {
                console.log(error);
            }
        };
        //▼Agregar un array de productos al carrito
        this.addArrayOfProudcts = async (cid, products) => {
            try {
                const productsMap = products.map((product) => {
                    return { product: product._id };
                });
                const result = await cartModel.updateOne({ _id: cid }, {
                    $push: {
                        cart: { $each: productsMap },
                    },
                });
                return result;
            }
            catch (error) {
                console.log(error);
            }
        };
        //▼Elimina un producto
        this.deleteProductFromCart = async (cid, pid) => {
            try {
                const deleteOne = await cartModel.updateOne({ _id: cid }, {
                    $pull: {
                        cart: { product: pid },
                    },
                });
                return deleteOne;
            }
            catch (error) {
                console.log(error);
            }
        };
        //▼Vaciar el carrito
        this.emptyCart = async (cid) => {
            try {
                const emptyCart = await cartModel.updateOne({
                    _id: cid,
                }, {
                    $set: {
                        cart: [],
                    },
                });
                return emptyCart;
            }
            catch (error) {
                console.log(error);
            }
        };
    }
}
