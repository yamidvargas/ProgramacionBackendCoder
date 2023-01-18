import { Router } from "express";
//import { dbManager } from "../dao/Managers/index.js";
import { messageModel } from "../DAO/models/messages.models.js";
import { productModel } from "../DAO/models/products.models.js";
const router = Router();
// GET all products
router.get('/', async (req, res) => {
    const products = await productModel.find().lean();
    console.log(typeof products);
    res.render('realTimeProducts', {
        style:"style.css",
        products});
});
// GET to create a new product
router.get('/addNew', async (req, res) => {
    res.render('addNews', {
        style: 'style.css'
    });
});
// POST to create new product
router.post('/addNew', async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnail, } = req.body;
        productModel.create({ title, description, code, price, status, stock, category, thumbnail }, function (err) {
            if (err)
                return console.error(err);
        });
        res.send({ status: "producto agregado correcamente" });
    }
    catch (error) {
        console.log(error);
    }
});
// GET to chat 
router.get('/chat', async (req, res) => {
    const messages = await messageModel.find();
    res.render('chat', {
        style: 'style.css',
        messages
    });
});
router.post('/chat', async (req, res) => {
    const messageData = req.body;
    console.log(`This is messageData from viewsRouter:`, messageData);
    const newMessage = await messageModel(messageData);
    await newMessage.save();
    res.render('chat', {
        style: 'style.css',
    });
});
// GET to search for a unique product
router.get('/:code', async (req, res) => {
    try {
        const { code } = req.params;
        const productFind = await productModel.findById({ _id: code });
        if (!productFind) {
            res.send({ error: "id de articulo no encontrado " });
        }
        else {
            res.render('search', {
                productFind,
                style: 'style.css'
            });
        }
    }
    catch (error) {
        res.send({ status: "error en el formato ingresado del Id" });
        console.log(error);
    }
});
// PUT 
router.put('/:uuid', async (req, res) => {
    try {
        const { pid } = req.params;
        const { title, description, code, price, status, stock, category, thumbnail, } = req.body;
        const productEdited = {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail,
        };
        await productModel.updateOne({ pid }, productEdited);
        res.send({ status: "producto editado correctamente" });
    }
    catch (error) {
        console.log(error);
    }
    res.send({ Status: 'Success' });
});
// DELETE 
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.deleteOne({ _id: id });
        // console.log(product)
        if (!product) {
            res.send({ status: "id de producto no encontrado" });
        }
        res.json({ status: "producto eliminado correctamente" });
    }
    catch (error) {
        console.log(error);
    }
});
export default router;
