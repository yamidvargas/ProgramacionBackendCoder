import productsRouter from "./product.router.js";
import cartsRouter from "./carts.router.js";
import viewsRouter from "./views.router.js";
//import viewsRouter from "./viewRouter.js";
const myRoutes = (server) => {
    server.use("/products", viewsRouter);
    server.use("/api/products", productsRouter);
    server.use("/api/carts", cartsRouter);
};
export default myRoutes;
