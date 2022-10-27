const express = require('express');
const path = require('path');
const mainRouter = require('../routes/index');
const { ProductsController } = require('../controller/productos');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const viewsFolderPath = path.resolve(__dirname,'../../views');
app.set('view engine','ejs');
app.set('views', viewsFolderPath);

app.get('/', async (req, res, next)=>{
    try{
        const data = await ProductsController.getAll()
        res.render('productos', {data});
    }catch(err){
        next(err);
    } 
});

app.use(express.static('public'));
app.use('/api', mainRouter);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal server error';

    res.status(status).json({
        message
    });
});

module.exports = app;