import express from "express";
import bodyParser from "body-parser";
import Asking from "../models/creatiview/Asking";
import AskingDocument from "../interfaces/creatiview/AskingDocument";
import {sendSuccessPaymentMail} from "../sendgridCreatiview";
const stripe = require('stripe')(process.env.SK_STRIPE);
/*import server from "../index";
const io = require("socket.io")(server);*/

const webhookRouter = express.Router();

webhookRouter.post('/webhook', bodyParser.raw({type: 'application/json'}), async(req, res) => {
    const signature = req.headers['stripe-signature'];

    try{
        const event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_SECRET);
        let clientId: string;
        let asking: AskingDocument | null;
        switch(event.type){
            case 'source.chargeable':
                clientId = event.data.object.id;
                asking = await Asking.findOne({clientId});
                if(asking){
                    asking.updateDate = Date.now();
                    asking.paymentState = 'CHARGEABLLE';
                    await asking.save();
                }
                const charge = await stripe.charges.create({
                    amount: event.data.object.amount,
                    currency: 'eur',
                    source: event.data.object.id
                });
                if(charge.status === 'succeeded') {
                    res.sendStatus(200);
                }else{
                    res.sendStatus(400);
                }
                break;
            case 'source.failed':
                clientId = event.data.object.id;
                asking = await Asking.findOne({clientId});
                if(asking){
                    asking.updateDate = Date.now();
                    asking.paymentState = 'FAILED';
                    await asking.save();
                }
                res.sendStatus(200);
                break;
            case 'charge.succeeded':
                clientId = event.data.object.payment_method;
                asking = await Asking.findOne({clientId});
                if(asking){
                    asking.updateDate = Date.now();
                    asking.paymentState = 'SUCCEEDED';
                    await asking.save();
                    await sendSuccessPaymentMail(asking);
                }
                res.sendStatus(200);
                break;
            default:
                res.sendStatus(400);
                break;
        }
        /*io.on("connection", (socket: any) => {
            console.log('new connection');
            if(successPayment){
                io.sockets.emit('successPayment', clientId);
            }
        });*/

    }catch(error){
        console.log(error.message);
        res.status(400).send(error.message);
    }
})

export default webhookRouter;