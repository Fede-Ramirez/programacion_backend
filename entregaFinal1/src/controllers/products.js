const filesystem = require('fs');
const moment = require('moment');
const path = require('path');

class ProductsAPI {

    async validateExistFile() {
        try {
            await filesystem.promises.stat('./productos.json');
            return true;
        } catch (error) {
            console.log("Creando archivo JSON...");
            await filesystem.promises.writeFile('./productos.json', JSON.stringify([]));
            return false;
        }
    }

    async loadFileData() {
        try {
            let productsByDefault = [
            {
                id: 1,
                timestamp: "09-11-22 19:43:30",
                title: "Camiseta",
                description: "Camiseta",
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
        ];
        const data = JSON.stringify(productsByDefault, null, "\t");
        await filesystem.promises.writeFile('./productos.json', data);
        } 
        catch(err) {
            throw new Error("Ha ocurrido un error en la carga de productos", err);
        }
    }

    async obtenerJSON(){
        const viewsFolderPath = path.resolve(__dirname, '../../productos.json')
        const data = await filesystem.promises.readFile(viewsFolderPath,'utf-8');
        return JSON.parse(data);
    }

    async actualizarArchivo(productos){
        filesystem.promises.writeFile('./productos.json', JSON.stringify(productos, null, '\t'), 'utf-8');
    }

    async getAll() {
        const jsonExists = await this.validateExistFile();

        if(!jsonExists) {
            await this.loadFileData();
        }

        const data =  await this.obtenerJSON();
        return data;
    };

    async exist(id){
        const data = await this.obtenerJSON();

        const indice = data.findIndex(producto => producto.id == id)

        return indice >= 0;
    };

    async save(data){
        if( !data.title || 
            !data.price || 
            !data.description || 
            !data.code || 
            !data.photo || 
            !data.stock || 
            typeof data.title !== 'string' || 
            typeof data.description !== 'string' || 
            typeof data.photo !== 'string' ||
            typeof data.code !== 'string'
            ) throw new Error('Datos invalidos');

        let id;

        const productos = await this.obtenerJSON();

        if(productos.length){
            id = productos[productos.length -1].id +1;
        }

        const nuevoProducto = {
            id: id,
            timestamp: moment().format("DD-MM-YYYY HH:MM:SS"),
            title: data.title,
            description: data.description,
            code: data.code,
            photo:data.photo,
            price: parseInt(data.price),
            stock: parseInt(data.stock)
        }

        productos.push(nuevoProducto);

        this.actualizarArchivo(productos)

        return productos
    }
    

    async getById(id){
        const productos = await this.obtenerJSON();
        const indice  = productos.find((producto) => producto.id == id);
        if (!indice) throw new Error("No existe el producto solicitado");
        return indice;
    }
    
    async findByIdAndUpdate (id, newData) {
		const exist = await this.exist(id);

		if (!exist) throw new Error(`No existe item con ID ${id}`)

		const productos = await this.getAll()

		const indice = productos.findIndex(producto => producto.id == id)

        if(
            !newData.title || 
            !newData.price || 
            !newData.description || 
            !newData.code || 
            !newData.photo || 
            !newData.stock || 
            typeof newData.title !== 'string' || 
            typeof newData.description !== 'string' ||
            typeof newData.code !== 'string' || 
            typeof newData.photo !== 'string' || 
            typeof newData.price !== 'number'|| 
            typeof newData.stock !== 'number'
            ) throw new Error('Datos invalidos');

		const oldProduct = productos[indice]

		const newProduct = {
			id: oldProduct.id,
            timestamp: moment().format("DD-MM-YYYY HH:MM:SS"),
			title: newData.title,
            description: newData.description,
            code: newData.code,
            photo:newData.photo,
			price: newData.price,
            stock: newData.stock
		}

		productos.splice(indice, 1, newProduct)

		await this.actualizarArchivo(productos)
		return newProduct
	}

    async findByIdAndDelete(id){
        const productos = await this.obtenerJSON();
        productos.splice(id - 1,1);
        return await this.actualizarArchivo(productos);
    }
}

const productsApiInstance = new ProductsAPI();

module.exports = {
    ProductsController: productsApiInstance
};