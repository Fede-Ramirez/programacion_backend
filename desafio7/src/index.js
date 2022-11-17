const server = require('./services/server');
const { initProductsDatabase } = require('./services/database');

const init = async () => {
    await initProductsDatabase();
    const port = 8080;

    server.listen(port, () => {
        console.log(`servidor escuchando en el puerto ${port}`);
    })
}

init();
