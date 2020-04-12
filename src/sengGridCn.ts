import sgMail from '@sendgrid/mail'
import InvitationDocument from "./interfaces/InvitationDocument";
import GuestDocument from "./interfaces/GuestDocument";

sgMail.setApiKey(process.env.SENDGRID_CREATIVIEW);

const sendNewInvitationMail = async(invitation: InvitationDocument)=>{
    await sgMail.send({
        to: 'dimitri.steinbusch@hotmail.com',
        from: 'info@c-n.be',
        subject: `C&N Event: ${invitation.guestList.length + 1} nouveaux invités`,
        text: getNewInvitationText(invitation, '\r'),
        html: getNewInvitationText(invitation, '<br/>')
    });
};

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

export {
    sendNewInvitationMail
}