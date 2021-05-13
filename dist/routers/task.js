"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = __importDefault(require("express"));
const TaskController_1 = require("../controllers/TaskController");
exports.taskRouter = express_1.default();
exports.taskRouter
    .post('/', TaskController_1.addTask)
    .put('/:id', TaskController_1.updateStatusTask)
    .get('/:board_id', TaskController_1.getAllTaskByBoard);
