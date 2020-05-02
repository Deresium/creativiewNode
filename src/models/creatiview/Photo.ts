import {Schema} from "mongoose";
import mongoose from "mongoose";
import PhotoDocument from "../../interfaces/creatiview/PhotoDocument";

const photoSchema = new Schema({
   name: {
       type: String,
       required: true,
   },
    type:{
        type: String,
        required: true
    },
    picture:{
       type: Buffer
    },
    gallery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gallery'
    }
});

export default mongoose.model<PhotoDocument>('Photo', photoSchema);