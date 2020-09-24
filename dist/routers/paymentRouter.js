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
const Asking_1 = __importDefault(require("../db/models/Asking"));
const stripe = require('stripe')(process.env.SK_STRIPE);
const paymentRouter = express_1.default.Router();
paymentRouter.post('/createTransaction', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Asking_1.default.create(Object.assign({}, req.body));
        res.send();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
/*
/!*paymentRouter.post('/chargeTransaction', async(req, res) => {
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
})*!/


*/
exports.default = paymentRouter;
//# sourceMappingURL=paymentRouter.js.map