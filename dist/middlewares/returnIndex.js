"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const returnIndex = (req, res, next) => {
    var _a;
    if (((_a = req.headers.accept) === null || _a === void 0 ? void 0 : _a.includes('text/html')) && !req.originalUrl.endsWith('.txt')) {
        let publicDirectoryPath;
        //if(process.env.NODE_ENV === 'production'){
        if (req.get('host').includes('eshop.creatiview')) {
            publicDirectoryPath = path_1.default.join(__dirname, '../../public/eshop');
        }
        else {
            console.log(__dirname);
            publicDirectoryPath = path_1.default.join(__dirname, '../../public/creatiview');
        }
        //}else{
        //if(req.url.includes())
        //}
        res.sendFile(publicDirectoryPath + '/index.html');
    }
    else
        next();
};
exports.default = returnIndex;
//# sourceMappingURL=returnIndex.js.map