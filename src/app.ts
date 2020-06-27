import express from "express";
import path from "path";
import routerCn from "./routers/cnRouter";
import redirectHttps from "./middlewares/redirectHttps";
import allowCn from "./middlewares/allowCn";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import allowCredentials from "./middlewares/allowCredentials";
import {getPayloadCookie, getSignatureCookie} from "./cookies";
import routerGallery from "./routers/galleryRouter";
import {connect} from "./mongodbCreatiview";
import mongodb from "./mongodb";
import contactRouter from "./routers/contactRouter";
import paymentRouter from "./routers/paymentRouter";
import webhookRouter from "./routers/webhookRouter";
import returnIndex from "./middlewares/returnIndex";

connect();

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

if(process.env.NODE_ENV === 'production') {
    app.use(redirectHttps);
}else{
    app.use(allowCredentials);
}
app.use(returnIndex);
app.use(allowCn);

app.use(webhookRouter);

app.use(express.json());

app.use(routerCn);
app.use(routerGallery);
app.use(contactRouter);
app.use(paymentRouter);

app.post('/login', async (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const pwOk = await bcryptjs.compare(password,process.env.ADMIN_PW);
    if(login === process.env.ADMIN_LOGIN && pwOk){
        const token = jwt.sign({admin: true}, process.env.JWT_SECRET).split('.');
        const signatureCookieValue = token[2];
        const payloadCookieValue = `${token[0]}.${token[1]}`;
        res.setHeader('Set-Cookie', [getSignatureCookie(signatureCookieValue), getPayloadCookie(payloadCookieValue)]);
        res.status(200);
    }else{
        res.status(401);
    }
    res.send();
})

app.use(express.static(publicDirectoryPath));

export default app;