import {Document} from "mongoose";
import GuestDocument from "./GuestDocument";

export default interface InvitationDocument extends Document{
    company: string;
    mainGuest: GuestDocument;
    guestList: GuestDocument[];
}