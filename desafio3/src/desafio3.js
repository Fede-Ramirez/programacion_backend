// Realizo los imports para el desafío

const express = require('express');
const filesystem = require('fs');
const path = require('path');
const app = express();
const PORT = 8080;

// Realizo las rutas 

app.get('/',(req, res)=>{
    res.json('Desafío 3')
});

app.get('/productos', (req, res)=>{
    const misProductos = productos.getAll()
    .then((producto) => {
        res.json(producto)
    })
    .catch((err)=>{
        console.log('error al  mostrar los productos')
    })
})

app.get('/productoRandom', (req, res)=>{
    const random = (min, max) => {
        return Math.floor((Math.random() * (max - min + 1)) + min)
    }

    const productoRandom = productos.getAll()
    .then((producto)=>{
        res.json(producto[random(0, producto.length - 1)])
    })
    .catch((err)=>{
        console.log('error al mostrar el producto')
    })
});

const server = app.listen(PORT, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Error en el servidor ${error}`))

// Traigo la class del desafío anterior

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

const productos = new Contenedor('productos');