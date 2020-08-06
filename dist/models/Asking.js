"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const askingSchema = new mongoose_1.Schema({
    clientId: {
        type: String
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: 'invalidEmail'
        }
    },
    amount: {
        type: Number,
    },
    paymentState: {
        type: String
    },
    creationDate: {
        type: Date,
        required: true
    },
    updateDate: {
        type: Date,
        required: false
    },
    photo: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'Photo',
        required: true
    }
});
exports.default = mongoose_2.default.model('Asking', askingSchema);
