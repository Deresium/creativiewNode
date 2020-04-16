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
const from = 'info@c-n.be';
const sendNewInvitationMail = (invitation) => __awaiter(void 0, void 0, void 0, function* () {
    yield mail_1.default.send({
        to,
        from,
        subject: `C&N Event: ${invitation.guestList.length + 1} nouveaux invités`,
        text: getNewInvitationText(invitation, '\n'),
        html: getNewInvitationText(invitation, '<br/>')
    });
});
exports.sendNewInvitationMail = sendNewInvitationMail;
const sendContactMail = (contact) => __awaiter(void 0, void 0, void 0, function* () {
    yield mail_1.default.send({
        to,
        from,
        subject: `Nouveau message de ${contact.name} ${contact.firstName}`,
        text: getContactText(contact, '\n'),
        html: getContactText(contact, '<br/>')
    });
});
exports.sendContactMail = sendContactMail;
function guestListString(guestList, separator) {
    let returnString = '';
    for (const guest of guestList) {
        returnString += guest.toMailString(separator) + separator;
    }
    return returnString;
}
function getNewInvitationText(invitation, separator) {
    return `Invité ayant réalisé l'inscription:${separator}
    ${invitation.mainGuest.toMailString(separator)}
    ${separator}
    Société: ${invitation.company}${separator}
    ${separator}
    Invités supplémentaires:${separator}
    ${guestListString(invitation.guestList, separator)}`;
}
function getContactText(contact, separator) {
    return `Vous avez reçu un nouveau message de ${contact.name} ${contact.firstName} ( ${(contact.company) ? contact.company : 'société non spécifiée'} ) - ${contact.email}: ${separator}
    ${contact.request.replace('\n', separator)}`;
}
