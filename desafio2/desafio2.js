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
    // Contemplamos la existencia del archivo o no
    validateExistsFile = async () => {
        try {
            const stat = await filesystem.promises.stat(this.archivo)
            console.log(stat)
        }
        catch (err) {
            await filesystem.promises.writeFile(this.archivo, JSON.stringify([])); 
        }
    }
    
    obtenerProductos = async () => {
        await validateExistsFile();
        const dato = await filesystem.promises.readFile(this.archivo, 'utf-8');
        return JSON.parse(dato)
    }    

    guardarProductos = async (productos) => {
        await validateExistsFile();
        const dato = JSON.stringify(productos, null, '\t');
        await filesystem.promises.writeFile(this.archivo, dato);
    }

    getAll = async () => {
        const productos = await this.obtenerProductos();
        return productos;
    }

    getById = async (id) => {
        const productos = await obtenerProductos();
        const indice = productos.findIndex(producto => producto.id === id)
        
        if (indice < 0) {
            throw new Error ("El producto solicitado no existe"); 
        }
        
        return array[indice];
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
        
        productos.splice(indice, 1);
        
        await guardarProductos(productos);
    }
}

funcionPrincipal = async () => {
    const instancia = new Contenedor('productos');

    // Llamado a getAll
    console.log('Los productos son');
    const misProductos = await instancia.getAll();
    console.log(misProductos)
    
    // Llamado a save
    console.log('Guardo un producto')
    const nuevoProducto = {title: 'tapas de empanadas', price: 243}
    await instancia.save(nuevoProducto);
    console.log(await getAll());

    // Busco un producto por su id
    console.log('el resultado de la búsqueda es')
}

funcionPrincipal()