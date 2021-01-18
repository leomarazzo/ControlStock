import { observable, action, computed, runInAction } from "mobx";
import { createContext } from "react";
import { IProduct } from "../Models/Product";
import { changeProduct, createProduct, listProducts, removeProduct } from "../Utils/DatabaseActions";


class ProductStore {
    @observable products: IProduct[] = [];
    @observable currentProduct: IProduct | null = null;

    @computed get sortedProducts() {
        const products = this.products;
        return products.slice().sort((a, b) => (a.name > b.name) ? 1 : ((a.name < b.name) ?  -1 : 0));
    }

    @action setCurrentProduct = (id: number) => {
        const product = this.products.filter(p => p.id === id)[0]
        this.currentProduct = product
    }

    @action unsetCurrentProduct = () => {
        this.currentProduct = null
    }

    @action addProduct = (product: IProduct) => {
        const {id, name, stock, stockMin} = product;
        createProduct(id, name, stock, stockMin);
        this.products.push({id, name, stock, stockMin})
    }

    @action updateProduct = (product:  IProduct) => {
        const {id, name, stock, stockMin} = product;
        changeProduct(id, name, stock, stockMin)
        this.products = this.products.filter(p => p.id !== product.id)
        this.products.push(product)
        this.currentProduct = null;
    }

    @action deleteCurrentProduct = () => {
        if (this.currentProduct){
            removeProduct(this.currentProduct.id)
            this.products = this.products.filter(p => p.id !== this.currentProduct?.id)
        }
    }

    @action loadProducts = async () => {
        try {
            const prods = await listProducts();
            runInAction(() => {
                this.products = []
                const produs = (prods as IProduct[]);
                produs.forEach((p) => this.products.push(p));
            });
        }
        catch (err) {
            runInAction(() => {
                console.log("Error loading products");
            });
        }
    }

    @action getNextID = () => {
        return (this.products.length + 1)
    }
}

export const ProductsContext = createContext(new ProductStore())