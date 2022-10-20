const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { ProductsController } = require('../controller/productos');

const router = Router();

const funcionAsyncGetAll = async (req, res) => {
    const products = await ProductsController.getAll();
    res.json({
        msg: products
    });
};

const funcionAsyncGetById = async (req, res) => {
    const id  = req.params.id;
    const product = await ProductsController.getById(id);
    res.json({
        msg: product
    });
};

const funcionAsyncPost = async (req, res) => {
    const { body } = req;
    const data = await ProductsController.save(body);   
    res.json({
        msg: data
    });
};

const funcionAsyncPut = async (req, res) => {
    const id  = req.params.id;
    const { body } = req;
    const data = await ProductsController.findByIdAndUpdate(id, body);
    res.json({
        msg: data
    });
};

const funcionAsyncDelete = async (req, res) => {
    const id  = req.params.id;
    res.json({
        msg: ProductsController.findByIdAndDelete(id)
    });
};

router.get('/', asyncHandler(funcionAsyncGetAll));
router.get('/:id', asyncHandler(funcionAsyncGetById));
router.post('/', asyncHandler(funcionAsyncPost));
router.put('/:id', asyncHandler(funcionAsyncPut));
router.delete('/:id', asyncHandler(funcionAsyncDelete));

module.exports = router;