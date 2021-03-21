const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-JWT');
const googleVerify = require('../helpers/google-verify');


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



const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;

    try {
        const { email, name, img } = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({email});
        if (!usuario) {
            const data = {
                name,
                email,
                img,
                password: 'XD',
                google: true
            }

            usuario = new Usuario( data );
            await usuario.save();
        };

        // si el usuario en db esta en state false
        if(!usuario.state){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado.'
            });
        };

        const token = await generarJWT( usuario.id )

        res.json({
            msg: 'google signin correcto',
            usuario,
            token
        }); 
    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no valido',
            
        }); 
    }
    
};




module.exports = {
    login,
    googleSignIn
};