// const filesystem = require('fs');
// const path = require('path');

// class ProductsAPI {

//     async obtenerJSON(filePath){
//         const jsonPath = path.resolve(__dirname, `../../${filePath}.json`);
//         const data = await filesystem.promises.readFile(jsonPath,'utf-8');
//         return JSON.parse(data);
//     }

//     async actualizarArchivo(params, filePath){
//         const jsonPath = path.resolve(__dirname,`../../${filePath}.json`);
//         filesystem.promises.writeFile(jsonPath, JSON.stringify(params, null, '\t'), 'utf-8');
//     }

//     async validateBody (data) {
//         if(!data.title || !data.price || typeof data.title !== 'string') throw new Error('Datos invalidos');
//     }

//     async getAll() {
//         const data =  await this.obtenerJSON();
//         return data;
//     };

//     async exist(id){
//         const data = await this.obtenerJSON();

//         const indice = data.findIndex(producto => producto.id == id)

//         return indice >= 0;
//     };

//     async save(data){
//         this.validateBody(data)
        
//         let id;

//         const productos =   await this.obtenerJSON();

//         if(productos.length){
//             id = productos[productos.length -1].id +1;
//         }

//         const nuevoProducto = {
//             title: data.title,
//             price: parseInt(data.price),
//             img: data.img,
//             id: id
//         }

//         productos.push(nuevoProducto);

//         this.actualizarArchivo(productos)

//         return productos
//     }
    

//     async getById(id){
//         const productos = await this.obtenerJSON();
//         const indice  = productos.find((producto) => producto.id == id);
//         if (!indice) throw new Error("No existe el producto solicitado");
//         return indice;
//     }
    
//     async findByIdAndUpdate (id, newData) {
// 		const exist = await this.exist(id);

// 		if (!exist) throw new Error(`No existe item con ID ${id}`)

// 		const productos = await this.getAll()

// 		const indice = productos.findIndex(producto => producto.id == id)

//         if(!newData.title || !newData.price || typeof newData.title !== 'string' || typeof newData.price !== 'number') throw new Error('Datos invalidos');

// 		const oldProduct = productos[indice]

// 		const newProduct = {
// 			id: oldProduct.id,
// 			title: newData.title,
// 			price: newData.price
// 		}

// 		productos.splice(indice, 1, newProduct)

// 		await this.actualizarArchivo(productos)
// 		return newProduct
// 	}

//     async findByIdAndDelete(id){
//         const productos = await this.obtenerJSON();
//         productos.splice(id - 1,1);
//         return await this.actualizarArchivo(productos);
//     }
// }

// const productsApiInstance = new ProductsAPI();

// module.exports = {
//     ProductsController: productsApiInstance
// };

const { productsInstance } = require('../services/database');

const getAllProducts = async () => {
    const products = await productsInstance.get();

    return products;
}

const createProduct = async (title, price, image) => {
    const newProduct = await productsInstance.create({
        title, price, image
    });
}

module.exports = {
    getAllProducts,
    createProduct
};