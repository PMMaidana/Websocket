const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/ecommerce";

const MyModel = mongoose.model('users', new mongoose.Schema({ nombre: String, apellido: String }));

async function connect() {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`mongoose conectado en ${uri}`);
    return;
}

connect();