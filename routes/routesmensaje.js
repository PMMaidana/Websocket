const express = require('express')
const routerMensaje = express.Router()
const controller = require('../api/mensajes')

routerMensaje.post('/mensajes/guardar',(req, res)=>{
    try {
        res.json(controller.guardarMensaje(req.body));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

routerMensaje.get('/mensajes/listar', (req, res) => {
    try {
        res.status(200).send(controller.listar());    
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = routerMensaje;