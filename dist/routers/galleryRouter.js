"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const authentication_1 = require("../middlewares/authentication");
const express_1 = __importDefault(require("express"));
const Gallery_1 = __importDefault(require("../models/creatiview/Gallery"));
const Photo_1 = __importDefault(require("../models/creatiview/Photo"));
const mongodbCreatiview_1 = require("../mongodbCreatiview");
const galleryRouter = express_1.default.Router();
const upload = multer_1.default();
galleryRouter.post('/gallery', authentication_1.auth, upload.array('photo'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gallery = new Gallery_1.default(Object.assign({}, req.body));
    gallery.photoList = [];
    let files;
    files = req.files;
    files.forEach((file) => {
        gallery.photoList.push(new Photo_1.default({
            name: file.originalname.split('.')[0],
            type: file.mimetype,
            picture: file.buffer,
            gallery
        }));
    });
    yield Gallery_1.default.createCollection();
    yield Photo_1.default.createCollection();
    const session = yield mongodbCreatiview_1.db.startSession();
    session.startTransaction();
    try {
        yield Gallery_1.default.create([gallery], { session });
        for (const photo of gallery.photoList) {
            yield Photo_1.default.create([photo], { session });
        }
        yield session.commitTransaction();
        res.status(200).send();
    }
    catch (error) {
        yield session.abortTransaction();
        console.error(error);
        res.status(500).send();
    }
    finally {
        session.endSession();
    }
}));
galleryRouter.get('/gallery', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const galleries = yield Gallery_1.default.find();
        /*for(let gallery of galleries){
            await gallery.populate({
                path: 'photoList',
                options:{
                    limit: 1
                }
            }).execPopulate();
            res.send(gallery.photoList);
        }*/
        res.send(galleries);
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
galleryRouter.get('/gallery/:id/mainPicture', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const galleryId = req.params.id;
        const gallery = yield Gallery_1.default.findOne({ _id: galleryId });
        if (gallery) {
            yield gallery.populate({
                path: 'photoList',
                options: {
                    limit: 1
                }
            }).execPopulate();
            res.set('Content-Type', 'image/jpg');
            res.send(gallery.photoList[0].picture);
        }
        else {
            res.status(404).send();
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
galleryRouter.get('/gallery/:galleryName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.galleryName.replace('.', ' ');
        const gallery = yield Gallery_1.default.findOne({ galleryName: name });
        if (gallery) {
            yield gallery.populate({
                path: 'photoList',
                select: '_id'
            }).execPopulate();
            res.send(gallery.photoList);
        }
        else {
            res.status(404).send();
        }
    }
    catch (error) {
        res.status(500).send();
    }
}));
galleryRouter.get('/pictures/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPicture = req.params.id;
        const picture = yield Photo_1.default.findById(idPicture);
        if (picture) {
            res.set('Content-Type', 'image/jpg');
            res.send(picture.picture);
        }
        else {
            res.status(404).send();
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send();
    }
}));
galleryRouter.get('/pictures/:galleryName/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPicture = req.params.id;
        const picture = yield Photo_1.default.findById(idPicture);
        if (picture) {
            res.set('Content-Type', 'image/jpg');
            res.send(picture.picture);
        }
        else {
            res.status(404).send();
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send();
    }
}));
galleryRouter.post('/gallery/addPicture/:galleryName', authentication_1.auth, upload.single('photo'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const galleryName = req.params.galleryName.replace('.', ' ');
        const gallery = yield Gallery_1.default.findOne({ galleryName });
        if (gallery) {
            const file = req.file;
            const photo = new Photo_1.default({
                name: file.originalname.split('.')[0],
                type: file.mimetype,
                picture: file.buffer,
                gallery
            });
            yield Photo_1.default.create([photo]);
            res.status(200).send();
        }
        else {
            res.status(404).send();
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
exports.default = galleryRouter;
