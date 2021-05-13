"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("./user");
const board_1 = require("./board");
const task_1 = require("./task");
const middleware_1 = require("../middleware");
const router = express_1.Router();
router.use('/user', user_1.userRouter);
router.use('/board', middleware_1.verifyToken, board_1.boardRouter);
router.use('/task', middleware_1.verifyToken, task_1.taskRouter);
router.get('/', (req, res) => {
    const result = {
        "message": "Progres Board API",
        "version": "1.0.0",
        "author": "Sulfikardi"
    };
    res.status(200).send(result);
});
exports.default = router;
