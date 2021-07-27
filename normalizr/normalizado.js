const { normalize, schema } = require('normalizr');
const MongoCrud = require('../api/mensajesmongo');
const fs = require('fs');

async function Normalizar() {
    let data = await MongoCrud.listar()
    console.log(data);

const author = new schema.Entity('author');

const mensajes = new schema.Entity('mensajes', {
    mensajes: author,
    id: [author]
})
const normalizedData = normalize(data, mensajes);
console.log(JSON.stringify(normalizedData, null, 3));
fs.writeFileSync('./normalizado.json', JSON.stringify(normalizedData, null, 3));
}

Normalizar();

