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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Category_1 = __importDefault(require("../db/models/eshop/Category"));
const authentication_1 = require("../middlewares/authentication");
const categoryRouter = express_1.default.Router();
categoryRouter.post('/category', authentication_1.auth, authentication_1.authOnlyOwner, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.default.create(Object.assign({}, req.body));
        res.send(category);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Une erreur est survenue');
    }
}));
categoryRouter.get('/category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.findAll({ order: ['name'] });
        res.send(categories);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('une erreur est survenue');
    }
}));
categoryRouter.delete('/category/:id', authentication_1.auth, authentication_1.authOnlyOwner, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Category_1.default.destroy({ where: { id: req.params.id } });
        res.send();
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Une erreur est survenue');
    }
}));
exports.default = categoryRouter;
//# sourceMappingURL=categoryRouter.js.map