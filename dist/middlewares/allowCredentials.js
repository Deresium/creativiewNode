"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowCredentials = (req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};
exports.default = allowCredentials;
//# sourceMappingURL=allowCredentials.js.map