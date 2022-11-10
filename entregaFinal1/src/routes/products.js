const { Router } = require('express');
const { ProductsController } = require('../controllers/products');
const router = Router();
const checkAdministrator = false;

router.get('/', async (req, res, next) => {
    try{
        const products = await ProductsController.getAll();
        res.json({
            msg: products
        });
    } catch (err) {
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const id  = req.params.id;
        const product = await ProductsController.getById(id);
        res.json({
            msg: product
        });
    }
    catch(err){
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try{
        if(!checkAdministrator)
        return res.status(401).json({
            error:-1,
            msg: 'No tienes autorización para agregar un producto',
        })

        const { body } = req;
        const data = await ProductsController.save(body);
        res.json({
            msg: data
        });   
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try{
        if(!checkAdministrator)
        return res.status(401).json({
            error:-1,
            msg: 'No tienes autorización para modificar un producto',
        })

        const id  = req.params.id;
        const { body } = req;
        const data = await ProductsController.findByIdAndUpdate(id, body);
        res.json({
            msg: data
        });
    }
    catch(err){
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try{
        if(!checkAdministrator)
        return res.status(401).json({
            error:-1,
            msg: 'No tienes autorización para eliminar un producto',
        })

        const id  = req.params.id;
        res.json({
            msg: ProductsController.findByIdAndDelete(id)
        });
    }
    catch(err){
        next(err);
    }
});

module.exports = router;