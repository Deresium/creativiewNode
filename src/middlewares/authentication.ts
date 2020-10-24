import {RequestHandler} from "express";
import jwt from "jsonwebtoken"
import cookie from "cookie";
import Roles from "../enums/roles";

const auth: RequestHandler = async(req, res, next) =>{
    try{
        const cookies = cookie.parse(req.headers.cookie || '');
        const sign = cookies.signature;
        const payload = cookies.payload;
        const token = `${payload}.${sign}`;
        if(token) {
            const decrypt = <any>jwt.verify(token, process.env.JWT_SECRET);
            req.userRole = Roles[decrypt.role];
            req.userId = decrypt.id;
            next();
        }else
            res.status(401).send('Please authenticate');
    }catch(e){
        res.status(401).send('Please authenticate');
    }
};

const authOnlyOwner: RequestHandler = async(req, res, next) =>{
    if(req.userRole === Roles.OWNER)
        next();
    else
        res.status(401).send('Please authenticate');
}

export {
    auth,
    authOnlyOwner
}