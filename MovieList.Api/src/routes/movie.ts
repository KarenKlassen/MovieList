import { Router } from 'express';
import MovieController from '../controllers/movieController';

export class Movie {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    private init(): void {
        this.router.get('/getMovies', MovieController.getMovies);
        this.router.post('/addMovie', MovieController.addMovie);
    }
}

const movie: Movie = new Movie();
const router: Router = movie.router;
export default router;