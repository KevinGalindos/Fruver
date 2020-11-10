
const session = require('express-session');



module.exports = {

    isLoggedInSP(req, res, next) {
        if (req.isAuthenticated() && req.session.datos.NombreRol == "SUPER ADMIN") {
            return next();
        }
        return res.redirect('/');
    },
 
    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    },

    isLoggedIn(req, res, next) {
        if (req.isAuthenticated() && req.session.datos.NombreRol == "ADMINISTRADOR" || req.session.datos.NombreRol == "EMPLEADO PROFESIONAL"
            || req.session.datos.NombreRol == "SUPER ADMIN" || req.session.datos.NombreRol == "EMPLEADO AUXILIAR") {

            return next();

        }
        return res.redirect('/');
    }
};