const express = require('express')
const router = express.Router()
const controller = require('../api/productos')
const test = require('../api/mocktest')
const path = require("path");
const session = require('express-session');

router.use(session({ resave: true ,secret: '123456' , saveUninitialized: true}));


//middleware
const auth = (req, res, next) => {
    if (req.session.userName) {
        return next();
    } else{
        res.render('login')
    }
}

router.get('/', auth, (req, res) => {
    res.render('productos')
})

router.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}))

router.post('/logon',(req,res)=>{
    let { userName } = req.body;
    req.session.userName = userName;  
    console.log(userName);
    res.json({login : true});
});

router.delete('/logout', (req, res) =>{
    req.session.destroy();
    res.send('logout exitoso');
})

router.get('/productos',async (req,res)=>{
    try{                   
        let items = await controller.listar();             
        //let hayProductos = items.length == 0 ?false:true;
        res.render("productos", { 'userName': req.session.userName});
    } catch(err){
        res.render("productos", {'hayProductos': false, 'productos': []});
    }    
});

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