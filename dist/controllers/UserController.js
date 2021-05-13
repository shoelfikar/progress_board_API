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
exports.login = exports.register = void 0;
const UserModel_1 = require("../models/UserModel");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const joi_1 = require("joi");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        const schema = joi_1.object().keys({
            username: joi_1.string().trim().required(),
            email: joi_1.string().trim().email().required(),
            password: joi_1.string().trim().min(3).required()
        });
        const { error, value } = schema.validate(req.body);
        if (!error) {
            const salt = bcryptjs_1.genSaltSync(10);
            const payload = {
                username,
                password: bcryptjs_1.hashSync(password, salt),
                email
            };
            const data = yield UserModel_1.createUser(payload.username, payload.password, payload.email);
            if (data) {
                console.log(data);
                return res.status(201).json({
                    "message": "Register success!",
                    "token": jsonwebtoken_1.sign({ id: data.rows[0].id, username: username, email: email }, `${process.env.SECRET_KEY}`)
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
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const schema = joi_1.object().keys({
            email: joi_1.string().trim().email().required(),
            password: joi_1.string().trim().min(3).required()
        });
        const { error, value } = schema.validate(req.body);
        if (!error) {
            const data = yield UserModel_1.checkUser(email);
            if (!data) {
                return res.status(404).json({
                    "message": "User not found!",
                });
            }
            const auth = bcryptjs_1.compareSync(password, data.rows[0].password);
            const token = jsonwebtoken_1.sign({ id: data.rows[0].id, username: data.rows[0].username, email: data.rows[0].email }, `${process.env.SECRET_KEY}`);
            if (!auth) {
                return res.status(401).json({
                    "message": "Wrong Password",
                });
            }
            return res.status(200).json({
                "message": "Login Success",
                "token": token,
                "username": data.rows[0].username,
                "email": data.rows[0].email
            });
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
exports.login = login;
