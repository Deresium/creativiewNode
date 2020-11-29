"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFromAWS = exports.sendToAWS = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const credentials = new aws_sdk_1.default.Credentials(process.env.AWS_KEY_ID, process.env.AWS_KEY_SECRET);
const s3 = new aws_sdk_1.default.S3({
    credentials: credentials
});
const sendToAWS = (file, basketId) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = `order ${basketId}.pdf`;
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: file
    };
    yield s3.putObject(params).promise();
});
exports.sendToAWS = sendToAWS;
const getFromAWS = (basketId) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = `order ${basketId}.pdf`;
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName
    };
    const response = yield s3.getObject(params).promise();
    return response.Body;
});
exports.getFromAWS = getFromAWS;
//# sourceMappingURL=awsCalls.js.map