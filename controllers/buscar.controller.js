const {Usuario, Categoria, Producto} = require('../models');
const { isValidObjectId } = require('mongoose');

/* busqueda por coleccion:
    const itemsEncontrados = Modelo.find({coleccion: ObjectId(idColeccion)})
 */
const coleccionesPermitidas = [
    'categorias',
    'usuarios',
    'productos',
    'roles'
];
const buscarUsuarios = async( usuario = '', res ) => {
    const isMongoId = isValidObjectId( usuario );
    if(isMongoId){
        const usuarios = await Usuario.findById(usuario);
        return res.json({
            results: (usuarios) ? [ usuarios] : []
        });
    };
    const regex = new RegExp(usuario, 'i');
    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {email: regex}],
        $and: [{state: true}]
    })
    return res.json({
        results: usuarios
    });
};
const buscarCategorias = async( categoria = '', res ) => {
    const isMongoId = isValidObjectId( categoria );
    if(isMongoId){
        const categorias = await Categoria.findById(categoria);
        return res.json({
            results: (categorias) ? [ categorias] : []
        });
    };
    const regex = new RegExp(categoria, 'i');
    const categorias = await Categoria.find({
        nombre: regex,
        estado: true
    })
    return res.json({
        results: categorias
    });
};
const buscarProductos = async( producto = '', res ) => {
    const isMongoId = isValidObjectId( producto );
    if(isMongoId){
        const productos = await Producto.find({_id: producto});
        return res.json({
            results: productos
        });
    };
    const regex = new RegExp(producto, 'i');
    const productos = await Producto.find({
        nombre: regex,
        estado: true
    }).populate('categoria', {_id: 0, nombre: 1})
    return res.json({
        results: productos
    });
};


const buscar = async (req, res) => {
    const { coleccion, termino} = req.params;
    try {
        if(!coleccionesPermitidas.includes(coleccion)){
            res.status(400).json({
                error: `la coleccion debe ser una permitida: ${coleccionesPermitidas}`
            });
        };

        switch (coleccion) {
            case 'categorias':
                buscarCategorias(termino, res)
                break
            case 'usuarios':
                buscarUsuarios(termino, res)
                break
            case 'productos':
                buscarProductos(termino, res)
                break
            case 'roles':
                
            default:
               
        }
       /*  res.status(200).json({
            msg: 'respuesta OK',
            coleccion,
            termino
        }) */
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor'
        });
    }
};



module.exports = {
    buscar
};