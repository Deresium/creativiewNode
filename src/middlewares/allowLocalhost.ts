import {RequestHandler} from "express";

const allowLocalhost: RequestHandler = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}

export default allowLocalhost;