"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personController_1 = require("../controllers/personController");
class Person {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/getPeople', personController_1.default.getPeople);
    }
}
exports.Person = Person;
const person = new Person();
const router = person.router;
exports.default = router;
//# sourceMappingURL=person.js.map