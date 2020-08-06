import {Document} from "mongoose";
import PhotoDocument from "./PhotoDocument";

export default interface GalleryDocument extends Document{
    galleryName: string;
    descriptionFr: string;
    descriptionEn: string;
    photoList: PhotoDocument[];
}