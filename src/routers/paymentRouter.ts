import express from "express";
import Asking from "../models/creatiview/Asking";
const stripe = require('stripe')(process.env.SK_STRIPE);

const paymentRouter = express.Router();

paymentRouter.post('/createTransaction', async(req, res) => {
    const asking = new Asking({
        ...req.body,
        creationDate: Date.now()
    });
    try{
        await Asking.create([asking]);
        res.send();
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
})

/*paymentRouter.post('/chargeTransaction', async(req, res) => {
    const clientId = req.body.clientId;
    if(clientId){
        const payment = await Payment.findOne({clientId});
        if(payment){
            const charge = await stripe.charges.create({
                amount: payment.amount,
                currency: 'eur',
                source: payment.clientId
            });
            if(charge.status === 'succeeded') {
                res.send({amount: charge.amount});
            }else{
                res.sendStatus(500);
            }
        }else{
            res.sendStatus(404);
        }
    }else{
        res.sendStatus(404);
    }
})*/



export default paymentRouter;