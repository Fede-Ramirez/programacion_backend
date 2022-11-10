const filesystem = require('fs');
const moment = require('moment');

class CartsAPI {
    async validateExistFile() {
        try {
            await filesystem.promises.stat('./carrito.json');
            return true;
        } catch (error) {
            console.log("Creando archivo JSON...");
            await filesystem.promises.writeFile('./carrito.json', JSON.stringify([]));
            return false;
        }
    }

    async loadFileData() {
        try {
            let cartByDefault = [
                {
                    id: 1,
                    products: [
                        {
                            id: 1,
                            timestamp: "09-11-22 19:43:30",
                            title: "Remera",
                            description: "Remera blanca",
                            code: "1A",
                            photo:"https://i.pinimg.com/564x/db/ba/d5/dbbad5e8b6072dfc42a5096fc8052160.jpg",
                            price: 2000,
                            stock: 10
                        },
                        {
                            id: 2,
                            timestamp: "09-11-22 19:44:15",
                            title: "Camisas",
                            description: "Camisa negra",
                            code: "1B",
                            photo:"https://i.pinimg.com/564x/db/ba/d5/dbbad5e8b6072dfc42a5096fc8052160.jpg",
                            price: 3000,
                            stock: 15
                        }
                    ]
                }
        ];
        const data = JSON.stringify(cartByDefault, null, "\t");
        await filesystem.promises.writeFile('./carrito.json', data);
        } 
        catch(err) {
            throw new Error("Ha ocurrido un error en la carga del carrito", err);
        }
    }

    async obtenerJSON(){
        const viewsFolderPath = path.resolve(__dirname, '../../carrito.json')
        const data = await filesystem.promises.readFile(viewsFolderPath,'utf-8');
        return JSON.parse(data);
    }

    async actualizarArchivo(carritos){
        filesystem.promises.writeFile('./carrito.json', JSON.stringify(carritos, null, '\t'), 'utf-8');
    }

    async getAllCartProducts() {
        const jsonExists = await this.validateExistFile();

        if(!jsonExists) {
            await this.loadFileData();
        }

        const data =  await this.obtenerJSON();
        return data;
    }

    async createNewCart() {
        let id;

        const carts = await this.getAllProductsInCart();

        if(carts.length){
            id = productos[productos.length -1].id +1;
        }

        const newCart = {
            id: id,
            timestamp: moment().format("DD-MM-YYYY HH:MM:SS"),
            products: [],
        }

        carts.push(newCart)

        this.actualizarArchivo(carts)

        return carts
    }

    async getCartById() {
        const cartProducts = await this.getAllProductsInCart();
        const index = cartProducts.findIndex((cart) => cart.id === id);
        if (index < 0) {
            const cartExists = {
            index: index,
            msg: "El carrito solicitado no existe!",
            };
            throw productExists;
        }
        return productsCart[index];
    }

    async addNewProductToCart(cartId, product) {
        const carts = await this.getAllProductsInCart();

        const index = carts.findIndex((cart) => cart.id === cartId)

        carts[index].products.push(product)

        this.actualizarArchivo(carts)

        return carts
    } 

    async deleteCart(id) {
        const carts = await this.getAllProductsInCart();

        const index = carritos.findIndex((cart) => cart.id === id);

        if (index < 0) {
            throw "No se ha encontrado el carrito solicitado!";
        }

        carts.splice(index, 1);

        return this.actualizarArchivo(carts);
    }

    async deleteProductInCart(cartId, productId) {
        const carts = await this.getAllProductsInCart();

        const cartIndex = carts.findIndex((cart) => cart.id === cartId);

        const productIndex = carts[cartIndex].products.findIndex((product) => product.id === productId);

        if (productIndex < 0) {
            throw "No se ha encontrado ese producto dentro del carrito";
        }

        carts[cartIndex].products.splice(productIndex, 1);

        await this.actualizarArchivo(carts);
    }
}

const cartsApiInstance = new CartsAPI();

module.exports = {
    CartsController: cartsApiInstance
};