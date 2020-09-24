"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redirectHttps = (req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
        res.redirect(`https://${req.hostname}${req.url}`);
    else if (!req.hostname.startsWith('www.'))
        res.redirect(`https://www.${req.hostname}${req.url}`);
    else
        next();
};
exports.default = redirectHttps;
//# sourceMappingURL=redirectHttps.js.map