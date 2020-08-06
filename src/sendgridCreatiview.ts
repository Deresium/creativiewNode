import sgMail from '@sendgrid/mail'
import ContactCreativiewDocument from "./interfaces/ContactCreativiewDocument";
import AskingDocument from "./interfaces/AskingDocument";


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

const sendSuccessPaymentMail = async(payment: AskingDocument) => {
    await sgMail.send({
        to: payment.email,
        from,
        subject: `Thank you for your donation ${payment.fullName}`,
        text: getPaymentMessage(payment, false),
        html: getPaymentMessage(payment, true)
    });
}

const getPaymentMessage = (payment: AskingDocument, html: boolean) => {
    const separator = html? '<br/>':'\n';
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
    Thank you and have a nice day!`
}

const getStringAmount = (amount: number) => {
    const stringAmount = amount.toString();
    if(stringAmount.length <= 2){
        return `0.${stringAmount}`;
    }
    const regex = /(\d*)(\d{2})/
    return stringAmount.replace(regex, '$1.$2');
}

const getContactLink = (html: boolean) => {
    if(html)
        return `<a href="${process.env.URL_CREATIVIEW}/contact" target="_blank">Contact me</a>`;
    else
        return `${process.env.URL_CREATIVIEW}/contact`
}

export {
    sendContactMail,
    sendSuccessPaymentMail,
    getStringAmount
}
