const express = require('express');
const http = require('http');
const mainRouter = require('../routes');

const app = express();

app.use(express.json());
app.use('/api', mainRouter);

const server = new http.Server(app);

module.exports = server;


