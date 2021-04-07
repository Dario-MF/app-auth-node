const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');
const fileUpload = require('express-fileupload');
require('dotenv').config();
require('colors');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            usuarios: '/api/usuarios',
            auth: '/api/auth',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar',
            uploads: '/api/uploads'
        }

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
        this.app.use(cors());
        // lectura y parsing de body
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'));
        // File upload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor activo en puerto: ${this.port}`.green, `\nPath: http://localhost:${this.port}`);
        });
    }
};


module.exports = Server;