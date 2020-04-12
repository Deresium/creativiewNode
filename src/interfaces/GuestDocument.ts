import {Document} from 'mongoose';

export default interface GuestDocument extends Document{
    name: string;
    firstName: string;
    email: string;

    toMailString(separator: string): string;
}