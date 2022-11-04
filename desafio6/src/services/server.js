// Importo las librerías
const express = require('express');
const http = require('http');
const path = require('path');
const mainRouter = require('../routes');
const { ProductsController } = require('../controller/productos');

//Configuración básica
const app = express();
const server = http.Server(app);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Defino paths
const publicPath = path.resolve(__dirname, '../../public');
const viewsPath = path.resolve(__dirname, '../../views');
app.use(express.static(publicPath));
app.use('/api', mainRouter);

// Configuro EJS
app.set('view engine', 'ejs');
app.set('views', viewsPath );

// Renderizado
app.get('/',async (req, res, next) =>{
    try{
        const productosJSON = await ProductsController.obtenerJSON('productos');
        const mensajesJSON = await ProductsController.obtenerJSON('mensajes');
        res.render('formulario', {productosJSON, mensajesJSON});
    }catch (err){
        next(err);
    }
})

// Middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        message,
    })
});

module.exports = server;