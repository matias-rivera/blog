/* import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig(); */

/* export const API = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.API_PROD : publicRuntimeConfig.API_DEV;
export const APP_NAME = publicRuntimeConfig.APP_NAME;
export const DOMAIN = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.DOMAIN_PRODUCTION : publicRuntimeConfig.DOMAIN_DEVELOPMENT; 
export const DISQUS_SHORTNAME = publicRuntimeConfig.DISQUS_SHORTNAME;
export const GOOGLE_CLIENT_ID = publicRuntimeConfig.GOOGLE_CLIENT_ID;
export const FACEBOOK_APP_ID = publicRuntimeConfig.FACEBOOK_APP_ID;
export const MAINTENANCE = publicRuntimeConfig.MAINTENANCE; */

export const API = process.env.NEXT_PUBLIC_PRODUCTION
    ? process.env.NEXT_PUBLIC_API_PROD
    : process.env.NEXT_PUBLIC_API_DEV;
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
export const DOMAIN = process.env.NEXT_PUBLIC_PRODUCTION
    ? process.env.NEXT_PUBLIC_DOMAIN_PRODUCTION
    : process.env.NEXT_PUBLIC_DOMAIN_DEVELOPMENT;
export const DISQUS_SHORTNAME = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME;
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
export const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
export const MAINTENANCE = process.env.NEXT_PUBLIC_MAINTENANCE;
