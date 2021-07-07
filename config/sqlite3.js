const sqlite3 = {
    client: 'sqlite3',
    connection: {
        filename: __dirname + '/../db/mensajes.sqlite'
    },
    useNullAsDefault: true
}

module.exports = sqlite3;
