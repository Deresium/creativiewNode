"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowLocalhost = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://creatiview.be:8080");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Accept, credentials");
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};
exports.default = allowLocalhost;
//# sourceMappingURL=allowLocalhost.js.map