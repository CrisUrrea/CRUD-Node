const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/users');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio y debe tener más de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un id válido').isInt().toInt(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    check('id', 'No es un id válido').isInt().toInt(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

module.exports = router;
