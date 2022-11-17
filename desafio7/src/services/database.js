const knex = require('knex');

const dbConfig = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        port: 3306,
        password: '',
        database: 'desafio7'
    }
}

class Database {

    constructor(config, tableName) {
        this.connection = knex(config);
        this.tableName = tableName;
    }

    get(id) {
        if (id) {
            return this.connection(this.tableName).where('id', id);
        }

        return this.connection(this.tableName);
    }

    create(data) {
        return this.connection(this.tableName).insert(data);
    }

    update(id, data) {
        return this.connection(this.tableName).where('id', id).update(data);
    }

    delete(id) {
        return this.connection(this.tableName).where('id', id).del();
    }
}

const productsTableName = 'products';
const messagesTableName = 'messages';

const productsInstance = new Database(dbConfig, productsTableName);
const messaggesInstance = new Database(dbConfig, 'messages');

const database = knex(dbConfig);

const initProductsTable = async() => {
    await database.schema.createTable(productsTableName, (productsTable) => {
        productsTable.increments(),
        productsTable.string('title').notNullable();
        productsTable.integer('price');
        productsTable.string('image').notNullable();
        productsTable.timestamps(true, true);
    })

    const initialProducts = [
        {
            title: "smart tv 50 pulgadas noblex",
            price: 10.00,
            image: "https://cdn2.iconfinder.com/data/icons/i-love-apple-1/512/display2.png",
        },
        {
            title: "samsung galaxy flip 4",
            price: 26.50,
            image: "https://cdn2.iconfinder.com/data/icons/i-love-apple-1/512/black_iphone.png",
        },
    ];

    const createProducts = initialProducts.map((product) => 
        database(productsTableName).insert(product)
    );
    console.log('productos insertados!')
    await Promise.all(createProducts);
}

const initProductsDatabase = async () => {
    const productsTableExists = await database.schema.hasTable(productsTableName);

    if (!productsTableExists) {
        await initProductsTable();
    }
}

module.exports = {
    productsInstance,
    messaggesInstance,
    initProductsDatabase
}