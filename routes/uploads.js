const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, obtenerArchivos, actualizarImgCloudinary } = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos, validarArchivoSubir } = require('../middlewares');



const router = Router();


router.post('/', validarArchivoSubir, cargarArchivos);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
    //], actualizarArchivo);
], actualizarImgCloudinary);

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], obtenerArchivos)









module.exports = router;