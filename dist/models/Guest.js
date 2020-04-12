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
const guestSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    invitation: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Invitation'
    }
});
guestSchema.methods.toMailString = function (separator) {
    return `nom: ${this.name}${separator}
    prénom: ${this.firstName}${separator}
    Email: ${this.email}${separator}`;
};
exports.default = mongoose_1.default.model('Guest', guestSchema);
