"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cnRouter_1 = __importDefault(require("./routers/cnRouter"));
const redirectHttps_1 = __importDefault(require("./middlewares/redirectHttps"));
const allowCn_1 = __importDefault(require("./middlewares/allowCn"));
const app = express_1.default();
const publicDirectoryPath = path_1.default.join(__dirname, '../public');
if (process.env.NODE_ENV === 'production') {
    app.use(redirectHttps_1.default);
}
app.use(allowCn_1.default);
app.use(express_1.default.json());
app.use(cnRouter_1.default);
app.use(express_1.default.static(publicDirectoryPath));
exports.default = app;
