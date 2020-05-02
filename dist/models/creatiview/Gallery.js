"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose = __importStar(require("mongoose"));
const gallerySchema = new mongoose_1.Schema({
    galleryName: {
        type: String,
        required: true,
        trim: true
    },
    descriptionFr: {
        type: String,
        required: true,
        trim: true
    },
    descriptionEn: {
        type: String,
        required: true,
        trim: true
    },
});
gallerySchema.virtual('photoList', {
    ref: 'Photo',
    localField: '_id',
    foreignField: 'gallery'
});
exports.default = mongoose.model('Gallery', gallerySchema);
