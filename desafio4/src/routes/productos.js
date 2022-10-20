const { Router } = require('express');
const { ProductsController } = require('../controller/productos');

const router = Router();

router.get('/', (req, res) => {
    res.json({
        msg: ProductsController.getAll()
    });
});

router.get('/:id', (req, res) => {
    const id  = req.params.id;
    const product = ProductsController.getById(id);
    res.json({
        msg: product
    });
});

router.post('/', (req, res) => {
    res.json({
        msg: ProductsController.save()
    });
});

router.post('/:id', (req, res) => {
    res.json({
        msg: ProductsController.findByIdAndUpdate()
    });
});

router.delete('/:id', (req, res) => {
    res.json({
        msg: ProductsController.findByIdAndDelete()
    });
});

module.exports = router;