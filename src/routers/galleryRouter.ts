import multer from "multer";
import {auth} from "../middlewares/authentication";
import express from "express";
import Gallery from "../db/models/Gallery";
import Photo from "../db/models/Photo";
import {sequelize} from "../pgConnexion";
import {Transaction} from "sequelize";

const galleryRouter = express.Router();

const upload = multer();
galleryRouter.post('/gallery', auth, upload.array('photo'),async(req, res) => {
    try{
        await sequelize.transaction(async(t: Transaction) => {
            console.log(req.body);
            const gallery = await Gallery.create({...req.body},{transaction: t});
            const files: any = req.files;
            for (const file of files) {
                await Photo.create({
                    name: file.originalname.split('.')[0],
                    type: file.mimetype,
                    picture: file.buffer,
                    galleryId: gallery.id
                },{
                    transaction: t
                });
            }
        });
        res.status(200);
    }catch(error){
        console.log(error);
        res.status(500).send();
    }
});


galleryRouter.get('/gallery', async(req, res) => {
    try{
        const galleries = await Gallery.findAll();
        res.send(galleries);
    }catch(error){
        console.log(error);
        res.status(500).send();
    }
});

galleryRouter.get('/gallery/:id/mainPicture', async(req, res) => {
    try{
        const galleryId = req.params.id;
        const gallery = await Gallery.findByPk(galleryId, {include: [{association: Gallery.associations.photos, attributes: ['picture'], limit: 1}]});
        if(gallery && gallery.photos) {
            res.send(gallery.photos[0].picture);
        }
        else
            res.status(404).send();

    }catch(error){
        console.log(error);
        res.status(500).send();
    }
});

galleryRouter.get('/gallery/:galleryName', async(req, res) => {
    try{
       const name = req.params.galleryName.replace('.', ' ');
       const gallery = await Gallery.findOne({where: {name}, include: [{association: Gallery.associations.photos, attributes: ['id']}]});
       if(gallery)
           res.send(gallery.photos);
       else
           res.status(404).send();
    }catch(error){
       res.status(500).send();
    }
});

galleryRouter.get('/pictures/:id', async(req, res) => {
   try{
       const idPicture = req.params.id;
       const picture = await Photo.findByPk(idPicture);
       if(picture){
           res.set('Content-Type', 'image/jpg');
           res.send(picture.picture);
       }else{
           res.status(404).send();
       }
   }catch(error){
       console.error(error);
       res.status(500).send();
   }
});

galleryRouter.get('/pictures/:galleryName/:id', async(req, res) => {
    try{
        const idPicture = req.params.id;
        const picture = await Photo.findByPk(idPicture);
        if(picture){
            res.set('Content-Type', 'image/jpg');
            res.send(picture.picture);
        }else{
            res.status(404).send();
        }
    }catch(error){
        console.error(error);
        res.status(500).send();
    }
});

galleryRouter.post('/gallery/addPicture/:galleryName', auth, upload.single('photo'), async(req, res) => {
    try{
        const galleryName = req.params.galleryName.replace('.', ' ');
        const gallery = await Gallery.findOne({where:{name:galleryName}});
        if(gallery){
            const file = req.file;
            await Photo.create({
                name: file.originalname.split('.')[0],
                type: file.mimetype,
                picture: file.buffer,
                galleryId: gallery.id
            });
            res.status(200).send();
        }else{
            res.status(404).send();
        }
    }catch(error){
        console.log(error);
        res.status(500).send();
    }
});


export default galleryRouter;
