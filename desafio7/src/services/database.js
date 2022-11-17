const knex = require('knex');

const dbConfig = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        port: 30006,
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

const productsInstance = new Database(dbConfig, productsTableName);
const messaggesInstance = new Database(dbConfig, 'messages');

const initProductsDatabase = async () => {
    const database = knex(dbConfig);
    const productsTableExists = await database.schema.hasTable(productsTableName);

    if (!productsTableExists) {
        database.schema.createTable(productsTableName, (productsTable) => {
            productsTable.increments(),
            productsTable.string('name').notNullable();
            productsTable.decimal()
        })
    }}

module.exports = {
    productsInstance,
    messaggesInstance
}