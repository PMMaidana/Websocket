const mysql = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'productos'
    },
    pool: { min: 0, max: 7 }
}

module.exports = mysql;
