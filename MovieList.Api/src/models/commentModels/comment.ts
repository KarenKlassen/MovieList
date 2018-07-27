import * as Sequelize from 'sequelize';
import { IDBConnectionConfig } from './index';

export interface ICommentAttributes {
    CommentID: number;
    MovieID: number;
    PersonID: number;
    Comment: string;
}

export interface ICommentInstance extends ICommentAttributes, Sequelize.Instance<ICommentAttributes> { }

export default function defineComment(sequelize: Sequelize.Sequelize, dataTypes: Sequelize.Sequelize): Sequelize.Model<ICommentInstance, ICommentAttributes> {
    const Comment: Sequelize.Model<ICommentInstance, ICommentAttributes> = sequelize.define("Comment", {
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
    },
        {
            tableName: "tbComments",
            timestamps: false
        }
    );

    return Comment;
}