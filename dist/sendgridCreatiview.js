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
const mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SENDGRID_CREATIVIEW);
const to = 'dimitri.steinbusch@hotmail.com';
const from = 'no-reply@creatiview.be';
const sendContactMail = (contact) => __awaiter(void 0, void 0, void 0, function* () {
    yield mail_1.default.send({
        to,
        from,
        subject: `Nouveau message de ${contact.firstName} ${contact.name}`,
        text: getMessage(contact, '\n'),
        html: getMessage(contact, '<br/>')
    });
});
exports.sendContactMail = sendContactMail;
const getMessage = (contact, separator) => {
    return `Nouveau message de ${contact.firstName} ${contact.name} (${contact.email}):${separator}
        ${contact.message.replace('\n', separator)}
    `;
};
