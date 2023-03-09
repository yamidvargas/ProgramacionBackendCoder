import cartServices from "../services/cart.services.js";
export const createCart = async (req, res) => {
    try {
        await cartServices.createCart();
        return res.status(200).send({
            message: "Cart created",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            error: "Something went wrong",
        });
    }
};
export const getCarts = async (req, res) => {
    try {
        const result = await cartServices.getCarts();
        return res.status(200).send({
            payload: result,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            error: "Something went wrong",
        });
    }
};
export const getCartById = async (req, res) => {
    try {
        const { pid } = req.params;
        const result = await cartServices.getCartById(pid);
        return res.status(200).send({
            payload: result,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            error: "Something went wrong",
        });
    }
};
export const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const result = await cartServices.addProductToCart(cid, pid);
        return res.status(200).send({
            payload: result,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            error: "Something went wrong",
        });
    }
};
export const updateProductQuantity = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const result = await cartServices.addQuantityToProduct(cid, pid, quantity);
        return res.status(200).send({
            payload: result,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            error: "Something went wrong",
        });
    }
};
export const addArrayOfProducts = async (req, res) => {
    try {
        const { cid } = req.params;
        const arrayOfProducts = req.body;
        const result = await cartServices.addArrayOfProudcts(cid, arrayOfProducts);
        return res.status(200).send({
            payload: result,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            error: "Something went wrong",
        });
    }
};
export const deleteOneProduct = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const result = await cartServices.deleteProductFromCart(cid, pid);
        return res.status(200).send({
            payload: result,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            error: "Something went wrong",
        });
    }
};
export const emptyCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const result = await cartServices.emptyCart(cid);
        return res.status(200).send({
            payload: result,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            error: "Something went wrong",
        });
    }
};
