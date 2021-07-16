const express = require('express')
const routerMensaje = express.Router()
const controller = require('../api/mensajesmongo')

routerMensaje.post('/mensajes/guardar', async (req, res)=>{
    try {
        let result = await controller.guardar(req.body);
        return res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

routerMensaje.get('/mensajes/listar', async (req, res) => {
    try {
        let result = await controller.listar();
        return res.json(result);    
    } catch (error) {
        res.status(500).send(error.message);
    }
});

routerMensaje.put('/mensajes/:id', async (req, res) => {
    try {
        let result = await controller.actualizar(req.params.id, req.body);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

routerMensaje.delete('/mensajes/:id', async (req, res) => {
    try {
        let result = await controller.borrar(req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

module.exports = routerMensaje;