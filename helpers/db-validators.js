const {Role, Usuario, Categoria, Producto }= require('../models');




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

// vaslidar si el id de la categoria existe.
const existeCategoriaId = async( id ) => {
    const existe = await Categoria.findById( id );
    if (!existe) {
        throw new Error(`La categoria con id: ${id}, no existe`);
    };
};
const existeCategoria = async( nombre ) => {
    const existe = await Categoria.findOne({nombre: nombre.toUpperCase()});
    if (!existe) {
        throw new Error(`La categoria: ${nombre}, no existe`);
    };
};

// vaslidar si el id del producto existe.
const existeProductoId = async( id ) => {
    const existe = await Producto.findById( id );
    if (!existe) {
        throw new Error(`El producto con id: ${id}, no existe`);
    };
};



module.exports = {
    esRoleValido,
    esEmailUnique,
    existeUsuarioId,
    existeCategoriaId,
    existeCategoria,
    existeProductoId
};