const express = require('express');
const cors = require('cors');
const Sequelize = require("sequelize");
require("dotenv").config();

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4000;
        this.usersRoutePath = '/api/users';

        // Conectar base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Iniciar servidor
        this.listen();
    }

    async conectarDB() {
        const dbConnection = new Sequelize('usuarios_prueba', 'root', 'pruebasCode', {
            host: 'mysql', // Nombre completo del servicio del contenedor MySQL en Docker Compose
            port: 3306,
            dialect: 'mysql',
            dialectOptions: {
                connectTimeout: 120000 // Tiempo de espera en milisegundos (por ejemplo, 60 segundos)
            }
        });

        try {
            await dbConnection.authenticate();
            console.log('Conexión a la base de datos establecida correctamente.');
        } catch (error) {
            console.error('Error al conectar con la base de datos:', error);
            process.exit(1); // Salir de la aplicación en caso de error de conexión
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio Público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersRoutePath, require('../routes/user.js'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        });
    }
}

module.exports = Server;