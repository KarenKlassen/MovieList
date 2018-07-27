"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
class CommentController {
    getComments(req, res, next) {
        //gets a list of comments using the movie ID
        return index_1.CommentDao.getComments(req.params.movieID).then((commentList) => res.status(200).send({
            commentList: commentList
        })).catch((error) => next(error));
    }
    addComment(req, res, next) {
        let newComment = req.body.comment;
        let addedComment;
        return index_1.CommentDao
            .addComment(newComment)
            .then((comment) => {
            res.status(200).send({ comment: comment });
            addedComment = comment;
        })
            .catch((error) => next(error));
    }
}
exports.CommentController = CommentController;
const instance = new CommentController();
exports.default = instance;
//# sourceMappingURL=commentController.js.map