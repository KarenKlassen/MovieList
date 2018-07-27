import * as Sequelize from 'sequelize';
import { IDBConnectionConfig } from './index';

export interface IPersonAttributes {
    PersonID: number;
    Name: string;
}

export interface IPersonInstance extends IPersonAttributes, Sequelize.Instance<IPersonAttributes> { }

export default function definePerson(sequelize: Sequelize.Sequelize, dataTypes: Sequelize.Sequelize): Sequelize.Model<IPersonInstance, IPersonAttributes> {
    const Person: Sequelize.Model<IPersonInstance, IPersonAttributes> = sequelize.define("Person", {
        PersonID: {
            type: Sequelize.INTEGER,
            field: 'PersonID',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: Sequelize.STRING,
            field: 'Name',
            allowNull: true
        }
    },
        {
            tableName: "tbPeople",
            timestamps: false
        }
    );

    return Person;
}