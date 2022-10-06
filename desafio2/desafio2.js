// Desafío 2: Manejo de archivos en JavaScript

// Hago los imports de la librería

const filesystem = require('fs');
const { get } = require('http');
const path = require('path');  

// Creo la class

class Contenedor {
    constructor(archivo) {
        this.archivo = `${archivo}.json`
    }
    
    // Métodos del constructor
    
    obtenerProductos = async () => {
        const dato = await filesystem.promises.readFile(this.archivo, 'utf-8');
        return JSON.parse(dato)
    }    

    guardarProductos = async (productos) => {
        const dato = JSON.stringify(productos, null, '\t');
        await filesystem.promises.writeFile(this.archivo, dato);
        console.log(`Nuestro array de productos queda así: ${dato}`);
    }

    getAll = async () => {
        const productos = await this.obtenerProductos();
        return productos;
    }

    getById = async (id) => {
        const productos = await this.obtenerProductos();
        const indice = productos.findIndex(producto => producto.id === id)
        
        if (indice < 0) {
            console.log(null);
            throw new Error ("El producto solicitado no existe"); 
        }
        
        return productos[indice];
    }

    save = async (datos) => {
        if(!datos.title || !datos.price || typeof datos.title !== "string" || typeof datos.price !== "number") throw new Error ("datos invalidos")
        
        const productos = await this.obtenerProductos();
        let id = 1;
        
        if (productos.length !== 0) {
            id = productos[productos.length -1].id + 1
        }
        const productoNuevo = {
            title: datos.title,
            price: datos.price,
            id: id
        }
        
        productos.push(productoNuevo);
        console.log(`El id del producto nuevo es ${productoNuevo.id}`);
        
        return await this.guardarProductos(productos);
    }

    deleteAll = async () => {
        await this.guardarProductos([]);
    }

    deleteById = async (id) => {
        const productos = await this.obtenerProductos();
        const indice = productos.findIndex(producto => producto.id === id)
        
        if (indice < 0) {
            return; 
        }
        
        const productoEliminado = productos.splice(indice, 1);
        console.log(productoEliminado);

        await this.guardarProductos(productos);
    }
}

funcionPrincipal = async () => {
    const instancia = new Contenedor('productos');

    // Llamado a getAll
    console.log('1-Los productos son');
    const misProductos = await instancia.getAll();
    console.log(misProductos);
    
    // Llamado a save
    console.log('2-Guardo un producto');
    const nuevoProducto = {title: 'tomates 1kg', price: 300};
    console.log(nuevoProducto);
    await instancia.save(nuevoProducto);

    // Busco un producto por su id
    console.log('3-el resultado de la búsqueda es');
    const productoId = await instancia.getById(2);
    console.log(productoId);

    // Elimino un producto por su id
    console.log('4-Elimino un producto')
    await instancia.deleteById(3);

    // Elimino todos los productos
    console.log('5-Se eliminan todos los productos')
    await instancia.deleteAll();
}

funcionPrincipal();