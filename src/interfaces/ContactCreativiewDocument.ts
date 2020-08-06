import {Document} from "mongoose";

export default interface ContactCreativiewDocument extends Document{
    name: string;
    firstName: string;
    email: string;
    message: string;
}