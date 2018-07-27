"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
function defineMovie(sequelize, dataTypes) {
    const Movie = sequelize.define("Movie", {
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
    }, {
        tableName: "tbMovies",
        timestamps: false
    });
    return Movie;
}
exports.default = defineMovie;
//# sourceMappingURL=movie.js.map