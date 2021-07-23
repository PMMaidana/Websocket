const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/ecommerce";

const schema = mongoose.Schema({
    mensaje: { type: String, max: 400},
    user: { type: String, require: true, max: 100 },
    timestamp: { type: Date, default: new Date() }
});

const MyModel = mongoose.model('ecommerce', schema);

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
        return await MyModel.find({})
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
