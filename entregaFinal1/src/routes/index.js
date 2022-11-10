const { Router } = require('express');
const productsRouter = require('./products.js');
const cartRouter = require('./cart.js');
const router = Router();

router.use('/products', productsRouter);
router.use('/cart', cartRouter);

module.exports = router;