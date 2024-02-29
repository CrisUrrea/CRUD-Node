const Usuario = require('../models/users.js');

const existeUsuarioPorId = async (id) => {
    try {
        // Verificar si el usuario existe por su ID
        const existeId = await Usuario.findById(id);
        if (!existeId) {
            throw new Error(`El usuario con ID ${id} no existe`);
        }
    } catch (error) {
        throw new Error(`Error al verificar la existencia del usuario con ID ${id}: ${error.message}`);
    }
}

module.exports = {
    existeUsuarioPorId
}
