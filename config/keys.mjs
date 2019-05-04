import * as dev from "./keys_dev";
import * as prod from "./keys_prod";

const isProduction = process.env.NODE_ENV === 'production';
export const dbConnectionString = isProduction ? prod.dbConnectionString : dev.dbConnectionString;
export const secretOrKey = isProduction ? prod.secretOrKey : dev.secretOrKey;
