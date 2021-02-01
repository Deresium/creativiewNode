import express from "express";
import path from "path";
import redirectHttps from "./middlewares/redirectHttps";
import allowLocalhost from "./middlewares/allowLocalhost";
import {connect} from "./pgConnexion";
import returnIndex from "./middlewares/returnIndex";

connect();

import contactRouter from "./routers/contactRouter";
import galleryRouter from "./routers/galleryRouter";
import webhookRouter from "./routers/webhookRouter";
import paymentRouter from "./routers/paymentRouter";
import userRouter from "./routers/userRouter";
import categoryRouter from "./routers/categoryRouter";
import productRouter from "./routers/productRouter";
import basketRouter from "./routers/basketRouter";

const app = express();

if(process.env.NODE_ENV === 'production') {
    app.use(redirectHttps);
}else{
    //app.use(allowCredentials);
    app.use(allowLocalhost);
}

app.use(returnIndex);

app.use(webhookRouter);

app.use(express.json());

app.use(userRouter);
app.use(galleryRouter);
app.use(contactRouter);
app.use(paymentRouter);
app.use(categoryRouter);
app.use(productRouter);
app.use(basketRouter);

console.log(__dirname);
const publicDirectory = path.join(__dirname, '../public/creatiview');
app.use(express.static(publicDirectory));

export default app;