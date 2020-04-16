import mongoose,{Schema} from "mongoose";
import ContactDocument from "../interfaces/ContactDocument";

const contactSchema = new Schema({
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
    company: {
        type: String,
        required: false,
        trim: true
    },
    request: {
        type: String,
        required: true,
        trim: true
    }
});

export default mongoose.model<ContactDocument>('Contact', contactSchema);