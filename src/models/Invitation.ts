import mongoose,{Schema} from "mongoose";
import InvitationDocument from "../interfaces/InvitationDocument";

const invitationSchema = new Schema({
    company: {
        type: String,
        required: false,
        trim: true
    },
    mainGuest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    }
});

invitationSchema.virtual('guestList', {
    ref: 'Guest',
    localField: '_id',
    foreignField: 'invitation'
});

export default mongoose.model<InvitationDocument>('Invitation', invitationSchema);
