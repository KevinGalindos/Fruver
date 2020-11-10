const passport = require('passport');
const pool = require('../database/database');
const modelo = {};
modelo.insertar = passport.authenticate('local.signup', {
    successRedirect: '/1a3c43d19-c',
    failureRedirect: '/',
    failureFlash: true
});
modelo.iniciar = (req, res, next) => {

    passport.authenticate('local.signin', (err, user, info) => {
        if (err) {

            res.render('index.html');
        } else {

            if (info) {
                res.render('index.html');
            } else {
                if (user != 0) {
                    console.log(user);
                    req.logIn(user, async (err) => {
                        if (err) {
                            return next(err);
                        } else {
                            req.session.menu = await pool.query("SELECT * from cargarmenu where Usuario = ?", [req.session.datos.idUsuario]);

                            console.log(req.session.menu);
                            // modelo.CargarMenu();

                            if (user.roles == 'admin') {
                                return res.redirect('/inicio');
                            }
                            if (user.roles == 'EMPLEADO PROFESIONAL') {
                                return res.redirect('/inicio');
                            }

                        }
                    })
                } else {
                    if (user == 0) {
                        return res.redirect('/SelecionarEmpresa');
                    }
                }

            }


        }


    })(req, res, next);


    
};

// Metodo para salir y cerrar sesion
modelo.salir = (req, res) => {

    req.session.destroy(() => {
        req.logOut();
        res.clearCookie('CookieSession');
        res.status(200);
        res.redirect('/');

    });

}
module.exports = modelo;