const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/ecommerce";

const schema = mongoose.Schema({
    author: [{
        id: { type: String},
        nombre: { type: String},
        apellido: { type: String},
        edad: { type: Number},
        alias: { type: String},
        avatar: { type: String}
     }],
    text: { type: String, require: true, max: 140 },
    timestamp: { type: String, default: new Date().toLocaleString() }
});

const MyModel = mongoose.model('mensajes', schema); 

async function connect() {
    try {await mongoose.connect("mongodb://localhost:27017/ecommerce", { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`mongoose conectado en ${uri}`);
    return null}
    catch (error) {console.log(error);}
}

connect();

class Mensaje {
    constructor(){}
    async listar(){
        let mensajes = MyModel.find({})
        return mensajes
    }

    async guardar(mensaje) {
        return MyModel.create(mensaje);
    }

    async borrar(id){
        await MyModel.findByIdAndDelete( { _id: id } )
    }

    async actualizar(id, toUpdate) {
        return MyModel.findByIdAndUpdate(id, toUpdate);
    }

    async borrar(id){ 
            return MyModel.findByIdAndDelete(id);
    }
}

module.exports = new Mensaje
