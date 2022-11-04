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
                
                let id;

                const productosJSON = await ProductsController.obtenerJSON('productos');

                if(productosJSON.length){
                    id = productosJSON[productosJSON.length -1].id +1;
                }
    
                const newProduct = {
                    title: product.title,
                    price: parseInt(product.price),
                    img: product.img,
                    id: id
                };
    
                productosJSON.push(newProduct);
    
                io.emit('addTable', productosJSON[productosJSON.length-1])
    
                await ProductsController.actualizarArchivo(productosJSON,'productos');

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
                mensajesJSON.push(newMessage)
    
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