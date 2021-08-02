const express = require('express')
const router = express.Router()
const controller = require('../api/productos')
const test = require('../api/mocktest')
const path = require("path");
const session = require('express-session');
const bienvenida = require('../public/js/login')


//middleware
const auth = (req, res, next) => {
    if (req.session.username) {
        return next();
    } else{
        return res.status(401).send('no autorizado')
    }
}

let usernames = []

router.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}))

router.post('/submit',function(req, res){
    let data = req.body.user;
    req.session.username = JSON.stringify(data);
    console.log('funciona' + data)
    usernames.push(data);
    res.redirect('../productos.html');
});

router.get('/cookies', (req, res) => {
    res.send(`es: ${req.session.username}`)
})

router.delete('/logout', (req, res) =>{
    req.session.destroy();
    res.send('logout exitoso');
})

router.get('/productos/listar', auth, (req, res) => {
    try {
        res.status(200).send(controller.listar());    
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/productos/listar/:id', auth, (req, res) => {
    try {
        res.send(controller.listarPorId(parseInt(req.params.id)));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/productos/guardar', auth, (req, res)=>{
    try {
        res.json(controller.guardar(req.body));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/productos/actualizar/:id', auth, (req,res)=>{
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

router.delete('/productos/borrar/:id', auth, (req,res)=>{
    try {
        res.send(controller.borrar(req.params.id));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/productos/vista', auth, (req, res) => {
    try {
        let items = controller.listar()
        res.render('vista', { productos: items, hayProductos: items.length});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/productos/test-vista/:numero?', auth, (req, res) => {
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
module.exports.usernames = usernames