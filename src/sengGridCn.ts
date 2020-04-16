import sgMail from '@sendgrid/mail'
import InvitationDocument from "./interfaces/InvitationDocument";
import GuestDocument from "./interfaces/GuestDocument";
import ContactDocument from "./interfaces/ContactDocument";

sgMail.setApiKey(process.env.SENDGRID_CREATIVIEW);
const to = 'dimitri.steinbusch@hotmail.com';
const from = 'info@c-n.be';
const sendNewInvitationMail = async(invitation: InvitationDocument)=>{
    await sgMail.send({
        to,
        from,
        subject: `C&N Event: ${invitation.guestList.length + 1} nouveaux invités`,
        text: getNewInvitationText(invitation, '\n'),
        html: getNewInvitationText(invitation, '<br/>')
    });
};

const sendContactMail = async(contact: ContactDocument) => {
    await sgMail.send({
        to,
        from,
        subject: `Nouveau message de ${contact.name} ${contact.firstName}`,
        text: getContactText(contact, '\n'),
        html: getContactText(contact,'<br/>')
    });
}

function guestListString(guestList: GuestDocument[], separator: string): string{
    let returnString = '';
    for(const guest of guestList){
        returnString += guest.toMailString(separator) + separator;
    }
    return returnString;
}

function getNewInvitationText(invitation: InvitationDocument, separator: string): string{
    return `Invité ayant réalisé l'inscription:${separator}
    ${invitation.mainGuest.toMailString(separator)}
    ${separator}
    Société: ${invitation.company}${separator}
    ${separator}
    Invités supplémentaires:${separator}
    ${guestListString(invitation.guestList, separator)}`
}

function getContactText(contact: ContactDocument, separator: string): string{
    return `Vous avez reçu un nouveau message de ${contact.name} ${contact.firstName} ( ${(contact.company)? contact.company: 'société non spécifiée'} ) - ${contact.email}: ${separator}
    ${contact.request.replace('\n', separator)}`;
}

export {
    sendNewInvitationMail,
    sendContactMail
}