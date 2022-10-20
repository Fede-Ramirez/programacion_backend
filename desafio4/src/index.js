const server = require('./services/server');

const port = 8080;

server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});