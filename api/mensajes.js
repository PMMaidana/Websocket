const options = require('../config/sqlite3')
const knex = require ('knex')(options);

class Mensaje {
    constructor (){}

    crearTabla(){
        knex.schema.createTable('mensajes', table => {
            table.increments('id')
            table.string('mensaje')
            table.integer('date')
        
    })
    }
    
};

module.exports = new Mensaje();