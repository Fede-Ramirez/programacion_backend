const { Router } = require('express');
const productsRouter = require('./productos');
const router = Router();

router.use('/productos', productsRouter);

module.exports = router;