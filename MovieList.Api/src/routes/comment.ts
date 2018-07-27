import { Router } from 'express';
import CommentController from '../controllers/commentController';

export class Comment {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    private init(): void {
        this.router.get('/getComments/:movieID', CommentController.getComments);
        this.router.post('/addComment', CommentController.addComment);
    }
}

const comment: Comment = new Comment();
const router: Router = comment.router;
export default router;