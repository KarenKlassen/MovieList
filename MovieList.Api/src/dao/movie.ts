import { movieDB } from '../models/index';
import { IMovieAttributes } from '../models/movieModels/movie';

export function getMovies(): Promise<Array<IMovieAttributes>> {
    return movieDB.Movie.findAll();
}

export function addMovie(movie: IMovieAttributes): Promise<IMovieAttributes> {
    return movieDB.Movie.create({
        Title: movie.Title,
        Year: movie.Year
    }).then((log: IMovieAttributes) => {
        return movieDB.Movie.findOne({
            where: {
                MovieID: log.MovieID
            }
        });
    });
}