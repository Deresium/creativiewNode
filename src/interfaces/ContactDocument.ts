import {Document} from "mongoose";

export default interface ContactDocument extends Document{
    name: string;
    firstName: string;
    email: string;
    company: string;
    request: string;
}