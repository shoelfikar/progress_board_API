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
exports.checkUser = exports.createUser = void 0;
const db_1 = __importDefault(require("../db"));
const createUser = (username, password, email) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.default.pool.query("INSERT INTO users(username, password, email) VALUES($1, $2, $3) RETURNING id", [username, password, email]);
    return response;
});
exports.createUser = createUser;
const checkUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.default.pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return response;
});
exports.checkUser = checkUser;
