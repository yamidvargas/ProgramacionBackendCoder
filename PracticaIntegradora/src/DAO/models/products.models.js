import mongoose from "mongoose";
//definir nombre de la collection
const productCollection = "products";
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnail: String,
});
export const productModel = mongoose.model(productCollection, productSchema);
