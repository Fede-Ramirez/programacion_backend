const { Router } = require('express');
const productsRouter = require('./products');
const mainRouter = Router();

mainRouter.use('/products', productsRouter);

module.exports = mainRouter;
