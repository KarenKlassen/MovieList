import { Request, Response, NextFunction } from 'express';
import { MovieDao } from '../dao/index';
import { IMovieAttributes } from '../models/movieModels/movie';

export class MovieController {
    getMovies(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        return MovieDao.getMovies().then((movieList: Array<IMovieAttributes>) => res.status(200).send({
            movieList: movieList
        })).catch((error: Error) => {
            next(error);
        });
    }

    addMovie(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        let newMovie: IMovieAttributes = req.body.movie;
        let addedMovie: IMovieAttributes;

        return MovieDao.addMovie(newMovie).then((log: IMovieAttributes) => {
            res.status(200).send({ movie: log })
            addedMovie = log;
        }).catch((error: Error) => next(error));
    }
}

const instance: MovieController = new MovieController();
export default instance;