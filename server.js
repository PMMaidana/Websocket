const express = require('express');
const handlebars = require('express-handlebars')
const app = express();
const http = require('http').Server(app)
const productos = require('./api/productos')

const MongoCrud = require ('./api/mensajesmongo')

const fs = require('fs')

const io = require('socket.io')(http)

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

app.engine('hbs',
            handlebars({
                extname:".hbs",
                defaultLayout:"index.hbs",
                layoutsDir:__dirname + '/views/layouts/',
                partialsDir:__dirname + '/views/partials/'
            })
    );

app.set('view engine', 'hbs');
app.set('views','./views');



io.on('connection', async socket => {
    let messages = MongoCrud.listar().then(data => { return data })
    .then(data => {io.sockets.emit('messages', data)});
    console.log('Nuevo cliente conectado');
    
    
    
    socket.emit('productos', productos.listar())
    socket.on('update', data => {
        io.sockets.emit('productos', productos.listar())
    })

    socket.on('new-message', message =>{
    MongoCrud.guardar(message).then((data) => {io.sockets.emit('messages', data)}); 
    });
})


app.use((err, req, res, next) =>{
    console.error(err.message);
    res.status(500).send('Algo se rompió!!');
});

const router = require('./routes/routes');
const routerMensaje = require('./routes/routesmensaje');
app.use('/', router);
app.use('/', routerMensaje)

const PORT = process.env.PORT || 8081;

const server = http.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);
});

server.on('error', error => {
    console.error('Error de servidor: ', error);
});

module.exports = server;