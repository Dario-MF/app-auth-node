const Role = require('../models/role');
const Usuario = require('../models/usuario');




// verificar si es un role valido.
const esRoleValido = async(rol= '')=> {
    const existRol = await Role.findOne({ rol });
    if(!existRol) {
        throw new Error(`El rol: ${rol}, no existe en la DB`);
    };
};

// verificar si correo existe.
const esEmailUnique = async( email = '' )=> {
    const existeEmail =await Usuario.findOne({ email });
    if(existeEmail){
        throw new Error(`El email: ${email}, ya esta registrado`);
    };
};

// validar si el id existe en la DB.
const existeUsuarioId = async( id ) => {
    const existeUsuario = await Usuario.findById( id );
    if (!existeUsuario) {
        throw new Error(`El usuario con id: ${id}, no existe`);
    };
};



module.exports = {
    esRoleValido,
    esEmailUnique,
    existeUsuarioId
};