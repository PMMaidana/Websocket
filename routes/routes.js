const express = require('express')
const router = express.Router()
const controller = require('../api/productos')
const test = require('../api/mocktest')
const session = require('express-session');

const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }


router.use(session({
    store: MongoStore.create({
        //En Atlas connect App :  Make sure to change the node version to 2.2.12:
        mongoUrl: 'mongodb+srv://root:root@cluster0.suzx1.mongodb.net/sesion?retryWrites=true&w=majority',
        mongoOptions: advancedOptions,
        ttl: 1000
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60, // 1 min
        sameSite: true,
        secure: false
      }
}))

router.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}))

router.get('/productos',async (req,res)=>{
    try{                   
        let items = await controller.listar();
        //let hayProductos = items.length == 0 ?false:true;
        var user = req.user;
        res.render("productos", { username: user.username});
    } catch(err){
        res.render("productos", {'hayProductos': false, 'productos': []});
    }    
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

router.post('/productos/guardar', (req, res)=>{
    try {
        res.json(controller.guardar(req.body));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/productos/actualizar/:id', (req,res)=>{
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

router.delete('/productos/borrar/:id', (req,res)=>{
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