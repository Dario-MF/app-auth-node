const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-JWT');


const login = async(req, res = response) => {
    const { email, password }= req.body;
    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ email });
        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario/contraseña no son validos - email'
            });
        };
        // Verificar si el usuario esta activo
        if( !usuario.state ){
            return res.status(400).json({
                msg: 'Usuario/contraseña no son validos - state: false'
            });
        };
        // Verificar contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario/contraseña no son validos - password incorrecto'
            });
        };
        // generar JWT
        const token = await generarJWT( usuario.id ); 

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal'
        });
    };
};




module.exports = {
    login
};