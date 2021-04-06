const router = require('express').Router();
const { check } = require('express-validator');
const {
    validarJWT,
    validarCampos,
    esAdminRole,
    tieneRol
} = require('../middlewares');
const { 
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productos.controller');
const { existeProductoId, existeCategoria } = require('../helpers/db-validators');


router.get('/' ,obtenerProductos);


router.get('/:id', [
    check('id', 'Id es invalido').isMongoId(),
    check('id').custom( existeProductoId),
    validarCampos
], obtenerProductoPorId);


router.post('/',[
    validarJWT,
    check('nombre', 'Nombre is required').notEmpty(),
    check('precio', 'Precio is required').notEmpty(),
    check('descripcion', 'Descripcion is required').notEmpty(),
    check('disponible', 'Disponible is required').notEmpty(),
    check('categoria').custom(existeCategoria),
    validarCampos
] ,crearProducto);


router.put('/:id', [
    validarJWT,
    check('id', 'Id es invalido').isMongoId(),
    check('id').custom( existeProductoId),
    check('nombre', 'Nombre is required').notEmpty(),
    check('precio', 'Precio is required').notEmpty(),
    check('descripcion', 'Descripcion is required').notEmpty(),
    check('disponible', 'Disponible is required').notEmpty(),
    check('categoria').custom(existeCategoria),
    validarCampos
], actualizarProducto);


router.delete('/:id', [
    validarJWT,
    check('id', 'Id es invalido').isMongoId(),
    check('id').custom( existeProductoId),
    validarCampos
], eliminarProducto);



module.exports = router;