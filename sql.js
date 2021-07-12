const options = require('./config/sqlite3');
const knex = require('knex')(options);

knex.schema.createTable('mensajes', table => {
    table.increments('id')
    table.string('message')
    table.integer('date')
}).then(() => {
    console.log('tabla cars creada!');
}).catch(error => {
    console.log('error:', error);
    throw error;
}).finally(() => {
    console.log('cerrando conexion...');
    knex.destroy();
});
