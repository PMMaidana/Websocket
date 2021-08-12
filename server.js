const express = require('express');
const handlebars = require('express-handlebars')
const app = express();
const http = require('http').Server(app)
const productos = require('./api/productos')
const session = require('express-session');
const MongoCrud = require ('./api/mensajesmongo')

const io = require('socket.io')(http)

const dotenv = require('dotenv');

dotenv.config();

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

//----------------------------------PASSPORT-------------------------------------------
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const routes = require('./routes');
const User = require('./models');

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails'],
  scope: ['email']
}, 
  function (accessToken, refreshToken, profile, done) {
  //console.log(profile);
  let userProfile = profile;
  console.log(userProfile)
  return done(null, userProfile);
}));

//---------------------------------INICIALIZAR PASSPORT--------------------------------------------------
app.use(passport.initialize());
app.use(passport.session());

//----------------------------------------------------------------------------------------------------------


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

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

// ------------------------------------------------------------------------------
//  ROUTING GET POST
// ------------------------------------------------------------------------------
//  INDEX
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/productos');;
} else {
    res.redirect('login')
}
});

app.get('/auth/facebook', passport.authenticate('facebook', {
  scope:  ['email']
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook',
  {
      successRedirect: '/productos',
      failureRedirect: '/faillogin'
  }
));

app.get('/login', routes.getLogin);

router.get('/productos',async (req,res)=>{
  try{
      res.send(controller.listar());
      res.render("productos", { user: req.user});
  } catch(err){
      let user = req.user;
      let email = user.emails[0].value;
      let photo = user.photos[0].value;
      res.render("productos", { user: user, email: email, photo: photo, 'hayProductos': false, 'productos': []});
  }    
});

app.get('/faillogin', (req, res) => {
  res.status(401).send({ error: 'no se pudo autenticar con facebook' })
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


//  FAIL ROUTE
app.get('*', routes.failRoute);


const PORT = process.env.PORT || 8081;

const server = http.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);
});

server.on('error', error => {
    console.error('Error de servidor: ', error);
});

module.exports = server;