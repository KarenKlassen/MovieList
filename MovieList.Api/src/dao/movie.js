"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
function getMovies() {
    return index_1.movieDB.Movie.findAll();
}
exports.getMovies = getMovies;
function addMovie(movie) {
    return index_1.movieDB.Movie.create({
        Title: movie.Title,
        Year: movie.Year
    }).then((log) => {
        return index_1.movieDB.Movie.findOne({
            where: {
                MovieID: log.MovieID
            }
        });
    });
}
exports.addMovie = addMovie;
//# sourceMappingURL=movie.js.map