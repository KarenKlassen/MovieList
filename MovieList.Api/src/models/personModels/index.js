"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require('../../config/config.json');
const settings = config.settings[process.env.NODE_ENV];
const personDB = {};
const dbConfig = settings.movieDB;
exports.sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
const basename = path.basename(module.filename);
fs.readdirSync(__dirname).filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach((file) => {
    const model = exports.sequelize.import(path.join(__dirname, file));
    personDB[model.name] = model;
});
Object.keys(personDB).forEach((modelName) => {
    if (personDB[modelName].associate) {
        personDB[modelName].associate(personDB);
    }
});
personDB.sequelize = exports.sequelize;
personDB.Sequelize = Sequelize;
exports.default = personDB;
//# sourceMappingURL=index.js.map