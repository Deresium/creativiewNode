import express from "express";
import path from "path";
import routerCn from "./routers/cnRouter";
import redirectHttps from "./middlewares/redirectHttps";
import allowCn from "./middlewares/allowCn";

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

if(process.env.NODE_ENV === 'production') {
    app.use(redirectHttps);
}
app.use(allowCn);

app.use(express.json());

app.use(routerCn);

app.use(express.static(publicDirectoryPath));

export default app;