import multer from "multer";
import {auth} from "../middlewares/authentication";
import express from "express";
import Gallery from "../models/creatiview/Gallery";
import mongodbCreatiview from "../mongodbCreatiview";
import Photo from "../models/creatiview/Photo";
import {mongo} from "mongoose";

const routerGallery = express.Router();

const upload = multer();
routerGallery.post('/gallery', auth, upload.array('photo'),async(req, res) => {
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

    const db = await mongodbCreatiview();
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
        db.disconnect();
    }
});

routerGallery.get('/gallery', async(req, res) => {
    const db = await mongodbCreatiview();
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
    }finally {
        db.disconnect();
    }
});

routerGallery.get('/gallery/:id/mainPicture', async(req, res) => {
    const db = await mongodbCreatiview();
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
    }finally {
        db.disconnect();
    }
});

export default routerGallery;