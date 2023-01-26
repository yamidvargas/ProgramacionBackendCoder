import { NotFoundError } from "../../utils/error.js";
import userModel from "../models/user.model.js";
export class UserManager {
    constructor() {
        //▼Crear un nuevo usuario
        this.userCreate = async (newUserData) => {
            try {
                const result = await userModel.create(newUserData);
                if (!result) {
                    throw new Error("FAILED TO ADD TO DATABASE");
                }
                return result;
            }
            catch (error) {
                console.log(error);
            }
        };
        //▼Loguear usuario
        this.userLogin = async (email, password) => {
            try {
                const result = await userModel.findOne({ email, password }).lean();
                if (!result) {
                    throw new NotFoundError("USER NOT FOUND");
                }
                return result;
            }
            catch (error) {
                console.log(error);
            }
        };
        this.getAllUser = async () => {
            try {
                const result = await userModel.find().lean();
                if (!result) {
                    throw new NotFoundError("USERS NOT FOUND");
                }
                return result;
            }
            catch (error) {
                console.log(error);
            }
        };
    }
}
