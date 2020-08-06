import {Schema} from "mongoose";
import GalleryDocument from "../interfaces/GalleryDocument";
import * as mongoose from "mongoose";

const gallerySchema = new Schema({
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

export default mongoose.model<GalleryDocument>('Gallery', gallerySchema);