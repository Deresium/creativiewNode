import multer from "multer";
import {auth} from "../middlewares/authentication";
import express from "express";
import Gallery from "../models/creatiview/Gallery";
import Photo from "../models/creatiview/Photo";
import * as mongoose from "mongoose";
import {db} from "../mongodbCreatiview";

const galleryRouter = express.Router();

const upload = multer();
galleryRouter.post('/gallery', auth, upload.array('photo'),async(req, res) => {
    const gallery = new Gallery({
        ...req.body
    })

    gallery.photoList = [];
    let files: any;
    files = req.files;
    files.forEach((file: any) =>{
        gallery.photoList.push(
            new Photo({
                name: file.originalname.split('.')[0],
                type: file.mimetype,
                picture: file.buffer,
                gallery
            })
        );
    });

    await Gallery.createCollection();
    await Photo.createCollection();
    const session = await db.startSession();
    session.startTransaction();
    try{
        await Gallery.create([gallery], {session});
        for(const photo of gallery.photoList){
            await Photo.create([photo], {session});
        }
        await session.commitTransaction();
        res.status(200).send();
    }catch(error){
        await session.abortTransaction();
        console.error(error);
        res.status(500).send();
    }finally{
        session.endSession();
    }
});

galleryRouter.get('/galleries', async(req, res) => {
    try {
        const galleries = await Gallery.find();
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
    }catch(error){
        console.log(error);
        res.status(500).send();
    }
});

galleryRouter.get('/gallery/:id/mainPicture', async(req, res) => {
    try{
        const galleryId = req.params.id;
        const gallery = await Gallery.findOne({_id: galleryId});
        if(gallery){
            await gallery.populate({
                path: 'photoList',
                options:{
                    limit: 1
                }
            }).execPopulate();
            res.set('Content-Type', 'image/jpg');
            res.send(gallery.photoList[0].picture);
        }else{
            res.status(404).send();
        }
    }catch(error){
        console.log(error);
        res.status(500).send();
    }
});

galleryRouter.get('/gallery/:galleryName', async(req, res) => {
    try{
       const name = req.params.galleryName.replace('.', ' ');
       const gallery = await Gallery.findOne({galleryName: name});
       if(gallery){
           await gallery.populate({
               path: 'photoList',
               select: '_id'
           }).execPopulate();
           res.send(gallery.photoList);
       }else {
           res.status(404).send();
       }
    }catch(error){
       res.status(500).send();
    }
});

galleryRouter.get('/pictures/:id', async(req, res) => {
   try{
       const idPicture = req.params.id;
       const picture = await Photo.findById(idPicture);
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
        const gallery = await Gallery.findOne({galleryName});
        if(gallery){
            const file = req.file;
            const photo = new Photo({
                name: file.originalname.split('.')[0],
                type: file.mimetype,
                picture: file.buffer,
                gallery
            });
            await Photo.create([photo]);
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