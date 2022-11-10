const express = require('express');
const mainRouter = require('../routes/index');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', mainRouter);

app.use((req, res, next) => {
    return res.status(404).json({
        error: -2,
        descripcion: `La ruta ${req.url} no existe`,
    });
});

module.exports = app;