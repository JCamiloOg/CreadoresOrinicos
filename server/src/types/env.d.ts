declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string,
        DB_HOST: string,
        DB_USER: string,
        DB_PASSWORD: string,
        DB_DATABASE: string,
        CORS_ORIGIN: string,
        SECRET_KEY: string
    }
}