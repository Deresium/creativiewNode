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

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

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


app.use(express.static(publicDirectoryPath));

export default app;