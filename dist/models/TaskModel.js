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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskByBoard = exports.getTask = exports.updateTask = exports.createTask = void 0;
const db_1 = __importDefault(require("../db"));
const createTask = (board_id, task_name, description) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.default.pool.query("INSERT INTO task(board_id, task_name, description) VALUES($1, $2, $3)", [board_id, task_name, description]);
    return response;
});
exports.createTask = createTask;
const updateTask = (progress, id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.default.pool.query("UPDATE task SET progress = $1 WHERE task.id = $2", [progress, id]);
    return response;
});
exports.updateTask = updateTask;
const getTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.default.pool.query("SELECT * FROM task WHERE id = $1", [id]);
    return response;
});
exports.getTask = getTask;
const getTaskByBoard = (board_id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.default.pool.query("SELECT task.*, board.board_name, users.username, users.email FROM task INNER JOIN board ON task.board_id = board.id INNER JOIN users ON board.user_id = users.id WHERE task.board_id = $1", [board_id]);
    return response;
});
exports.getTaskByBoard = getTaskByBoard;
