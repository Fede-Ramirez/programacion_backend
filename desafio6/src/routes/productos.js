const { Router } = require('express');
const { ProductsController } = require('../controller/productos');
const router = Router();

router.get('/', async (req, res)=>{
    res.render('formulario')
});

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
        const { body } = req;
        const data = await ProductsController.save(body);   
        res.redirect('/')
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try{
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