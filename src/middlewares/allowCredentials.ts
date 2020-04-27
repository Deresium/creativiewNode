import {RequestHandler} from "express";

const allowCredentials: RequestHandler = (req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
}

export default allowCredentials;