const mongoose = require('mongoose');

const schema = mongoose.Schema({
    mensaje: { type: String, required: true, max: 100 },
    date: { type: Number, required: true }
});

const Mensajes = mongoose.model('mensajes', schema);

module.exports = Mensajes;