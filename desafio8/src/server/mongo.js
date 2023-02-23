import { connect, set } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const conectMongoDB = async () => {
    try {
        set("strictQuery", false);
        await connect(process.env.MONGO_URI, { dbName: process.env.MONGO_DB });
        console.log("Connected to DB");
    }
    catch (error) {
        console.log(error);
    }
};
export default conectMongoDB;
