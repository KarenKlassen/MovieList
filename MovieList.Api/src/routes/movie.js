"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movieController_1 = require("../controllers/movieController");
class Movie {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/getMovies', movieController_1.default.getMovies);
        this.router.post('/addMovie', movieController_1.default.addMovie);
    }
}
exports.Movie = Movie;
const movie = new Movie();
const router = movie.router;
exports.default = router;
//# sourceMappingURL=movie.js.map