const { Router } = require('express');
const productsRouter = require('./productos');
const mainRouter = Router();

mainRouter.use('/products', productsRouter);

module.exports = mainRouter;
