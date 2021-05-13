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
exports.getById = exports.getAllBoards = exports.addBoard = void 0;
const joi_1 = require("joi");
const BoardModel_1 = require("../models/BoardModel");
const addBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { board_name, description } = req.body;
        const user_id = req.user.id;
        const schema = joi_1.object().keys({
            board_name: joi_1.string().trim().min(5).required(),
            description: joi_1.string()
        });
        const { error, value } = schema.validate(req.body);
        if (!error) {
            const data = yield BoardModel_1.createBoard(parseInt(user_id), board_name, description);
            if (data) {
                return res.status(201).json({
                    "message": "Board has been created!",
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
            "message": "Internal server error",
            "error": error.message
        });
    }
});
exports.addBoard = addBoard;
const getAllBoards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield BoardModel_1.getBoards();
        if (data.rows.length == 0) {
            return res.status(404).json({
                "message": "Data board not found",
            });
        }
        return res.status(200).json({
            "message": "Data all boards",
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
exports.getAllBoards = getAllBoards;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = yield BoardModel_1.getBoardById(parseInt(id));
        if (data.rows.length == 0) {
            return res.status(404).json({
                "message": "Data board not found",
            });
        }
        return res.status(200).json({
            "message": "Data all boards",
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
exports.getById = getById;
