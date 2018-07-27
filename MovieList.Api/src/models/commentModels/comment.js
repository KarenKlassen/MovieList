"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
function defineComment(sequelize, dataTypes) {
    const Comment = sequelize.define("Comment", {
        CommentID: {
            type: Sequelize.INTEGER,
            field: 'CommentID',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        MovieID: {
            type: Sequelize.INTEGER,
            field: 'MovieID_FK',
            allowNull: true
        },
        PersonID: {
            type: Sequelize.INTEGER,
            field: 'PersonID_FK',
            allowNull: true
        },
        Comment: {
            type: Sequelize.STRING,
            field: 'Comment',
            allowNull: true
        }
    }, {
        tableName: "tbComments",
        timestamps: false
    });
    return Comment;
}
exports.default = defineComment;
//# sourceMappingURL=comment.js.map