import mongoose,{Schema} from "mongoose";
import GuestDocument from "../interfaces/GuestDocument";

const guestSchema = new Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invitation'
    }
});

guestSchema.methods.toMailString = function(this: GuestDocument, separator: string){
    return `nom: ${this.name}${separator}
    prénom: ${this.firstName}${separator}
    Email: ${this.email}${separator}`;
}

export default mongoose.model<GuestDocument>('Guest', guestSchema);