import { Router } from "express";
import { productManager } from "../Managers/index.js";
const router = Router();

router.get("/",async (req,res)=>{
  const products =await  productManager.getProducts();
  console.log(products)
  res.render("home",{products})
})

router.get("/realtimeproducts",async (req, res) => {
  const products =await  productManager.getProducts()
  
  res.render("realTimeProducts");
});



export { router as ViewsRouter };