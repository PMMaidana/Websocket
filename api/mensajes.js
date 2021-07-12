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

    listar(){        
        knex.from('mensajes').select('*')
        .then((row)=> {
            console.log(row);
        })
    }

    guardarMensaje(message){
        knex('mensajes').insert(message)
        .then(() => console.log('mensaje insertado'))
        .catch((err) => { console.log(err); throw err})
        .finally(() => {
        knex.destroy();
        });
    }
    
};

module.exports = new Mensaje();