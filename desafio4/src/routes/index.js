const { Router } = require('express');
const productsRouter = require('./productos');

const router = Router();

router.get('/', (req, res) => {
    res.json({
        msg: "rutas en orden"
    });
});

router.use('/products', productsRouter);

module.exports = router;