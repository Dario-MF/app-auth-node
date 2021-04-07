const { Categoria, Producto} = require('../models');


const obtenerProductos = async (req, res) => {
    const  limit = Number(req.query.limit) || 5;
    const  initial = Number(req.query.initial) || 0;
    const query = {estado:true}
    try {
        const [ total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .populate('usuario', {name: 1, img: 1, rol: 1})
                .populate( 'categoria', {nombre: 1, _id: 0})
                .limit(limit)
                .skip(initial)
        ]);
        res.status(200).json({
            msg: 'respuesta OK',
            total,
            productos
        })
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor'
        });
    }
};
const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findById(id)
            .populate('usuario', {name: 1, img: 1, rol: 1})
            .populate( 'categoria', {nombre: 1, _id: 0})
        res.status(200).json({
            msg: 'respuesta OK',
            producto
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor'
        });
    }
};
const crearProducto = async (req, res) => {
    const usuario = req.usuario._id;
    const {nombre, precio, descripcion, disponible, categoria} = req.body;
    try {
        // Validar si existe un producto con ese nombre.
        const productoExiste = await Producto.findOne({nombre: nombre.toUpperCase()});
        if(productoExiste){
            return res.status(400).json({
                error:'El nombre del producto ya existe'
            });
        };
        const { _id } = await Categoria.findOne({nombre: categoria.toUpperCase()})
        const producto = new Producto({
            nombre: nombre.toUpperCase(),// guardado en mayus para comparar valor.
            precio,
            descripcion,
            disponible,
            categoria: _id,
            usuario
        });
        await producto.save();
        res.status(200).json({
            msg: 'creado OK',
            producto
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor'
        });
    };
};
const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const usuario = req.usuario._id;
    const {nombre, precio, descripcion, disponible, categoria} = req.body;
    try {
        const productoAnterior = await Producto.findById(id);
        if(nombre.toUpperCase() !== productoAnterior.nombre){
            // Validar si existe un producto con ese nombre.
            const productoExiste = await Producto.findOne({nombre: nombre.toUpperCase()});
            if(productoExiste){
                return res.status(400).json({
                    error:'El nombre del producto ya existe'
                });
            };
        };
        const { _id } = await Categoria.findOne({nombre: categoria.toUpperCase()});
        const productoActualizado = await Producto.findByIdAndUpdate( id, {
            nombre: nombre.toUpperCase(),
            precio,
            descripcion,
            disponible,
            categoria: _id,
            usuario
        }, {new: true});
        console.log(productoActualizado)
        const producto = await productoActualizado
            .populate('usuario', {name: 1, img: 1, rol: 1})
            .populate( 'categoria', {nombre: 1, _id: 0})
            .execPopulate()
        res.status(200).json({
            msg: 'actualizado OK',
            producto
        })
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor',
            error
        });
    };
};
const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    const usuario = req.usuario._id;
    try {
        const productoEliminado = await Producto.findByIdAndUpdate( id, {estado: false, usuario}, {new:true});
        const producto = await productoEliminado
            .populate('usuario', {name: 1, img: 1, rol: 1})
            .populate( 'categoria', {nombre: 1, _id: 0})
            .execPopulate()
        res.status(200).json({
            msg: 'eliminado OK',
            producto
        })
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor',
            error
        });
    };
};



module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};