const express = require('express');
const rutas = express.Router();
const passport = require('passport');
const modeloIniciar = require('../models/Iniciar');
const modeloAdmin = require('../models/Administrador');
const { isLoggedIn, isNotLoggedIn } = require('../controlers/auth');

rutas.get('/home', modeloAdmin.CargarDashboard);
rutas.get('/producto', modeloAdmin.CargarProducto);
rutas.get('/lote', modeloAdmin.CargarLote);
rutas.get('/proveedor', modeloAdmin.CargarProveedor);
rutas.get('/pedido', modeloAdmin.CargarPedido);
rutas.get('/devolucion', modeloAdmin.CargarDevolucion);
rutas.get('/reporte', modeloAdmin.CargarVenta);
rutas.get('/persona', modeloAdmin.CargarPersona);
rutas.get('/salir', (req, res) => {
    res.redirect('/');
})
rutas.get('/', (req,res)=>{
    res.render('login.html')
})
rutas.post('/iniciar', modeloIniciar.iniciar);

//Creacionn de usuario con autenticacion 
rutas.get('/registro', isNotLoggedIn, (req, res) => {
    res.render('registrar.html')
});

rutas.post('/add', passport.authenticate('local.signup', {
    successRedirect: '/registro',
    failureRedirect: '/iniciar',
    failureFlash: true
}));
module.exports = rutas;