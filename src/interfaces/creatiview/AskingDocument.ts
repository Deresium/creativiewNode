import {Document} from "mongoose";
import PhotoDocument from "./PhotoDocument";

export default interface AskingDocument extends Document{
    clientId: string;
    amount: number;
    fullName: string;
    email: string;
    paymentState: string;
    creationDate: number;
    updateDate: number;
    photo: PhotoDocument;
}