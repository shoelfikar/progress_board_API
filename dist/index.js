"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const routers_1 = __importDefault(require("./routers"));
const app = express_1.default();
// middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
app.use('/api/v1.0', routers_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    db_1.default.runMigrations();
    console.log(`Server running on port ${port}`);
});
