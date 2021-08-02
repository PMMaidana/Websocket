const { denormalize, schema } = require('normalizr');
const fs = require('fs');
const normalizado = require('./normalizado.json');

const schemaAutor = new schema.Entity('author', {}, {idAttribute: 'email'});

const schemaMensaje = new schema.Entity('post', {
    author: schemaAutor},{idAttribute: '_id'})

const schemaMensajes = new schema.Entity('posts', {
    mensajes: [schemaMensaje]
    },{idAttribute: 'id'})

const desnormalizado = denormalize(normalizado.result, schemaMensajes, normalizado.entities);
console.log(JSON.stringify(desnormalizado, null, 3));
fs.writeFileSync('./desnormalizado.json', JSON.stringify(desnormalizado, null, 3));
