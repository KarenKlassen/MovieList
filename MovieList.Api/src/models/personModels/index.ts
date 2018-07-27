import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import { IConfig, ISettings, IEnvironmentSettings, IMovieDB } from '../../config/config';
import { IPersonAttributes, IPersonInstance } from './person';

const config: IConfig = require('../../config/config.json');
const settings: IEnvironmentSettings = config.settings[process.env.NODE_ENV];

export interface IDBConnectionConfig {
    Person: Sequelize.Model<IPersonInstance, IPersonAttributes>;
    sequelize: Sequelize.Sequelize;
}

const personDB: any = {};

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
    personDB[model.name] = model;
});

Object.keys(personDB).forEach((modelName: string) => {
    if (personDB[modelName].associate) {
        personDB[modelName].associate(personDB);
    }
});

personDB.sequelize = sequelize;
personDB.Sequelize = Sequelize;

export default personDB as IDBConnectionConfig;