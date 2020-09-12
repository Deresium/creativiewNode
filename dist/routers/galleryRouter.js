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
const Gallery_1 = __importDefault(require("../db/models/Gallery"));
const Photo_1 = __importDefault(require("../db/models/Photo"));
const pgConnexion_1 = require("../pgConnexion");
const galleryRouter = express_1.default.Router();
const upload = multer_1.default();
galleryRouter.post('/gallery', authentication_1.auth, upload.array('photo'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pgConnexion_1.sequelize.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(req.body);
            const gallery = yield Gallery_1.default.create(Object.assign({}, req.body), { transaction: t });
            const files = req.files;
            for (const file of files) {
                yield Photo_1.default.create({
                    name: file.originalname.split('.')[0],
                    type: file.mimetype,
                    picture: file.buffer,
                    galleryId: gallery.id
                }, {
                    transaction: t
                });
            }
        }));
        res.status(200);
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
galleryRouter.get('/gallery', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const galleries = yield Gallery_1.default.findAll();
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
        const gallery = yield Gallery_1.default.findByPk(galleryId, { include: [Gallery_1.default.associations.photos] });
        if (gallery && gallery.photos) {
            res.send(gallery.photos[0].picture);
        }
        else
            res.status(404).send();
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
galleryRouter.get('/gallery/:galleryName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.galleryName.replace('.', ' ');
        const gallery = yield Gallery_1.default.findOne({ where: { name }, include: [{ association: Gallery_1.default.associations.photos, attributes: ['id'] }] });
        if (gallery)
            res.send(gallery.photos);
        else
            res.status(404).send();
    }
    catch (error) {
        res.status(500).send();
    }
}));
galleryRouter.get('/pictures/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPicture = req.params.id;
        const picture = yield Photo_1.default.findByPk(idPicture);
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
        const picture = yield Photo_1.default.findByPk(idPicture);
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
        const gallery = yield Gallery_1.default.findOne({ where: { name: galleryName } });
        if (gallery) {
            const file = req.file;
            yield Photo_1.default.create({
                name: file.originalname.split('.')[0],
                type: file.mimetype,
                picture: file.buffer,
                galleryId: gallery.id
            });
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
