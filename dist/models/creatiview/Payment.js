"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.Schema({
    clientId: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    updateDate: {
        type: Date,
        required: false
    }
});
exports.default = mongoose_2.default.model('Payment', paymentSchema);
