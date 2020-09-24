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
exports.getStringAmount = exports.sendSuccessPaymentMail = exports.sendContactMail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SENDGRID_CREATIVIEW);
const to = 'dimitri.steinbusch@creatiview.be';
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
const sendSuccessPaymentMail = (payment) => __awaiter(void 0, void 0, void 0, function* () {
    yield mail_1.default.send({
        to: payment.email,
        from,
        subject: `Thank you for your donation ${payment.fullName}`,
        text: getPaymentMessage(payment, false),
        html: getPaymentMessage(payment, true)
    });
});
exports.sendSuccessPaymentMail = sendSuccessPaymentMail;
const getPaymentMessage = (payment, html) => {
    const separator = html ? '<br/>' : '\n';
    return `
    Je vous remercie pour le support que vous m'appoter cela me touche beaucoup.${separator}
    Le montant de votre donation: ${getStringAmount(payment.amount)}€${separator}
    Si  il y a le moindre problème, n'hésitez pas à me contacter ici: ${getContactLink(html)}${separator}
    Vous recevrez votre photo bientôt.${separator}
    Merci et passez une bonne journée!
    ${separator}${separator}
    I really appreciate the support that you offer me. ${separator}
    The amount of your donation: ${getStringAmount(payment.amount)}€${separator}
    If there is any problems, don't hesitate to contact me here: ${getContactLink(html)}${separator}
    You will receive your picture soon.${separator}
    Thank you and have a nice day!`;
};
const getStringAmount = (amount) => {
    const stringAmount = amount.toString();
    if (stringAmount.length <= 2) {
        return `0.${stringAmount}`;
    }
    const regex = /(\d*)(\d{2})/;
    return stringAmount.replace(regex, '$1.$2');
};
exports.getStringAmount = getStringAmount;
const getContactLink = (html) => {
    if (html)
        return `<a href="${process.env.URL_CREATIVIEW}/contact" target="_blank">Contact me</a>`;
    else
        return `${process.env.URL_CREATIVIEW}/contact`;
};
//# sourceMappingURL=sendgridCreatiview.js.map