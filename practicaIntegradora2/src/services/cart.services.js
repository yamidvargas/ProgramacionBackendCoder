import cartModel from "../models/carts.model.js";
export class CartService {
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
                    .populate("car.product")
                    .lean();
                if (!cart) {
                    throw new Error("CART NOT FOUND");
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
                const findCart = await cartModel.findById({ _id: cid });
                const findProductInCart = await cartModel.findOne({
                    "car.product": pid,
                });
                if (findProductInCart) {
                    const upgradeQuantity = await cartModel.updateOne({
                        "car.product": pid
                    }, {
                        $inc: {
                            "car.$.quantity": 1,
                        },
                    });
                    return upgradeQuantity;
                }
                const addProduct = findCart.car.push({ product: pid, quantity: 1 });
                const result = await cartModel.updateOne({ _id: cid }, findCart);
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
                    throw new Error("CART NOT FOUND");
                }
                const upgradeQuantity = await cartModel.updateOne({
                    "cart.product": pid,
                }, {
                    $inc: {
                        "cart.$.quantity": quantity,
                    },
                });
                if (!upgradeQuantity) {
                    throw new Error("PRODUCT NOT FOUND IN CART");
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
                        car: { product: pid },
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
                        car: [],
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
