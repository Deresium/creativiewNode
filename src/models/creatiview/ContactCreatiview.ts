import {Schema} from "mongoose";
import mongoose from "mongoose";
import GalleryDocument from "../../interfaces/creatiview/GalleryDocument";
import ContactCreativiewDocument from "../../interfaces/creatiview/ContactCreativiewDocument";

const contactCreativiewSchema = new Schema({
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
    message: {
        type: String,
        required: true,
        trim: true
    }
})

export default mongoose.model<ContactCreativiewDocument>('ContactCreativew', contactCreativiewSchema);