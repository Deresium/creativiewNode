"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const invitationSchema = new mongoose_1.Schema({
    company: {
        type: String,
        required: true,
        trim: true
    },
    mainGuest: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Guest'
    }
});
invitationSchema.virtual('guestList', {
    ref: 'Guest',
    localField: '_id',
    foreignField: 'invitation'
});
exports.default = mongoose_1.default.model('Invitation', invitationSchema);
