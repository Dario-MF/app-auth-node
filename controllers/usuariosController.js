const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');




const usuariosGet = async(req= request, res= response) => {
    
    const { limit = 5, initial= 0 } = req.query;//todo lo que viene en el path despues de '?', desestructuramos la parte que nos interesa.
    
    const [total, usuarios] = await Promise.all([ // Ejecutamos ambas promesas a la vez, si falla fallan ambas
        Usuario.countDocuments({ state: true }),
        Usuario.find({ state: true })
            .skip(Number( initial ))
            .limit(Number( limit ))
    ]);

    res.json({
        msg: 'Get API - controller',
        total,
        usuarios
    });
};

const usuariosPost = async(req= request, res= response) => {
    console.log(req.body)
    const {name, email, password, rol} = req.body;// desestructuramos solo las opciones de body que nos interesan, asi filtramos el resto.
    const usuario = new Usuario({name, email, password, rol});

    // encriptar contraseña.
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);// genera encryptacion de la contraseña en una sola via

    //guardar en DB
    await usuario.save();

    res.json({
        msg: 'Post API - controller',
        usuario
    });
};

const usuariosPut = async(req= request, res= response) => {
    const { id } = req.params;// Se almacena en params la variable del path ":id", como id:xxxxxx
    const {_id, password, google, ...resto} = req.body;

    if ( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    };

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        msg: 'Put API - controller',
        usuario
    });
};

const usuariosDelete = async(req= request, res= response) => {

    const {id} = req.params

    // No es recomendable eliminar informacion,
    // cambiamos el estado y a efectos practicos del CRUD consta como eliminado pero la informacion persiste.
    const usuario = await Usuario.findByIdAndUpdate( id, { state: false } );
    
    res.json({
        msg: 'Delete API - controller',
        id,
        usuario
    });
};

const usuariosPatch = (req= request, res= response) => {
    res.json({
        msg: 'Patch API - controller'
    });
};




module.exports= {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}