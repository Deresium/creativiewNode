"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const publicDirectoryPath = path_1.default.join(__dirname, '../public');
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (!req.secure)
            res.redirect(`https://${req.hostname}${req.url}`);
        else
            next();
    });
}
app.use(express_1.default.static(publicDirectoryPath));
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:8080');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/
/*app.get('', (req, res)=>{

});*/
/*app.get('/galleries', (req, res)=>{
    let galleries: Gallery[] = [];
    galleries.push(new Gallery(1, "DisneyWorld", "First trip to DisneyWorld Florida!"));
    galleries.push(new Gallery(2, "Europapark", "The best German park"));
    galleries.push(new Gallery(3, "Disneyland Paris", "A lot of walkthrough attractions"));
    res.json(galleries);
});*/
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is up and running!');
});
