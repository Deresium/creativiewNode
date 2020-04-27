declare namespace NodeJS{
    interface ProcessEnv {
        PORT: number;
        URL_CN: string;
        URL_MANGO_CN: string;
        SENDGRID_CREATIVIEW: string;
        ADMIN_LOGIN: string;
        ADMIN_PW: string;
        JWT_SECRET: string;
    }
}