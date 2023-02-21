import productsRouter from "./product.router.js";
import cartsRouter from "./carts.router.js";
import sessionRouter from "./session.router.js";
import viewsRouter from "./views.router.js";
import loginRouter from "./login.router.js";
//import viewsRouter from "./viewRouter.js";
const myRoutes = (server) => {
    server.use("/", viewsRouter);
    server.use("/login", loginRouter);
    server.use("/api/sessions", sessionRouter);
    server.use("/api/products", productsRouter);
    server.use("/api/carts", cartsRouter);
};
export default myRoutes;
