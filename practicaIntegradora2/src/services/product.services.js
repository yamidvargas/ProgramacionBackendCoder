import productsModel from "../models/products.model.js";
import { InputsValidationError, NotFoundError } from "../utils/error.js";
export class ProductServices {
    constructor() {
        //▼Muestra todos los productos con paginación
        this.getProducts = async (query, options) => {
            try {
                if (query === "inStock") {
                    const products = await productsModel.paginate({ state: true }, options);
                    if (!products) {
                        throw new Error("THE DB IS EMPTY");
                    }
                    return products;
                }
                if (query === "video games" ||
                    query === "televisores" ||
                    query === "camaras" ||
                    query === "tablet" ||
                    query === "celular" ||
                    query === "notebook") {
                    const products = await productsModel.paginate({ category: query }, options);
                    if (!products) {
                        throw new Error("THE DB IS EMPTY");
                    }
                    return products;
                }
                const products = await productsModel.paginate({}, options);
                if (!products) {
                    throw new Error("THE DB IS EMPTY");
                }
                return products;
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        /*     try {
              const products = await productsModel.paginate({}, options);
        
              if (!products) {
                throw new Error("THE DB IS EMPTY");
              }
        
              return products;
            } catch (error) {
              throw new Error(error.message);
            }
          }; */
        //▼Muestra un producto por id
        this.getProductById = async (pid) => {
            try {
                const product = await productsModel.findById({ _id: pid }).lean();
                if (!product) {
                    throw new NotFoundError("PRODUCT NOT FOUND");
                }
                return product;
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        //▼Agrega un producto
        this.addProduct = async (newProduct) => {
            try {
                if (!newProduct) {
                    throw new InputsValidationError("COMPLETE ALL THE FIELDS");
                }
                const result = await productsModel.create(newProduct);
                if (!result) {
                    throw new Error("FAILED TO ADD TO DATABASE");
                }
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        //▼Actualiza un producto por id
        this.updateProduct = async (pid, updatedProduct) => {
            try {
                if (!pid) {
                    throw new InputsValidationError("INVALID PRODUCT ID");
                }
                const result = await productsModel.updateOne({ _id: pid }, updatedProduct);
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        //▼Elimina un producto
        this.deleteProduct = async (pid) => {
            try {
                if (!pid) {
                    throw new InputsValidationError("INVALID PRODUCT ID");
                }
                const result = await productsModel.deleteOne({ _id: pid });
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
    }
}
export const ProductsService = new ProductServices();
