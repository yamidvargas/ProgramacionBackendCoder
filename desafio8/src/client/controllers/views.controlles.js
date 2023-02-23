import cartServices from "../services/cart.services.js";
import { ProductsService } from "../services/product.services.js";
import userService from "../services/user.services.js";
export const getAllProducts = async (req, res) => {
    try {
        const { query, limit, sort, page } = req.query;
        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: { price: sort } || { price: 1 },
            lean: true,
        };
        const response = await ProductsService.getProducts(query, options);
        const user = req.session.user;
        res.render("home", {
            style: "styles.css",
            response,
            user,
        });
    }
    catch (error) {
        //res.render("errors");
    }
};
export const getOneProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const response = await ProductsService.getProductById(pid);
        res.render("productDetail", {
            style: "styles.css",
            response,
        });
    }
    catch (error) { }
};
export const getCarById = async (req, res) => {
    try {
        const { cid } = req.params;
        const findCar = await cartServices.getCartById(cid);
        const cart = findCar === null || findCar === void 0 ? void 0 : findCar.car;
        console.log(cart);
        res.render("cart", cart);
    }
    catch (error) { }
};
export const getAdmin = async (req, res) => {
    try {
        const role = req.session.user.role;
        const users = await userService.getAllUser();
        if (role === "admin") {
            return res.render("admin", {
                style: "styles.css",
                users,
            });
        }
        return res.redirect("/home/products");
    }
    catch (error) { }
};
export const getErrorPage = (req, res) => {
    try {
        return res.render("errors");
    }
    catch (error) {
        console.log(error);
    }
};
