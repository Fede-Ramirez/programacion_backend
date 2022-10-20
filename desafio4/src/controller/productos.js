const createError = require('http-errors');
// const { v4: uuidv4 } = require('uuid');

class ProductsAPI {
    constructor () {
        this.productos = [{
            id: '05a8a348-a39e-4c5d-9056-6ed11fb28dff',
            title: 'remera',
            price: 2000
        }];
    }
    
    exists (id) {
        const indice = this.productos.findIndex(producto => producto.id == id);

        // if (indice < 0) {
        //     return false;
        // } else {
        //     return true;
        // }

        return indice >= 0;
    }
    
    getAll() {
        return this.productos;
    }
    
    getById(id) {
        const exists = ds.exists(id);  

        if(!exists) throw createError(404, 'El producto no existe');

        const indice = this.productos.findIndex(producto => producto.id == id);

        return this.productos[indice];
    }
    
    save() {
        return 'save products';
    }
    
    findByIdAndUpdate() {
        return 'save product by id';
    }
    
    findByIdAndDelete() {
        return 'delete product';
    }
}

const productsApiInstance = new ProductsAPI();

module.exports = {
    ProductsController: productsApiInstance
};