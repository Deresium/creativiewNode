"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = () => {
    mongoose_1.default.connect(process.env.URL_MANGO_CN, { useNewUrlParser: true, useUnifiedTopology: true, replicaSet: 'rs' })
        .catch((error) => {
        console.log(error);
    });
};
