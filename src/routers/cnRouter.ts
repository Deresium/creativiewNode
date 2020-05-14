import Invitation from "../models/Invitation";
import express from "express";
import Guest from "../models/Guest";
import GuestDocument from "../interfaces/GuestDocument";
import {sendContactMail, sendNewInvitationMail} from "../sendGridCn";
import Contact from "../models/Contact";
import * as mongoose from "mongoose";

const routerCn = express.Router();

routerCn.post('/cn/event', async(req, res)=>{
    const invitation = new Invitation({
        'company': req.body.invitation.company,
        'mainGuest': new Guest(req.body.invitation.mainGuest),
    });

    invitation.guestList = [];
    req.body.invitation.guestList.forEach((guest: GuestDocument)=> {
        invitation.guestList.push(
            new Guest({
                ...guest,
                invitation
            })
        );
    });

    const db = mongoose.connection;
    await Invitation.createCollection();
    await Guest.createCollection();
    const session = await db.startSession();
    session.startTransaction();
    try{
        await Guest.create([invitation.mainGuest], {session});
        await Invitation.create([invitation],{session});
        for (const guest of invitation.guestList) {
            await Guest.create([guest], {session});
        }
        await session.commitTransaction();
        await sendNewInvitationMail(invitation);
        res.status(200).send(invitation);
    }catch(error){
        await session.abortTransaction();
        console.error(error);
        res.status(500).send();
    }finally {
        session.endSession();
    }
});

routerCn.post('/cn/contact', async(req, res)=> {
    try{
        const contact = await Contact.create(req.body.contact);
        await sendContactMail(contact);
        res.status(200).send(contact);
    }catch(error){
        console.log(error)
        res.status(500).send();
    }
});

export default routerCn;