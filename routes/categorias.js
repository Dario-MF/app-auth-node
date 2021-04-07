const { Router } = require('express');
const { check } = require('express-validator');
const { existeCategoriaId } = require('../helpers');
const {
    validarJWT,
    validarCampos,
    esAdminRole
} = require('../middlewares');
const { crearCategoria,
    obtenerCategorias,
    obterCategoriaPorId,
    actualizarCategoria,
    eliminarCategoria
} = require('../controllers/categoria.controller');
const router = Router();


router.get('/', obtenerCategorias);

router.get('/:id', [
    check('id', 'Id es invalido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
], obterCategoriaPorId);

router.post('/', [
    validarJWT,
    check('nombre', 'El campo nombre tiene que ir relleno').notEmpty(),
    validarCampos
], crearCategoria);

router.put('/:id', [
    validarJWT,
    check('id', 'Id es invalido').isMongoId(),
    check('id').custom(existeCategoriaId),
    check('nombre', 'El campo nombre tiene que ir relleno').notEmpty(),
    validarCampos
], actualizarCategoria);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'Id es invalido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
], eliminarCategoria);














module.exports = router;