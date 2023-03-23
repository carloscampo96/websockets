import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server as Srv } from 'socket.io'
import { socketController } from '../sockets/index.js';


class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = createServer( this.app );
        this.io     = new Srv( this.server );

        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets

        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') )

    }

    routes() {}

    sockets() {

        this.io.on('connection', socketController)


    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}

export {
    Server
}