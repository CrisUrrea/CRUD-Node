const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('mysql://usuario:mysql@localhost:/usuarios_prueba');

const Usuario = sequelize.define('usuario', {
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    state: {
        type: DataTypes.STRING,
        defaultValue: true
    }
}, {
    // Otras opciones del modelo, como el nombre de la tabla
});

module.exports = Usuario;
