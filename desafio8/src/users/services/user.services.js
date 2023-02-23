import { NotFoundError } from "../../utils/error.js";
import userModel from "../../models/user.models.js";
import { generateToken } from "../../utils/jwt.js";
export class UserServices {
    constructor() {
        //obtener todos los usuarios
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
        //buscar un usuario
        this.findUser = async (email) => {
            try {
                const user = await userModel.findOne({ email }).lean().exec();
                return user;
            }
            catch (error) {
                console.log(error);
            }
        };
        //Crear un nuevo usuario
        this.userRegistration = async (req, username, password, done) => {
            try {
                const user = await this.findUser(username);
                if (user) {
                    return done(null, false);
                }
                const newUser = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    age: req.body.age,
                    password: await userModel.encryptPassword(password),
                };
                const createNewUser = await userModel.create(newUser);
                return done(null, createNewUser);
            }
            catch (error) {
                console.log(error);
                return done(error);
            }
        };
        //Loguear usuario
        this.userLogin = async (username, password, done) => {
            try {
                const findUser = await this.findUser(username);
                if (!findUser) {
                    return done(null, user);
                }
                const comparePassword = await userModel.comparePassword(password, findUser.password);
                if (!comparePassword) {
                    console.log("Invalid Password");
                    return done(null, false);
                }
                const token = generateToken(findUser);
                findUser.token = token;
                return done(null, findUser);
            }
            catch (error) {
                console.log(error);
                return done(error);
            }
        };
        this.logoutUser = async () => {
            try {
            }
            catch (error) {
                console.log(error);
            }
        };
    }
}
const userService = new UserServices();
export default userService;
