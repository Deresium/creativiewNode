import sgMail from '@sendgrid/mail'
import ContactCreativiewDocument from "./interfaces/creatiview/ContactCreativiewDocument";


sgMail.setApiKey(process.env.SENDGRID_CREATIVIEW);
const to = 'dimitri.steinbusch@hotmail.com';
const from = 'no-reply@creatiview.be';
const sendContactMail = async(contact: ContactCreativiewDocument)=>{
    await sgMail.send({
        to,
        from,
        subject: `Nouveau message de ${contact.firstName} ${contact.name}`,
        text: getMessage(contact, '\n'),
        html: getMessage(contact, '<br/>')
    });
};

const getMessage = (contact: ContactCreativiewDocument, separator: string) => {
    return `Nouveau message de ${contact.firstName} ${contact.name} (${contact.email}):${separator}
        ${contact.message.replace('\n', separator)}
    `
}

export {
    sendContactMail
}
