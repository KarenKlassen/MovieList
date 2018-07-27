"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
function getPeople() {
    return index_1.personDB.Person.findAll();
}
exports.getPeople = getPeople;
//we don't need to add people right now 
//# sourceMappingURL=person.js.map