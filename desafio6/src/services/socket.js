const socketIo = require('socket.io');
const { ProductsController } = require('../controller/productos');
const moment = require('moment/moment');

let io;

const initWsServer = (server) =>{
    io = socketIo(server)

    io.on('connection', (socket) =>{
        console.log('Se ha establecido una nueva conexión')

        socket.on('addProduct', async (product) =>{
            try{
                product.price = Number(product.price);
    
                ProductsController.validateBody(product);
    
                const productosJson = await ProductsController.obtenerJSON('productos');
    
                const newProduct = {
                id: uuidv4(),
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                };
    
                dataJson.push(newProduct);
    
                io.emit('addTable', productosJson[productosJson.length-1])
    
                await ProductsController.actualizarArchivo(productosJson,'productos');

            }catch (error){
                console.log(error);
            }
        })

        socket.on('newMessage', async (message) =>{
            try{
                const mensajesJSON = await ProductsController.obtenerJSON('mensajes')
                const newMessage  = {
                    email: message.email,
                    msg: message.msg,
                    time: moment().format('h:mm a')
                }
                messageJson.push(newMessage)
    
                io.emit('renderMessage', mensajesJSON[mensajesJSON.length-1])
    
                await ProductsController.actualizarArchivo(mensajesJSON,'mensajes')
            }catch(error){
                console.log(error);
            }
        })
    })
return io;
}

module.exports = initWsServer;