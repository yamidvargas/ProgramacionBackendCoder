import { connect, set } from "mongoose";
import { config } from "dotenv";
export const process = config().parsed;
export const MONGOOSE_URI = "mongodb+srv://yamid:admin@cluster0.7oqy0jz.mongodb.net/?retryWrites=true&w=majority";
export const connectDB = async () => {
    try {
        set("strictQuery", false);
        await connect(MONGOOSE_URI, { dbName: "ecommerce" });
        console.log("Connected to DB");
    }
    catch (error) {
        console.log(error);
    }
};
