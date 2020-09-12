import express from "express";
import Contact from "../db/models/Contact";
import {sendContactMail} from "../sendgridCreatiview";


const contactRouter = express.Router();

contactRouter.post('/contact', async(req, res) => {

    try{
        const contact = await Contact.create({
            ...req.body
        });
        await sendContactMail(contact);
        res.send();
    }catch(error){
        console.log(error);
        res.status(500);
    }
})

export default contactRouter;
