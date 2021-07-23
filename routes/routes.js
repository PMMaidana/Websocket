const express = require('express')
const router = express.Router()
const controller = require('../api/productos')
const test = require('../api/mocktest')

router.get('/', (req, res) => {
    res.send('Bienvenido al servidor express');
});

router.get('/productos/listar', (req, res) => {
    try {
        res.status(200).send(controller.listar());    
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/productos/listar/:id', (req, res) => {
    try {
        res.send(controller.listarPorId(parseInt(req.params.id)));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/productos/guardar',(req, res)=>{
    try {
        res.json(controller.guardar(req.body));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/productos/actualizar/:id',(req,res)=>{
    try {
        let update = {
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail
        };
        res.send(controller.actualizar(req.params.id, update));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/productos/borrar/:id',(req,res)=>{
    try {
        res.send(controller.borrar(req.params.id));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/productos/vista', (req, res) => {
    try {
        let items = controller.listar()
        res.render('vista', { productos: items, hayProductos: items.length});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/productos/test-vista/:numero?', (req, res) => {
    try {
        let data = req.params.numero; if(data === undefined){data = 10}
        test.mockGenerator(data);
        let items = test.listar()
        res.render('testview', {productos: items, hayProductos: items.length});
    } catch (error) {
        res.status(500).send(error.message)
    }
    
})

module.exports = router;