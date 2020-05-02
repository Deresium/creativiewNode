import cookie from "cookie";

const getSignatureCookie = (value: string) => {
    return cookie.serialize('signature', value, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    });
}

const getPayloadCookie = (value: string) => {
    return cookie.serialize('payload', value, {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60*60*4
    });
}

export {
    getSignatureCookie,
    getPayloadCookie
}