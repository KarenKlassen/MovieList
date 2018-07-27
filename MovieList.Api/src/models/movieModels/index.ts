import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import { IConfig, ISettings, IEnvironmentSettings, IMovieDB } from '../../config/config';
import { IMovieAttributes, IMovieInstance } from './movie';

const config: IConfig = require('../../config/config.json');
const settings: IEnvironmentSettings = config.settings[process.env.NODE_ENV];

export interface IDBConnectionConfig {
    Movie: Sequelize.Model<IMovieInstance, IMovieAttributes>;
    sequelize: Sequelize.Sequelize;
}

const movieDB: any = {};

const dbConfig: IMovieDB = settings.movieDB;
export const sequelize: Sequelize.Sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
);

const basename: string = path.basename(module.filename);

fs.readdirSync(__dirname).filter((file: string): boolean => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach((file: string) => {
    const model: any = sequelize.import(path.join(__dirname, file));
    movieDB[model.name] = model;
    });

Object.keys(movieDB).forEach((modelName: string) => {
    if (movieDB[modelName].associate) {
        movieDB[modelName].associate(movieDB);
    }
});

movieDB.sequelize = sequelize;
movieDB.Sequelize = Sequelize;

export default movieDB as IDBConnectionConfig;