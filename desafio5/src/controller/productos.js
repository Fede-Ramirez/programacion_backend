const filesystem = require('fs');
const path = require('path');

class ProductsAPI {
  
    async obtenerJSON(){
        const viewsFolderPath = path.resolve(__dirname, '../../productos.json')
        const data = await filesystem.promises.readFile(viewsFolderPath,'utf-8');
        return JSON.parse(data);
    }
    async actualizarArchivo(productos){
        filesystem.promises.writeFile('./productos.json', JSON.stringify(productos, null, '\t'), 'utf-8');
    }
    async getAll() {
        const data =  await this.obtenerJSON();
        return data;
    };

    async exist(id){
        const data = await this.obtenerJSON();

        const indice = data.findIndex(producto => producto.id == id)

        return indice >= 0;
    };

    async save(data){
        if(!data.title || !data.price || typeof data.title !== 'string') throw new Error('Datos invalidos');

        let id;

        const productos =   await this.obtenerJSON();

        if(productos.length){
            id = productos[productos.length -1].id +1;
        }

        const nuevoProducto = {
            title: data.title,
            price: parseInt(data.price),
            img: data.img,
            id: id
        }

        productos.push(nuevoProducto);

        console.log(`se agrego ${nuevoProducto.title} a la lista de productos`);

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

        if(!newData.title || !newData.price || typeof newData.title !== 'string' || typeof newData.price !== 'number') throw new Error('Datos invalidos');

		const oldProduct = productos[indice]

		const newProduct = {
			id: oldProduct.id,
			title: newData.title,
			price: newData.price
		}

		productos.splice(indice, 1, newProduct)

		await this.actualizarArchivo(productos)
		return newProduct
	}

    async findByIdAndDelete(id){
        const productos = await this.obtenerJSON();
        productos.splice(id - 1,1);
        console.log(`Se removio el producto con id:${id} de sus productos`);
        return await this.actualizarArchivo(productos);
    }
    // async deleteAll(){
    //     const productos = await this.obtenerJson();
    //     productos.splice(0);
    //     console.log('Se borraron todos los productos de su lista');
    //     return await this.actualizarArchivo(productos);
    // }
}

const productsApiInstance = new ProductsAPI();

module.exports = {
    ProductsController: productsApiInstance
};