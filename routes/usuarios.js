const { Router } = require('express');
const { check } = require('express-validator');
const { 
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
 } = require('../controllers/usuariosController');
const { esRoleValido, esEmailUnique, existeUsuarioId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router()



router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    check( 'rol').custom( esRoleValido ),
    validarCampos
], usuariosPut );// id es el nombre del parametro variable que recibe, se almacena en el req.params

router.post('/',[
  check( 'name', 'El nombre no es obligatorio').not().isEmpty(),
  check( 'password', 'El password no es valido').isLength({ min:6 }),
  check( 'email', 'El correo no es valido').isEmail(),
  check( 'email').custom(  esEmailUnique ),
  check( 'rol').custom( esRoleValido ),// Se obvia el parametro pasado a la funcion (rol)=> esRolValido(rol), al ser el mismo parametro no es necesario.
  validarCampos
], usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    validarCampos
], usuariosDelete);





module.exports = router;