const pool = require('../database/database');
const modelo = {};
modelo.CargarDashboard = async (req, res) => {
    pool.query("se", (err, cosul) => {
        if (err) {
            console.log(err);
        }
    });
    res.render('index.html');
}
modelo.CargarProducto = async (req, res) => {
    res.render('producto.html');
}
modelo.CargarLote = async (req, res) => {
    res.render('lote.html');
}
modelo.CargarProveedor = async (req, res) => {
    res.render('proveedor.html');
}
modelo.CargarPedido = async (req, res) => {
    res.render('pedido.html');
}
modelo.CargarDevolucion = async (req, res) => {
    res.render('devolucion.html');
}
modelo.CargarVenta = async (req, res) => {
    res.render('reporte.html');
}
modelo.CargarPersona = async (req, res) => {
    res.render('persona.html');
}
module.exports = modelo;