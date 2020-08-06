"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowLocalhost = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
};
exports.default = allowLocalhost;
