"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTaskByBoard = exports.updateStatusTask = exports.addTask = void 0;
const joi_1 = require("joi");
const TaskModel_1 = require("../models/TaskModel");
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { board_id, task_name, description } = req.body;
        const schema = joi_1.object().keys({
            board_id: joi_1.number().required(),
            task_name: joi_1.string().trim().min(5).required(),
        });
        const { error, value } = schema.validate(req.body);
        if (!error) {
            const data = yield TaskModel_1.createTask(parseInt(board_id), task_name, description);
            if (data) {
                return res.status(201).json({
                    "message": "Task has been created!",
                });
            }
        }
        else {
            return res.status(400).json({
                "message": error.details[0].message,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            "message": "Internal server error"
        });
    }
});
exports.addTask = addTask;
const updateStatusTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { progress } = req.body;
        const schema = joi_1.object().keys({
            progress: joi_1.string().trim().valid('todo', 'on_progress', 'done').required(),
        });
        const { error, value } = schema.validate(req.body);
        const task = yield TaskModel_1.getTask(parseInt(id));
        if (!task) {
            return res.status(404).json({
                "message": "Data task not found",
            });
        }
        const data = yield TaskModel_1.updateTask(progress, parseInt(id));
        if (data) {
            return res.status(200).json({
                "message": "Task has been updated!",
                "task_name": task.rows[0].task_name,
                "progress": progress
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            "message": "Internal server error",
            "error": error.message
        });
    }
});
exports.updateStatusTask = updateStatusTask;
const getAllTaskByBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const board_id = req.params.board_id;
        const data = yield TaskModel_1.getTaskByBoard(parseInt(board_id));
        if (data.rows.length == 0) {
            return res.status(404).json({
                "message": "Data task not found",
            });
        }
        return res.status(200).json({
            "message": "Data Task By Board and user!",
            "data": data.rows
        });
    }
    catch (error) {
        return res.status(500).json({
            "message": "Internal server error",
            "error": error.message
        });
    }
});
exports.getAllTaskByBoard = getAllTaskByBoard;
