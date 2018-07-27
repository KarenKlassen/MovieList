import { commentDB } from '../models/index';
import { ICommentAttributes } from '../models/commentModels/comment';

export function getComments(movieID: string): Promise<Array<ICommentAttributes>> {
    //searches based on the movie ID
    const movieID_num = parseInt(movieID);
    return commentDB.Comment.findAll({
        where: {
            MovieID_FK: movieID_num
        }
    });
}

export function addComment(comment: ICommentAttributes): Promise<ICommentAttributes> {
    console.log(comment);
    return commentDB.Comment.create({
        MovieID: comment.MovieID,
        PersonID: comment.PersonID,
        Comment: comment.Comment
    }).then((log: ICommentAttributes) => {
        return commentDB.Comment.findOne({
            where: {
                CommentID: log.CommentID
            }
        });
    });
}