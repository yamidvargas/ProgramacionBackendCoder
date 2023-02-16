import fs from "fs";
export class ProductManager {
    constructor(path) {
        this.path = path;
        this.init();
    }
    async init() {
        try {
            if (fs.existsSync(this.path)) {
                return fs.promises
                    .readFile(this.path, "utf-8")
                    .then((result) => JSON.parse(result));
            }
            fs.writeFileSync(this.path, JSON.stringify([]));
        }
        catch (error) {
            console.log(error);
        }
    }
    //metodos
    async getProducts() {
        try {
            const response = await fs.promises.readFile(this.path, "utf-8");
            const myProducts = JSON.parse(response);
            //console.log(myProducts);
            return myProducts;
        }
        catch (error) {
            console.log(error);
        }
    }
    async addProduct(title, description, code, price, status, stock, category, thumbnail) {
        try {
           
            // Validamos producto
            if (!title ||
                !description ||
                !code ||
                !price 
                //!status ||
               // !stock ||
                //!category
                ) {
                    
                console.log("Todos los campos son obligatorios");
                return undefined;
            }
            const product = {
                id: await this.generateId(),
                title,
                description,
                code,
                price,
                status: true,
                stock,
                thumbnail,
            };
            // vamos a buscar el array de products
            let arrayProductos = await fs.promises.readFile(this.path, "utf-8");
            const myProducts = await JSON.parse(arrayProductos);
            console.log ("mis")
            myProducts.push(product);
            console.log("Producto agregado correctamente");
            await fs.promises.writeFile(this.path, JSON.stringify(myProducts, null, 3));
            return product;
        }
        catch (error) {
            console.log(error);
        }
    }
    async generateId() {
        try {
            const response = await fs.promises.readFile(this.path, "utf-8");
            const myProducts = JSON.parse(response);
            const count = myProducts.length;
            const id = count > 0 ? myProducts[count - 1].id + 1 : 1;
            return id;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getProductById(productId) {
        let arrayProductos = await fs.promises.readFile(this.path, "utf-8");
        const myProducts = JSON.parse(arrayProductos);
        let arrayConIde = myProducts.find((elemento) => {
            const elementoEncontrado = elemento.id === productId;
            return elementoEncontrado;
        });
        if (arrayConIde) {
            return arrayConIde;
        }
        else {
            return "Not Found";
        }
    }
    async updateProduct(productId, objUpdated) {
        const productsCopy = await fs.promises.readFile(this.path, "utf-8");
        const productsCopyObj = await JSON.parse(productsCopy);
        const productToUpdate = productsCopyObj.find((product) => product.id === productId);
        const filteredProducts = productsCopyObj.filter((product) => product.id !== productId);
        // @ts-ignore: Object is possibly 'null'.
        const prodcutUpdated = Object.assign({ id: productToUpdate.id }, objUpdated);
        // @ts-ignore: Object is possibly 'null'.
        filteredProducts.push(prodcutUpdated);
        await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts));
    }
    async deleteProduct(productId) {
        const databaseJson = await fs.promises.readFile(this.path, "utf-8");
        const databaseObj = JSON.parse(databaseJson);
        const productSearched = databaseObj.filter((product) => product.id !== productId);
        await fs.promises.writeFile(this.path, JSON.stringify(productSearched));
    }
}
