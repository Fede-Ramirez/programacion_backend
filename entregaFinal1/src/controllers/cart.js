const filesystem = require('fs');
const moment = require('moment');
const path = require('path');

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
                            title: "Camiseta",
                            description: "Camiseta argentina",
                            code: "1A",
                            photo:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhttp2.mlstatic.com%2Fcamisa-argentina-adidas-modelo-2010-D_NQ_NP_426611-MLB20596402796_022016-F.jpg&f=1&nofb=1&ipt=89188d63c75849a0f2451507c0573dc0be3225ab2de232e59650e90b22c4df5a&ipo=images",
                            price: 2000,
                            stock: 10
                        },
                        {
                            id: 2,
                            timestamp: "09-11-22 19:44:15",
                            title: "Camisa",
                            description: "Camisa negra",
                            code: "1B",
                            photo:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdhb3yazwboecu.cloudfront.net%2F335%2Fcamisa-negra-algodon-sols-17000_l.jpg&f=1&nofb=1&ipt=871791baa0fb6e7f37ab46530fdd41c5e90ced1764a9d89b4dd4cb6fd589e08c&ipo=images",
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

        const carts = await this.getAllCartProducts();

        if(carts.length){
            id = carts[carts.length -1].id +1;
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

    async getCartById(id) {
        const cartProducts = await this.getAllCartProducts();
        const index = cartProducts.find((cart) => cart.id == id);
        if (!index) throw new Error('No existe el carrito solicitado');
        return index;
    }

    async addNewProductToCart(cartId, product) {
        const carts = await this.getAllCartProducts();

        const index = carts.findIndex((cart) => cart.id === cartId)

        carts[index].products.push(product)

        this.actualizarArchivo(carts)

        return carts
    } 

    async deleteCart(id) {
        const carts = await this.getAllCartProducts();

        const index = carts.findIndex((cart) => cart.id === id);

        if (index < 0) {
            throw "No se ha encontrado el carrito solicitado!";
        }

        carts.splice(index, 1);

        return this.actualizarArchivo(carts);
    }

    async deleteProductInCart(cartId, productId) {
        const carts = await this.getAllCartProducts();

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