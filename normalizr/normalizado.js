const { normalize, schema } = require('normalizr');
const MongoCrud = require('../api/mensajesmongo');
const fs = require('fs');

async function Normalizar() {
    let mensajes = await MongoCrud.listar()
    let mensajesConId = {
        id: 'mensajes',
        mensajes : mensajes.map ( mensaje => ({...mensaje._doc}))
    }
    console.log(mensajesConId);
    const mensajesConIdN = normalize(mensajesConId, schemaMensajes);
    fs.writeFileSync('./normalizado.json', JSON.stringify(mensajesConIdN, null, 3));
    return mensajesConIdN;
};


const schemaAutor = new schema.Entity('author', {}, {idAttribute: 'email'});

const schemaMensaje = new schema.Entity('post', {
    author: schemaAutor},{idAttribute: '_id'})

const schemaMensajes = new schema.Entity('posts', {
    mensajes: [schemaMensaje]
    },{idAttribute: 'id'})

const normalizedData = Normalizar();

