"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
class MovieController {
    getMovies(req, res, next) {
        return index_1.MovieDao.getMovies().then((movieList) => res.status(200).send({
            movieList: movieList
        })).catch((error) => {
            next(error);
        });
    }
    addMovie(req, res, next) {
        let newMovie = req.body.movie;
        let addedMovie;
        return index_1.MovieDao.addMovie(newMovie).then((log) => {
            res.status(200).send({ movie: log });
            addedMovie = log;
        }).catch((error) => next(error));
    }
}
exports.MovieController = MovieController;
const instance = new MovieController();
exports.default = instance;
//# sourceMappingURL=movieController.js.map