// Importo las librerías
const express = require('express');
const http = require('http');
const mainRouter = require('../routes');

//Configuración básica
const app = express();
const server = http.Server(app);

//Defino el path a la carpeta estática
app.use(express.static('public'));

app.use('/api', mainRouter);

module.exports = server;