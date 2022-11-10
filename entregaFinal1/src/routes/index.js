const { Router } = require('express');
const productsRouter = require('./products');
const cartRouter = require('./cart');
const router = Router();

router.use('/products', productsRouter);

module.exports = router;