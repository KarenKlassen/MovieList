import { Request, Response, NextFunction } from 'express';
import { CommentDao } from '../dao/index';
import { ICommentAttributes } from '../models/commentModels/comment';

export class CommentController {
    getComments(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        //gets a list of comments using the movie ID
        return CommentDao.getComments(req.params.movieID).then((commentList: Array<ICommentAttributes>) => res.status(200).send({
            commentList: commentList
        })).catch((error: Error) => next(error));
    }

    addComment(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        let newComment: ICommentAttributes = req.body.comment;
        let addedComment: ICommentAttributes;

        return CommentDao
            .addComment(newComment)
            .then((comment: ICommentAttributes) => {res.status(200).send({ comment: comment })
                addedComment = comment;
            })
            .catch((error: Error) => next(error));
    }
}

const instance: CommentController = new CommentController();
export default instance;