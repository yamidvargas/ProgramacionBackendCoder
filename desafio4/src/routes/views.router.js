import { Router } from "express";
import { productManager } from "../Managers/index.js";
const router = Router();

router.get("/",async (req,res)=>{
  const products =await  productManager.getProducts();
 
  res.render("home",{products})
})

router.get("/realtimeproducts",async (req, res) => {
  const products =await  productManager.getProducts()
  
  res.render("realTimeProducts",{products});
});

router.post("/realtimeproducts",async (req, res) => {
  try {
       console.log("vamos a agregar") 
    const { title, description, code, price } = req.body;
    const addProduct = await productManager.addProduct(title, description, code, price);
   if (!addProduct) {
        return res.send("faltan datos");
    }
    return res.send({
        status: "OK",
        message: "Producto agregado correctamente",
    });
}
catch (error) {
    console.log(error);
}
});



export { router as ViewsRouter };