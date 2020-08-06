"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Asking_1 = __importDefault(require("../models/Asking"));
const sendgridCreatiview_1 = require("../sendgridCreatiview");
const stripe = require('stripe')(process.env.SK_STRIPE);
/*import server from "../index";
const io = require("socket.io")(server);*/
const webhookRouter = express_1.default.Router();
webhookRouter.post('/webhook', body_parser_1.default.raw({ type: 'application/json' }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const signature = req.headers['stripe-signature'];
    try {
        const event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_SECRET);
        let clientId;
        let asking;
        switch (event.type) {
            case 'source.chargeable':
                clientId = event.data.object.id;
                asking = yield Asking_1.default.findOne({ clientId });
                if (asking) {
                    asking.updateDate = Date.now();
                    asking.paymentState = 'CHARGEABLLE';
                    yield asking.save();
                }
                const charge = yield stripe.charges.create({
                    amount: event.data.object.amount,
                    currency: 'eur',
                    source: event.data.object.id
                });
                if (charge.status === 'succeeded') {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(400);
                }
                break;
            case 'source.failed':
                clientId = event.data.object.id;
                asking = yield Asking_1.default.findOne({ clientId });
                if (asking) {
                    asking.updateDate = Date.now();
                    asking.paymentState = 'FAILED';
                    yield asking.save();
                }
                res.sendStatus(200);
                break;
            case 'charge.succeeded':
                clientId = event.data.object.payment_method;
                asking = yield Asking_1.default.findOne({ clientId });
                if (asking) {
                    asking.updateDate = Date.now();
                    asking.paymentState = 'SUCCEEDED';
                    yield asking.save();
                    yield sendgridCreatiview_1.sendSuccessPaymentMail(asking);
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
    }
    catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
}));
exports.default = webhookRouter;
