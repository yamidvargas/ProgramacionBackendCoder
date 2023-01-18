const socket = io();
const productosContainer = document.getElementById("products-table-body")
const botton = document.querySelector("#create-product-form");




botton.addEventListener("submit",async (e)=>{
    e.preventDefault();
    const formData =  new FormData(botton)
   const product = {}
    for (const iterator of formData.entries()) {
        product[iterator[0]]=iterator[1];

await fetch("/api/products",{
    body:JSON.stringify(product),
    method:"POST",
    headers:{"Content-Type":"application/json"}
  })
    }
})

socket.on("products",(products)=>{
    
    const allProducts =products.map(product=>
        `
    <tr>
    <td>${product.title}</td>
    <td>${product.description}</td>
    <td>${product.price}</td>
    <td>${product.imagen}</td>
    </tr>
    `).join(" ")
     productosContainer.innerHTML = allProducts
})