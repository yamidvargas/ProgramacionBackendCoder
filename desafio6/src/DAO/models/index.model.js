import mongoose from "mongoose";
//definir nombre de la collection
const cartCollection = "carts";
const cartSchema = new mongoose.Schema({
    idCart: Number,
    products: Array
});
export const cartModel = mongoose.model(cartCollection, cartSchema);
