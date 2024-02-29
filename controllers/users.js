const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/users.js');

const usuariosGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const estado = { state: true };

    try {
        const [total, usuarios] = await Promise.all([
            Usuario.countDocuments(estado),
            Usuario.find(estado)
                .skip(parseInt(desde))
                .limit(parseInt(limite))
        ]);

        res.json({
            total,
            usuarios
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener usuarios',
            error
        });
    }
}

const usuariosPost = async (req, res = response) => {
    const { usuario, password } = req.body;

    try {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        const hashedPassword = bcryptjs.hashSync(password, salt);

        // Crear usuario en la base de datos
        const usuario = await Usuario.create({ usuario, password: hashedPassword });

        res.json({
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear usuario',
            error
        });
    }
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { password, ...resto } = req.body;

    try {
        // Verificar si se está actualizando la contraseña
        if (password) {
            // Encriptar nueva contraseña
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password, salt);
        }

        // Actualizar usuario en la base de datos
        const userDB = await Usuario.findByIdAndUpdate(id, resto);

        res.json({
            msg: 'Usuario actualizado correctamente',
            userDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar usuario',
            error
        });
    }
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    });
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    try {
        // Desactivar usuario en la base de datos (cambiar estado a false)
        const usuario = await Usuario.findByIdAndUpdate(id, { state: false });

        res.json({
            msg: 'Usuario eliminado correctamente',
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al eliminar usuario',
            error
        });
    }
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}
