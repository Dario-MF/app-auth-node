const { Categoria} = require('../models');
const { findByIdAndDelete } = require('../models/categoria');


const crearCategoria = async(req, res) => {
    const nombre = req.body.nombre.toUpperCase();
    try {
        const categoriaDB = await Categoria.findOne({nombre: nombre.trim()});
        if(categoriaDB){
            return res.status(400).json({
                error: 'nombre categoria ya existe'
            });
        };
        const data = {
            nombre,
            usuario: req.usuario._id
        };
        const categoria = new Categoria( data );
        await categoria.save()
        
        res.status(201).json({
            msg:'categoria creada OK',
            categoria
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor',
            error 
        });
    };
};

const obtenerCategorias = async(req, res) => {
    const  limit = Number(req.query.limit) || 5;
    const  initial = Number(req.query.initial) || 0;
    try {
        const [ total, categorias] = await Promise.all([
            Categoria.countDocuments(),
            Categoria.find()
                .populate('usuario', {name: 1, img: 1, rol: 1})
                .limit(limit)
                .skip(initial)
        ]);
        res.json({
            msg:'respuesta OK',
            total,
            categorias
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor',
            error 
        });
    };
};

const obterCategoriaPorId = async(req, res) => {
    const { id } = req.params;
    try {
        const categoria = await Categoria.findById( id )
            .populate('usuario', {name: 1, img: 1, rol: 1});
        res.json({
            msg:'respuesta OK',
            categoria
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor',
            error 
        });
    };
};

const actualizarCategoria = async(req, res) => {
    const { id } = req.params;
    const nombre = req.body.nombre.toUpperCase();
    try {
        const categoria = await Categoria.findByIdAndUpdate( id, {
            nombre: nombre.trim(), 
            usuario: req.usuario._id
        }, {new: true}).populate('usuario', {name: 1, img: 1, rol: 1});
        
        res.json({
            msg:'categoria actualizada OK',
            categoria
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor',
            error 
        });
    };
};

const eliminarCategoria = async(req, res) => {
    const { id } = req.params;
    try {
        const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});
        res.json({
            msg:'categoria eliminada OK',
            categoria
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor',
            error 
        });
    };
};

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obterCategoriaPorId,
    actualizarCategoria,
    eliminarCategoria
};