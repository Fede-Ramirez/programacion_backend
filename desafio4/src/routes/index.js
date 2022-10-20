const { Router } = require('express');
const productsRouter = require('./productos');
const formRouter = require('./formulario');

const router = Router();

router.use('/products', productsRouter);
router.use('/form', formRouter);

module.exports = router;