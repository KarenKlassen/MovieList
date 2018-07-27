"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const expressValidator = require("express-validator");
const path = require("path");
const http = require("http");
const logger = require("morgan");
const index_1 = require("./routes/index");
const movie_1 = require("./routes/movie");
const person_1 = require("./routes/person");
const comment_1 = require("./routes/comment");
const config = require('./config/config.json');
const settings = config.settings[process.env.NODE_ENV];
class App {
    static bootstrap() {
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
    middleware() {
        this.express.use(cors());
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json({ limit: '50mb' }));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(expressValidator());
        this.express.use(express.static(path.join(__dirname, 'public')));
    }
    verifyToken() {
        this.express.use(settings.baseRouterPath + '/', index_1.default);
        this.express.use((req, res, next) => {
            req.params.decoded = true;
            next();
        });
    }
    routes() {
        console.log(settings.baseRouterPath + '/movie');
        this.express.use(settings.baseRouterPath + '/movie', movie_1.default);
        this.express.use(settings.baseRouterPath + '/person', person_1.default);
        this.express.use(settings.baseRouterPath + '/comment', comment_1.default);
        this.express.use((req, res, next) => {
            const err = new Error('The resource you have requested was not found!');
            err.status = 404;
            next(err);
        });
        this.express.use((err, req, res, next) => {
            console.log(err.stack);
            res.status(err.status || 500).json({
                message: err.message,
                success: false
            });
        });
    }
    config() {
        this.port = settings.port || 3000;
    }
    createServer() {
        this.server = http.createServer(this.express);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
        this.server.timeout = 0;
    }
    handleExceptions() {
        process.on('uncaughtException', (err) => {
            if (err.code === 'ECONNRESET') {
            }
            else {
                throw err;
            }
        });
    }
}
const server = App.bootstrap();
exports.default = server.express;
//# sourceMappingURL=app.js.map