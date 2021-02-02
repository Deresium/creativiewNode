import {RequestHandler} from "express";
import path from "path";

const returnIndex: RequestHandler = (req, res, next) => {
    if(req.headers.accept?.includes('text/html') && !req.originalUrl.endsWith('.txt')){
        let publicDirectoryPath: null | string;
        //if(process.env.NODE_ENV === 'production'){
            if(req.get('host').includes('eshop.creatiview')){
                publicDirectoryPath = path.join(__dirname, '../../public/eshop');
            }else{
                console.log(__dirname);
                publicDirectoryPath = path.join(__dirname, '../../public/creatiview');
            }
        //}else{
            //if(req.url.includes())
        //}
        res.sendFile(publicDirectoryPath + '/index.html');
    }else
        next();
}

export default returnIndex;