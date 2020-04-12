import express from "express";
import path from "path";
import Invitation from "./models/Invitation";
import Guest from "./models/Guest";
import GuestDocument from "./interfaces/GuestDocument";
import mongodb from "./mongodb";
import {sendNewInvitationMail} from "./sengGridCn"

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

if(process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https')
            res.redirect(`https://${req.hostname}${req.url}`);
        else
            next();
    });
}
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.URL_CN);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());

app.post('/event', async(req, res)=>{
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

    const db = await mongodb();
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
        db.disconnect();
    }
});

app.use(express.static(publicDirectoryPath));

app.listen(process.env.PORT, ()=>{
    console.log('Server is up and running!');
});