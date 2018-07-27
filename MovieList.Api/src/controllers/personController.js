"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
class PersonController {
    getPeople(req, res, next) {
        return index_1.PersonDao.getPeople().then((personList) => res.status(200).send({
            personList: personList
        })).catch((error) => next(error));
    }
}
exports.PersonController = PersonController;
const instance = new PersonController();
exports.default = instance;
//# sourceMappingURL=personController.js.map