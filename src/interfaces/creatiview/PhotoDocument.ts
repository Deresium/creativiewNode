import {Document} from "mongoose";
import GalleryDocument from "./GalleryDocument";

export default interface PhotoDocument extends Document{
    name: string;
    type: string;
    picture: Buffer;
    gallery: GalleryDocument;
}