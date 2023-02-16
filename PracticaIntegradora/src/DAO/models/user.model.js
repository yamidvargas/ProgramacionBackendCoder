import mongoose from "mongoose";
//definir nombre de la collection
const userCollection = "users";
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});
export const userModel = mongoose.model(userCollection, userSchema);
