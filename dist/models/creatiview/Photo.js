"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const photoSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    picture: {
        type: Buffer
    },
    gallery: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'Gallery'
    }
});
exports.default = mongoose_2.default.model('Photo', photoSchema);
