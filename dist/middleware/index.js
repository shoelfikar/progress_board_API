"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        return res.status(401).json({
            message: 'invailid authorozation!'
        });
    }
    const token = bearerHeader.split(' ')[1];
    jsonwebtoken_1.verify(token, `${process.env.SECRET_KEY}`, (err, data) => {
        if (err) {
            return res.status(403).json({
                message: 'wrong token!'
            });
        }
        req.user = data;
        next();
    });
};
exports.verifyToken = verifyToken;
