


const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session = require('express-session');
const pool = require('../database/database');
const helpers = require('./helper');

// ------------- Iniciar Sesion ------------
let DatosUsuario = {
  idUsuario: '',
  Usuario: '',
  nombreCompledo: '',
  cedula:'',
  correo:'',
  telefono:''

};
passport.use('local.signin', new Strategy({

  usernameField: 'usuario',
  passwordField: 'contrasena',
  passReqToCallback: true
}, async (req, usuario, contrasena, done, res) => {

  await pool.query("SELECT u.id_usuario, u.usuario AS nombreUsuario, u.contrasena, tp.id_tipoUsuario, tp.descripcion_tipoUsuario AS Tipo_Usuario FROM usuario u INNER JOIN tipousuario tp ON u.fk_id_tipoUsuario = tp.id_tipoUsuario WHERE u.usuario = ?;", [usuario], async (err, resultado) => {
    if (err) {
      done(true, null);
      // console.log(err);
    } else {

      var rol;
      //console.log(resultado[0]); 
      if (resultado[0]) {
        const user = resultado[0];
        const validaUser = await helpers.macthPassword(contrasena, user.contrasena);

        if (validaUser) {
          await pool.query("SELECT * from loginUsuario where  id_usuario = ? ", [user.id_usuario], async (err, results) => {
            if (err) {
              done(true, null);
            } else {
              if (results.length > 1) {
                done(null, 0);
              } else {

                DatosUsuario = {
                  idUsuario: results[0].id_usuario,
                  Usuario: results[0].nombreUsuario,   
                  nombreCompledo: results[0].nombre_completo ,
                  cedula:results[0].cedula ,
                  correo:results[0].correo ,
                  telefono:results[0].telefono           
                }
                req.session.datos = DatosUsuario;
                // req.usuario = DatosUsuario;
                rol = {
                  roles: results[0].nombreUsuario, 
                  id_login: user.id_usuario
                }
                //console.log(session.datos);                                                
                done(false, rol);
              }
            }
          });
        } else {
          done(true, null, null);
        }
      } else {
        done(true, null, null);
      }
    }
  })


}));


