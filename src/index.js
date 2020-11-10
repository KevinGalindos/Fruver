const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const mysqlsession = require('express-mysql-session')(session);
const passport = require('passport');
// inicilizando
const app = express();
const pool = require('./database/database');
//database
const { database } = require('./keys');
// importar rutas
const routes = require('./rutas/rutas');
// configuracion
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// 
var sqlsession = new mysqlsession(database);
app.use(session({

    secret: 'MasterCode',
    name: 'CookieSession',
    resave: false,
    saveUninitialized: false,
    store: sqlsession,
    cookie: {
        secure: false,
        maxAge: 36000000,
        httpOnly: false,

    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// rutas
app.use(routes);


// ------ Codificar el Usuario --------
passport.serializeUser((user, done) => {
    
    //console.log('Serealize: ' + user);
    done(null, user);
  
  });
  
  
  // ----- Descodificar el usuario ------
  passport.deserializeUser(async (id, done) => {
   // console.log(id);
    await pool.query('select * from login where id_login = ?', [id.id_login], (err, user) => {
        
        if (err) {
            console.log(err);
            done(err);
        } else {
         //   console.log('Deserealize: ' + user);
            done(err, user);
        }
    });
  
  });
  //#endregion
  
//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Starting Server
app.listen(app.get('port'), () => {
    console.log(`servidor en linea en puerto: ${app.get('port')}`);
});