import {RequestHandler} from "express";

const allowCn: RequestHandler = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.URL_CN);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}

export default allowCn;