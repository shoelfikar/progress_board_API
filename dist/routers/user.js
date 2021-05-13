"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
exports.userRouter = express_1.Router();
exports.userRouter
    .post('/auth/register', UserController_1.register)
    .post('/auth/login', UserController_1.login);
