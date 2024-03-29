declare namespace NodeJS{
    interface ProcessEnv {
        URL_CN: string;
        URL_CREATIVIEW: string;
        SENDGRID_CREATIVIEW: string;
        JWT_SECRET: string;
        DATABASE_URL: string;
        SK_STRIPE: string;
        STRIPE_SECRET: string;
        PG_USER: string;
        PG_PW: string;
        GOOGLE_RECAPTCHA_SK: string;
        GOOGLE_RECAPTCHA_PK: string;
        GOOGLE_OAUTH_ID: string;
        AWS_KEY_ID: string;
        AWS_KEY_SECRET: string;
        AWS_BUCKET_NAME: string;
    }
}