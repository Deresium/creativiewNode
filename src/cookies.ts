import cookie from "cookie";

const getSignatureCookie = (value: string, deleteCookie = false) => {
    return cookie.serialize('signature', value, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: deleteCookie? 0: 60*60*24*7,
        domain: 'creatiview.be',
        sameSite: true
    });
}

const getPayloadCookie = (value: string, deleteCookie = false) => {
    return cookie.serialize('payload', value, {
        secure: process.env.NODE_ENV === 'production',
        maxAge: deleteCookie? 0: 60*60*24*7,
        domain: 'creatiview.be',
        sameSite: true
    });
}

export {
    getSignatureCookie,
    getPayloadCookie,
}