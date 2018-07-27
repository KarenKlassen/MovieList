import * as Sequelize from 'sequelize';
import { IDBConnectionConfig } from './index';

export interface IMovieAttributes {
    MovieID: number;
    Title: string;
    Year: number;
}

export interface IMovieInstance extends IMovieAttributes, Sequelize.Instance<IMovieAttributes> { }

export default function defineMovie(sequelize: Sequelize.Sequelize, dataTypes: Sequelize.Sequelize): Sequelize.Model<IMovieInstance, IMovieAttributes> {
    const Movie: Sequelize.Model<IMovieInstance, IMovieAttributes> = sequelize.define("Movie", {
        MovieID: {
            type: Sequelize.INTEGER,
            field: 'MovieID',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Title: {
            type: Sequelize.STRING,
            field: 'Title',
            allowNull: true
        },
        Year: {
            type: Sequelize.INTEGER,
            field: 'Year',
            allowNull: true
        }
    },
        {
            tableName: "tbMovies",
            timestamps: false
        }
    );

    return Movie;
}