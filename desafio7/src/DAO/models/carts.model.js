import mongoose from "mongoose";
const Schema = mongoose.Schema;
const cartsCollections = "carts";
const cartSchema = new Schema({
    car: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products",
                },
                quantity: {
                    type: Number,
                    default: 1
                },
            },
        ],
        default: [],
    },
});
/* cartSchema.pre("findById", () => {
  this.populate("cart.product");
}); */
const cartsModel = mongoose.model(cartsCollections, cartSchema);
export default cartsModel;
