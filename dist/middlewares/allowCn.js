"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowCn = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.URL_CN);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
};
exports.default = allowCn;
