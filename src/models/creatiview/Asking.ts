import {Schema} from "mongoose";
import mongoose from "mongoose";
import AskingDocument from "../../interfaces/creatiview/AskingDocument";
import validate = WebAssembly.validate;
import validator from "validator";

const askingSchema = new Schema({
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
            validator: (value: string) => validator.isEmail(value),
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
        required: true
    }
})

export default mongoose.model<AskingDocument>('Asking', askingSchema);