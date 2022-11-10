const { Router } = require('express');
const { ProductsController } = require('../controllers/products');
const { CartsController } = require('../controllers/cart');
const router = Router();

router.get('/:id/productos', async (req, res, next) => {
    try {
        if (isNaN(req.params.id)) {
            return res.status(400).json({
                error: "El id ingresado no es válido!",
            });
        }
        const id = parseInt(req.params.id);
        const cartProducts = await CartsController.getCartById(id);
        return res.json({
            msg: cartProducts,
        });
    } 
    catch {

    }
})