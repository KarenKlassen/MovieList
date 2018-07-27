"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
function definePerson(sequelize, dataTypes) {
    const Person = sequelize.define("Person", {
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
    }, {
        tableName: "tbPeople",
        timestamps: false
    });
    return Person;
}
exports.default = definePerson;
//# sourceMappingURL=person.js.map