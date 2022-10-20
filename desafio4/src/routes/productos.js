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

router.post('/', async (req, res, next) => {
    const { body } = req;
    try{
        const data = await ProductsController.save(req.body);
        res.json({
            msg: data
        });
    } catch (err) {
        next (err);
    }
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