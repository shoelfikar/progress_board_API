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
exports.getBoardById = exports.getBoards = exports.createBoard = void 0;
const db_1 = __importDefault(require("../db"));
const createBoard = (user_id, board_name, description) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.default.pool.query("INSERT INTO board(user_id, board_name, description) VALUES($1, $2, $3)", [user_id, board_name, description]);
    return response;
});
exports.createBoard = createBoard;
const getBoards = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.default.pool.query("SELECT board.*, users.username, users.email, task.task_name FROM board INNER JOIN users ON board.user_id = users.id INNER JOIN task ON board.id = task.board_id ORDER BY task.created_at DESC");
    return response;
});
exports.getBoards = getBoards;
const getBoardById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.default.pool.query("SELECT board.*, users.username, users.email, task.task_name FROM board INNER JOIN users ON board.user_id = users.id INNER JOIN task ON board.id = task.board_id WHERE board.id = $1 ORDER BY task.created_at DESC", [id]);
    return response;
});
exports.getBoardById = getBoardById;
