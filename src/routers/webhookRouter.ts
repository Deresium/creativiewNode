import express from "express";
import bodyParser from "body-parser";
import Asking from "../db/models/Asking";
import {sendSuccessPaymentMail} from "../sendgridCreatiview";
const stripe = require('stripe')(process.env.SK_STRIPE);

const webhookRouter = express.Router();

webhookRouter.post('/webhook', bodyParser.raw({type: 'application/json'}), async(req, res) => {
    const signature = req.headers['stripe-signature'];

    try{
        const event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_SECRET);
        let clientId: string;
        let asking: Asking | null;
        switch(event.type){
            case 'source.chargeable':
                clientId = event.data.object.id;
                asking = await Asking.findOne({where:{clientId}});
                if(asking){
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
                asking = await Asking.findOne({where:{clientId}});
                if(asking){
                    asking.paymentState = 'FAILED';
                    await asking.save();
                }
                res.sendStatus(200);
                break;
            case 'charge.succeeded':
                clientId = event.data.object.payment_method;
                asking = await Asking.findOne({where:{clientId}});
                if(asking){
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

    }catch(error){
        console.log(error.message);
        res.status(400).send(error.message);
    }
})

export default webhookRouter;
