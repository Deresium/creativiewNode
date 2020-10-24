"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const redirectHttps_1 = __importDefault(require("./middlewares/redirectHttps"));
const allowLocalhost_1 = __importDefault(require("./middlewares/allowLocalhost"));
const pgConnexion_1 = require("./pgConnexion");
const returnIndex_1 = __importDefault(require("./middlewares/returnIndex"));
pgConnexion_1.connect();
const contactRouter_1 = __importDefault(require("./routers/contactRouter"));
const galleryRouter_1 = __importDefault(require("./routers/galleryRouter"));
const webhookRouter_1 = __importDefault(require("./routers/webhookRouter"));
const paymentRouter_1 = __importDefault(require("./routers/paymentRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const categoryRouter_1 = __importDefault(require("./routers/categoryRouter"));
const productRouter_1 = __importDefault(require("./routers/productRouter"));
const app = express_1.default();
const publicDirectoryPath = path_1.default.join(__dirname, '../public');
if (process.env.NODE_ENV === 'production') {
    app.use(redirectHttps_1.default);
}
else {
    //app.use(allowCredentials);
    app.use(allowLocalhost_1.default);
}
app.use(returnIndex_1.default);
app.use(webhookRouter_1.default);
app.use(express_1.default.json());
app.use(userRouter_1.default);
app.use(galleryRouter_1.default);
app.use(contactRouter_1.default);
app.use(paymentRouter_1.default);
app.use(categoryRouter_1.default);
app.use(productRouter_1.default);
app.use(express_1.default.static(publicDirectoryPath));
exports.default = app;
//# sourceMappingURL=app.js.map