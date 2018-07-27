import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import expressValidator = require('express-validator');
import * as path from 'path';
import * as http from 'http';
import * as logger from 'morgan';
import { IConfig, ISettings, IEnvironmentSettings, IMovieDB } from './config/config';

import indexRoute from './routes/index';
import movie from './routes/movie';
import person from './routes/person';
import comment from './routes/comment';

const config: IConfig = require('./config/config.json');
const settings: IEnvironmentSettings = config.settings[process.env.NODE_ENV];

class App {
    public express: express.Application;
    private server: http.Server;
    private port: number;

    public static bootstrap(): App {
        return new App();
    }

    constructor() {
        this.express = express();
        this.middleware();
        this.verifyToken();
        this.routes();
        this.config();
        this.createServer();
        this.listen();
        this.handleExceptions();
    }

    private middleware(): void {
        this.express.use(cors());
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json({ limit: '50mb' }));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(expressValidator());
        this.express.use(express.static(path.join(__dirname, 'public')));
    }

    private verifyToken(): void {
        this.express.use(settings.baseRouterPath + '/', indexRoute);

        this.express.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            req.params.decoded = true;
            next();
        })
    }

    private routes(): void {
        console.log(settings.baseRouterPath + '/movie');
        this.express.use(settings.baseRouterPath + '/movie', movie);
        this.express.use(settings.baseRouterPath + '/person', person);
        this.express.use(settings.baseRouterPath + '/comment', comment);

        this.express.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: Error = new Error('The resource you have requested was not found!');
            err.status = 404;
            next(err);
        });

        this.express.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.log(err.stack);

            res.status(err.status || 500).json({
                message: err.message,
                success: false
            });
        });
    }

    private config(): void {
        this.port = settings.port || 3000;
    }

    private createServer(): void {
        this.server = http.createServer(this.express);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.server.timeout = 0;
    }

    private handleExceptions(): void {
        process.on('uncaughtException', (err: any) => {
            if (err.code === 'ECONNRESET') {
            }
            else {
                throw err;
            }
        });
    }
}

const server = App.bootstrap();
export default server.express;