const { Router } = require('express');
const { ProductsController } = require('../controllers/products');
const { CartsController } = require('../controllers/cart');
const router = Router();

router.get('/:id/productos', async (req, res, next) => {
    try {
        if (isNaN(req.params.id)) {
            return res.json({
                error: "El id ingresado no es válido!",
            });
        }
        const id = parseInt(req.params.id);
        const cartProducts = await CartsController.getCartById(id);
        return res.json({
            msg: cartProducts,
        });
    } 
    catch (err) {
        next(err);
    }
})

router.post('/', async (req, res, next) => {
    try {
    await CartsController.createNewCart();
    const carts = await CartsController.getAllCartProducts();
    let lastCartAddedId = carts[carts.length - 1].id;
    return res.json({
        msg: `Se ha creado el carrito ${lastCartAddedId} con éxito`,
    });
    } 
    catch (err) {
        next(err);
    }
})

router.post('/:id/productos', async (req, res, next) => {
    try {
        if (isNaN(req.params.id)) {
            return res.json({
                error: "El id ingresado no es válido!",
            });
        }

        const cartId = parseInt(req.params.id);
        const productId = parseInt(req.body.id);
        const selectedCart = await CartsController.getCartById(cartId);
        const productAdded = await ProductsController.getById(productId);
        await CartsController.addNewProductToCart(selectedCart.id, productAdded);

        return res.json({
            msg: "Se ha agregado el producto con éxito!",
        });
    }catch (err) {
        next(err);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        if (isNaN(req.params.id)) {
            return res.json({
                error: "Tiene que enviar un id válido!",
            });
        }
            const id = parseInt(req.params.id);
            await CartsController.deleteCart(id);

            return res.json({
                msg: "Se ha eliminado el carrito con éxito!",
            });
    } catch (err) {
        next(err);
    }
})

router.delete('/:id/productos/:id_prod', async (req, res, next) => {
    try {
        if (isNaN(req.params.id) || isNaN(req.params.id_prod)) {
            return res.json({
                error: "Los parámetros ingresados son válidos!",
            });
        }

        const cartId = parseInt(req.params.id);
        const productId = parseInt(req.params.id_prod);
        const cart = await CartsController.getCartById(cartId);
        await CartsController.deleteProductInCart(cartId, productId);

        return res.json({
        msg: "Se ha eliminado el producto del carrito con exito",
        });
    }
    catch (err) {
        next(err);
    }
})

module.exports = router;