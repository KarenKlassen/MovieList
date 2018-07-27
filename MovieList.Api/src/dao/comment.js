"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
function getComments(movieID) {
    //searches based on the movie ID
    const movieID_num = parseInt(movieID);
    return index_1.commentDB.Comment.findAll({
        where: {
            MovieID_FK: movieID_num
        }
    });
}
exports.getComments = getComments;
function addComment(comment) {
    console.log(comment);
    return index_1.commentDB.Comment.create({
        MovieID: comment.MovieID,
        PersonID: comment.PersonID,
        Comment: comment.Comment
    }).then((log) => {
        return index_1.commentDB.Comment.findOne({
            where: {
                CommentID: log.CommentID
            }
        });
    });
}
exports.addComment = addComment;
//# sourceMappingURL=comment.js.map