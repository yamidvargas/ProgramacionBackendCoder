import fs from "fs";
class ProductManager {
    constructor(path) {
        this.path = path;
        this.init();
    }
    init() {
        try {
            const existFile = fs.existsSync(this.path);
            if (existFile)
                return;
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
            console.log(myProducts);
            return myProducts;
        }
        catch (error) {
            console.log(error);
        }
    }
    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            // Validamos producto
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                return console.log("Todos los campos son obligatorios");
            }
            const product = {
                id: await this.generateId(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };
            // vamos a buscar el array de products
            let arrayProductos = await fs.promises.readFile(this.path, "utf-8");
            const myProducts = JSON.parse(arrayProductos);
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
            return console.log("Encontrado", arrayConIde);
        }
        else {
            console.log("Not Found");
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
        console.log(filteredProducts);
    }
    async deleteProduct(productId) {
        const databaseJson = await fs.promises.readFile(this.path, "utf-8");
        const databaseObj = JSON.parse(databaseJson);
        const productSearched = databaseObj.filter((product) => product.id !== productId);
        await fs.promises.writeFile(this.path, JSON.stringify(productSearched));
    }
}
const nuevo = new ProductManager("productos.txt");
const Agregar = async () => {
    await nuevo.addProduct("computadora", "computaodragamer", 15000, "www.imagen", "1234", 10);
    await nuevo.addProduct("lavadora", "lavadora nueva", 900000, "www.imagen", "456", 10);
    await nuevo.addProduct("celular", "celular ultima tecnologia", 15641894, "www.imagen", "789", 10);
    await nuevo.addProduct("laptop", "ultraliviano", 51861, "www.imagen", "1011", 10);
    await nuevo.addProduct("teatro en casa", "sonido envolvente", 6515621, "www.imagen", "1213", 10);
    await nuevo.addProduct("TV", "imagen 4k", 654116, "www.imagen", "1415", 10);
    await nuevo.addProduct("licuadora", "5 velocidades", 54456, "www.imagen", "1617", 10);
    await nuevo.addProduct("consola VideoJuegos", "juegos incorporados", 234654, "www.imagen", "1819", 10);
    await nuevo.addProduct("tablet", "ultraliviana", 65165, "www.imagen", "2021", 10);
    await nuevo.addProduct("parlante", "sonido portatil", 654654, "www.imagen", "2223", 10);
};
Agregar();
