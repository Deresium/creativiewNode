import {RequestHandler} from "express";
import jwt from "jsonwebtoken"
import cookie from "cookie";
import {getPayloadCookie} from "../cookies";

export const auth: RequestHandler = async(req, res, next) =>{
    try{
        const cookies = cookie.parse(req.headers.cookie || '');
        const sign = cookies.signature;
        const payload = cookies.payload;
        const token = `${payload}.${sign}`;

        if(token) {
            jwt.verify(token, process.env.JWT_SECRET);
            res.setHeader('Set-Cookie', getPayloadCookie(payload));
            next();
        }
    }catch(e){
        res.status(401).send({ error: 'Please authenticate'});
    }
};