"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardRouter = void 0;
const express_1 = __importDefault(require("express"));
const BoardController_1 = require("../controllers/BoardController");
exports.boardRouter = express_1.default();
exports.boardRouter
    .post('/', BoardController_1.addBoard)
    .get('/', BoardController_1.getAllBoards)
    .get('/:id', BoardController_1.getById);
