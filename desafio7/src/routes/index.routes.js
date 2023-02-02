import productsRouter from "./product.router.js";
import cartsRouter from "./carts.router.js";
import loginRouter from "./user.router.js";
import viewsRouter from "./views.router.js";
//import viewsRouter from "./viewRouter.js";
const myRoutes = (server) => {
    server.use("/products", viewsRouter);
    server.use("/api/products", productsRouter);
    server.use("/api/carts", cartsRouter);
    server.use("/user", loginRouter);
};
export default myRoutes;
