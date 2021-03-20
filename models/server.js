const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');
require('dotenv').config();
require('colors');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        // Conectar DB
        this.conectarDB();
        // Middlewares.
        this.middlewares();
        // Routes
        this.routes();
    }
    async conectarDB() {
        await dbConnection()
    }

    middlewares() {
        // cors
        this.app.use( cors() );
        // lectura y parsing de body
        this.app.use( express.json() );
        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
       this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor activo en puerto: ${this.port}`.green,`\nPath: http://localhost:${this.port}`);
        });
    }
};


module.exports = Server;