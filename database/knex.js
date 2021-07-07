const options = require('../config/sqlite3');
const knex = require('knex')(options);

// exporto el objeto para usarlo en otros modulos
module.exports = knex;