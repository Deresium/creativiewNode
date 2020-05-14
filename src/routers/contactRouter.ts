import express from "express";
import ContactCreatiview from "../models/creatiview/ContactCreatiview";
import Contact from "../models/Contact";
import {sendContactMail} from "../sendgridCreatiview";


const contactRouter = express.Router();

contactRouter.post('/contact', async(req, res) => {
    const contact = new ContactCreatiview({
        ...req.body,
    });
    try{
        const createdContact = await ContactCreatiview.create([contact]);
        await sendContactMail(createdContact[0]);
    }catch(error){
        console.log(error);
        res.status(500);
    }
    res.send();
})

export default contactRouter;