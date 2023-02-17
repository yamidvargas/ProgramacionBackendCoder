import { NotFoundError } from "../utils/error.js";
import userModel from "../models/user.models.js";
export class UserServices {
    constructor() {
        //Crear un nuevo usuario
        this.userCreate = async (newUserData) => {
            try {
                newUserData.password = await userModel.encryptPassword(newUserData.password);
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
        //Loguear usuario
        this.userLogin = async (email, password) => {
            try {
                const findUser = await userModel.findOne({ email }).lean();
                if (!findUser)
                    throw new NotFoundError("USER NOT FOUND");
                const passwordCompare = await userModel.comparePassword(password, findUser.password);
                if (!passwordCompare)
                    throw new NotFoundError("Invalid Password");
                return findUser;
            }
            catch (error) {
                console.log(error);
            }
        };
        //encontrar todos los usuarios
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
        this.getUserById = async (id) => {
            try {
                const findUser = await userModel.findById(id);
                return findUser;
            }
            catch (error) {
                console.log(error);
            }
        };
        this.getUserByEmail = async (email) => {
            try {
                const findUser = await userModel.findOne(email);
                return findUser;
            }
            catch (error) {
                console.log(error);
            }
        };
    }
}
export const UserService = new UserServices();
