"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_1 = require("../controllers/commentController");
class Comment {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/getComments/:movieID', commentController_1.default.getComments);
        this.router.post('/addComment', commentController_1.default.addComment);
    }
}
exports.Comment = Comment;
const comment = new Comment();
const router = comment.router;
exports.default = router;
//# sourceMappingURL=comment.js.map