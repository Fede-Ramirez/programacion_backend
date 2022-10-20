const createError = require('http-errors');
const { v4: uuidv4 } = require('uuid');

class ProductsAPI {
    constructor () {
        this.productos = [{
            id: '05a8a348-a39e-4c5d-9056-6ed11fb28dff',
            title: 'regla 20cm',
            price: 50
        }];
    };
    
    exists (id) {
        const indice = this.productos.findIndex(producto => producto.id == id);
        
        return indice >= 0;
    };

    validateBody(data) {
        if(!data.title || !data.price || typeof data.title !== "string" || typeof data.price !== "number") throw createError(400, 'datos invalidos');
    };
    
    getAll() {
        return this.productos;
    };
    
    getById(id) {
        const exists = this.exists(id);  

        if(!exists) throw createError(404, 'El producto no existe');

        const indice = this.productos.findIndex(producto => producto.id == id);

        return this.productos[indice];
    };
    
    save(data) {
        this.validateBody(data);   
        const nuevoProducto = {
            title: data.title,
            price: data.price,
            id: uuidv4(),
        };

        this.productos.push(nuevoProducto);
        return nuevoProducto;
    };
    
    findByIdAndUpdate(id, newData) {
        const exists = this.exists(id);  
        if(!exists) throw createError(404, 'El producto no existe');

        this.validateBody(newData);

        const indice = this.productos.findIndex(producto => producto.id == id);

        const oldProduct = this.productos[indice];

        const nuevoProducto = {
            title: newData.title,
            price: newData.price,
            id: oldProduct.id,
        };  

        this.productos.splice(indice, 1, nuevoProducto);
        return nuevoProducto;
    };

    findByIdAndDelete(id) {
        const exists = this.exists(id);
        if(!exists) return;

        const indice = this.productos.findIndex(producto => producto.id == id);

        this.productos.splice(indice, 1);
    };
};

const productsApiInstance = new ProductsAPI();

module.exports = {
    ProductsController: productsApiInstance
};