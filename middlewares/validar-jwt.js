const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');
    if(!token){
        res.status(401).json({
            msg: 'No se encuentra el token en la petición.'
        })
    }
    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRYVATEKEY );

        const usuario = await Usuario.findById( uid );

        if ( !usuario ){
            return res.status(401).json({
                msg:'Token no valido, user unknown'
            });
        }

        if ( !usuario.state ){
            return res.status(401).json({
                msg:'Token no valido, user state:false'
            });
        };
       
        req.usuario = usuario
       

        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'El token no es valido.'
        })
    }
   

};

module.exports = {
    validarJWT
};