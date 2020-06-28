import {RequestHandler} from "express";

const redirectHttps: RequestHandler = (req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
        res.redirect(`https://${req.hostname}${req.url}`);
    else if(!req.hostname.startsWith('www.'))
        res.redirect(`https://www.${req.hostname}${req.url}`);
    else
        next();
}

export default redirectHttps;